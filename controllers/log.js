import Log from '../models/Log.js'

const index = async (req, res) => {
    const data = await Log.find()
    res.send({
        status: 'success',
        data: data
    })
}

export default { index }