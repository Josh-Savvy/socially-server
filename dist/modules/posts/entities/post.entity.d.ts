import { Photo } from "src/interfaces";
import { Comment } from "src/modules/comments/entities/comment.entity";
import { User } from "src/modules/user/entities/user.entity";
import { PostReaction } from "./post-reaction.entity";
export declare class Post {
    id: number;
    title: string;
    content: string;
    images: Photo[];
    author: User;
    comments: Comment[];
    views: User[];
    tagged: User[];
    reactions: PostReaction[];
    createdAt: Date;
    updatedAt: Date;
}
