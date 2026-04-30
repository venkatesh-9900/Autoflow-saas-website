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
exports.InstagramController = void 0;
const common_1 = require("@nestjs/common");
const instagram_service_1 = require("./instagram.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let InstagramController = class InstagramController {
    instagramService;
    constructor(instagramService) {
        this.instagramService = instagramService;
    }
    handleWebhook(payload) {
        return this.instagramService.handleWebhook(payload);
    }
    sendDM(req, body) {
        return this.instagramService.sendDirectMessage(body.recipientId, body.content, req.user.orgId);
    }
    createPost(req, body) {
        return this.instagramService.createPost(req.user.orgId || req.user.organizationId, body);
    }
    createBulkPosts(req, body) {
        return this.instagramService.createBulkPosts(req.user.orgId || req.user.organizationId, body);
    }
    getPosts(req) {
        return this.instagramService.getPosts(req.user.orgId || req.user.organizationId);
    }
    syncMetrics(id) {
        return this.instagramService.syncPostMetrics(id);
    }
};
exports.InstagramController = InstagramController;
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstagramController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InstagramController.prototype, "sendDM", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('posts'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InstagramController.prototype, "createPost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('posts/bulk'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InstagramController.prototype, "createBulkPosts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('posts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstagramController.prototype, "getPosts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('posts/:id/sync-metrics'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstagramController.prototype, "syncMetrics", null);
exports.InstagramController = InstagramController = __decorate([
    (0, common_1.Controller)('instagram'),
    __metadata("design:paramtypes", [instagram_service_1.InstagramService])
], InstagramController);
//# sourceMappingURL=instagram.controller.js.map