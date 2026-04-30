import { AIAgentsService } from './ai-agents.service';
import { ServiceType } from '@prisma/client';
export declare class AIAgentsController {
    private readonly aiAgentsService;
    constructor(aiAgentsService: AIAgentsService);
    getAllAgents(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }[]>;
    getAgent(req: any, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    } | null>;
    createAgent(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    activateAgent(req: any, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    pauseAgent(req: any, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    analyzeAccount(req: any, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    detectIntent(body: {
        message: string;
        platform: ServiceType;
    }): Promise<any>;
    generateReply(body: {
        intent: string;
        platform: ServiceType;
        context?: any;
    }): Promise<{
        reply: string;
    }>;
}
