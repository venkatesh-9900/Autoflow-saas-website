import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    generate(body: {
        prompt: string;
        context?: string;
    }): Promise<{
        content: string;
    }>;
    summarize(body: {
        messages: string[];
    }): Promise<{
        summary: string;
    }>;
    generateWorkflow(req: any, body: {
        prompt: string;
    }): Promise<any>;
    generateSocialContent(body: {
        prompt: string;
        context?: string;
    }): Promise<any>;
}
