import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shop {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	role: string

	@Column()
	price: number
}