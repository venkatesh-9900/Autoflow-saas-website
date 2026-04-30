"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsAutomationModule = void 0;
const common_1 = require("@nestjs/common");
const sms_automation_service_1 = require("./sms-automation.service");
const sms_automation_controller_1 = require("./sms-automation.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let SmsAutomationModule = class SmsAutomationModule {
};
exports.SmsAutomationModule = SmsAutomationModule;
exports.SmsAutomationModule = SmsAutomationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [sms_automation_service_1.SmsAutomationService],
        controllers: [sms_automation_controller_1.SmsAutomationController],
        exports: [sms_automation_service_1.SmsAutomationService],
    })
], SmsAutomationModule);
//# sourceMappingURL=sms-automation.module.js.map