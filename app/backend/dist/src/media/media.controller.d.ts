import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadMedia(req: any, file: Express.Multer.File, folder?: string): Promise<{
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
    getMedia(req: any, folder?: string): Promise<{
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
    deleteMedia(req: any, id: string): Promise<{
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
