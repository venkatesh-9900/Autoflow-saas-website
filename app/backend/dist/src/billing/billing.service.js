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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let BillingService = class BillingService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async getBillingStatus(organizationId) {
        const subscriptions = await this.prisma.serviceSubscription.findMany({
            where: { organizationId, status: 'ACTIVE' },
        });
        const trials = await this.prisma.trialSubscription.findMany({
            where: { organizationId, isConverted: false },
        });
        return {
            subscriptions,
            trials,
            isPro: subscriptions.some((sub) => sub.planId === 'pro_bundle'),
        };
    }
    async startTrial(organizationId, serviceName) {
        const { isPro } = await this.getBillingStatus(organizationId);
        if (isPro) {
            throw new common_1.BadRequestException('Pro users do not need individual trials.');
        }
        if (serviceName === 'pro_bundle') {
            throw new common_1.BadRequestException('Free trial does not apply to the Pro bundle.');
        }
        const existingTrial = await this.prisma.trialSubscription.findUnique({
            where: { organizationId_serviceName: { organizationId, serviceName } },
        });
        if (existingTrial) {
            throw new common_1.BadRequestException(`Trial already used for ${serviceName}.`);
        }
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const trial = await this.prisma.trialSubscription.create({
            data: {
                organizationId,
                serviceName,
                expiresAt,
            },
        });
        await this.notificationsService.triggerAlert(organizationId, 'Trial Started', `Your 7-day free trial for ${serviceName} has started!`, 'SUCCESS');
        return trial;
    }
    async subscribe(organizationId, planId) {
        const currentPeriodEnd = new Date();
        currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
        if (planId === 'pro_bundle') {
            await this.prisma.serviceSubscription.deleteMany({
                where: { organizationId, planId: { not: 'pro_bundle' } },
            });
        }
        const subscription = await this.prisma.serviceSubscription.upsert({
            where: { organizationId_planId: { organizationId, planId } },
            create: {
                organizationId,
                planId,
                status: 'ACTIVE',
                currentPeriodEnd,
            },
            update: {
                status: 'ACTIVE',
                currentPeriodEnd,
            },
        });
        await this.prisma.trialSubscription.updateMany({
            where: { organizationId, serviceName: planId },
            data: { isConverted: true },
        });
        return subscription;
    }
    async cancelSubscription(organizationId, planId) {
        return this.prisma.serviceSubscription.update({
            where: { organizationId_planId: { organizationId, planId } },
            data: { status: 'CANCELED' },
        });
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], BillingService);
//# sourceMappingURL=billing.service.js.map