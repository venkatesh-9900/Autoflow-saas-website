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
exports.CampaignsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let CampaignsService = class CampaignsService {
    prisma;
    campaignQueue;
    constructor(prisma, campaignQueue) {
        this.prisma = prisma;
        this.campaignQueue = campaignQueue;
    }
    async trigger(id, organizationId, contactId) {
        const campaign = await this.findOne(id, organizationId);
        await this.campaignQueue.add('execute-workflow', {
            campaignId: campaign.id,
            contactId,
        });
        return { status: 'queued' };
    }
    async create(organizationId, data) {
        return this.prisma.campaign.create({
            data: {
                ...data,
                organizationId,
            },
        });
    }
    async findAll(organizationId) {
        return this.prisma.campaign.findMany({
            where: { organizationId },
            orderBy: { updatedAt: 'desc' },
        });
    }
    async findOne(id, organizationId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, organizationId },
        });
        if (!campaign)
            throw new common_1.NotFoundException('Campaign not found');
        return campaign;
    }
    async update(id, organizationId, data) {
        await this.findOne(id, organizationId);
        return this.prisma.campaign.update({
            where: { id },
            data,
        });
    }
    async remove(id, organizationId) {
        await this.findOne(id, organizationId);
        return this.prisma.campaign.delete({
            where: { id },
        });
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('campaign-queue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue])
], CampaignsService);
//# sourceMappingURL=campaigns.service.js.map