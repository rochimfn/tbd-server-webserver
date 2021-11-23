import express from 'express'
import primary from './controllers/primary.js'
import secondary from './controllers/secondary.js'
import log from './controllers/log.js'
import monitor from './controllers/monitor.js'

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

export { primaryRoutes, secondaryRoutes, logRoutes, monitorRoutes }