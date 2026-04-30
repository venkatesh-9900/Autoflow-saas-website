import { Module } from '@nestjs/common';
import { ConnectedAccountsService } from './connected-accounts.service';
import { ConnectedAccountsController } from './connected-accounts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ConnectedAccountsService],
  controllers: [ConnectedAccountsController],
  exports: [ConnectedAccountsService],
})
export class ConnectedAccountsModule {}
