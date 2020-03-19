import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'wipi',
      
    });
  }

  async validate(payload: User) {
    const user = await this.authService.validateUser(payload);
    console.log('进入身份校验')
    if (!user) {
      throw new UnauthorizedException('身份验证失败');

    }
    console.log('身份校验成功!')
    return user;
  }
}
