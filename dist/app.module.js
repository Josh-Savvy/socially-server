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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const database_config_1 = require("./config/database.config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./modules/user/entities/user.entity");
const auth_entity_1 = require("./modules/auth/entities/auth.entity");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("./config/jwt.config");
const posts_module_1 = require("./modules/posts/posts.module");
const comments_module_1 = require("./modules/comments/comments.module");
const post_entity_1 = require("./modules/posts/entities/post.entity");
const comment_entity_1 = require("./modules/comments/entities/comment.entity");
const story_module_1 = require("./modules/story/story.module");
const story_entity_1 = require("./modules/story/entities/story.entity");
const post_reaction_entity_1 = require("./modules/posts/entities/post-reaction.entity");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const notification_entity_1 = require("./modules/notifications/entities/notification.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
let AppModule = class AppModule {
    constructor() { }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [database_config_1.default, jwt_config_1.default] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("host"),
                    port: +configService.get("port"),
                    username: configService.get("user"),
                    password: configService.get("password"),
                    database: configService.get("database"),
                    entities: [auth_entity_1.Auth, user_entity_1.User, post_entity_1.Post, comment_entity_1.Comment, story_entity_1.Story, post_reaction_entity_1.PostReaction, notification_entity_1.Notification],
                    synchronize: true,
                }),
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const secret = config.get("secret");
                    return { global: true, secret, signOptions: { expiresIn: "7d" } };
                },
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            story_module_1.StoryModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.default = AppModule;
//# sourceMappingURL=app.module.js.map