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
var PlatformSubscriptionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformSubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PlatformSubscriptionsService = PlatformSubscriptionsService_1 = class PlatformSubscriptionsService {
    prisma;
    logger = new common_1.Logger(PlatformSubscriptionsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSubscriptions(organizationId) {
        return this.prisma.platformSubscription.findMany({
            where: { organizationId },
            orderBy: { serviceType: 'asc' },
        });
    }
    async getSubscription(organizationId, serviceType) {
        return this.prisma.platformSubscription.findUnique({
            where: {
                organizationId_serviceType: { organizationId, serviceType },
            },
        });
    }
    async subscribe(organizationId, serviceType, tier = client_1.PlanTier.FREE) {
        this.logger.log(`Subscribing org ${organizationId} to ${serviceType} (${tier})`);
        const pricing = this.getPricing(serviceType, tier);
        return this.prisma.platformSubscription.upsert({
            where: {
                organizationId_serviceType: { organizationId, serviceType },
            },
            create: {
                organizationId,
                serviceType,
                active: true,
                tier,
                priceMonthly: pricing,
                features: this.getFeaturesByTier(serviceType, tier),
                billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
            update: {
                active: true,
                tier,
                priceMonthly: pricing,
                features: this.getFeaturesByTier(serviceType, tier),
                billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });
    }
    async unsubscribe(organizationId, serviceType) {
        this.logger.log(`Unsubscribing org ${organizationId} from ${serviceType}`);
        return this.prisma.platformSubscription.update({
            where: {
                organizationId_serviceType: { organizationId, serviceType },
            },
            data: { active: false },
        });
    }
    async initializeAllSubscriptions(organizationId) {
        const services = [
            'INSTAGRAM', 'TWITTER', 'FACEBOOK', 'WHATSAPP', 'EMAIL', 'SMS', 'AI_CHATBOT',
        ];
        const subs = [];
        for (const serviceType of services) {
            const sub = await this.prisma.platformSubscription.upsert({
                where: {
                    organizationId_serviceType: { organizationId, serviceType },
                },
                create: {
                    organizationId,
                    serviceType,
                    active: false,
                    tier: client_1.PlanTier.FREE,
                    priceMonthly: 0,
                },
                update: {},
            });
            subs.push(sub);
        }
        return subs;
    }
    getPricing(serviceType, tier) {
        const pricing = {
            INSTAGRAM: { FREE: 0, STARTER: 29, PRO: 79, ENTERPRISE: 199 },
            TWITTER: { FREE: 0, STARTER: 19, PRO: 49, ENTERPRISE: 129 },
            FACEBOOK: { FREE: 0, STARTER: 29, PRO: 79, ENTERPRISE: 199 },
            WHATSAPP: { FREE: 0, STARTER: 39, PRO: 99, ENTERPRISE: 249 },
            EMAIL: { FREE: 0, STARTER: 19, PRO: 49, ENTERPRISE: 129 },
            SMS: { FREE: 0, STARTER: 29, PRO: 79, ENTERPRISE: 199 },
            AI_CHATBOT: { FREE: 0, STARTER: 49, PRO: 129, ENTERPRISE: 299 },
        };
        return pricing[serviceType]?.[tier] || 0;
    }
    getFeaturesByTier(serviceType, tier) {
        const features = {
            FREE: {
                automationRules: 2,
                aiResponses: 50,
                analytics: 'basic',
                support: 'community',
            },
            STARTER: {
                automationRules: 10,
                aiResponses: 500,
                analytics: 'standard',
                support: 'email',
                customResponses: true,
            },
            PRO: {
                automationRules: 50,
                aiResponses: 5000,
                analytics: 'advanced',
                support: 'priority',
                customResponses: true,
                webhooks: true,
                teamAccess: true,
            },
            ENTERPRISE: {
                automationRules: -1,
                aiResponses: -1,
                analytics: 'enterprise',
                support: 'dedicated',
                customResponses: true,
                webhooks: true,
                teamAccess: true,
                whiteLabel: true,
                sla: '99.9%',
            },
        };
        return { serviceType, ...features[tier] };
    }
};
exports.PlatformSubscriptionsService = PlatformSubscriptionsService;
exports.PlatformSubscriptionsService = PlatformSubscriptionsService = PlatformSubscriptionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlatformSubscriptionsService);
//# sourceMappingURL=platform-subscriptions.service.js.map