import express from 'express'
import { connect } from './mongo.js'
import { auth } from './middleware/auth.js'
import {
    authRoutes, userRoutes, primaryRoutes,
    secondaryRoutes, monitorRoutes, logRoutes
} from './routes.js'

const main = async () => {
    const app = express()

    await connect()

    app.use(express.json())
    app.use('/', express.static('public/dist'))
    app.get('/', (req, res) => {
        res.sendFile('public/dist/index.html')
    })

    app.use('/api', authRoutes)
    app.use('/api/profile', auth, userRoutes)
    app.use('/api/primary', auth, primaryRoutes)
    app.use('/api/secondary', auth, secondaryRoutes)
    app.use('/api/monitor', auth, monitorRoutes)
    app.use('/api/log', auth, logRoutes)

    app.listen(5000, () => {
        console.log("server started in port 5000")
    })
}

await main().catch(err => console.log(err))