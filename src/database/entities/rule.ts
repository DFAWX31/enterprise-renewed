import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rule {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	message: string

	@Column({ nullable: true })
	channel: string

	@Column()
	guild: string
}