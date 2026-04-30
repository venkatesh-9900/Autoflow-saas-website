import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageProcessor } from './message-processor';
import { FailoverProcessor } from './failover-processor';
import { SchedulerProcessor } from './scheduler-processor';
import { PublishingProcessor } from './publishing-processor';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get('REDIS_PORT', 6379),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'message-sending',
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: true,
      },
    }),
    BullModule.registerQueue({
      name: 'failover-queue',
    }),
    BullModule.registerQueue({
      name: 'campaign-scheduler',
    }),
    BullModule.registerQueue({
      name: 'publishing-queue',
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
      },
    }),
  ],
  providers: [
    MessageProcessor,
    FailoverProcessor,
    SchedulerProcessor,
    PublishingProcessor,
  ],
  exports: [BullModule],
})
export class QueuesModule {}
