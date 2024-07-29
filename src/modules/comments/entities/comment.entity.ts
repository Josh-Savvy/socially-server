import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("comments")
export class Comment {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	text: string;

	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn({ name: "authorId" })
	author: User;

	@Column()
	authorId: string;

	@ManyToOne(() => Post, (post) => post.comments)
	@JoinColumn({ name: "postId" })
	post: Post;

	@Column()
	postId: string;
}
