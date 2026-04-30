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
var WhatsappAutomationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappAutomationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WhatsappAutomationService = WhatsappAutomationService_1 = class WhatsappAutomationService {
    prisma;
    logger = new common_1.Logger(WhatsappAutomationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendChatbotReply(organizationId, data) {
        this.logger.log(`Processing WhatsApp message from ${data.recipientPhone}`);
        const intent = this.detectIntent(data.incomingMessage);
        const reply = this.generateReply(intent);
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'WHATSAPP',
                direction: 'OUTBOUND',
                to: data.recipientPhone,
                content: reply,
                status: 'SENT',
            },
        });
    }
    async bookAppointment(organizationId, data) {
        this.logger.log(`Booking appointment for ${data.customerName} on ${data.preferredDate}`);
        const confirmationMessage = `✅ Appointment Confirmed!\n\n` +
            `📋 Service: ${data.service}\n` +
            `📅 Date: ${data.preferredDate}\n` +
            `⏰ Time: ${data.preferredTime}\n` +
            `👤 Name: ${data.customerName}\n\n` +
            `We'll send you a reminder 1 hour before. Reply CANCEL to cancel.`;
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'WHATSAPP',
                direction: 'OUTBOUND',
                to: data.customerPhone,
                content: confirmationMessage,
                status: 'SENT',
            },
        });
    }
    async handleCustomerSupport(organizationId, data) {
        this.logger.log(`Customer support query from ${data.customerPhone}`);
        const intent = this.detectIntent(data.query);
        const response = this.generateSupportResponse(intent, data.query);
        return {
            ticketId: data.ticketId || `TICKET-${Date.now()}`,
            response,
            intent,
            escalated: intent === 'escalate',
        };
    }
    async processSalesAssistant(organizationId, data) {
        this.logger.log(`Sales assistant processing for ${data.customerPhone}`);
        const intent = this.detectIntent(data.message);
        const salesResponse = this.generateSalesResponse(intent, data.message);
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'WHATSAPP',
                direction: 'OUTBOUND',
                to: data.customerPhone,
                content: salesResponse,
                status: 'SENT',
            },
        });
    }
    async handleWebhook(payload) {
        this.logger.log('WhatsApp webhook received');
        return { status: 'success' };
    }
    detectIntent(message) {
        const lower = message.toLowerCase();
        if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule'))
            return 'booking';
        if (lower.includes('price') || lower.includes('cost') || lower.includes('plan'))
            return 'pricing';
        if (lower.includes('help') || lower.includes('support') || lower.includes('issue'))
            return 'support';
        if (lower.includes('buy') || lower.includes('purchase') || lower.includes('order'))
            return 'purchase';
        if (lower.includes('cancel') || lower.includes('refund'))
            return 'cancellation';
        if (lower.includes('speak') || lower.includes('human') || lower.includes('agent'))
            return 'escalate';
        if (lower.includes('join') || lower.includes('community'))
            return 'community';
        return 'general';
    }
    generateReply(intent) {
        const replies = {
            booking: '📅 I can help you book an appointment! Please share your preferred date, time, and the service you need.',
            pricing: '💰 Here are our current plans:\n\n🟢 Starter: $29/mo\n🔵 Pro: $79/mo\n🟣 Enterprise: Custom\n\nWhich plan interests you?',
            support: '🔧 I\'m here to help! Please describe your issue and I\'ll find the best solution for you.',
            purchase: '🛒 Great choice! Let me walk you through the purchase process. What product/service are you interested in?',
            cancellation: '😔 We\'re sorry to see you go. Let me connect you with our retention team who may be able to help.',
            escalate: '👤 I\'ll connect you with a human agent right away. Please hold for a moment.',
            community: '🎉 Welcome! Here\'s your invite link to join our community. Make sure you\'re following us first!',
            general: '👋 Hello! Welcome to our WhatsApp support. How can I assist you today?\n\nYou can ask about:\n📅 Booking\n💰 Pricing\n🔧 Support\n🛒 Purchases',
        };
        return replies[intent] || replies.general;
    }
    generateSupportResponse(intent, query) {
        if (intent === 'escalate') {
            return '🔄 Escalating to a human agent. Your ticket has been prioritized.';
        }
        return `Thank you for contacting support. We've received your query: "${query.substring(0, 50)}..."\n\nA team member will follow up within 2 hours. Your reference ID: #${Date.now().toString(36).toUpperCase()}`;
    }
    generateSalesResponse(intent, message) {
        if (intent === 'pricing') {
            return '🌟 Great question! Our plans start at just $29/mo with a 14-day free trial. Want me to set up a personalized demo?';
        }
        if (intent === 'purchase') {
            return '🛍️ Excellent! I\'ll help you get started. Here\'s a link to complete your purchase securely. Any questions along the way?';
        }
        return '👋 Thanks for your interest! I\'m your AI sales assistant. How can I help you find the perfect solution for your needs?';
    }
};
exports.WhatsappAutomationService = WhatsappAutomationService;
exports.WhatsappAutomationService = WhatsappAutomationService = WhatsappAutomationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WhatsappAutomationService);
//# sourceMappingURL=whatsapp-automation.service.js.map