import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ContactsModule } from './contacts/contacts.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { MessagesModule } from './messages/messages.module';
import { AiModule } from './ai/ai.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AutomationModule } from './automation/automation.module';
import { TemplatesModule } from './templates/templates.module';
import { InstagramModule } from './instagram/instagram.module';
import { CommunityModule } from './community/community.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { QueuesModule } from './queues/queues.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { InboxModule } from './inbox/inbox.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MediaModule } from './media/media.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BillingModule } from './billing/billing.module';
import { AutomationTemplatesModule } from './automation-templates/automation-templates.module';
import { ConnectedAccountsModule } from './connected-accounts/connected-accounts.module';
// Unified Social Automation Platform modules
import { TwitterModule } from './twitter/twitter.module';
import { FacebookModule } from './facebook/facebook.module';
import { WhatsappAutomationModule } from './whatsapp-automation/whatsapp-automation.module';
import { EmailAutomationModule } from './email-automation/email-automation.module';
import { SmsAutomationModule } from './sms-automation/sms-automation.module';
import { AIAgentsModule } from './ai-agents/ai-agents.module';
import { AutomationRulesModule } from './automation-rules/automation-rules.module';
import { PlatformSubscriptionsModule } from './platform-subscriptions/platform-subscriptions.module';
import { AccountAnalyticsModule } from './account-analytics/account-analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    SubscriptionsModule,
    ContactsModule,
    CampaignsModule,
    MessagesModule,
    AiModule,
    WebhooksModule,
    AnalyticsModule,
    AutomationModule,
    TemplatesModule,
    InstagramModule,
    CommunityModule,
    ChatbotModule,
    AuditLogsModule,
    QueuesModule,
    IntegrationsModule,
    InboxModule,
    NotificationsModule,
    MediaModule,
    BillingModule,
    AutomationTemplatesModule,
    ConnectedAccountsModule,
    // Unified Social Automation Platform
    TwitterModule,
    FacebookModule,
    WhatsappAutomationModule,
    EmailAutomationModule,
    SmsAutomationModule,
    AIAgentsModule,
    AutomationRulesModule,
    PlatformSubscriptionsModule,
    AccountAnalyticsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
