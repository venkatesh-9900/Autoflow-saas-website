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
var SchedulerProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SchedulerProcessor = SchedulerProcessor_1 = class SchedulerProcessor extends bullmq_1.WorkerHost {
    prisma;
    messageQueue;
    logger = new common_1.Logger(SchedulerProcessor_1.name);
    constructor(prisma, messageQueue) {
        super();
        this.prisma = prisma;
        this.messageQueue = messageQueue;
    }
    async process(job) {
        const { campaignId } = job.data;
        this.logger.log(`[SCHEDULER] Triggering scheduled campaign ${campaignId}`);
        try {
            const campaign = await this.prisma.campaign.findUnique({
                where: { id: campaignId },
                include: { organization: { include: { contacts: true } } },
            });
            if (!campaign || campaign.status !== 'ACTIVE') {
                this.logger.warn(`Campaign ${campaignId} is not active or not found. Skipping.`);
                return { status: 'SKIPPED' };
            }
            const contacts = campaign.organization.contacts;
            let dispatched = 0;
            for (const contact of contacts) {
                let recipient = contact.email;
                if (campaign.type === 'WHATSAPP' || campaign.type === 'SMS')
                    recipient = contact.phone;
                if (!recipient)
                    continue;
                const msg = await this.prisma.message.create({
                    data: {
                        organizationId: campaign.organizationId,
                        channel: campaign.type,
                        to: recipient,
                        content: `[Campaign: ${campaign.name}] Hello ${contact.name}!`,
                        status: 'PENDING',
                        direction: 'OUTBOUND',
                    },
                });
                await this.messageQueue.add('send-message', {
                    messageId: msg.id,
                    organizationId: campaign.organizationId,
                    channel: campaign.type,
                    recipient: recipient,
                    content: msg.content,
                    fallbackChannel: 'SMS',
                });
                dispatched++;
            }
            this.logger.log(`[SCHEDULER] Dispatched ${dispatched} messages for campaign ${campaignId}`);
            return { status: 'DISPATCHED', count: dispatched };
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            this.logger.error(`[SCHEDULER] Error processing campaign ${campaignId}: ${msg}`);
            throw error;
        }
    }
};
exports.SchedulerProcessor = SchedulerProcessor;
exports.SchedulerProcessor = SchedulerProcessor = SchedulerProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)('campaign-scheduler'),
    __param(1, (0, bullmq_1.InjectQueue)('message-sending')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue])
], SchedulerProcessor);
//# sourceMappingURL=scheduler-processor.js.map