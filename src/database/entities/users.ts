import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class players {
	@PrimaryColumn()
	id: string

	@Column()
	balance: number
}