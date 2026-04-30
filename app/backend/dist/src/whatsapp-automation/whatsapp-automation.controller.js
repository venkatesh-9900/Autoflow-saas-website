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
exports.WhatsappAutomationController = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_automation_service_1 = require("./whatsapp-automation.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let WhatsappAutomationController = class WhatsappAutomationController {
    whatsappService;
    constructor(whatsappService) {
        this.whatsappService = whatsappService;
    }
    async chatbotReply(req, body) {
        return this.whatsappService.sendChatbotReply(req.user.organizationId, body);
    }
    async bookAppointment(req, body) {
        return this.whatsappService.bookAppointment(req.user.organizationId, body);
    }
    async customerSupport(req, body) {
        return this.whatsappService.handleCustomerSupport(req.user.organizationId, body);
    }
    async salesAssistant(req, body) {
        return this.whatsappService.processSalesAssistant(req.user.organizationId, body);
    }
    async handleWebhook(payload) {
        return this.whatsappService.handleWebhook(payload);
    }
};
exports.WhatsappAutomationController = WhatsappAutomationController;
__decorate([
    (0, common_1.Post)('chatbot-reply'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappAutomationController.prototype, "chatbotReply", null);
__decorate([
    (0, common_1.Post)('book-appointment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappAutomationController.prototype, "bookAppointment", null);
__decorate([
    (0, common_1.Post)('support'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappAutomationController.prototype, "customerSupport", null);
__decorate([
    (0, common_1.Post)('sales'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappAutomationController.prototype, "salesAssistant", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappAutomationController.prototype, "handleWebhook", null);
exports.WhatsappAutomationController = WhatsappAutomationController = __decorate([
    (0, common_1.Controller)('whatsapp-automation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [whatsapp_automation_service_1.WhatsappAutomationService])
], WhatsappAutomationController);
//# sourceMappingURL=whatsapp-automation.controller.js.map