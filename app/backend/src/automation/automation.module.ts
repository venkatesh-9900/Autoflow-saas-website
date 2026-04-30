import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomationProcessor } from './automation.processor';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';
import { MessagesModule } from '../messages/messages.module';
import { InstagramModule } from '../instagram/instagram.module';

@Module({
  imports: [
    PrismaModule,
    AiModule,
    MessagesModule,
    InstagramModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'campaign-queue',
    }),
    BullModule.registerQueue({
      name: 'publishing-queue',
    }),
  ],
  providers: [AutomationProcessor],
  exports: [BullModule],
})
export class AutomationModule {}
