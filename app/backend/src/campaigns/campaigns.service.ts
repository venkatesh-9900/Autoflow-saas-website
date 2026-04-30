import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageChannel } from '@prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CampaignsService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('campaign-queue') private campaignQueue: Queue,
  ) {}

  async trigger(id: string, organizationId: string, contactId: string) {
    const campaign = await this.findOne(id, organizationId);
    await this.campaignQueue.add('execute-workflow', {
      campaignId: campaign.id,
      contactId,
    });
    return { status: 'queued' };
  }

  async create(
    organizationId: string,
    data: { name: string; type: MessageChannel; workflow?: any },
  ) {
    return this.prisma.campaign.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.campaign.findMany({
      where: { organizationId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, organizationId: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
    });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async update(id: string, organizationId: string, data: any) {
    await this.findOne(id, organizationId);
    return this.prisma.campaign.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, organizationId: string) {
    await this.findOne(id, organizationId);
    return this.prisma.campaign.delete({
      where: { id },
    });
  }
}
