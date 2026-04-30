import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageChannel } from '@prisma/client';

@Injectable()
export class AutomationTemplatesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    return this.prisma.automationTemplate.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.automationTemplate.findUnique({
      where: { id },
    });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async importTemplate(id: string, organizationId: string) {
    const template = await this.findOne(id);

    // Creates a new Campaign for the organization based on the template
    return this.prisma.campaign.create({
      data: {
        organizationId,
        name: `Copy of ${template.name}`,
        type: MessageChannel.EMAIL, // Defaulting or could be determined by template metadata
        status: 'DRAFT',
        workflow: template.workflow || {},
      },
    });
  }
}
