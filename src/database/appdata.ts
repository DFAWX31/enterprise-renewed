import 'dotenv/config'
import { DataSource } from 'typeorm'
import path from 'path'
import fs from 'fs'
import { players } from './entities/users'

const entities: string[] = []

const entityDirectory = path.join(__dirname, 'entities')
fs.readdirSync(entityDirectory).forEach(file => {
	if (file.endsWith('.ts')) {
		const filePath = path.join(entityDirectory, file)

		entities.push(filePath)
	}
})
console.log(entities);


export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.host!,
	port: parseInt(process.env.port!),
	username: process.env.user!,
	password: process.env.password,
	database: process.env.database,
	synchronize: true,
	logging: true,
	entities: entities
})