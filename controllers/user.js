import User from '../models/User.js'
import bcrypt from 'bcrypt'

const genHash = (password) => {
    return bcrypt.hashSync(password, 10)
}

const show = async (req, res) => {
    const data = await User.findOne({}, { full_name: 1, email: 1 })

    res.send({
        status: 'success',
        data: data
    })
}

const update = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (req.body.full_name)
            user.full_name = req.body.full_name

        if (req.body.email) {
            if (!req.body.email.includes('@'))
                throw Error('Email tidak valid')
            user.email = req.body.email
        }
        if (req.body.password) {
            if (req.body.password.length < 6) throw Error('Password terlalu pendek')
            user.password = genHash(req.body.password)
        }

        await user.save()
        user.password = undefined

        res.status(201)
            .send({
                status: 'success',
                data: user
            })
    } catch (e) {
        res.status(400)
            .send({
                status: 'error',
                error: e.message
            })
    }
}

export default { show, update }
export { genHash }