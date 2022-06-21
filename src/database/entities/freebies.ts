import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Players } from './players';

@Entity()
export class Freebies {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => Players)
	@JoinColumn()
	user: Players

	@Column({nullable: true})
	hourly: string

	@Column({nullable: true})
	daily: string

	@Column({nullable: true})
	weekly: string

	@Column({nullable: true})
	monthly: string

	@Column({nullable: true})
	yearly: string
}