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
const setting_service_1 = require("../setting/setting.service");
const smtp_entity_1 = require("./smtp.entity");
const mail_util_1 = require("./mail.util");
let SMTPService = class SMTPService {
    constructor(smtpRepository, settingService) {
        this.smtpRepository = smtpRepository;
        this.settingService = settingService;
    }
    async create(data) {
        const { smtpHost, smtpPort, smtpUser, smtpPass, smtpFromUser, } = await this.settingService.findAll(true);
        Object.assign(data, {
            from: smtpFromUser,
        });
        await mail_util_1.sendEmail(data, {
            host: smtpHost,
            port: smtpPort,
            user: smtpUser,
            pass: smtpPass,
        }).catch(() => {
            throw new common_1.HttpException('邮件发送失败', common_1.HttpStatus.BAD_REQUEST);
        });
        const newSMTP = await this.smtpRepository.create(data);
        await this.smtpRepository.save(newSMTP);
        return newSMTP;
    }
    async findAll(queryParams = {}) {
        const query = this.smtpRepository
            .createQueryBuilder('smtp')
            .orderBy('smtp.createAt', 'DESC');
        const { page = 1, pageSize = 12, pass } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "pass"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`smtp.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        return query.getManyAndCount();
    }
    async deleteById(id) {
        const SMTP = await this.smtpRepository.findOne(id);
        return this.smtpRepository.remove(SMTP);
    }
};
SMTPService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(smtp_entity_1.SMTP)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        setting_service_1.SettingService])
], SMTPService);
exports.SMTPService = SMTPService;
//# sourceMappingURL=smtp.service.js.map