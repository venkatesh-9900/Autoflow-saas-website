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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let MessagesService = class MessagesService {
    prisma;
    messageQueue;
    constructor(prisma, messageQueue) {
        this.prisma = prisma;
        this.messageQueue = messageQueue;
    }
    async findAll(organizationId) {
        return this.prisma.message.findMany({
            where: { organizationId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, organizationId) {
        const message = await this.prisma.message.findFirst({
            where: { id, organizationId },
        });
        if (!message)
            throw new common_1.NotFoundException('Message not found');
        return message;
    }
    async send(data) {
        const message = await this.prisma.message.create({
            data: {
                organizationId: data.organizationId,
                channel: data.channel,
                to: data.to,
                content: data.content,
                status: 'PENDING',
            },
        });
        await this.messageQueue.add('send-message', {
            messageId: message.id,
            organizationId: data.organizationId,
            channel: data.channel,
            recipient: data.to,
            content: data.content,
        });
        return message;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('message-sending')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue])
], MessagesService);
//# sourceMappingURL=messages.service.js.map