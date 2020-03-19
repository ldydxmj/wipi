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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Setting = class Setting {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Setting.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "systemUrl", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "systemTitle", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "systemLogo", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "systemFavicon", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "systemFooterInfo", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "seoKeyword", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "seoDesc", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "ossRegion", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "ossAccessKeyId", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "ossAccessKeySecret", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Setting.prototype, "ossHttps", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "ossBucket", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "smtpHost", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "smtpPort", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "smtpUser", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "smtpPass", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Setting.prototype, "smtpFromUser", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        comment: '创建时间',
        name: 'create_at',
    }),
    __metadata("design:type", Date)
], Setting.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        comment: '更新时间',
        name: 'update_at',
    }),
    __metadata("design:type", Date)
], Setting.prototype, "updateAt", void 0);
Setting = __decorate([
    typeorm_1.Entity()
], Setting);
exports.Setting = Setting;
//# sourceMappingURL=setting.entity.js.map