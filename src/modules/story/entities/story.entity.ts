import { Photo } from "src/interfaces";
import { User } from "src/modules/user/entities/user.entity";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";

@Entity("stories")
export class Story {
	@PrimaryGeneratedColumn("increment")
	id: number;
	@Column({ type: "text", nullable: true })
	text: string | null;
	@Column({ type: "jsonb", nullable: true })
	media: Photo | null;
	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP + INTERVAL 1 DAY" })
	expiresAt: Date;

	@ManyToMany(() => User)
	@JoinTable({
		name: "story_views",
		joinColumn: { name: "story_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
	})
	views: User[];

	@ManyToOne(() => User, (author) => author.stories)
	author: User;

	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;
}
