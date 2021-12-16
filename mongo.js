import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connect = async () => {
    dotenv.config()
    await mongoose.connect(
        `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
        {
            user: process.env.MONGO_USERNAME,
            pass: process.env.MONGO_PASSWORD,
            dbName: process.env.MONGO_DATABASE
        })

    return mongoose.connection
}

export { connect }