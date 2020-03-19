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
let Page = class Page {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Page.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Page.prototype, "cover", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Page.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Page.prototype, "path", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' }),
    __metadata("design:type", String)
], Page.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' }),
    __metadata("design:type", String)
], Page.prototype, "html", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null }),
    __metadata("design:type", String)
], Page.prototype, "toc", void 0);
__decorate([
    typeorm_1.Column('simple-enum', { enum: ['draft', 'publish'] }),
    __metadata("design:type", String)
], Page.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Page.prototype, "publishAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Page.prototype, "views", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        comment: '创建时间',
        name: 'create_at',
    }),
    __metadata("design:type", Date)
], Page.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        comment: '更新时间',
        name: 'update_at',
    }),
    __metadata("design:type", Date)
], Page.prototype, "updateAt", void 0);
Page = __decorate([
    typeorm_1.Entity()
], Page);
exports.Page = Page;
//# sourceMappingURL=page.entity.js.map