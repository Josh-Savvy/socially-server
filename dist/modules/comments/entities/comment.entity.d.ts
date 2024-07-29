import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";
export declare class Comment {
    id: number;
    text: string;
    author: User;
    authorId: string;
    post: Post;
    postId: string;
}
