import { AppDataSource } from './appdata'
import { players } from './entities/users'

const type = new players()
type.id = "123"
type.balance = 0
const wow = async () => {
	await AppDataSource.manager.save(type)
}
wow()
console.log(`user has been saved with id = ${type.id}`)