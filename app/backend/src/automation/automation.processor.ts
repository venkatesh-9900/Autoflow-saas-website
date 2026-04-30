import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';

import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { MessagesService } from '../messages/messages.service';
import { InstagramService } from '../instagram/instagram.service';

@Processor('campaign-queue')
@Injectable()
export class AutomationProcessor extends WorkerHost {
  private readonly logger = new Logger(AutomationProcessor.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
    private messagesService: MessagesService,
    private instagramService: InstagramService,
    @InjectQueue('campaign-queue') private campaignQueue: Queue,
    @InjectQueue('publishing-queue') private publishingQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { campaignId, contactId, nodeIndex = 0 } = job.data;

    this.logger.log(
      `Processing campaign ${campaignId} for contact ${contactId} at node ${nodeIndex}`,
    );

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign || !campaign.workflow) {
      this.logger.error(`Campaign ${campaignId} not found or has no workflow`);
      return;
    }

    const workflow: any = campaign.workflow;
    const currentNode = workflow.steps?.[nodeIndex];

    if (!currentNode) {
      this.logger.log(
        `Campaign ${campaignId} finished for contact ${contactId}`,
      );
      return;
    }

    // Logic for different node types
    switch (currentNode.type) {
      case 'PUBLISH_INSTAGRAM': {
        this.logger.log(`Publishing Instagram post for campaign ${campaignId}`);
        if (!currentNode.integrationId || !currentNode.mediaAssetIds?.length) {
          this.logger.warn(
            `Missing integrationId or mediaAssetIds in PUBLISH_INSTAGRAM node for ${campaignId}`,
          );
          break;
        }

        try {
          const post = await this.instagramService.createPost(
            campaign.organizationId,
            {
              integrationId: currentNode.integrationId,
              caption: currentNode.caption || '',
              mediaAssetIds: currentNode.mediaAssetIds,
            },
          );

          await this.publishingQueue.add('publish-instagram-post', {
            postId: post.id,
            organizationId: campaign.organizationId,
          });
        } catch (error: any) {
          this.logger.error(
            `Error creating Instagram post in workflow: ${error.message}`,
          );
        }
        break;
      }

      case 'MESSAGE':
      case 'WHATSAPP':
      case 'EMAIL':
      case 'SMS': {
        let content = currentNode.content;

        // Dynamic content generation via AI if requested
        if (currentNode.useAi) {
          try {
            this.logger.log(
              `Generating AI personalized content for contact ${contactId}`,
            );
            content = await this.aiService.generateContent(
              currentNode.prompt || 'Welcome message',
              `Tone: ${currentNode.tone}, Audience: ${currentNode.audience}`,
            );
          } catch (err) {
            this.logger.error(`AI generation failed: ${err.message}`);
          }
        }

        this.logger.log(`Final message content: ${content}`);

        // Get contact details for 'to' field
        const contact = await this.prisma.contact.findUnique({
          where: { id: contactId },
        });

        if (contact && (contact.email || contact.phone)) {
          await this.messagesService.send({
            organizationId: campaign.organizationId,
            channel: campaign.type, // Map campaign type to message channel
            to:
              (campaign.type === 'EMAIL' ? contact.email : contact.phone) || '',
            content,
          });
        }

        break;
      }

      case 'WAIT': {
        const delay = currentNode.duration || 1000;
        this.logger.log(`Workflow waiting for ${delay}ms`);

        // Trigger next step immediately but with BullMQ delay if it's a WAIT node
        // Actually, for a WAIT node, we should ideally NOT process the next node yet.
        // We reschedule the NEXT node with a delay.
        break;
      }

      default:
        this.logger.warn(`Unknown node type: ${currentNode.type}`);
    }

    // Trigger next step if exists
    if (workflow.steps?.[nodeIndex + 1]) {
      this.logger.log(
        `Queueing next step (${nodeIndex + 1}) for campaign ${campaignId}`,
      );
      await this.campaignQueue.add(
        'execute-workflow',
        { campaignId, contactId, nodeIndex: nodeIndex + 1 },
        { delay: currentNode.type === 'WAIT' ? currentNode.duration || 0 : 0 },
      );
    }

    return { status: 'completed', node: nodeIndex };
  }
}
