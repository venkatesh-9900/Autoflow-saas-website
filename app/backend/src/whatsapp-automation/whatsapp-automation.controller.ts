import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { WhatsappAutomationService } from './whatsapp-automation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('whatsapp-automation')
@UseGuards(JwtAuthGuard)
export class WhatsappAutomationController {
  constructor(
    private readonly whatsappService: WhatsappAutomationService,
  ) {}

  @Post('chatbot-reply')
  async chatbotReply(@Req() req: any, @Body() body: any) {
    return this.whatsappService.sendChatbotReply(
      req.user.organizationId,
      body,
    );
  }

  @Post('book-appointment')
  async bookAppointment(@Req() req: any, @Body() body: any) {
    return this.whatsappService.bookAppointment(
      req.user.organizationId,
      body,
    );
  }

  @Post('support')
  async customerSupport(@Req() req: any, @Body() body: any) {
    return this.whatsappService.handleCustomerSupport(
      req.user.organizationId,
      body,
    );
  }

  @Post('sales')
  async salesAssistant(@Req() req: any, @Body() body: any) {
    return this.whatsappService.processSalesAssistant(
      req.user.organizationId,
      body,
    );
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.whatsappService.handleWebhook(payload);
  }
}
