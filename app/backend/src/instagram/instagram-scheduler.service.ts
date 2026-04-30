import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PostStatus } from '@prisma/client';

@Injectable()
export class InstagramSchedulerService {
  private readonly logger = new Logger(InstagramSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue('publishing-queue') private publishingQueue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledPosts() {
    this.logger.debug('Running scheduled posts check for Instagram...');
    const now = new Date();

    const postsToPublish = await this.prisma.socialPost.findMany({
      where: {
        status: PostStatus.SCHEDULED,
        scheduledFor: {
          lte: now,
        },
      },
    });

    if (postsToPublish.length > 0) {
      this.logger.log(
        `Found ${postsToPublish.length} scheduled posts to publish.`,
      );

      for (const post of postsToPublish) {
        await this.publishingQueue.add('publish-instagram-post', {
          postId: post.id,
          organizationId: post.organizationId,
        });

        // Optional: Optimistically update status to prevent dual-processing if cron runs again before queue starts
        await this.prisma.socialPost.update({
          where: { id: post.id },
          data: { status: PostStatus.PUBLISHED }, // We'll let processor set FAILED if it errors out
        });
      }
    }
  }
}
