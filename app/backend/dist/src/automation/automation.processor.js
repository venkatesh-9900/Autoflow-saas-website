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
var AutomationProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const messages_service_1 = require("../messages/messages.service");
const instagram_service_1 = require("../instagram/instagram.service");
let AutomationProcessor = AutomationProcessor_1 = class AutomationProcessor extends bullmq_1.WorkerHost {
    prisma;
    aiService;
    messagesService;
    instagramService;
    campaignQueue;
    publishingQueue;
    logger = new common_1.Logger(AutomationProcessor_1.name);
    constructor(prisma, aiService, messagesService, instagramService, campaignQueue, publishingQueue) {
        super();
        this.prisma = prisma;
        this.aiService = aiService;
        this.messagesService = messagesService;
        this.instagramService = instagramService;
        this.campaignQueue = campaignQueue;
        this.publishingQueue = publishingQueue;
    }
    async process(job) {
        const { campaignId, contactId, nodeIndex = 0 } = job.data;
        this.logger.log(`Processing campaign ${campaignId} for contact ${contactId} at node ${nodeIndex}`);
        const campaign = await this.prisma.campaign.findUnique({
            where: { id: campaignId },
        });
        if (!campaign || !campaign.workflow) {
            this.logger.error(`Campaign ${campaignId} not found or has no workflow`);
            return;
        }
        const workflow = campaign.workflow;
        const currentNode = workflow.steps?.[nodeIndex];
        if (!currentNode) {
            this.logger.log(`Campaign ${campaignId} finished for contact ${contactId}`);
            return;
        }
        switch (currentNode.type) {
            case 'PUBLISH_INSTAGRAM': {
                this.logger.log(`Publishing Instagram post for campaign ${campaignId}`);
                if (!currentNode.integrationId || !currentNode.mediaAssetIds?.length) {
                    this.logger.warn(`Missing integrationId or mediaAssetIds in PUBLISH_INSTAGRAM node for ${campaignId}`);
                    break;
                }
                try {
                    const post = await this.instagramService.createPost(campaign.organizationId, {
                        integrationId: currentNode.integrationId,
                        caption: currentNode.caption || '',
                        mediaAssetIds: currentNode.mediaAssetIds,
                    });
                    await this.publishingQueue.add('publish-instagram-post', {
                        postId: post.id,
                        organizationId: campaign.organizationId,
                    });
                }
                catch (error) {
                    this.logger.error(`Error creating Instagram post in workflow: ${error.message}`);
                }
                break;
            }
            case 'MESSAGE':
            case 'WHATSAPP':
            case 'EMAIL':
            case 'SMS': {
                let content = currentNode.content;
                if (currentNode.useAi) {
                    try {
                        this.logger.log(`Generating AI personalized content for contact ${contactId}`);
                        content = await this.aiService.generateContent(currentNode.prompt || 'Welcome message', `Tone: ${currentNode.tone}, Audience: ${currentNode.audience}`);
                    }
                    catch (err) {
                        this.logger.error(`AI generation failed: ${err.message}`);
                    }
                }
                this.logger.log(`Final message content: ${content}`);
                const contact = await this.prisma.contact.findUnique({
                    where: { id: contactId },
                });
                if (contact && (contact.email || contact.phone)) {
                    await this.messagesService.send({
                        organizationId: campaign.organizationId,
                        channel: campaign.type,
                        to: (campaign.type === 'EMAIL' ? contact.email : contact.phone) || '',
                        content,
                    });
                }
                break;
            }
            case 'WAIT': {
                const delay = currentNode.duration || 1000;
                this.logger.log(`Workflow waiting for ${delay}ms`);
                break;
            }
            default:
                this.logger.warn(`Unknown node type: ${currentNode.type}`);
        }
        if (workflow.steps?.[nodeIndex + 1]) {
            this.logger.log(`Queueing next step (${nodeIndex + 1}) for campaign ${campaignId}`);
            await this.campaignQueue.add('execute-workflow', { campaignId, contactId, nodeIndex: nodeIndex + 1 }, { delay: currentNode.type === 'WAIT' ? currentNode.duration || 0 : 0 });
        }
        return { status: 'completed', node: nodeIndex };
    }
};
exports.AutomationProcessor = AutomationProcessor;
exports.AutomationProcessor = AutomationProcessor = AutomationProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('campaign-queue'),
    (0, common_1.Injectable)(),
    __param(4, (0, bullmq_1.InjectQueue)('campaign-queue')),
    __param(5, (0, bullmq_1.InjectQueue)('publishing-queue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_service_1.AiService,
        messages_service_1.MessagesService,
        instagram_service_1.InstagramService,
        bullmq_2.Queue,
        bullmq_2.Queue])
], AutomationProcessor);
//# sourceMappingURL=automation.processor.js.map