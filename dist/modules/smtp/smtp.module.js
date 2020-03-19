"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const setting_module_1 = require("../setting/setting.module");
const smtp_service_1 = require("./smtp.service");
const smtp_controller_1 = require("./smtp.controller");
const smtp_entity_1 = require("./smtp.entity");
let SMTPModule = class SMTPModule {
};
SMTPModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([smtp_entity_1.SMTP]), setting_module_1.SettingModule, auth_module_1.AuthModule],
        exports: [smtp_service_1.SMTPService],
        controllers: [smtp_controller_1.SMTPController],
        providers: [smtp_service_1.SMTPService],
    })
], SMTPModule);
exports.SMTPModule = SMTPModule;
//# sourceMappingURL=smtp.module.js.map