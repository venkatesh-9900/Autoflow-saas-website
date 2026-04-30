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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAgentsController = void 0;
const common_1 = require("@nestjs/common");
const ai_agents_service_1 = require("./ai-agents.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
let AIAgentsController = class AIAgentsController {
    aiAgentsService;
    constructor(aiAgentsService) {
        this.aiAgentsService = aiAgentsService;
    }
    async getAllAgents(req) {
        return this.aiAgentsService.getAgentsByOrg(req.user.organizationId);
    }
    async getAgent(req, platform) {
        return this.aiAgentsService.getAgentByPlatform(req.user.organizationId, platform);
    }
    async createAgent(req, body) {
        return this.aiAgentsService.createOrUpdateAgent(req.user.organizationId, body);
    }
    async activateAgent(req, platform) {
        return this.aiAgentsService.activateAgent(req.user.organizationId, platform);
    }
    async pauseAgent(req, platform) {
        return this.aiAgentsService.pauseAgent(req.user.organizationId, platform);
    }
    async analyzeAccount(req, platform) {
        return this.aiAgentsService.analyzeAccount(req.user.organizationId, platform);
    }
    async detectIntent(body) {
        return this.aiAgentsService.detectIntent(body.message, body.platform);
    }
    async generateReply(body) {
        return {
            reply: await this.aiAgentsService.generateReply(body.intent, body.platform, body.context),
        };
    }
};
exports.AIAgentsController = AIAgentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "getAllAgents", null);
__decorate([
    (0, common_1.Get)(':platform'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "getAgent", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "createAgent", null);
__decorate([
    (0, common_1.Patch)(':platform/activate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "activateAgent", null);
__decorate([
    (0, common_1.Patch)(':platform/pause'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "pauseAgent", null);
__decorate([
    (0, common_1.Post)(':platform/analyze'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "analyzeAccount", null);
__decorate([
    (0, common_1.Post)('detect-intent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "detectIntent", null);
__decorate([
    (0, common_1.Post)('generate-reply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIAgentsController.prototype, "generateReply", null);
exports.AIAgentsController = AIAgentsController = __decorate([
    (0, common_1.Controller)('ai-agents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ai_agents_service_1.AIAgentsService])
], AIAgentsController);
//# sourceMappingURL=ai-agents.controller.js.map