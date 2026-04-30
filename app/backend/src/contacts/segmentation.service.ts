import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SegmentationService {
  constructor(private prisma: PrismaService) {}

  async createSegment(
    organizationId: string,
    data: { name: string; description?: string; filters: any },
  ) {
    return this.prisma.segment.create({
      data: {
        organizationId,
        name: data.name,
        description: data.description,
        filters: data.filters, // Stored as JSON
      },
    });
  }

  async getContactsBySegment(organizationId: string, segmentId: string) {
    const segment = await this.prisma.segment.findUnique({
      where: { id: segmentId },
    });
    if (!segment || segment.organizationId !== organizationId) {
      throw new NotFoundException('Segment not found');
    }

    const filters = segment.filters as any;
    const prismaWhere: any = { organizationId };

    // Translating simplistic JSON filters to Prisma queries
    if (filters.tags && Array.isArray(filters.tags)) {
      prismaWhere.tags = { hasSome: filters.tags };
    }
    if (filters.pipelineStage) {
      prismaWhere.pipelineStage = filters.pipelineStage;
    }
    // ... extendable for location, activity, etc.

    return this.prisma.contact.findMany({
      where: prismaWhere,
    });
  }

  async getAllSegments(organizationId: string) {
    return this.prisma.segment.findMany({
      where: { organizationId },
      include: {
        _count: {
          select: { contacts: true },
        },
      },
    });
  }
}
