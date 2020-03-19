import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    createToken(user: Partial<User>): string;
    login(user: Partial<User>): Promise<User & {
        token: string;
    }>;
    validateUser(payload: User): Promise<any>;
}
