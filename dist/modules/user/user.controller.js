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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    findAll(query) {
        return this.userService.findAll(query);
    }
    async register(user) {
        return await this.userService.createUser(user);
    }
    async checkPermission(req, user) {
        let token = req.headers.authorization;
        if (!token) {
            throw new common_1.HttpException('未认证', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (/Bearer/.test(token)) {
            token = token.split(' ').pop();
        }
        const tokenUser = this.jwtService.decode(token);
        const id = tokenUser.id;
        if (!id) {
            throw new common_1.HttpException('未认证', common_1.HttpStatus.UNAUTHORIZED);
        }
        const exist = await this.userService.findById(id);
        if (exist.id !== user.id && exist.role !== 'admin') {
            throw new common_1.HttpException('无权处理', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async update(req, user) {
        await this.checkPermission(req, user);
        return await this.userService.updateById(user.id, user);
    }
    async updatePassword(req, user) {
        await this.checkPermission(req, user);
        return await this.userService.updatePassword(user.id, user);
    }
};
__decorate([
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    common_1.Get(),
    roles_guard_1.Roles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    common_1.Post('register'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    common_1.Post('update'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    common_1.Post('password'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
UserController = __decorate([
    common_1.Controller('user'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map