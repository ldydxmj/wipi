import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: any): Promise<import("./file.entity").File>;
    findAll(queryParam: any): Promise<[import("./file.entity").File[], number]>;
    findById(id: any): Promise<import("./file.entity").File>;
    deleteById(id: any): Promise<import("./file.entity").File>;
}
