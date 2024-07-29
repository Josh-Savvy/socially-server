import { Comment } from "src/modules/comments/entities/comment.entity";
import { Notification } from "src/modules/notifications/entities/notification.entity";
import { PostReaction } from "src/modules/posts/entities/post-reaction.entity";
import { Post } from "src/modules/posts/entities/post.entity";
import {
	Entity,
	Column,
	CreateDateColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";

@Entity("users")
export class User extends Repository<User> {
	@PrimaryGeneratedColumn("increment")
	id: number;
	@Column({ unique: true })
	email: string;
	@Column()
	username: string;
	@Column()
	first_name: string;
	@Column()
	last_name: string;
	@Column()
	gender: string;

	@Column({ nullable: true })
	avatar: string | null;

	@Column({ nullable: true })
	bio: string | null;

	// Todo: education timeline
	// @Column({ nullable: true })
	// education: string | null;

	@Column({ nullable: true })
	job_title: string | null;

	@Column()
	encrypted_password!: string;

	@OneToMany(() => Post, (post) => post.author, { onDelete: "NO ACTION" })
	posts: Post[];

	@OneToMany(() => Notification, (notification) => notification.recipient)
	notifications: Notification[];

	@ManyToMany(() => Post, (post) => post.tagged)
	mentions: Post[];

	@OneToMany(() => Post, (post) => post.author, { onDelete: "CASCADE" })
	stories: Post[];

	@OneToMany(() => Comment, (comment) => comment.author, { onDelete: "NO ACTION" })
	comments: Comment[];

	@OneToMany(() => PostReaction, (comment) => comment.user, { onDelete: "NO ACTION" })
	reactions: PostReaction[];

	@ManyToMany(() => User, { onDelete: "SET NULL" })
	@JoinTable()
	blockedUsers: User[];

	@ManyToMany(() => User, (user) => user.followers)
	@JoinTable({
		name: "user_followers",
		joinColumn: { name: "user_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "follower_id", referencedColumnName: "id" },
	})
	following: User[];

	@ManyToMany(() => User, (user) => user.following)
	followers: User[];

	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;
}
