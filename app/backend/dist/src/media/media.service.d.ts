import { PrismaService } from '../prisma/prisma.service';
export declare class MediaService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadMedia(organizationId: string, file: Express.Multer.File, folder?: string): Promise<{
        url: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        type: import("@prisma/client").$Enums.MediaType;
        size: number;
        folder: string | null;
    }>;
    getMedia(organizationId: string, folder?: string): Promise<{
        url: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        type: import("@prisma/client").$Enums.MediaType;
        size: number;
        folder: string | null;
    }[]>;
    deleteMedia(id: string, organizationId: string): Promise<{
        url: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        type: import("@prisma/client").$Enums.MediaType;
        size: number;
        folder: string | null;
    } | null>;
}
