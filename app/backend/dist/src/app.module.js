"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const contacts_module_1 = require("./contacts/contacts.module");
const campaigns_module_1 = require("./campaigns/campaigns.module");
const messages_module_1 = require("./messages/messages.module");
const ai_module_1 = require("./ai/ai.module");
const webhooks_module_1 = require("./webhooks/webhooks.module");
const analytics_module_1 = require("./analytics/analytics.module");
const automation_module_1 = require("./automation/automation.module");
const templates_module_1 = require("./templates/templates.module");
const instagram_module_1 = require("./instagram/instagram.module");
const community_module_1 = require("./community/community.module");
const chatbot_module_1 = require("./chatbot/chatbot.module");
const audit_logs_module_1 = require("./audit-logs/audit-logs.module");
const queues_module_1 = require("./queues/queues.module");
const integrations_module_1 = require("./integrations/integrations.module");
const inbox_module_1 = require("./inbox/inbox.module");
const notifications_module_1 = require("./notifications/notifications.module");
const media_module_1 = require("./media/media.module");
const schedule_1 = require("@nestjs/schedule");
const billing_module_1 = require("./billing/billing.module");
const automation_templates_module_1 = require("./automation-templates/automation-templates.module");
const connected_accounts_module_1 = require("./connected-accounts/connected-accounts.module");
const twitter_module_1 = require("./twitter/twitter.module");
const facebook_module_1 = require("./facebook/facebook.module");
const whatsapp_automation_module_1 = require("./whatsapp-automation/whatsapp-automation.module");
const email_automation_module_1 = require("./email-automation/email-automation.module");
const sms_automation_module_1 = require("./sms-automation/sms-automation.module");
const ai_agents_module_1 = require("./ai-agents/ai-agents.module");
const automation_rules_module_1 = require("./automation-rules/automation-rules.module");
const platform_subscriptions_module_1 = require("./platform-subscriptions/platform-subscriptions.module");
const account_analytics_module_1 = require("./account-analytics/account-analytics.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            subscriptions_module_1.SubscriptionsModule,
            contacts_module_1.ContactsModule,
            campaigns_module_1.CampaignsModule,
            messages_module_1.MessagesModule,
            ai_module_1.AiModule,
            webhooks_module_1.WebhooksModule,
            analytics_module_1.AnalyticsModule,
            automation_module_1.AutomationModule,
            templates_module_1.TemplatesModule,
            instagram_module_1.InstagramModule,
            community_module_1.CommunityModule,
            chatbot_module_1.ChatbotModule,
            audit_logs_module_1.AuditLogsModule,
            queues_module_1.QueuesModule,
            integrations_module_1.IntegrationsModule,
            inbox_module_1.InboxModule,
            notifications_module_1.NotificationsModule,
            media_module_1.MediaModule,
            billing_module_1.BillingModule,
            automation_templates_module_1.AutomationTemplatesModule,
            connected_accounts_module_1.ConnectedAccountsModule,
            twitter_module_1.TwitterModule,
            facebook_module_1.FacebookModule,
            whatsapp_automation_module_1.WhatsappAutomationModule,
            email_automation_module_1.EmailAutomationModule,
            sms_automation_module_1.SmsAutomationModule,
            ai_agents_module_1.AIAgentsModule,
            automation_rules_module_1.AutomationRulesModule,
            platform_subscriptions_module_1.PlatformSubscriptionsModule,
            account_analytics_module_1.AccountAnalyticsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map