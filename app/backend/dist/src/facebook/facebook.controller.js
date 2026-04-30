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
exports.FacebookController = void 0;
const common_1 = require("@nestjs/common");
const facebook_service_1 = require("./facebook.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FacebookController = class FacebookController {
    facebookService;
    constructor(facebookService) {
        this.facebookService = facebookService;
    }
    async createPost(req, body) {
        return this.facebookService.createPost(req.user.organizationId, body);
    }
    async moderateComment(req, body) {
        return this.facebookService.moderateComment(req.user.organizationId, body);
    }
    async messengerReply(req, body) {
        return this.facebookService.sendMessengerReply(req.user.organizationId, body);
    }
    async getLeadWorkflow(req) {
        return this.facebookService.generateLeadWorkflow(req.user.organizationId);
    }
    async getInsights(req) {
        return this.facebookService.getPageInsights(req.user.organizationId);
    }
    async handleWebhook(payload) {
        return this.facebookService.handleWebhook(payload);
    }
};
exports.FacebookController = FacebookController;
__decorate([
    (0, common_1.Post)('post'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)('moderate-comment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "moderateComment", null);
__decorate([
    (0, common_1.Post)('messenger-reply'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "messengerReply", null);
__decorate([
    (0, common_1.Get)('lead-workflow'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "getLeadWorkflow", null);
__decorate([
    (0, common_1.Get)('insights'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "getInsights", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "handleWebhook", null);
exports.FacebookController = FacebookController = __decorate([
    (0, common_1.Controller)('facebook'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [facebook_service_1.FacebookService])
], FacebookController);
//# sourceMappingURL=facebook.controller.js.map