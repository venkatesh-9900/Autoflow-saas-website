import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType, AIAgentStatus } from '@prisma/client';

@Injectable()
export class AIAgentsService {
  private readonly logger = new Logger(AIAgentsService.name);

  constructor(private prisma: PrismaService) {}

  async getAgentsByOrg(organizationId: string) {
    return this.prisma.aIAgent.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAgentByPlatform(organizationId: string, platform: ServiceType) {
    return this.prisma.aIAgent.findUnique({
      where: {
        organizationId_platform: { organizationId, platform },
      },
    });
  }

  async createOrUpdateAgent(
    organizationId: string,
    data: {
      platform: ServiceType;
      connectedAccountId?: string;
      config?: any;
    },
  ) {
    return this.prisma.aIAgent.upsert({
      where: {
        organizationId_platform: {
          organizationId,
          platform: data.platform,
        },
      },
      create: {
        organizationId,
        platform: data.platform,
        connectedAccountId: data.connectedAccountId,
        config: data.config || this.getDefaultConfig(data.platform),
        status: AIAgentStatus.PAUSED,
      },
      update: {
        connectedAccountId: data.connectedAccountId,
        config: data.config,
      },
    });
  }

  async activateAgent(organizationId: string, platform: ServiceType) {
    const agent = await this.getAgentByPlatform(organizationId, platform);
    if (!agent) throw new NotFoundException('AI Agent not found');

    return this.prisma.aIAgent.update({
      where: { id: agent.id },
      data: { status: AIAgentStatus.ACTIVE },
    });
  }

  async pauseAgent(organizationId: string, platform: ServiceType) {
    const agent = await this.getAgentByPlatform(organizationId, platform);
    if (!agent) throw new NotFoundException('AI Agent not found');

    return this.prisma.aIAgent.update({
      where: { id: agent.id },
      data: { status: AIAgentStatus.PAUSED },
    });
  }

  async analyzeAccount(organizationId: string, platform: ServiceType) {
    this.logger.log(`Analyzing ${platform} account for org ${organizationId}`);

    const agent = await this.getAgentByPlatform(organizationId, platform);
    if (!agent) throw new NotFoundException('AI Agent not found for this platform');

    // Start learning phase
    await this.prisma.aIAgent.update({
      where: { id: agent.id },
      data: { status: AIAgentStatus.LEARNING },
    });

    // Mock account analysis
    const analysisResults = this.generateAnalysis(platform);
    const recommendations = this.generateRecommendations(platform);

    // Save results
    return this.prisma.aIAgent.update({
      where: { id: agent.id },
      data: {
        analysisResults,
        recommendations,
        lastAnalyzedAt: new Date(),
        status: AIAgentStatus.ACTIVE,
      },
    });
  }

  async detectIntent(message: string, platform: ServiceType): Promise<any> {
    const lower = message.toLowerCase();

    // Platform-agnostic intent detection
    const intents: { pattern: string[]; intent: string; confidence: number }[] = [
      { pattern: ['join', 'community', 'group'], intent: 'join_community', confidence: 0.92 },
      { pattern: ['buy', 'purchase', 'order', 'price', 'cost'], intent: 'purchase_intent', confidence: 0.88 },
      { pattern: ['help', 'support', 'issue', 'problem'], intent: 'support_request', confidence: 0.90 },
      { pattern: ['book', 'appointment', 'schedule', 'reserve'], intent: 'booking_request', confidence: 0.91 },
      { pattern: ['demo', 'trial', 'try'], intent: 'demo_request', confidence: 0.87 },
      { pattern: ['cancel', 'refund', 'return'], intent: 'cancellation', confidence: 0.89 },
      { pattern: ['thanks', 'thank you', 'appreciate', 'love'], intent: 'positive_feedback', confidence: 0.95 },
      { pattern: ['follow', 'subscribe'], intent: 'follow_request', confidence: 0.85 },
    ];

    for (const { pattern, intent, confidence } of intents) {
      if (pattern.some((p) => lower.includes(p))) {
        return { intent, confidence, platform, message: message.substring(0, 100) };
      }
    }

    return { intent: 'general_inquiry', confidence: 0.60, platform, message: message.substring(0, 100) };
  }

  async generateReply(
    intent: string,
    platform: ServiceType,
    context?: any,
  ): Promise<string> {
    const replies: Record<string, Record<string, string>> = {
      INSTAGRAM: {
        join_community: '🎉 Welcome! Make sure you follow us first, then we\'ll send you the community link! 🔗',
        purchase_intent: '🛍️ Great choice! Check our link in bio for the latest offers or DM us for a custom quote! 💫',
        support_request: '💬 We\'re here to help! Can you describe your issue in detail? We\'ll get back to you ASAP.',
        positive_feedback: '🙏 Thank you so much! Your support means everything to us! ❤️',
        general_inquiry: '👋 Hey! Thanks for reaching out. How can we help you today? 😊',
      },
      TWITTER: {
        join_community: 'Welcome! Follow us and check our pinned tweet for the community link! 🎉',
        purchase_intent: 'Great interest! Check our website for pricing details or DM us for a custom quote 📊',
        support_request: 'We\'re on it! DM us your details and we\'ll help you right away 💪',
        positive_feedback: 'Thank you! Your support means the world to us! 🌟',
        general_inquiry: 'Hey there! Thanks for reaching out. How can we help? 😊',
      },
      FACEBOOK: {
        join_community: 'Welcome! Click "Join Group" on our community page to get started! 🎉',
        purchase_intent: 'Thanks for your interest! Visit our shop or message us for personalized recommendations 🛒',
        support_request: 'We\'re here to help! Send us a message with your issue and we\'ll respond ASAP 🔧',
        positive_feedback: 'Thank you for the kind words! We truly appreciate your support! ❤️',
        general_inquiry: 'Hi there! Thanks for reaching out. How can we assist you today? 😊',
      },
      WHATSAPP: {
        join_community: '🎉 Welcome! Here\'s your invite link to join our WhatsApp community group.',
        purchase_intent: '🛍️ I can help you with your purchase! What product are you interested in?',
        support_request: '🔧 I\'m here to help. Please describe your issue and I\'ll find a solution.',
        booking_request: '📅 I\'d love to help you book! What date and time works best for you?',
        positive_feedback: '🙏 Thank you! We\'re so glad you had a great experience!',
        general_inquiry: '👋 Hello! How can I assist you today?',
      },
    };

    const platformReplies = replies[platform] || replies.INSTAGRAM;
    return platformReplies[intent] || platformReplies.general_inquiry || 'Thanks for your message! We\'ll get back to you soon.';
  }

  private getDefaultConfig(platform: ServiceType): any {
    return {
      tone: 'professional_friendly',
      language: 'en',
      responseDelay: 0,
      maxDailyResponses: 100,
      autoEscalateAfter: 3,
      greetingMessage: `Welcome! Our AI assistant is here to help you on ${platform}.`,
    };
  }

  private generateAnalysis(platform: ServiceType): any {
    return {
      accountType: 'business',
      category: 'Technology / SaaS',
      bio: 'AI-powered automation platform for modern businesses',
      contentThemes: ['automation', 'productivity', 'tech', 'growth'],
      postingFrequency: '3-5 times per week',
      engagementRate: 4.7,
      followerGrowthRate: 2.3,
      topHashtags: ['#Automation', '#AI', '#SaaS', '#Business', '#Growth'],
      audienceInsights: {
        primaryAge: '25-34',
        topLocations: ['United States', 'United Kingdom', 'India'],
        peakActivityHours: ['9:00 AM', '12:00 PM', '6:00 PM'],
        interests: ['Technology', 'Entrepreneurship', 'Digital Marketing'],
      },
      contentPerformance: {
        bestType: 'carousel',
        avgLikes: 245,
        avgComments: 18,
        avgShares: 32,
      },
      analyzedAt: new Date().toISOString(),
    };
  }

  private generateRecommendations(platform: ServiceType): any {
    return {
      automations: [
        { rule: 'AUTO_DM_REPLY', priority: 'HIGH', reason: 'High volume of unanswered DMs detected' },
        { rule: 'AUTO_COMMENT_REPLY', priority: 'MEDIUM', reason: 'Improve engagement by replying to comments within 1 hour' },
        { rule: 'TRENDING_HASHTAG_GENERATOR', priority: 'HIGH', reason: 'Current hashtags are underperforming by 40%' },
      ],
      contentStrategy: {
        bestPostingTimes: ['9:00 AM EST', '12:30 PM EST', '7:00 PM EST'],
        recommendedPostTypes: ['Carousel posts', 'Short-form video', 'User testimonials'],
        hashtagStrategy: 'Mix 3 trending + 5 niche + 2 branded hashtags per post',
      },
      growthTips: [
        'Increase posting frequency to 5x/week',
        'Engage with similar accounts in your niche',
        'Run a weekly Q&A session in Stories/Fleets',
        'Collaborate with micro-influencers in the tech space',
      ],
      generatedAt: new Date().toISOString(),
    };
  }
}
