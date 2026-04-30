import { ContactsService } from './contacts.service';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(req: any, body: any): Promise<{
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
    importContacts(req: any, file: Express.Multer.File): Promise<{
        status: string;
        importedCount: number;
    }>;
    findAll(req: any): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, body: any): Promise<{
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
    remove(req: any, id: string): Promise<{
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
