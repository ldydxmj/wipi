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
const setting_service_1 = require("./setting.service");
const user_service_1 = require("../user/user.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
let SettingController = class SettingController {
    constructor(settingService, jwtService, userService) {
        this.settingService = settingService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    update(setting) {
        return this.settingService.update(setting);
    }
    async findAll(req) {
        let token = req.headers.authorization;
        if (/Bearer/.test(token)) {
            token = token.split(' ').pop();
        }
        try {
            const tokenUser = this.jwtService.decode(token);
            const id = tokenUser.id;
            const exist = await this.userService.findById(id);
            const isAdmin = id && exist.role === 'admin';
            return this.settingService.findAll(false, isAdmin);
        }
        catch (e) {
            return this.settingService.findAll(false, false);
        }
    }
};
__decorate([
    common_1.Post(),
    roles_guard_1.Roles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "update", null);
__decorate([
    common_1.Post('/get'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findAll", null);
SettingController = __decorate([
    common_1.Controller('setting'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        jwt_1.JwtService,
        user_service_1.UserService])
], SettingController);
exports.SettingController = SettingController;
//# sourceMappingURL=setting.controller.js.map