import { SMTPService } from './smtp.service';
import { SMTP } from './smtp.entity';
export declare class SMTPController {
    private readonly smtpService;
    constructor(smtpService: SMTPService);
    create(data: any): Promise<SMTP>;
    findAll(queryParam: any): Promise<[SMTP[], number]>;
    deleteById(id: any): Promise<SMTP>;
}
