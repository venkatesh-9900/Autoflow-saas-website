import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AutomationTemplatesService } from './automation-templates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('automation-templates')
@UseGuards(JwtAuthGuard)
export class AutomationTemplatesController {
  constructor(private readonly templatesService: AutomationTemplatesService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.templatesService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Post(':id/import')
  async importTemplate(@Param('id') id: string, @Request() req: any) {
    // Assuming req.user contains the organizationId from the JWT payload
    const organizationId = req.user.organizationId;
    return this.templatesService.importTemplate(id, organizationId);
  }
}
