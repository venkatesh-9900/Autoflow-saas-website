"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
let AiService = AiService_1 = class AiService {
    logger = new common_1.Logger(AiService_1.name);
    async generateContent(prompt, context) {
        console.log(`Generating content for prompt: ${prompt}`);
        const lowercasePrompt = prompt.toLowerCase();
        let response = `[AI Assistant] Here's a customized message for you:\n\n`;
        if (lowercasePrompt.includes('welcome')) {
            response += `Welcome to AutoFlow AI! We're thrilled to have you on board. Start automating your communications today and see the difference. 🚀`;
        }
        else if (lowercasePrompt.includes('reminder')) {
            response += `This is a friendly reminder from the team. We noticed you haven't checked out your dashboard lately. Let us know if you have any questions!`;
        }
        else if (lowercasePrompt.includes('urgent') ||
            lowercasePrompt.includes('alert')) {
            response += `⚠️ URGENT: Action required on your account. Please log in immediately to review the latest updates.`;
        }
        else {
            response += `Thank you for choosing AutoFlow AI. Based on your prompt "${prompt}", we've generated this tailored response to help you engage better with your audience.`;
        }
        if (context) {
            response += `\n\n(Refined with context: ${context})`;
        }
        return response;
    }
    async summarizeInteraction(messages) {
        return `[Mock Summary] User and AI discussed ${messages.length} messages. Key takeaway: User is interested in automation.`;
    }
    async generateCampaignWorkflow(prompt) {
        this.logger.log(`Generating campaign workflow for: ${prompt}`);
        const isAbandonedCart = prompt.toLowerCase().includes('cart');
        if (isAbandonedCart) {
            return {
                name: 'Abandoned Cart Recovery',
                type: 'WHATSAPP',
                workflow: {
                    trigger: { type: 'EVENT', eventName: 'cart_abandoned' },
                    steps: [
                        { id: 'step_1', action: 'WAIT', duration: '1h' },
                        { id: 'step_2', action: 'SEND_MESSAGE', templateId: 'temp_cart_1' },
                        { id: 'step_3', action: 'WAIT', duration: '24h' },
                        {
                            id: 'step_4',
                            action: 'CONDITION',
                            condition: 'not_purchased',
                            then: [
                                {
                                    id: 'step_5',
                                    action: 'SEND_MESSAGE',
                                    templateId: 'temp_cart_2',
                                },
                            ],
                        },
                    ],
                },
                templates: [
                    {
                        id: 'temp_cart_1',
                        name: 'Cart Reminder 1',
                        content: 'Hi! We noticed you left some items in your cart. Complete your purchase now for 10% off using code REVIVE10.',
                    },
                    {
                        id: 'temp_cart_2',
                        name: 'Cart Reminder 2',
                        content: "Last chance! Your cart items are selling out fast. Tap here to checkout before they're gone.",
                    },
                ],
            };
        }
        return {
            name: 'General Promotional Campaign',
            type: 'EMAIL',
            workflow: {
                trigger: { type: 'MANUAL' },
                steps: [
                    { id: 'step_1', action: 'SEND_MESSAGE', templateId: 'temp_promo_1' },
                ],
            },
            templates: [
                {
                    id: 'temp_promo_1',
                    name: 'Promo Intro',
                    content: 'Hello! We have an exciting new update regarding your prompt: ' +
                        prompt,
                },
            ],
        };
    }
    async generateSocialContent(prompt, context) {
        this.logger.log(`Generating social content for: ${prompt}`);
        const topics = [
            '#Automation',
            '#Growth',
            '#Business',
            '#SaaS',
            '#ContentStrategy',
            '#AI',
        ];
        const randomHashtags = topics
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .join(' ');
        const description = `Discover how to scale your business with ease using this new approach based on: ${prompt}. ${context ? `Context: ${context}.` : ''}`;
        return {
            caption: `Ready to level up your workflow? 🚀\n\n${description}`,
            hashtags: randomHashtags,
            description: `A deep dive into: ${prompt}. Elevate your brand today.`,
        };
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map