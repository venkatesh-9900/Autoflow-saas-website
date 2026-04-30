export declare class AiService {
    private readonly logger;
    generateContent(prompt: string, context?: string): Promise<string>;
    summarizeInteraction(messages: string[]): Promise<string>;
    generateCampaignWorkflow(prompt: string): Promise<any>;
    generateSocialContent(prompt: string, context?: string): Promise<any>;
}
