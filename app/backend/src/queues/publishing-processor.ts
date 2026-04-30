import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { PostStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

export interface PublishingJobData {
  postId: string;
  organizationId: string;
}

@Processor('publishing-queue', { concurrency: 2 })
export class PublishingProcessor extends WorkerHost {
  private readonly logger = new Logger(PublishingProcessor.name);

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {
    super();
  }

  async process(job: Job<PublishingJobData>) {
    this.logger.log(`Processing publishing job for Post: ${job.data.postId}`);

    const post = await this.prisma.socialPost.findUnique({
      where: { id: job.data.postId },
      include: { mediaAssets: { include: { mediaAsset: true } } },
    });

    if (!post) {
      this.logger.warn(`Post not found: ${job.data.postId}`);
      return;
    }

    try {
      const platforms = post.platforms || ['INSTAGRAM'];

      for (const platform of platforms) {
        this.logger.log(`[${platform}] Publishing post ${post.id}`);
        // Mock API call: Rate-limiting and retry logic handle natively per external service
        await new Promise((resolve) => setTimeout(resolve, 400));
      }

      await this.prisma.socialPost.update({
        where: { id: post.id },
        data: {
          status: PostStatus.PUBLISHED,
          publishedAt: new Date(),
          externalPostId: `multi_${Date.now()}`,
        },
      });

      this.logger.log(
        `Post ${post.id} published successfully across ${platforms.length} platforms.`,
      );

      await this.notificationsService.triggerAlert(
        post.organizationId,
        'Social Post Published',
        `Your post was published successfully to ${platforms.join(', ')}.`,
        'SUCCESS',
      );
    } catch (error: unknown) {
      this.logger.error(`Failed to publish post ${post.id}`, error);

      await this.prisma.socialPost.update({
        where: { id: post.id },
        data: {
          status: PostStatus.FAILED,
          errorMessage:
            error instanceof Error ? error.message : 'Unknown API Exception',
        },
      });

      await this.notificationsService.triggerAlert(
        post.organizationId,
        'Instagram Publishing Failed',
        `Failed to publish post.`,
        'ERROR',
      );

      throw error; // Let BullMQ handle retries based on queue configuration
    }
  }
}
