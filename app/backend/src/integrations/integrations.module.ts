import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IntegrationsController } from './integrations.controller';

@Module({
  imports: [PrismaModule],
  providers: [IntegrationsService],
  controllers: [IntegrationsController],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
