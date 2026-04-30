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
var MessageProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MessageProcessor = MessageProcessor_1 = class MessageProcessor extends bullmq_1.WorkerHost {
    prisma;
    failoverQueue;
    logger = new common_1.Logger(MessageProcessor_1.name);
    constructor(prisma, failoverQueue) {
        super();
        this.prisma = prisma;
        this.failoverQueue = failoverQueue;
    }
    async process(job) {
        const { messageId, channel, recipient } = job.data;
        this.logger.log(`Processing message ${messageId} for ${recipient} via ${channel}`);
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() < 0.05)
                        reject(new Error('Provider API Error'));
                    else
                        resolve(true);
                }, 500);
            });
            this.logger.log(`Message ${messageId} sent successfully`);
            await this.prisma.message.update({
                where: { id: messageId },
                data: { status: 'DELIVERED', updatedAt: new Date() },
            });
            return { status: 'SENT', timestamp: new Date().toISOString() };
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            this.logger.error(`Failed to send message ${messageId}: ${msg}`);
            await this.prisma.message.update({
                where: { id: messageId },
                data: { status: 'FAILED' },
            });
            if (job.data.fallbackChannel) {
                this.logger.warn(`Dispatching message ${messageId} to failover queue (${job.data.fallbackChannel})`);
                await this.failoverQueue.add('fallback-send', {
                    ...job.data,
                    channel: job.data.fallbackChannel,
                    isFailover: true,
                }, { attempts: 3, backoff: { type: 'exponential', delay: 2000 } });
            }
            else {
                throw error;
            }
        }
    }
};
exports.MessageProcessor = MessageProcessor;
exports.MessageProcessor = MessageProcessor = MessageProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)('message-sending', {
        concurrency: 5,
        limiter: {
            max: 50,
            duration: 1000,
        },
    }),
    __param(1, (0, bullmq_1.InjectQueue)('failover-queue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue])
], MessageProcessor);
//# sourceMappingURL=message-processor.js.map