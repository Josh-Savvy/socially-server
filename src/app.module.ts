import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import databaseConfig, { DatabaseConfig } from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/user/entities/user.entity";
import { Auth } from "./modules/auth/entities/auth.entity";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig, { JwtConfig } from "./config/jwt.config";
import { PostsModule } from "./modules/posts/posts.module";
import { CommentsModule } from "./modules/comments/comments.module";
import { Post } from "./modules/posts/entities/post.entity";
import { Comment } from "./modules/comments/entities/comment.entity";
import { StoryModule } from "./modules/story/story.module";
import { Story } from "./modules/story/entities/story.entity";
import { PostReaction } from "./modules/posts/entities/post-reaction.entity";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { Notification } from "./modules/notifications/entities/notification.entity";
import { CacheModule } from "@nestjs/cache-manager";
// import * as redisStore from 'cache-manager-redis-store';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig, jwtConfig] }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService<DatabaseConfig>) => ({
				type: "postgres",
				host: configService.get("host"),
				port: +configService.get("port"),
				username: configService.get("user"),
				password: configService.get("password"),
				database: configService.get("database"),
				entities: [Auth, User, Post, Comment, Story, PostReaction, Notification],
				synchronize: true,
				// logging: true,
			}),
		}),
		JwtModule.registerAsync({
			global: true,
			inject: [ConfigService],
			useFactory: (config: ConfigService<JwtConfig>) => {
				const secret = config.get("secret");
				// return { global: true, secret, signOptions: { expiresIn: 86399 } };
				return { global: true, secret, signOptions: { expiresIn: "7d" } };
			},
		}),
		CacheModule.register({
			isGlobal: true,
			// store: redisStore,
			// host: "localhost",
			// port: 6379,
		}),
		UserModule,
		AuthModule,
		PostsModule,
		CommentsModule,
		StoryModule,
		NotificationsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export default class AppModule {
	constructor() {}
}
