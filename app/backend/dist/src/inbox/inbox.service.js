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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InboxService = class InboxService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getThreads(organizationId) {
        const threads = await this.prisma.message.groupBy({
            by: ['to', 'channel'],
            where: { organizationId },
            _max: { createdAt: true },
            orderBy: { _max: { createdAt: 'desc' } },
        });
        const richThreads = await Promise.all(threads.map(async (t) => {
            const latestMessage = await this.prisma.message.findFirst({
                where: { organizationId, to: t.to, channel: t.channel },
                orderBy: { createdAt: 'desc' },
                include: { assignee: true },
            });
            return latestMessage;
        }));
        return richThreads;
    }
    async getThreadMessages(organizationId, contactIdentifier) {
        return this.prisma.message.findMany({
            where: { organizationId, to: contactIdentifier },
            orderBy: { createdAt: 'asc' },
            include: { assignee: true },
        });
    }
    async assignThread(organizationId, contactIdentifier, assigneeId) {
        const latest = await this.prisma.message.findFirst({
            where: { organizationId, to: contactIdentifier },
            orderBy: { createdAt: 'desc' },
        });
        if (!latest)
            throw new common_1.NotFoundException('Thread not found');
        return this.prisma.message.update({
            where: { id: latest.id },
            data: { assigneeId },
        });
    }
    async addInternalNote(organizationId, messageId, note) {
        const msg = await this.prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!msg || msg.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Message not found');
        }
        return this.prisma.message.update({
            where: { id: messageId },
            data: { internalNote: note },
        });
    }
};
exports.InboxService = InboxService;
exports.InboxService = InboxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InboxService);
//# sourceMappingURL=inbox.service.js.map