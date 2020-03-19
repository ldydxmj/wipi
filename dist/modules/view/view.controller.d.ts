import { ViewService } from './view.service';
import { View } from './view.entity';
export declare class ViewController {
    private readonly viewService;
    constructor(viewService: ViewService);
    create(req: any, data: any): Promise<View>;
    findAll(queryParam: any): Promise<[View[], number]>;
    findByUrl(url: any): Promise<any>;
    findById(id: any): Promise<View>;
    deleteById(id: any): Promise<View>;
}
