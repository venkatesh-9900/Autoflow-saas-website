import { Module } from '@nestjs/common';
import { WhatsappAutomationService } from './whatsapp-automation.service';
import { WhatsappAutomationController } from './whatsapp-automation.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WhatsappAutomationService],
  controllers: [WhatsappAutomationController],
  exports: [WhatsappAutomationService],
})
export class WhatsappAutomationModule {}
