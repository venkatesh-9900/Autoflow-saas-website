import { Module } from '@nestjs/common';
import { AccountAnalyticsService } from './account-analytics.service';
import { AccountAnalyticsController } from './account-analytics.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AccountAnalyticsService],
  controllers: [AccountAnalyticsController],
  exports: [AccountAnalyticsService],
})
export class AccountAnalyticsModule {}
