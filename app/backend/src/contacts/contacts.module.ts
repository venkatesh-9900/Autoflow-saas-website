import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SegmentationService } from './segmentation.service';

@Module({
  imports: [PrismaModule],
  controllers: [ContactsController],
  providers: [ContactsService, SegmentationService],
  exports: [ContactsService, SegmentationService],
})
export class ContactsModule {}
