import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Body,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    return this.mediaService.uploadMedia(req.user.orgId, file, folder);
  }

  @Get()
  async getMedia(@Req() req: any, @Query('folder') folder?: string) {
    return this.mediaService.getMedia(req.user.orgId, folder);
  }

  @Delete(':id')
  async deleteMedia(@Req() req: any, @Param('id') id: string) {
    return this.mediaService.deleteMedia(id, req.user.orgId);
  }
}
