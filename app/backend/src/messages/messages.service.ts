import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { MessageChannel } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('message-sending') private messageQueue: Queue,
  ) {}

  async findAll(organizationId: string) {
    return this.prisma.message.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, organizationId: string) {
    const message = await this.prisma.message.findFirst({
      where: { id, organizationId },
    });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  async send(data: {
    organizationId: string;
    channel: MessageChannel;
    to: string;
    content: string;
  }) {
    // 1. Record the message in the database as PENDING
    const message = await this.prisma.message.create({
      data: {
        organizationId: data.organizationId,
        channel: data.channel,
        to: data.to,
        content: data.content,
        status: 'PENDING',
      },
    });

    // 2. Push to Queue for processing (retry logic, rate limiting, provider integration)
    await this.messageQueue.add('send-message', {
      messageId: message.id,
      organizationId: data.organizationId,
      channel: data.channel,
      recipient: data.to,
      content: data.content,
    });

    return message;
  }
}
