import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageChannel } from '@prisma/client';

@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(
    @Req() req: any,
    @Body() body: { name: string; content: string; channel: MessageChannel },
  ) {
    return this.templatesService.create(req.user.orgId, body);
  }

  @Get('marketplace')
  getMarketplace() {
    return this.templatesService.getMarketplaceTemplates();
  }

  @Post('marketplace/:id/clone')
  cloneFromMarketplace(@Req() req: any, @Param('id') id: string) {
    return this.templatesService.cloneTemplate(id, req.user.orgId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.templatesService.findAll(req.user.orgId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.templatesService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.templatesService.update(id, req.user.orgId, body);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.templatesService.remove(id, req.user.orgId);
  }
}
