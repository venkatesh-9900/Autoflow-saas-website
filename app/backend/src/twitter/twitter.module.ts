import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TwitterService],
  controllers: [TwitterController],
  exports: [TwitterService],
})
export class TwitterModule {}
