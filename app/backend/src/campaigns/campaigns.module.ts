import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AutomationModule } from '../automation/automation.module';

@Module({
  imports: [PrismaModule, AutomationModule],
  controllers: [CampaignsController],

  providers: [CampaignsService],
})
export class CampaignsModule {}
