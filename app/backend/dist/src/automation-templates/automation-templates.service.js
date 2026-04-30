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
exports.AutomationTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AutomationTemplatesService = class AutomationTemplatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category) {
        return this.prisma.automationTemplate.findMany({
            where: category ? { category } : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const template = await this.prisma.automationTemplate.findUnique({
            where: { id },
        });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template;
    }
    async importTemplate(id, organizationId) {
        const template = await this.findOne(id);
        return this.prisma.campaign.create({
            data: {
                organizationId,
                name: `Copy of ${template.name}`,
                type: client_1.MessageChannel.EMAIL,
                status: 'DRAFT',
                workflow: template.workflow || {},
            },
        });
    }
};
exports.AutomationTemplatesService = AutomationTemplatesService;
exports.AutomationTemplatesService = AutomationTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AutomationTemplatesService);
//# sourceMappingURL=automation-templates.service.js.map