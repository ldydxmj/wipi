import { Repository } from 'typeorm';
import { SettingService } from '../setting/setting.service';
import { File } from './file.entity';
export declare class FileService {
    private readonly fileRepository;
    private readonly settingService;
    constructor(fileRepository: Repository<File>, settingService: SettingService);
    uploadFile(file: any): Promise<File>;
    findAll(queryParams?: any): Promise<[File[], number]>;
    findById(id: any): Promise<File>;
    findByIds(ids: any): Promise<Array<File>>;
    deleteById(id: any): Promise<File>;
}
