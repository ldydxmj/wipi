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
const view_entity_1 = require("./view.entity");
let ViewService = class ViewService {
    constructor(viewRepository) {
        this.viewRepository = viewRepository;
    }
    async create(ip, userAgent, url) {
        const exist = await this.viewRepository.findOne({
            where: { ip, userAgent, url },
        });
        if (exist) {
            const count = exist.count;
            const newData = await this.viewRepository.merge(exist, {
                count: count + 1,
            });
            await this.viewRepository.save(newData);
            return newData;
        }
        const newData = await this.viewRepository.create({ ip, userAgent, url });
        await this.viewRepository.save(newData);
        return newData;
    }
    async findAll(queryParams = {}) {
        const query = this.viewRepository
            .createQueryBuilder('view')
            .orderBy('view.updateAt', 'DESC');
        const { page = 1, pageSize = 12, pass } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "pass"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`view.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        return query.getManyAndCount();
    }
    async findByUrl(url) {
        return this.viewRepository.find({
            where: { url },
            order: { updateAt: 'ASC' },
        });
    }
    async findById(id) {
        return this.viewRepository.findOne(id);
    }
    async deleteById(id) {
        const data = await this.viewRepository.findOne(id);
        return this.viewRepository.remove(data);
    }
};
ViewService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(view_entity_1.View)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ViewService);
exports.ViewService = ViewService;
//# sourceMappingURL=view.service.js.map