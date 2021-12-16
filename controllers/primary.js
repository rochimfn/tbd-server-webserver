import Primary from '../models/Primary.js'

const index = async (req, res) => {
    let data = await Primary.findOne()

    if (!data) {
        data = await new Primary({
            username: null,
            password: null,
            host: null,
            port: null,
            database: []
        }).save()
    }

    res.send({
        status: 'success',
        data: data
    })
}

const update = async (req, res) => {
    try {
        const primary = await Primary.findOne({ _id: req.params.id })

        if (req.body.username) primary.username = req.body.username
        if (req.body.password) primary.password = req.body.password
        if (req.body.host) primary.host = req.body.host
        if (req.body.port) primary.port = req.body.port
        if (req.body.database) primary.database = req.body.database

        await primary.save()
        res.status(201)
            .send({
                status: 'success',
                data: primary
            })
    } catch (e) {
        res.status(404)
            .send({
                status: 'error',
                error: e.message
            })
    }
}

export default { index, update }