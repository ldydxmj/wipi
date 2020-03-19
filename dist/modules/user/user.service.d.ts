import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(queryParams?: any): Promise<[User[], number]>;
    createUser(user: Partial<User>): Promise<User>;
    login(user: Partial<User>): Promise<User>;
    findById(id: any): Promise<User>;
    updateById(id: any, user: any): Promise<User>;
    updatePassword(id: any, user: any): Promise<User>;
}
