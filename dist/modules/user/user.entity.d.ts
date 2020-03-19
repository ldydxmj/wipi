export declare class User {
    static comparePassword(password0: any, password1: any): Promise<any>;
    static encryptPassword(password: any): any;
    id: number;
    name: string;
    password: string;
    avatar: string;
    email: string;
    role: string;
    status: string;
    createAt: Date;
    updateAt: Date;
    encrypt(): void;
}
