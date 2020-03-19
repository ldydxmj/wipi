import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    findAll(query: any): Promise<[User[], number]>;
    register(user: Partial<User>): Promise<User>;
    checkPermission(req: any, user: any): Promise<void>;
    update(req: any, user: Partial<User>): Promise<User>;
    updatePassword(req: any, user: Partial<User>): Promise<User>;
}
