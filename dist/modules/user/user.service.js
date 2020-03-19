"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("../../config");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        const { name, password } = config_1.config.admin;
        this.createUser({ name, password, role: 'admin' })
            .then(_ => {
            console.log();
            console.log(`管理员账户创建成功，用户名：${name}，密码：${password}，请及时登录系统修改默认密码`);
            console.log();
        })
            .catch(_ => {
            console.log();
            console.log(`管理员账户已经存在，用户名：${name}，密码：${password}，请及时登录系统修改默认密码`);
            console.log();
        });
    }
    async findAll(queryParams = {}) {
        const query = this.userRepository
            .createQueryBuilder('user')
            .orderBy('user.createAt', 'DESC');
        const { page = 1, pageSize = 12, status } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "status"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (status) {
            query.andWhere('user.status=:status').setParameter('status', status);
        }
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`user.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        return query.getManyAndCount();
    }
    async createUser(user) {
        const { name } = user;
        const existUser = await this.userRepository.findOne({ where: { name } });
        if (existUser) {
            throw new common_1.HttpException('用户已存在', common_1.HttpStatus.BAD_REQUEST);
        }
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }
    async login(user) {
        const { name, password } = user;
        const existUser = await this.userRepository.findOne({ where: { name } });
        if (!existUser ||
            !(await user_entity_1.User.comparePassword(password, existUser.password))) {
            throw new common_1.HttpException('用户名或密码错误', common_1.HttpStatus.BAD_REQUEST);
        }
        if (existUser.status === 'locked') {
            throw new common_1.HttpException('用户已锁定，无法登录', common_1.HttpStatus.BAD_REQUEST);
        }
        return existUser;
    }
    async findById(id) {
        return this.userRepository.findOne(id);
    }
    async updateById(id, user) {
        const oldUser = await this.userRepository.findOne(id);
        delete user.password;
        const newUser = await this.userRepository.merge(oldUser, user);
        return this.userRepository.save(newUser);
    }
    async updatePassword(id, user) {
        const existUser = await this.userRepository.findOne(id);
        const { oldPassword, newPassword } = user;
        if (!existUser ||
            !(await user_entity_1.User.comparePassword(oldPassword, existUser.password))) {
            throw new common_1.HttpException('用户名或密码错误', common_1.HttpStatus.BAD_REQUEST);
        }
        let hashNewPassword = user_entity_1.User.encryptPassword(newPassword);
        const newUser = await this.userRepository.merge(existUser, {
            password: hashNewPassword,
        });
        return this.userRepository.save(newUser);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map