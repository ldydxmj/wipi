import { Repository } from 'typeorm';
import { View } from './view.entity';
export declare class ViewService {
    private readonly viewRepository;
    constructor(viewRepository: Repository<View>);
    create(ip: string, userAgent: string, url: string): Promise<View>;
    findAll(queryParams?: any): Promise<[View[], number]>;
    findByUrl(url: any): Promise<any>;
    findById(id: any): Promise<View>;
    deleteById(id: any): Promise<View>;
}
