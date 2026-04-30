import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MediaType } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async uploadMedia(
    organizationId: string,
    file: Express.Multer.File,
    folder?: string,
  ) {
    // In a real app, upload file to S3 and get the URL.
    const url = `https://mock-storage.autoflow.ai/assets/${file.filename || file.originalname}`;
    const type = file.mimetype.startsWith('video')
      ? MediaType.VIDEO
      : MediaType.IMAGE;

    return this.prisma.mediaAsset.create({
      data: {
        organizationId,
        type,
        url,
        name: file.originalname,
        size: file.size,
        folder,
      },
    });
  }

  async getMedia(organizationId: string, folder?: string) {
    return this.prisma.mediaAsset.findMany({
      where: {
        organizationId,
        ...(folder ? { folder } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteMedia(id: string, organizationId: string) {
    return this.prisma.mediaAsset
      .delete({
        where: {
          id,
          // Make sure it belongs to the org
          organizationId,
        },
      })
      .catch(() => null);
  }
}
