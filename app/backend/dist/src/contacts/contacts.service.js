"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContactsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const sync_1 = require("csv-parse/sync");
let ContactsService = ContactsService_1 = class ContactsService {
    prisma;
    logger = new common_1.Logger(ContactsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async importContacts(orgId, fileBuffer) {
        this.logger.log(`Starting CSV import for org ${orgId}`);
        try {
            const records = (0, sync_1.parse)(fileBuffer, {
                columns: true,
                skip_empty_lines: true,
            });
            let imported = 0;
            for (const row of records) {
                if (!row.email && !row.phone)
                    continue;
                await this.prisma.contact
                    .upsert({
                    where: {
                        id: row.id || 'new-uuid-placeholder',
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
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            this.logger.error(`Import failed: ${msg}`);
            throw error;
        }
    }
    async create(organizationId, data) {
        return this.prisma.contact.create({
            data: {
                ...data,
                organizationId,
            },
        });
    }
    async findAll(organizationId) {
        return this.prisma.contact.findMany({
            where: { organizationId },
            orderBy: { updatedAt: 'desc' },
        });
    }
    async findOne(id, organizationId) {
        const contact = await this.prisma.contact.findFirst({
            where: { id, organizationId },
        });
        if (!contact)
            throw new common_1.NotFoundException('Contact not found');
        return contact;
    }
    async update(id, organizationId, data) {
        await this.findOne(id, organizationId);
        return this.prisma.contact.update({
            where: { id },
            data,
        });
    }
    async remove(id, organizationId) {
        await this.findOne(id, organizationId);
        return this.prisma.contact.delete({
            where: { id },
        });
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = ContactsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map