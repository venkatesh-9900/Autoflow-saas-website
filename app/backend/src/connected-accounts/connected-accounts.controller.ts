import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ConnectedAccountsService,
  CreateConnectedAccountDto,
} from './connected-accounts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('connected-accounts')
@UseGuards(JwtAuthGuard)
export class ConnectedAccountsController {
  constructor(
    private readonly connectedAccountsService: ConnectedAccountsService,
  ) {}

  @Get()
  async findAll(@Request() req: any) {
    const orgId = req.user.organizationId;
    return this.connectedAccountsService.findAllByOrg(orgId);
  }

  @Post()
  async connect(@Request() req: any, @Body() data: CreateConnectedAccountDto) {
    const orgId = req.user.organizationId;
    // In a production app, the accessToken should ideally be exchanged from an authorization code
    // here on the backend, but for the scope of the prototype, accepting it directly is fine.
    const result = await this.connectedAccountsService.connectAccount(
      orgId,
      data,
    );

    // Do not return raw tokens
    return {
      id: result.id,
      platform: result.platform,
      accountId: result.accountId,
      accountName: result.accountName,
      status: result.status,
    };
  }

  @Delete(':id')
  async disconnect(@Request() req: any, @Param('id') id: string) {
    const orgId = req.user.organizationId;
    return this.connectedAccountsService.disconnectAccount(orgId, id);
  }
}
