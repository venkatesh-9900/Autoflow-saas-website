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
var EmailAutomationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAutomationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EmailAutomationService = EmailAutomationService_1 = class EmailAutomationService {
    prisma;
    logger = new common_1.Logger(EmailAutomationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendAutoReply(organizationId, data) {
        this.logger.log(`Auto-replying to email from ${data.recipientEmail}`);
        const intent = this.detectIntent(data.incomingContent);
        const reply = this.generateReply(intent, data.subject);
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'EMAIL',
                direction: 'OUTBOUND',
                to: data.recipientEmail,
                content: reply,
                status: 'SENT',
            },
        });
    }
    async scheduleCampaignEmail(organizationId, data) {
        this.logger.log(`Scheduling email campaign to ${data.recipients.length} recipients`);
        const messages = [];
        for (const recipient of data.recipients) {
            const message = await this.prisma.message.create({
                data: {
                    organizationId,
                    channel: 'EMAIL',
                    direction: 'OUTBOUND',
                    to: recipient,
                    content: `Subject: ${data.subject}\n\n${data.content}`,
                    status: 'PENDING',
                },
            });
            messages.push(message);
        }
        return { count: messages.length, scheduledFor: data.scheduledFor };
    }
    async getEmailAnalytics(organizationId) {
        this.logger.log(`Fetching email analytics for org ${organizationId}`);
        return {
            totalSent: 12500,
            delivered: 12100,
            opened: 4800,
            clicked: 1200,
            bounced: 400,
            unsubscribed: 45,
            openRate: 39.67,
            clickRate: 9.92,
            bounceRate: 3.31,
            period: 'last_30_days',
        };
    }
    async handleWebhook(payload) {
        this.logger.log('Email webhook received');
        return { status: 'success' };
    }
    detectIntent(content) {
        const lower = content.toLowerCase();
        if (lower.includes('unsubscribe'))
            return 'unsubscribe';
        if (lower.includes('help') || lower.includes('support'))
            return 'support';
        if (lower.includes('thank'))
            return 'thanks';
        if (lower.includes('price') || lower.includes('quote'))
            return 'pricing';
        return 'general';
    }
    generateReply(intent, subject) {
        const replies = {
            unsubscribe: 'We\'ve received your unsubscribe request. You\'ll be removed from our mailing list within 24 hours.',
            support: 'Thank you for reaching out! Our support team has received your request and will respond within 4 business hours.',
            thanks: 'You\'re welcome! We\'re glad we could help. Don\'t hesitate to reach out if you need anything else.',
            pricing: 'Thank you for your interest in our pricing! A sales representative will contact you within 24 hours with a customized quote.',
            general: `Thank you for your email regarding "${subject}". We've received your message and will respond shortly.`,
        };
        return replies[intent] || replies.general;
    }
};
exports.EmailAutomationService = EmailAutomationService;
exports.EmailAutomationService = EmailAutomationService = EmailAutomationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmailAutomationService);
//# sourceMappingURL=email-automation.service.js.map