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
exports.AutomationTemplatesController = void 0;
const common_1 = require("@nestjs/common");
const automation_templates_service_1 = require("./automation-templates.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AutomationTemplatesController = class AutomationTemplatesController {
    templatesService;
    constructor(templatesService) {
        this.templatesService = templatesService;
    }
    async findAll(category) {
        return this.templatesService.findAll(category);
    }
    async findOne(id) {
        return this.templatesService.findOne(id);
    }
    async importTemplate(id, req) {
        const organizationId = req.user.organizationId;
        return this.templatesService.importTemplate(id, organizationId);
    }
};
exports.AutomationTemplatesController = AutomationTemplatesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AutomationTemplatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AutomationTemplatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/import'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AutomationTemplatesController.prototype, "importTemplate", null);
exports.AutomationTemplatesController = AutomationTemplatesController = __decorate([
    (0, common_1.Controller)('automation-templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [automation_templates_service_1.AutomationTemplatesService])
], AutomationTemplatesController);
//# sourceMappingURL=automation-templates.controller.js.map