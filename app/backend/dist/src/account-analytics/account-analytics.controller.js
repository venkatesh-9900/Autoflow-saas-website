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
exports.AccountAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const account_analytics_service_1 = require("./account-analytics.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
let AccountAnalyticsController = class AccountAnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getAll(req) {
        return this.analyticsService.getAnalytics(req.user.organizationId);
    }
    async getDashboard(req) {
        return this.analyticsService.getDashboardSummary(req.user.organizationId);
    }
    async getByPlatform(req, platform) {
        return this.analyticsService.getAnalytics(req.user.organizationId, platform);
    }
    async getLatest(req, platform) {
        return this.analyticsService.getLatestSnapshot(req.user.organizationId, platform);
    }
    async capture(req, platform) {
        return this.analyticsService.captureSnapshot(req.user.organizationId, platform);
    }
};
exports.AccountAnalyticsController = AccountAnalyticsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountAnalyticsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountAnalyticsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)(':platform'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountAnalyticsController.prototype, "getByPlatform", null);
__decorate([
    (0, common_1.Get)(':platform/latest'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountAnalyticsController.prototype, "getLatest", null);
__decorate([
    (0, common_1.Post)(':platform/capture'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountAnalyticsController.prototype, "capture", null);
exports.AccountAnalyticsController = AccountAnalyticsController = __decorate([
    (0, common_1.Controller)('account-analytics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [account_analytics_service_1.AccountAnalyticsService])
], AccountAnalyticsController);
//# sourceMappingURL=account-analytics.controller.js.map