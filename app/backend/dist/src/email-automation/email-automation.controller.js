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
exports.EmailAutomationController = void 0;
const common_1 = require("@nestjs/common");
const email_automation_service_1 = require("./email-automation.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let EmailAutomationController = class EmailAutomationController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async autoReply(req, body) {
        return this.emailService.sendAutoReply(req.user.organizationId, body);
    }
    async scheduleCampaign(req, body) {
        return this.emailService.scheduleCampaignEmail(req.user.organizationId, body);
    }
    async getAnalytics(req) {
        return this.emailService.getEmailAnalytics(req.user.organizationId);
    }
    async handleWebhook(payload) {
        return this.emailService.handleWebhook(payload);
    }
};
exports.EmailAutomationController = EmailAutomationController;
__decorate([
    (0, common_1.Post)('auto-reply'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailAutomationController.prototype, "autoReply", null);
__decorate([
    (0, common_1.Post)('schedule-campaign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailAutomationController.prototype, "scheduleCampaign", null);
__decorate([
    (0, common_1.Get)('analytics'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailAutomationController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailAutomationController.prototype, "handleWebhook", null);
exports.EmailAutomationController = EmailAutomationController = __decorate([
    (0, common_1.Controller)('email-automation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [email_automation_service_1.EmailAutomationService])
], EmailAutomationController);
//# sourceMappingURL=email-automation.controller.js.map