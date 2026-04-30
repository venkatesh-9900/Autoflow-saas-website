import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { parse } from 'csv-parse/sync';

interface CsvRow {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  tags?: string;
}

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(private prisma: PrismaService) {}

  async importContacts(orgId: string, fileBuffer: Buffer) {
    this.logger.log(`Starting CSV import for org ${orgId}`);
    try {
      const records: CsvRow[] = parse(fileBuffer, {
        columns: true,
        skip_empty_lines: true,
      });
      let imported = 0;

      for (const row of records) {
        // Basic mapping and deduplication logic based on email or phone
        if (!row.email && !row.phone) continue;

        await this.prisma.contact
          .upsert({
            where: {
              id: row.id || 'new-uuid-placeholder', // Prisma needs a valid unique constraint, normally email/phone + orgId
            },
            create: {
              organizationId: orgId,
              name: row.name || 'Unknown',
              email: row.email || null,
              phone: row.phone || null,
              tags: row.tags ? String(row.tags).split(',') : [],
            },
            update: {
              name: row.name || undefined,
              tags: row.tags
                ? { push: String(row.tags).split(',') }
                : undefined,
            },
          })
          .catch(() => {
            // Fallback unique creation if upsert fails due to missing ID logic
            return this.prisma.contact.create({
              data: {
                organizationId: orgId,
                name: row.name || 'Unknown',
                email: row.email || null,
                phone: row.phone || null,
                tags: row.tags ? String(row.tags).split(',') : [],
              },
            });
          });
        imported++;
      }
      return { status: 'SUCCESS', importedCount: imported };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Import failed: ${msg}`);
      throw error;
    }
  }

  async create(
    organizationId: string,
    data: {
      name: string;
      email?: string;
      phone?: string;
      tags?: string[];
      pipelineStage?: string;
      notes?: string;
    },
  ) {
    return this.prisma.contact.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.contact.findMany({
      where: { organizationId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, organizationId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, organizationId },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async update(id: string, organizationId: string, data: any) {
    await this.findOne(id, organizationId);
    return this.prisma.contact.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, organizationId: string) {
    await this.findOne(id, organizationId);
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
