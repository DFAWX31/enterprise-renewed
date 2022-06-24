import 'dotenv/config'
import { DataSource } from 'typeorm'
import path from 'path'
import fs from 'fs'
const entities: string[] = []

const entityDirectory = path.join(__dirname, 'entities')
fs.readdirSync(entityDirectory).forEach(file => {
	if (file.endsWith('.ts')) {
		const filePath = path.join(entityDirectory, file)

		entities.push(filePath)
	}
})
let retries = 5

let AppDataSource: DataSource

while (retries) {
	try {
		AppDataSource = new DataSource({
			type: "postgres",
			host: process.env.host!,
			port: parseInt(process.env.port!),
			username: process.env.user!,
			password: process.env.password,
			database: process.env.database,
			synchronize: true,
			logging: false,
			entities: entities
		})
		break
	} catch (error) {
		console.error(error)
		retries -= 1
		console.log(`${retries} left`)
	}
}

export { AppDataSource }