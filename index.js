import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { primaryRoutes, secondaryRoutes, monitorRoutes, logRoutes } from './routes.js'


const main = async () => {
    dotenv.config()
    const app = express()

    await mongoose.connect(
        `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
        {
            user: process.env.MONGO_USERNAME,
            pass: process.env.MONGO_PASSWORD,
            dbName: process.env.MONGO_DATABASE
        })

    app.use(express.json());
    app.use('/primary', primaryRoutes)
    app.use('/secondary', secondaryRoutes)
    app.use('/monitor', monitorRoutes)
    app.use('/log', logRoutes)

    app.listen(5000, () => {
        console.log("Server has started!")
    })

}

await main().catch(err => console.log(err))
