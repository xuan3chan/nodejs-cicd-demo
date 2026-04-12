"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const isProd = process.env.NODE_ENV === 'production';
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    }));
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: isProd
            ? [process.env.CORS_ORIGIN || 'https://yourdomain.com']
            : ['http://localhost:5173', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
        maxAge: 86400,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'), {
        maxAge: isProd ? '30d' : 0,
    });
    app.enableShutdownHooks();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Azure Kitchen [${isProd ? 'PROD' : 'DEV'}] running on http://localhost:${port}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map