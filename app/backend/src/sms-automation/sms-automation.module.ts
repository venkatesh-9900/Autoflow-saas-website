import { Module } from '@nestjs/common';
import { SmsAutomationService } from './sms-automation.service';
import { SmsAutomationController } from './sms-automation.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SmsAutomationService],
  controllers: [SmsAutomationController],
  exports: [SmsAutomationService],
})
export class SmsAutomationModule {}
