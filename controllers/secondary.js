import Secondary from '../models/Secondary.js'

const index = async (req, res) => {
    const data = await Secondary.find()
    res.send({
        status: 'success',
        data: data
    })
}

const create = async (req, res) => {
    try {
        const secondary = new Secondary({
            name: req.body.name,
            host: req.body.host,
            port: req.body.port,
            email: req.body.email,
            password: req.body.password
        })
        await secondary.save()
        res
            .send({
                status: 'success',
                data: secondary
            })
    } catch (e) {
        res.status(400)
            .send({
                status: 'error',
                message: e.message
            })
    }
}

const update = async (req, res) => {
    try {
        const secondary = await Secondary.findOne({ _id: req.params.id })

        if (req.body.name) secondary.name = req.body.name
        if (req.body.host) secondary.host = req.body.host
        if (req.body.port) secondary.port = req.body.port
        if (req.body.email) secondary.email = req.body.email
        if (req.body.password) secondary.password = req.body.password

        await secondary.save()
        res.status(201)
            .send({
                status: 'success',
                data: secondary
            })
    } catch (e) {
        res.status(400)
            .send({
                status: 'error',
                error: e.message
            })
    }
}

const destroy = async (req, res) => {
    try {
        await Secondary.deleteOne({ _id: req.params.id })
        res.status(200)
            .send({
                status: 'success',
                data: {}
            })
    } catch (e) {
        res.status(404)
            .send({
                status: 'error',
                error: e.message
            })
    }
}

export default { index, create, update, destroy }