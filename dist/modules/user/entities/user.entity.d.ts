import { Comment } from "src/modules/comments/entities/comment.entity";
import { Notification } from "src/modules/notifications/entities/notification.entity";
import { PostReaction } from "src/modules/posts/entities/post-reaction.entity";
import { Post } from "src/modules/posts/entities/post.entity";
import { Repository } from "typeorm";
export declare class User extends Repository<User> {
    id: number;
    email: string;
    username: string;
    avatar: string | null;
    bio: string | null;
    job_title: string | null;
    encrypted_password: string;
    posts: Post[];
    notifications: Notification[];
    mentions: Post[];
    stories: Post[];
    comments: Comment[];
    reactions: PostReaction[];
    blockedUsers: User[];
    following: User[];
    followers: User[];
    createdAt: Date;
    updatedAt: Date;
}
