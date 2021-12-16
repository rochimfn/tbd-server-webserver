import express from 'express'
import auth from './controllers/auth.js';
import log from './controllers/log.js'
import monitor from './controllers/monitor.js'
import primary from './controllers/primary.js'
import secondary from './controllers/secondary.js'
import user from './controllers/user.js'

const authRoutes = ((routes) => {
    routes.post('/login', auth.login)

    return routes
})(express.Router())

const userRoutes = ((routes) => {
    routes.get('/', user.show)
    routes.patch('/:id', user.update)

    return routes
})(express.Router())

const primaryRoutes = ((routes) => {
    routes.get('/', primary.index)
    routes.patch('/:id', primary.update)

    return routes
})(express.Router())

const secondaryRoutes = ((routes) => {
    routes.get('/', secondary.index)
    routes.post('/', secondary.create)
    routes.patch('/:id', secondary.update)
    routes.delete("/:id", secondary.destroy)

    return routes
})(express.Router())

const logRoutes = ((routes) => {
    routes.get('/', log.index)

    return routes
})(express.Router())

const monitorRoutes = ((routes) => {
    routes.get('/', monitor.index)

    return routes
})(express.Router())

export {
    authRoutes,
    userRoutes,
    primaryRoutes,
    secondaryRoutes,
    logRoutes,
    monitorRoutes
}