import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async broadcast(
    organizationId: string,
    content: string,
    channel: 'WHATSAPP' | 'COMMUNITY',
  ) {
    // Logic to broadcast to a community group or via community channel
    console.log(`Broadcasting to ${channel} for ${organizationId}: ${content}`);

    return this.prisma.message.create({
      data: {
        channel: channel,
        to: 'COMMUNITY_GROUP',
        content,
        organizationId,
        status: 'SENT',
      },
    });
  }

  async generateJoinLink(organizationId: string, groupId: string) {
    // Logic to generate a join link for a community
    return { joinLink: `https://autoflow.ai/join/${groupId}` };
  }
}
