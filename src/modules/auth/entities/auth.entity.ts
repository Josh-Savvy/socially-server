import { Column, CreateDateColumn, Entity, PrimaryColumn, Repository, UpdateDateColumn } from "typeorm";

export enum OtpType {
	email = "email",
	sms = "sms",
}

@Entity()
export class Auth extends Repository<Auth> {
	@PrimaryColumn("varchar")
	identifier!: string;
	@Column({ length: 6 })
	otp!: string;
	@Column({ type: "enum", enum: OtpType })
	type!: string;
	@Column()
	expiry!: Date;
	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;
}
