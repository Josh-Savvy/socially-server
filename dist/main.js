"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
require("reflect-metadata");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.enableCors();
    app.enableVersioning({ type: common_1.VersioningType.URI });
    app.setGlobalPrefix("api");
    const PORT = parseInt(process.env.PORT) || 3000;
    const logger = new common_1.Logger("NestApplication");
    await app.listen(PORT).then(() => logger.log(`Application is running on port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map