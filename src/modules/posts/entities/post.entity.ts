import { Photo } from "src/interfaces";
import { Comment } from "src/modules/comments/entities/comment.entity";
import { User } from "src/modules/user/entities/user.entity";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { PostReaction } from "./post-reaction.entity";

@Entity("posts")
export class Post {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column({ type: "jsonb" })
	images!: Photo[];

	@ManyToOne(() => User, (entity) => entity.posts)
	author: User;

	@OneToMany(() => Comment, (entity) => entity.post)
	comments: Comment[];

	@ManyToMany(() => User)
	@JoinTable({
		name: "post_views",
		joinColumn: { name: "post_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
	})
	views: User[];

	@ManyToMany(() => User, (user) => user.mentions)
	@JoinTable({
		name: "post_mentions",
		joinColumn: { name: "post_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "mentioned_user_id", referencedColumnName: "id" },
	})
	tagged: User[];

	@OneToMany(() => PostReaction, (entity) => entity.post)
	reactions!: PostReaction[];

	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;
}
