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
const dayjs = require("dayjs");
const nuid = require("nuid");
const setting_service_1 = require("../setting/setting.service");
const file_entity_1 = require("./file.entity");
let OSS = require('ali-oss');
let FileService = class FileService {
    constructor(fileRepository, settingService) {
        this.fileRepository = fileRepository;
        this.settingService = settingService;
    }
    async uploadFile(file) {
        const { originalname, mimetype, size, buffer } = file;
        const filename = `/${dayjs().format('YYYY-MM-DD')}/${nuid.next()}/${originalname}`;
        const { ossRegion, ossAccessKeyId, ossBucket, ossAccessKeySecret, ossHttps, } = await this.settingService.findAll(true);
        if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
            throw new common_1.HttpException('请完善 OSS 配置', common_1.HttpStatus.BAD_REQUEST);
        }
        let client = new OSS({
            region: ossRegion,
            accessKeyId: ossAccessKeyId,
            accessKeySecret: ossAccessKeySecret,
            bucket: ossBucket,
            secure: ossHttps,
        });
        const { url } = await client.put(filename, buffer);
        const newFile = await this.fileRepository.create({
            originalname,
            filename,
            url,
            type: mimetype,
            size,
        });
        await this.fileRepository.save(newFile);
        return newFile;
    }
    async findAll(queryParams = {}) {
        const query = this.fileRepository
            .createQueryBuilder('file')
            .orderBy('file.createAt', 'DESC');
        const { page = 1, pageSize = 12, pass } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "pass"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`file.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        return query.getManyAndCount();
    }
    async findById(id) {
        return this.fileRepository.findOne(id);
    }
    async findByIds(ids) {
        return this.fileRepository.findByIds(ids);
    }
    async deleteById(id) {
        const tag = await this.fileRepository.findOne(id);
        const { ossRegion, ossAccessKeyId, ossBucket, ossAccessKeySecret, ossHttps, } = await this.settingService.findAll(true);
        if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
            throw new common_1.HttpException('请完善 OSS 配置', common_1.HttpStatus.BAD_REQUEST);
        }
        let client = new OSS({
            region: ossRegion,
            accessKeyId: ossAccessKeyId,
            accessKeySecret: ossAccessKeySecret,
            bucket: ossBucket,
            secure: ossHttps,
        });
        await client.delete(tag.filename);
        return this.fileRepository.remove(tag);
    }
};
FileService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        setting_service_1.SettingService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map