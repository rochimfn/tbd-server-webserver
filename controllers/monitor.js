import Monitor from '../models/Monitor.js'

const index = async (req, res) => {
    const data = await Monitor.find()
    res.send({
        status: 'success',
        data: data
    })
}

export default { index }