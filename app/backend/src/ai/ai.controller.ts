import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generate(@Body() body: { prompt: string; context?: string }) {
    const content = await this.aiService.generateContent(
      body.prompt,
      body.context,
    );
    return { content };
  }

  @Post('summarize')
  async summarize(@Body() body: { messages: string[] }) {
    const summary = await this.aiService.summarizeInteraction(body.messages);
    return { summary };
  }

  @Post('campaign/workflow')
  async generateWorkflow(
    @Request() req: any,
    @Body() body: { prompt: string },
  ) {
    // We could pass req.user.organizationId to customize generated content via existing templates
    return this.aiService.generateCampaignWorkflow(body.prompt);
  }

  @Post('social-content')
  async generateSocialContent(
    @Body() body: { prompt: string; context?: string },
  ) {
    return this.aiService.generateSocialContent(body.prompt, body.context);
  }
}
