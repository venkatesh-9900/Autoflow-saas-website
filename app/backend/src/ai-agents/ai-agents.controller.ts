import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AIAgentsService } from './ai-agents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServiceType } from '@prisma/client';

@Controller('ai-agents')
@UseGuards(JwtAuthGuard)
export class AIAgentsController {
  constructor(private readonly aiAgentsService: AIAgentsService) {}

  @Get()
  async getAllAgents(@Req() req: any) {
    return this.aiAgentsService.getAgentsByOrg(req.user.organizationId);
  }

  @Get(':platform')
  async getAgent(@Req() req: any, @Param('platform') platform: ServiceType) {
    return this.aiAgentsService.getAgentByPlatform(
      req.user.organizationId,
      platform,
    );
  }

  @Post()
  async createAgent(@Req() req: any, @Body() body: any) {
    return this.aiAgentsService.createOrUpdateAgent(
      req.user.organizationId,
      body,
    );
  }

  @Patch(':platform/activate')
  async activateAgent(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.aiAgentsService.activateAgent(
      req.user.organizationId,
      platform,
    );
  }

  @Patch(':platform/pause')
  async pauseAgent(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.aiAgentsService.pauseAgent(req.user.organizationId, platform);
  }

  @Post(':platform/analyze')
  async analyzeAccount(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.aiAgentsService.analyzeAccount(
      req.user.organizationId,
      platform,
    );
  }

  @Post('detect-intent')
  async detectIntent(@Body() body: { message: string; platform: ServiceType }) {
    return this.aiAgentsService.detectIntent(body.message, body.platform);
  }

  @Post('generate-reply')
  async generateReply(
    @Body() body: { intent: string; platform: ServiceType; context?: any },
  ) {
    return {
      reply: await this.aiAgentsService.generateReply(
        body.intent,
        body.platform,
        body.context,
      ),
    };
  }
}
