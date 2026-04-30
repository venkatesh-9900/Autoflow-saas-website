import { Module } from '@nestjs/common';
import { AutomationTemplatesService } from './automation-templates.service';
import { AutomationTemplatesController } from './automation-templates.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AutomationTemplatesService],
  controllers: [AutomationTemplatesController],
})
export class AutomationTemplatesModule {}
