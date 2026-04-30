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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let MediaService = class MediaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadMedia(organizationId, file, folder) {
        const url = `https://mock-storage.autoflow.ai/assets/${file.filename || file.originalname}`;
        const type = file.mimetype.startsWith('video')
            ? client_1.MediaType.VIDEO
            : client_1.MediaType.IMAGE;
        return this.prisma.mediaAsset.create({
            data: {
                organizationId,
                type,
                url,
                name: file.originalname,
                size: file.size,
                folder,
            },
        });
    }
    async getMedia(organizationId, folder) {
        return this.prisma.mediaAsset.findMany({
            where: {
                organizationId,
                ...(folder ? { folder } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async deleteMedia(id, organizationId) {
        return this.prisma.mediaAsset
            .delete({
            where: {
                id,
                organizationId,
            },
        })
            .catch(() => null);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaService);
//# sourceMappingURL=media.service.js.map