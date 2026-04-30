import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MessageChannel } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface FailoverJobData {
  messageId: string;
  fallbackChannel: MessageChannel;
  recipient: string;
}

@Injectable()
@Processor('failover-queue')
export class FailoverProcessor extends WorkerHost {
  private readonly logger = new Logger(FailoverProcessor.name);

  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<FailoverJobData, any, string>): Promise<any> {
    const { messageId, fallbackChannel, recipient } = job.data;

    this.logger.log(
      `[FAILOVER] Processing fallback message ${messageId} via ${fallbackChannel} to ${recipient}`,
    );

    try {
      // Simulate fallback provider call
      await new Promise((resolve) => setTimeout(resolve, 500));

      await this.prisma.message.update({
        where: { id: messageId },
        data: {
          status: 'DELIVERED',
          channel: fallbackChannel,
          internalNote: 'Sent via failover',
        },
      });

      this.logger.log(
        `[FAILOVER] Message ${messageId} successfully delivered via fallback.`,
      );
      return { status: 'SENT_FAILOVER' };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `[FAILOVER] Complete failure for message ${messageId}: ${msg}`,
      );
      // Both primary and failover failed
      throw error;
    }
  }
}
