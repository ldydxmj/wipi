import { JwtService } from '@nestjs/jwt';
import { SettingService } from './setting.service';
import { Setting } from './setting.entity';
import { UserService } from '../user/user.service';
export declare class SettingController {
    private readonly settingService;
    private readonly jwtService;
    private readonly userService;
    constructor(settingService: SettingService, jwtService: JwtService, userService: UserService);
    update(setting: any): Promise<Setting>;
    findAll(req: any): Promise<Setting>;
}
