import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Role } from '../enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    // const userIsAdmin = user.some((link) => link.role === Role.ADMIN);
    // const userIsManager = user.some((link) => link.role === Role.MANAGER);

    const userRole = Role.USER;
    // if (userIsManager) userRole = Role.MANAGER;
    // if (userIsAdmin) userRole = Role.ADMIN;

    return {
      userId: user.id,
      username: user.username,
      roles: [userRole],
    };
  }
}
