import { User } from "src/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { Post } from "./post.entity";

@Entity("post_reactions")
@Unique(["user", "post"])
export class PostReaction {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 50 })
	type: "like" | "love" | "wow" | "angry" | "sad";

	@ManyToOne(() => User, (user) => user.reactions)
	user: User;

	@ManyToOne(() => Post, (post) => post.reactions)
	post: Post;
}
