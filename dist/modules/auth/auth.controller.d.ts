import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: any): Promise<import("../user/user.entity").User & {
        token: string;
    }>;
}
