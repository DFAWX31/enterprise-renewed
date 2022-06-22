import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rule } from "./rule";

@Entity()
export class Rules {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	rule_string: string

	@OneToOne(() => Rule)
	@JoinColumn()
	rule: Rule
}