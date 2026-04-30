import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface SchedulerJobData {
  campaignId: string;
}

@Injectable()
@Processor('campaign-scheduler')
export class SchedulerProcessor extends WorkerHost {
  private readonly logger = new Logger(SchedulerProcessor.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue('message-sending') private messageQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<SchedulerJobData, any, string>): Promise<any> {
    const { campaignId } = job.data;
    this.logger.log(`[SCHEDULER] Triggering scheduled campaign ${campaignId}`);

    try {
      const campaign = await this.prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { organization: { include: { contacts: true } } },
      });

      if (!campaign || campaign.status !== 'ACTIVE') {
        this.logger.warn(
          `Campaign ${campaignId} is not active or not found. Skipping.`,
        );
        return { status: 'SKIPPED' };
      }

      // In a real scenario, we'd use filters/segments. For now, sending to all contacts.
      const contacts = campaign.organization.contacts;
      let dispatched = 0;

      for (const contact of contacts) {
        // Determine contact's channel identifier based on campaign type
        let recipient = contact.email;
        if (campaign.type === 'WHATSAPP' || campaign.type === 'SMS')
          recipient = contact.phone;

        if (!recipient) continue;

        // Create a message record for tracking
        const msg = await this.prisma.message.create({
          data: {
            organizationId: campaign.organizationId,
            channel: campaign.type,
            to: recipient,
            content: `[Campaign: ${campaign.name}] Hello ${contact.name}!`, // Typically compiled from a template
            status: 'PENDING',
            direction: 'OUTBOUND',
          },
        });

        // Enqueue actual sending
        await this.messageQueue.add('send-message', {
          messageId: msg.id,
          organizationId: campaign.organizationId,
          channel: campaign.type,
          recipient: recipient,
          content: msg.content,
          fallbackChannel: 'SMS', // Example fallback
        });
        dispatched++;
      }

      this.logger.log(
        `[SCHEDULER] Dispatched ${dispatched} messages for campaign ${campaignId}`,
      );
      return { status: 'DISPATCHED', count: dispatched };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `[SCHEDULER] Error processing campaign ${campaignId}: ${msg}`,
      );
      throw error;
    }
  }
}
