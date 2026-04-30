import { Module } from '@nestjs/common';
import { AutomationRulesService } from './automation-rules.service';
import { AutomationRulesController } from './automation-rules.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AutomationRulesService],
  controllers: [AutomationRulesController],
  exports: [AutomationRulesService],
})
export class AutomationRulesModule {}
