import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rules } from "./rules";

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

	@OneToMany(() => Rules, (rules: Rules) => rules.rule)
	rules: Rules[]
}