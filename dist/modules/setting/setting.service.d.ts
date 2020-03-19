import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Setting } from './setting.entity';
export declare class SettingService {
    private readonly settingRepository;
    private readonly userService;
    constructor(settingRepository: Repository<Setting>, userService: UserService);
    findAll(innerInvoke?: boolean, isAdmin?: boolean): Promise<Setting>;
    update(setting: Partial<Setting>): Promise<Setting>;
}
