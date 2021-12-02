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
    app.use('/',express.static('public/dist'))
    app.get('/', (req, res) => {
        res.sendFile('public/dist/index.html');
    })
    app.use('/api/primary', primaryRoutes)
    app.use('/api/secondary', secondaryRoutes)
    app.use('/api/monitor', monitorRoutes)
    app.use('/api/log', logRoutes)

    app.listen(5000, () => {
        console.log("Server has started!")
    })

}

await main().catch(err => console.log(err))
