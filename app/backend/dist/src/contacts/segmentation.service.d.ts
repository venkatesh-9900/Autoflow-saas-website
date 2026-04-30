import { PrismaService } from '../prisma/prisma.service';
export declare class SegmentationService {
    private prisma;
    constructor(prisma: PrismaService);
    createSegment(organizationId: string, data: {
        name: string;
        description?: string;
        filters: any;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        description: string | null;
        filters: import("@prisma/client/runtime/client").JsonValue;
    }>;
    getContactsBySegment(organizationId: string, segmentId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        organizationId: string;
        phone: string | null;
        tags: string[];
        pipelineStage: string;
        notes: string | null;
    }[]>;
    getAllSegments(organizationId: string): Promise<({
        _count: {
            contacts: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        description: string | null;
        filters: import("@prisma/client/runtime/client").JsonValue;
    })[]>;
}
