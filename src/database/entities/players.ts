import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Players {
	@PrimaryColumn()
	id: string

	@Column()
	balance: number
}