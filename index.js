import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { auth } from './middleware/auth.js';
import { authRoutes, primaryRoutes, secondaryRoutes, monitorRoutes, logRoutes } from './routes.js'


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

    app.use('/api', authRoutes)
    app.use('/api/primary', auth, primaryRoutes)
    app.use('/api/secondary', auth, secondaryRoutes)
    app.use('/api/monitor', auth, monitorRoutes)
    app.use('/api/log', auth, logRoutes)

    app.listen(5000, () => {
        console.log("server started in port 5000")
    })

}

await main().catch(err => console.log(err))
