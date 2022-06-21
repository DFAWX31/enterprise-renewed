import { AppDataSource } from './appdata'
import { Freebies } from './entities/freebies'
import { Players } from './entities/players'

AppDataSource.initialize()
	.then(async () => {
		const user = new Players()
		user.id = "1243"
		user.balance = 0
		AppDataSource.manager.save(user)
		const freebie = new Freebies()
		freebie.user = user
		AppDataSource.manager.save(freebie)
	})
	.catch((error) => console.error(error))
