import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Request() req: any) {
    return this.usersService.getMe(req.user.userId);
  }

  @Patch('organization/onboarding')
  async updateOnboarding(@Request() req: any, @Body('step') step: number) {
    return this.usersService.updateOnboardingStep(req.user.orgId, step);
  }
}
