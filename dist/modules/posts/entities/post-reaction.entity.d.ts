import { User } from "src/modules/user/entities/user.entity";
import { Post } from "./post.entity";
export declare class PostReaction {
    id: number;
    type: "like" | "love" | "wow" | "angry" | "sad";
    user: User;
    post: Post;
}
