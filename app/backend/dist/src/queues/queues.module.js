"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuesModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
const message_processor_1 = require("./message-processor");
const failover_processor_1 = require("./failover-processor");
const scheduler_processor_1 = require("./scheduler-processor");
const publishing_processor_1 = require("./publishing-processor");
const prisma_module_1 = require("../prisma/prisma.module");
const notifications_module_1 = require("../notifications/notifications.module");
let QueuesModule = class QueuesModule {
};
exports.QueuesModule = QueuesModule;
exports.QueuesModule = QueuesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            notifications_module_1.NotificationsModule,
            bullmq_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    connection: {
                        host: config.get('REDIS_HOST', 'localhost'),
                        port: config.get('REDIS_PORT', 6379),
                    },
                }),
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'message-sending',
                defaultJobOptions: {
                    attempts: 3,
                    backoff: { type: 'exponential', delay: 1000 },
                    removeOnComplete: true,
                },
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'failover-queue',
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'campaign-scheduler',
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'publishing-queue',
                defaultJobOptions: {
                    attempts: 5,
                    backoff: { type: 'exponential', delay: 2000 },
                    removeOnComplete: true,
                },
            }),
        ],
        providers: [
            message_processor_1.MessageProcessor,
            failover_processor_1.FailoverProcessor,
            scheduler_processor_1.SchedulerProcessor,
            publishing_processor_1.PublishingProcessor,
        ],
        exports: [bullmq_1.BullModule],
    })
], QueuesModule);
//# sourceMappingURL=queues.module.js.map