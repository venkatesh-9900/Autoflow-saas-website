import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ChatbotService {
  constructor(
    private prisma: PrismaService,
    private ai: AiService,
  ) {}

  async handleMessage(
    organizationId: string,
    channel: any,
    senderId: string,
    text: string,
  ) {
    // 1. Get AI response
    const aiResponse = await this.ai.generateContent(text);

    // 2. Save message to DB
    return this.prisma.message.create({
      data: {
        channel,
        to: senderId,
        content: aiResponse,
        organizationId,
        status: 'SENT',
      },
    });
  }

  async getChatbotSettings(organizationId: string) {
    // Logic to fetch chatbot config (welcome message, etc.)
    return {
      welcomeMessage: 'Hello! How can I help you today?',
      enabled: true,
    };
  }
}
