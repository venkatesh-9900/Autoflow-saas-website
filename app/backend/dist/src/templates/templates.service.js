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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TemplatesService = class TemplatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getMarketplaceTemplates() {
        return [
            {
                id: 'm1',
                name: 'Abandoned Cart Recovery',
                desc: 'Boost e-commerce revenue with multi-channel reminders.',
                category: 'E-commerce',
                price: 'Free',
                channel: 'WHATSAPP',
                color: 'from-orange-500 to-red-500',
                icon: 'ShoppingCart',
                stats: '1.2k imports',
            },
            {
                id: 'm2',
                name: 'Webinar Engagement Funnel',
                desc: 'Automated reminders and replay sequences via DM & Email.',
                category: 'Events',
                price: 'Free',
                channel: 'EMAIL',
                color: 'from-blue-500 to-indigo-600',
                icon: 'Calendar',
                stats: '850 imports',
            },
            {
                id: 'm3',
                name: 'Viral Lead Generation',
                desc: 'Automated welcome sequences for high-growth campaigns.',
                category: 'Growth',
                price: 'Free',
                channel: 'INSTAGRAM',
                color: 'from-emerald-500 to-teal-600',
                icon: 'TrendingUp',
                stats: '2.4k imports',
            },
            {
                id: 'm4',
                name: 'Customer Onboarding',
                desc: 'Welcome new users and guide them through setup.',
                category: 'Retention',
                price: 'Free',
                channel: 'EMAIL',
                color: 'from-purple-500 to-pink-500',
                icon: 'Rocket',
                stats: '3.1k imports',
            },
            {
                id: 'm5',
                name: 'Support Auto-Responder',
                desc: 'Instantly reply to customer queries.',
                category: 'Support',
                price: 'Free',
                channel: 'WHATSAPP',
                color: 'from-cyan-500 to-blue-500',
                icon: 'Heart',
                stats: '5.6k imports',
            },
            {
                id: 'm6',
                name: 'Feedback Collection',
                desc: 'Automated survey sequences.',
                category: 'Survey',
                price: 'Free',
                channel: 'EMAIL',
                color: 'from-yellow-400 to-orange-500',
                icon: 'CheckCircle2',
                stats: '920 imports',
            },
            {
                id: 'm7',
                name: 'Product Launch Sequence',
                desc: 'Build hype for new releases.',
                category: 'Campaigns',
                price: 'Pro',
                channel: 'INSTAGRAM',
                color: 'from-pink-500 to-rose-500',
                icon: 'Zap',
                stats: '1.5k imports',
            },
            {
                id: 'm8',
                name: 'VIP Reward System',
                desc: 'Engage top customers with special offers.',
                category: 'Loyalty',
                price: 'Pro',
                channel: 'SMS',
                color: 'from-violet-500 to-purple-600',
                icon: 'Star',
                stats: '430 imports',
            },
        ];
    }
    async cloneTemplate(id, organizationId) {
        const templates = this.getMarketplaceTemplates();
        const source = templates.find((t) => t.id === id);
        if (!source)
            throw new common_1.NotFoundException('Marketplace template not found');
        return this.prisma.template.create({
            data: {
                name: source.name,
                content: `Auto-generated workflow content for: ${source.name}`,
                channel: source.channel,
                organizationId,
            },
        });
    }
    async create(organizationId, data) {
        return this.prisma.template.create({
            data: {
                ...data,
                organizationId,
            },
        });
    }
    async findAll(organizationId) {
        return this.prisma.template.findMany({
            where: { organizationId },
            orderBy: { updatedAt: 'desc' },
        });
    }
    async findOne(id, organizationId) {
        const template = await this.prisma.template.findFirst({
            where: { id, organizationId },
        });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template;
    }
    async update(id, organizationId, data) {
        await this.findOne(id, organizationId);
        return this.prisma.template.update({
            where: { id },
            data,
        });
    }
    async remove(id, organizationId) {
        await this.findOne(id, organizationId);
        return this.prisma.template.delete({
            where: { id },
        });
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map