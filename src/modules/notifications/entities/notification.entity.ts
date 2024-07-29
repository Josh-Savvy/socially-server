import { User } from "src/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("notifications")
export class Notification {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 100 })
	type: string;

	@Column({ type: "text" })
	message: string;

	@ManyToOne(() => User, (user) => user.notifications)
	recipient: User;

	@Column({ type: "boolean", default: false })
	read: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
