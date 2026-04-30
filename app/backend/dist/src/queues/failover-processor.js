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
var FailoverProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailoverProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FailoverProcessor = FailoverProcessor_1 = class FailoverProcessor extends bullmq_1.WorkerHost {
    prisma;
    logger = new common_1.Logger(FailoverProcessor_1.name);
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async process(job) {
        const { messageId, fallbackChannel, recipient } = job.data;
        this.logger.log(`[FAILOVER] Processing fallback message ${messageId} via ${fallbackChannel} to ${recipient}`);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            await this.prisma.message.update({
                where: { id: messageId },
                data: {
                    status: 'DELIVERED',
                    channel: fallbackChannel,
                    internalNote: 'Sent via failover',
                },
            });
            this.logger.log(`[FAILOVER] Message ${messageId} successfully delivered via fallback.`);
            return { status: 'SENT_FAILOVER' };
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            this.logger.error(`[FAILOVER] Complete failure for message ${messageId}: ${msg}`);
            throw error;
        }
    }
};
exports.FailoverProcessor = FailoverProcessor;
exports.FailoverProcessor = FailoverProcessor = FailoverProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)('failover-queue'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FailoverProcessor);
//# sourceMappingURL=failover-processor.js.map