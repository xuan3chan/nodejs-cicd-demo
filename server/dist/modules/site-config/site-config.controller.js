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
exports.SiteConfigController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const site_config_service_1 = require("./site-config.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SiteConfigController = class SiteConfigController {
    siteConfigService;
    cacheManager;
    constructor(siteConfigService, cacheManager) {
        this.siteConfigService = siteConfigService;
        this.cacheManager = cacheManager;
    }
    getAll() {
        return this.siteConfigService.getAll();
    }
    get(key) {
        return this.siteConfigService.get(key);
    }
    async upsert(key, value) {
        const result = await this.siteConfigService.upsert(key, value);
        await this.cacheManager.del('site_config_all');
        return result;
    }
};
exports.SiteConfigController = SiteConfigController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheKey)('site_config_all'),
    (0, cache_manager_1.CacheTTL)(24 * 60 * 60 * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteConfigController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SiteConfigController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteConfigController.prototype, "upsert", null);
exports.SiteConfigController = SiteConfigController = __decorate([
    (0, common_1.Controller)('api/site-config'),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [site_config_service_1.SiteConfigService, Object])
], SiteConfigController);
//# sourceMappingURL=site-config.controller.js.map