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
const view_service_1 = require("./view.service");
const view_controller_1 = require("./view.controller");
const view_entity_1 = require("./view.entity");
let ViewModule = class ViewModule {
};
ViewModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([view_entity_1.View]), auth_module_1.AuthModule],
        exports: [view_service_1.ViewService],
        providers: [view_service_1.ViewService],
        controllers: [view_controller_1.ViewController],
    })
], ViewModule);
exports.ViewModule = ViewModule;
//# sourceMappingURL=view.module.js.map