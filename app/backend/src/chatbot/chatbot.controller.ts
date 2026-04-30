import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  async handleMessage(
    @Body()
    body: {
      organizationId: string;
      channel: any;
      senderId: string;
      text: string;
    },
  ) {
    return this.chatbotService.handleMessage(
      body.organizationId,
      body.channel,
      body.senderId,
      body.text,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('settings')
  getSettings(@Req() req: any) {
    return this.chatbotService.getChatbotSettings(req.user.orgId);
  }
}
