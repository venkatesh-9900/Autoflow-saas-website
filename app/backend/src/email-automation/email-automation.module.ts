import { Module } from '@nestjs/common';
import { EmailAutomationService } from './email-automation.service';
import { EmailAutomationController } from './email-automation.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EmailAutomationService],
  controllers: [EmailAutomationController],
  exports: [EmailAutomationService],
})
export class EmailAutomationModule {}
