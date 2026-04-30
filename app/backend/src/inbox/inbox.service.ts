import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InboxService {
  constructor(private prisma: PrismaService) {}

  // Get all unique conversations (grouped by contact/threadId)
  async getThreads(organizationId: string) {
    // Find distinct threads by aggregating messages.
    // Simplest representation for now: Group by `to` parameter representing the contact
    const threads = await this.prisma.message.groupBy({
      by: ['to', 'channel'],
      where: { organizationId },
      _max: { createdAt: true },
      orderBy: { _max: { createdAt: 'desc' } },
    });

    // Map these groupings to their latest message
    const richThreads = await Promise.all(
      threads.map(async (t) => {
        const latestMessage = await this.prisma.message.findFirst({
          where: { organizationId, to: t.to, channel: t.channel },
          orderBy: { createdAt: 'desc' },
          include: { assignee: true },
        });
        return latestMessage;
      }),
    );

    return richThreads;
  }

  // Get full message history for a specific contact/thread
  async getThreadMessages(organizationId: string, contactIdentifier: string) {
    return this.prisma.message.findMany({
      where: { organizationId, to: contactIdentifier },
      orderBy: { createdAt: 'asc' },
      include: { assignee: true },
    });
  }

  // Assign a thread/contact to a team member
  async assignThread(
    organizationId: string,
    contactIdentifier: string,
    assigneeId: string,
  ) {
    // Technically assignee is per-message right now, but we can update the latest message
    // or apply the assigneeId to future inbound messages via an active session table.
    // For simplicity, we update the most recent message in the thread.
    const latest = await this.prisma.message.findFirst({
      where: { organizationId, to: contactIdentifier },
      orderBy: { createdAt: 'desc' },
    });

    if (!latest) throw new NotFoundException('Thread not found');

    return this.prisma.message.update({
      where: { id: latest.id },
      data: { assigneeId },
    });
  }

  // Add internal note to a message
  async addInternalNote(
    organizationId: string,
    messageId: string,
    note: string,
  ) {
    const msg = await this.prisma.message.findUnique({
      where: { id: messageId },
    });
    if (!msg || msg.organizationId !== organizationId) {
      throw new NotFoundException('Message not found');
    }

    return this.prisma.message.update({
      where: { id: messageId },
      data: { internalNote: note },
    });
  }
}
