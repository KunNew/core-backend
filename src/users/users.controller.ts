import { Controller, Get, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionData } from 'express-session';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  getMe(@Session() session: SessionData) {
    return this.usersService.getMe(session.user.userId);
  }
}
