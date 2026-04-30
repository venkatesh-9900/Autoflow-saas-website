"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedAccountsModule = void 0;
const common_1 = require("@nestjs/common");
const connected_accounts_service_1 = require("./connected-accounts.service");
const connected_accounts_controller_1 = require("./connected-accounts.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let ConnectedAccountsModule = class ConnectedAccountsModule {
};
exports.ConnectedAccountsModule = ConnectedAccountsModule;
exports.ConnectedAccountsModule = ConnectedAccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [connected_accounts_service_1.ConnectedAccountsService],
        controllers: [connected_accounts_controller_1.ConnectedAccountsController],
        exports: [connected_accounts_service_1.ConnectedAccountsService],
    })
], ConnectedAccountsModule);
//# sourceMappingURL=connected-accounts.module.js.map