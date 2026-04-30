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
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageChannel } from '@prisma/client';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(
    @Req() req: any,
    @Body() body: { name: string; type: MessageChannel; workflow?: any },
  ) {
    return this.campaignsService.create(req.user.orgId, body);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.campaignsService.findAll(req.user.orgId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.campaignsService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.campaignsService.update(id, req.user.orgId, body);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.campaignsService.remove(id, req.user.orgId);
  }

  @Post(':id/trigger')
  trigger(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { contactId: string },
  ) {
    return this.campaignsService.trigger(id, req.user.orgId, body.contactId);
  }
}
