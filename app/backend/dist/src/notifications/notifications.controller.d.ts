import { NotificationsService } from './notifications.service';
import { Observable } from 'rxjs';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    getHistory(req: any): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        message: string;
        type: string;
        title: string;
        read: boolean;
    }[]>;
    streamEvents(req: any): Observable<MessageEvent>;
    testTrigger(req: any, body: {
        title: string;
        message: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        message: string;
        type: string;
        title: string;
        read: boolean;
    }>;
}
