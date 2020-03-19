import { Repository } from 'typeorm';
import { SettingService } from '../setting/setting.service';
import { SMTP } from './smtp.entity';
export declare class SMTPService {
    private readonly smtpRepository;
    private readonly settingService;
    constructor(smtpRepository: Repository<SMTP>, settingService: SettingService);
    create(data: Partial<SMTP>): Promise<SMTP>;
    findAll(queryParams?: any): Promise<[SMTP[], number]>;
    deleteById(id: any): Promise<SMTP>;
}
