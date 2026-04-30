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
exports.AutomationRulesController = void 0;
const common_1 = require("@nestjs/common");
const automation_rules_service_1 = require("./automation-rules.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
let AutomationRulesController = class AutomationRulesController {
    rulesService;
    constructor(rulesService) {
        this.rulesService = rulesService;
    }
    async getAllRules(req) {
        return this.rulesService.getRulesByOrg(req.user.organizationId);
    }
    async getRulesByPlatform(req, platform) {
        return this.rulesService.getRulesByPlatform(req.user.organizationId, platform);
    }
    async toggleRule(req, body) {
        return this.rulesService.toggleRule(req.user.organizationId, body.platform, body.ruleType, body.enabled);
    }
    async updateConfig(req, body) {
        return this.rulesService.updateRuleConfig(req.user.organizationId, body.platform, body.ruleType, body.config);
    }
    async getEnabledCount(req) {
        const count = await this.rulesService.getEnabledRulesCount(req.user.organizationId);
        return { count };
    }
    async initializeRules(req, platform) {
        return this.rulesService.initializeDefaultRules(req.user.organizationId, platform);
    }
};
exports.AutomationRulesController = AutomationRulesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AutomationRulesController.prototype, "getAllRules", null);
__decorate([
    (0, common_1.Get)('platform/:platform'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AutomationRulesController.prototype, "getRulesByPlatform", null);
__decorate([
    (0, common_1.Post)('toggle'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomationRulesController.prototype, "toggleRule", null);
__decorate([
    (0, common_1.Patch)('config'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomationRulesController.prototype, "updateConfig", null);
__decorate([
    (0, common_1.Get)('enabled-count'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AutomationRulesController.prototype, "getEnabledCount", null);
__decorate([
    (0, common_1.Post)('initialize/:platform'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AutomationRulesController.prototype, "initializeRules", null);
exports.AutomationRulesController = AutomationRulesController = __decorate([
    (0, common_1.Controller)('automation-rules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [automation_rules_service_1.AutomationRulesService])
], AutomationRulesController);
//# sourceMappingURL=automation-rules.controller.js.map