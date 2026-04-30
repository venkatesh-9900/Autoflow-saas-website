import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageChannel } from '@prisma/client';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  getMarketplaceTemplates() {
    return [
      {
        id: 'm1',
        name: 'Abandoned Cart Recovery',
        desc: 'Boost e-commerce revenue with multi-channel reminders.',
        category: 'E-commerce',
        price: 'Free',
        channel: 'WHATSAPP',
        color: 'from-orange-500 to-red-500',
        icon: 'ShoppingCart',
        stats: '1.2k imports',
      },
      {
        id: 'm2',
        name: 'Webinar Engagement Funnel',
        desc: 'Automated reminders and replay sequences via DM & Email.',
        category: 'Events',
        price: 'Free',
        channel: 'EMAIL',
        color: 'from-blue-500 to-indigo-600',
        icon: 'Calendar',
        stats: '850 imports',
      },
      {
        id: 'm3',
        name: 'Viral Lead Generation',
        desc: 'Automated welcome sequences for high-growth campaigns.',
        category: 'Growth',
        price: 'Free',
        channel: 'INSTAGRAM',
        color: 'from-emerald-500 to-teal-600',
        icon: 'TrendingUp',
        stats: '2.4k imports',
      },
      {
        id: 'm4',
        name: 'Customer Onboarding',
        desc: 'Welcome new users and guide them through setup.',
        category: 'Retention',
        price: 'Free',
        channel: 'EMAIL',
        color: 'from-purple-500 to-pink-500',
        icon: 'Rocket',
        stats: '3.1k imports',
      },
      {
        id: 'm5',
        name: 'Support Auto-Responder',
        desc: 'Instantly reply to customer queries.',
        category: 'Support',
        price: 'Free',
        channel: 'WHATSAPP',
        color: 'from-cyan-500 to-blue-500',
        icon: 'Heart',
        stats: '5.6k imports',
      },
      {
        id: 'm6',
        name: 'Feedback Collection',
        desc: 'Automated survey sequences.',
        category: 'Survey',
        price: 'Free',
        channel: 'EMAIL',
        color: 'from-yellow-400 to-orange-500',
        icon: 'CheckCircle2',
        stats: '920 imports',
      },
      {
        id: 'm7',
        name: 'Product Launch Sequence',
        desc: 'Build hype for new releases.',
        category: 'Campaigns',
        price: 'Pro',
        channel: 'INSTAGRAM',
        color: 'from-pink-500 to-rose-500',
        icon: 'Zap',
        stats: '1.5k imports',
      },
      {
        id: 'm8',
        name: 'VIP Reward System',
        desc: 'Engage top customers with special offers.',
        category: 'Loyalty',
        price: 'Pro',
        channel: 'SMS',
        color: 'from-violet-500 to-purple-600',
        icon: 'Star',
        stats: '430 imports',
      },
    ];
  }

  async cloneTemplate(id: string, organizationId: string) {
    const templates = this.getMarketplaceTemplates();
    const source = templates.find((t) => t.id === id);
    if (!source) throw new NotFoundException('Marketplace template not found');

    return this.prisma.template.create({
      data: {
        name: source.name,
        content: `Auto-generated workflow content for: ${source.name}`,
        channel: source.channel as MessageChannel,
        organizationId,
      },
    });
  }

  async create(
    organizationId: string,
    data: { name: string; content: string; channel: MessageChannel },
  ) {
    return this.prisma.template.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.template.findMany({
      where: { organizationId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, organizationId: string) {
    const template = await this.prisma.template.findFirst({
      where: { id, organizationId },
    });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async update(id: string, organizationId: string, data: any) {
    await this.findOne(id, organizationId);
    return this.prisma.template.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, organizationId: string) {
    await this.findOne(id, organizationId);
    return this.prisma.template.delete({
      where: { id },
    });
  }
}
