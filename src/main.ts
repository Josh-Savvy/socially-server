import { NestFactory } from "@nestjs/core";
import AppModule from "./app.module";
import { Logger, VersioningType } from "@nestjs/common";
import "reflect-metadata";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.use(passport.initialize());
	app.enableCors();
	app.enableVersioning({ type: VersioningType.URI });
	app.setGlobalPrefix("api");

	const PORT = parseInt(process.env.PORT) || 3000;
	const logger = new Logger("NestApplication");
	await app.listen(PORT).then(() => logger.log(`Application is running on port ${PORT}`));
}

bootstrap();
