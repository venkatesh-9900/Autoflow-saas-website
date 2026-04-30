import { PrismaService } from '../prisma/prisma.service';
export declare class ContactsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    importContacts(orgId: string, fileBuffer: Buffer): Promise<{
        status: string;
        importedCount: number;
    }>;
    create(organizationId: string, data: {
        name: string;
        email?: string;
        phone?: string;
        tags?: string[];
        pipelineStage?: string;
        notes?: string;
    }): Promise<{
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
    }>;
    findAll(organizationId: string): Promise<{
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
    findOne(id: string, organizationId: string): Promise<{
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
    }>;
    update(id: string, organizationId: string, data: any): Promise<{
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
    }>;
    remove(id: string, organizationId: string): Promise<{
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
    }>;
}
