import { Module } from '@nestjs/common';
import { AIAgentsService } from './ai-agents.service';
import { AIAgentsController } from './ai-agents.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AIAgentsService],
  controllers: [AIAgentsController],
  exports: [AIAgentsService],
})
export class AIAgentsModule {}
