"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const helmet = require("helmet");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api');
    app.use(rateLimit({
        windowMs: 60 * 1000,
        max: 100,
    }));
    app.use(compression());
    app.use(helmet());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(4012);
}
bootstrap();
//# sourceMappingURL=main.js.map