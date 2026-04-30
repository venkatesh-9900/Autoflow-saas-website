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
exports.SegmentationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SegmentationService = class SegmentationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSegment(organizationId, data) {
        return this.prisma.segment.create({
            data: {
                organizationId,
                name: data.name,
                description: data.description,
                filters: data.filters,
            },
        });
    }
    async getContactsBySegment(organizationId, segmentId) {
        const segment = await this.prisma.segment.findUnique({
            where: { id: segmentId },
        });
        if (!segment || segment.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Segment not found');
        }
        const filters = segment.filters;
        const prismaWhere = { organizationId };
        if (filters.tags && Array.isArray(filters.tags)) {
            prismaWhere.tags = { hasSome: filters.tags };
        }
        if (filters.pipelineStage) {
            prismaWhere.pipelineStage = filters.pipelineStage;
        }
        return this.prisma.contact.findMany({
            where: prismaWhere,
        });
    }
    async getAllSegments(organizationId) {
        return this.prisma.segment.findMany({
            where: { organizationId },
            include: {
                _count: {
                    select: { contacts: true },
                },
            },
        });
    }
};
exports.SegmentationService = SegmentationService;
exports.SegmentationService = SegmentationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SegmentationService);
//# sourceMappingURL=segmentation.service.js.map