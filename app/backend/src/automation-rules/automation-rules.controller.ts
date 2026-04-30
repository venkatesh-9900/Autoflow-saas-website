import {
  Controller, Get, Post, Patch, Body, Param, Query, Req, UseGuards,
} from '@nestjs/common';
import { AutomationRulesService } from './automation-rules.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServiceType, AutomationRuleType } from '@prisma/client';

@Controller('automation-rules')
@UseGuards(JwtAuthGuard)
export class AutomationRulesController {
  constructor(private readonly rulesService: AutomationRulesService) {}

  @Get()
  async getAllRules(@Req() req: any) {
    return this.rulesService.getRulesByOrg(req.user.organizationId);
  }

  @Get('platform/:platform')
  async getRulesByPlatform(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.rulesService.getRulesByPlatform(
      req.user.organizationId,
      platform,
    );
  }

  @Post('toggle')
  async toggleRule(
    @Req() req: any,
    @Body()
    body: {
      platform: ServiceType;
      ruleType: AutomationRuleType;
      enabled: boolean;
    },
  ) {
    return this.rulesService.toggleRule(
      req.user.organizationId,
      body.platform,
      body.ruleType,
      body.enabled,
    );
  }

  @Patch('config')
  async updateConfig(
    @Req() req: any,
    @Body()
    body: {
      platform: ServiceType;
      ruleType: AutomationRuleType;
      config: any;
    },
  ) {
    return this.rulesService.updateRuleConfig(
      req.user.organizationId,
      body.platform,
      body.ruleType,
      body.config,
    );
  }

  @Get('enabled-count')
  async getEnabledCount(@Req() req: any) {
    const count = await this.rulesService.getEnabledRulesCount(
      req.user.organizationId,
    );
    return { count };
  }

  @Post('initialize/:platform')
  async initializeRules(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.rulesService.initializeDefaultRules(
      req.user.organizationId,
      platform,
    );
  }
}
