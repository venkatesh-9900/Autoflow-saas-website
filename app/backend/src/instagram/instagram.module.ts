import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { InstagramSchedulerService } from './instagram-scheduler.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'publishing-queue',
    }),
  ],
  controllers: [InstagramController],
  providers: [InstagramService, InstagramSchedulerService],
  exports: [InstagramService],
})
export class InstagramModule {}
