import { Module } from '@nestjs/common';
import { PlatformSubscriptionsService } from './platform-subscriptions.service';
import { PlatformSubscriptionsController } from './platform-subscriptions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PlatformSubscriptionsService],
  controllers: [PlatformSubscriptionsController],
  exports: [PlatformSubscriptionsService],
})
export class PlatformSubscriptionsModule {}
