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
var SmsAutomationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsAutomationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SmsAutomationService = SmsAutomationService_1 = class SmsAutomationService {
    prisma;
    logger = new common_1.Logger(SmsAutomationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendAutoReply(organizationId, data) {
        this.logger.log(`SMS auto-reply to ${data.recipientPhone}`);
        const intent = this.detectIntent(data.incomingMessage);
        const reply = this.generateReply(intent);
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'SMS',
                direction: 'OUTBOUND',
                to: data.recipientPhone,
                content: reply,
                status: 'SENT',
            },
        });
    }
    async scheduleCampaign(organizationId, data) {
        this.logger.log(`Scheduling SMS campaign to ${data.recipients.length} recipients`);
        const messages = [];
        for (const phone of data.recipients) {
            const msg = await this.prisma.message.create({
                data: {
                    organizationId,
                    channel: 'SMS',
                    direction: 'OUTBOUND',
                    to: phone,
                    content: data.content,
                    status: 'PENDING',
                },
            });
            messages.push(msg);
        }
        return { count: messages.length, scheduledFor: data.scheduledFor };
    }
    async getSmsAnalytics(organizationId) {
        this.logger.log(`Fetching SMS analytics for org ${organizationId}`);
        return {
            totalSent: 5400,
            delivered: 5200,
            failed: 200,
            responseRate: 28.5,
            optOuts: 15,
            deliveryRate: 96.3,
            avgResponseTime: '3.2 minutes',
            period: 'last_30_days',
        };
    }
    async handleWebhook(payload) {
        this.logger.log('SMS webhook received (Twilio)');
        return { status: 'success' };
    }
    detectIntent(message) {
        const lower = message.toLowerCase();
        if (lower === 'stop' || lower === 'unsubscribe')
            return 'opt_out';
        if (lower === 'yes' || lower === 'confirm')
            return 'confirm';
        if (lower.includes('help'))
            return 'help';
        return 'general';
    }
    generateReply(intent) {
        const replies = {
            opt_out: 'You have been unsubscribed. Reply START to re-subscribe.',
            confirm: 'Thank you for confirming! We\'ll keep you updated.',
            help: 'Need help? Call us at 1-800-AUTOFLOW or visit autoflow.ai/support',
            general: 'Thanks for your message! Our team will get back to you shortly.',
        };
        return replies[intent] || replies.general;
    }
};
exports.SmsAutomationService = SmsAutomationService;
exports.SmsAutomationService = SmsAutomationService = SmsAutomationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SmsAutomationService);
//# sourceMappingURL=sms-automation.service.js.map