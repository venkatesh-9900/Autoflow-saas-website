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
exports.PlatformSubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_subscriptions_service_1 = require("./platform-subscriptions.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
let PlatformSubscriptionsController = class PlatformSubscriptionsController {
    subscriptionsService;
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    async getAll(req) {
        return this.subscriptionsService.getSubscriptions(req.user.organizationId);
    }
    async getOne(req, serviceType) {
        return this.subscriptionsService.getSubscription(req.user.organizationId, serviceType);
    }
    async subscribe(req, body) {
        return this.subscriptionsService.subscribe(req.user.organizationId, body.serviceType, body.tier);
    }
    async unsubscribe(req, body) {
        return this.subscriptionsService.unsubscribe(req.user.organizationId, body.serviceType);
    }
    async initializeAll(req) {
        return this.subscriptionsService.initializeAllSubscriptions(req.user.organizationId);
    }
};
exports.PlatformSubscriptionsController = PlatformSubscriptionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlatformSubscriptionsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':serviceType'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('serviceType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlatformSubscriptionsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('subscribe'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlatformSubscriptionsController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Post)('unsubscribe'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlatformSubscriptionsController.prototype, "unsubscribe", null);
__decorate([
    (0, common_1.Post)('initialize'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlatformSubscriptionsController.prototype, "initializeAll", null);
exports.PlatformSubscriptionsController = PlatformSubscriptionsController = __decorate([
    (0, common_1.Controller)('platform-subscriptions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [platform_subscriptions_service_1.PlatformSubscriptionsService])
], PlatformSubscriptionsController);
//# sourceMappingURL=platform-subscriptions.controller.js.map