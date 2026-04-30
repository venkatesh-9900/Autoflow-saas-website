import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { MessageChannel } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface MessageJobData {
  messageId: string;
  organizationId: string;
  channel: MessageChannel;
  recipient: string;
  content: string;
  fallbackChannel?: MessageChannel;
}

@Injectable()
@Processor('message-sending', {
  concurrency: 5,
  limiter: {
    max: 50,
    duration: 1000, // Rate limit 50 messages per second per worker
  },
})
export class MessageProcessor extends WorkerHost {
  private readonly logger = new Logger(MessageProcessor.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue('failover-queue') private failoverQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<MessageJobData, any, string>): Promise<any> {
    const { messageId, channel, recipient } = job.data;

    this.logger.log(
      `Processing message ${messageId} for ${recipient} via ${channel}`,
    );

    try {
      // 1. Placeholder for actual API call (Meta/Twilio/SMTP)
      // For now, simulate potential API delay and occasional failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 5% failure rate for testing failover
          if (Math.random() < 0.05) reject(new Error('Provider API Error'));
          else resolve(true);
        }, 500);
      });

      this.logger.log(`Message ${messageId} sent successfully`);

      await this.prisma.message.update({
        where: { id: messageId },
        data: { status: 'DELIVERED', updatedAt: new Date() },
      });

      return { status: 'SENT', timestamp: new Date().toISOString() };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send message ${messageId}: ${msg}`);

      // Mark as failed in DB
      await this.prisma.message.update({
        where: { id: messageId },
        data: { status: 'FAILED' },
      });

      // Dispatch to failover queue if fallback is configured
      if (job.data.fallbackChannel) {
        this.logger.warn(
          `Dispatching message ${messageId} to failover queue (${job.data.fallbackChannel})`,
        );
        await this.failoverQueue.add(
          'fallback-send',
          {
            ...job.data,
            channel: job.data.fallbackChannel,
            isFailover: true,
          },
          { attempts: 3, backoff: { type: 'exponential', delay: 2000 } },
        );
      } else {
        throw error; // Let BullMQ retry
      }
    }
  }
}
