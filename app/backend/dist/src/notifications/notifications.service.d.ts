import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    private events$;
    constructor(prisma: PrismaService);
    getHistory(organizationId: string): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        message: string;
        type: string;
        title: string;
        read: boolean;
    }[]>;
    triggerAlert(organizationId: string, title: string, message: string, type?: string): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        message: string;
        type: string;
        title: string;
        read: boolean;
    }>;
    getEventsStream(organizationId: string): Observable<any>;
}
