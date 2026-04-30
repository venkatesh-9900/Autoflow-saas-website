import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IntegrationType } from '@prisma/client';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getIntegrations(@Req() req: any) {
    return this.integrationsService.getEnabledIntegrations(req.user.orgId);
  }

  @Post(':service/connect')
  @UseGuards(JwtAuthGuard)
  async connectService(
    @Param('service') service: IntegrationType,
    @Body() config: any,
    @Req() req: any,
  ) {
    return this.integrationsService.connectService(
      req.user.orgId,
      service,
      config,
    );
  }

  @Delete(':service/disconnect')
  @UseGuards(JwtAuthGuard)
  async disconnectService(
    @Param('service') service: IntegrationType,
    @Req() req: any,
  ) {
    return this.integrationsService.disconnectService(req.user.orgId, service);
  }

  @Post(':service/webhook')
  async handleWebhook(@Param('service') service: string, @Body() payload: any) {
    return this.integrationsService.handleWebhook(service, payload);
  }
}
