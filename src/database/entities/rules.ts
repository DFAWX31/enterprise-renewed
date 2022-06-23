import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rule } from "./rule";

@Entity()
export class Rules {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	rule_string: string

	@ManyToOne(() => Rule, (rule: Rule) => rule.rules)
	rule: Rule
}