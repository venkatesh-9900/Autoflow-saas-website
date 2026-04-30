import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  // Subject for Server-Sent Events (SSE) broadcasting
  private events$ = new Subject<{ orgId: string; payload: any }>();

  constructor(private prisma: PrismaService) {}

  // Method to fetch past notifications
  async getHistory(organizationId: string) {
    return this.prisma.notification.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  // Method triggered by internal system events (queues, system monitors)
  async triggerAlert(
    organizationId: string,
    title: string,
    message: string,
    type: string = 'INFO',
  ) {
    // Persist to DB
    const saved = await this.prisma.notification.create({
      data: { organizationId, title, message, type },
    });

    // Broadcast to connected SS clients
    this.events$.next({ orgId: organizationId, payload: saved });
    return saved;
  }

  // Observable stream used by the controller
  getEventsStream(organizationId: string): Observable<any> {
    return new Observable((observer) => {
      const subscription = this.events$.subscribe(({ orgId, payload }) => {
        if (orgId === organizationId) {
          observer.next({ data: payload });
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
