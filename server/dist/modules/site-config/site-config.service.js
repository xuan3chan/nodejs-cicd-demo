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
exports.SiteConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const site_config_entity_1 = require("../../entities/site-config.entity");
let SiteConfigService = class SiteConfigService {
    configRepo;
    constructor(configRepo) {
        this.configRepo = configRepo;
    }
    async getAll() {
        const configs = await this.configRepo.find();
        const result = {};
        for (const c of configs) {
            result[c.key] = c.value;
        }
        return result;
    }
    async get(key) {
        const config = await this.configRepo.findOne({ where: { key } });
        return config?.value ?? null;
    }
    async upsert(key, value) {
        let config = await this.configRepo.findOne({ where: { key } });
        if (config) {
            config.value = value;
        }
        else {
            config = this.configRepo.create({ key, value });
        }
        return this.configRepo.save(config);
    }
};
exports.SiteConfigService = SiteConfigService;
exports.SiteConfigService = SiteConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_config_entity_1.SiteConfigEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SiteConfigService);
//# sourceMappingURL=site-config.service.js.map