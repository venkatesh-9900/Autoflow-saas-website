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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.contactsService.create(req.user.orgId, body);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  importContacts(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    return this.contactsService.importContacts(req.user.orgId, file.buffer);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.contactsService.findAll(req.user.orgId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.contactsService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.contactsService.update(id, req.user.orgId, body);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.contactsService.remove(id, req.user.orgId);
  }
}
