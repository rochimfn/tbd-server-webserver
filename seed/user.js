import { connect } from '../mongo.js'
import User from '../models/User.js'
import { genHash } from '../controllers/user.js'

const seed = async () => {
    try {
        const connection = await connect()
        const deleteStatus = await User.deleteMany({})
        if (deleteStatus) {
            await new User({
                full_name: 'Rochim Farul Noviyan',
                email: 'rochim.noviyan@gmail.com',
                password: genHash('password')
            }).save()

        }
        connection.close()
    } catch (e) {
        console.error(e.message)
    }
}

await seed()