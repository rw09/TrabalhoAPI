const express = require('express')
const server = express()
const cors = require('cors')
const fs = require('fs')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const timesRouter = require('./controllerTimes')
const paisesRouter = require('./controllerPaises')
const competicoesRouter = require('./controllerCompeticoes')

server.use(express.json())
server.use(cors())

// server.use(express.urlencoded({ extended: true }));

server.use('/api', timesRouter.server)
server.use('/api', paisesRouter.server)
server.use('/api', competicoesRouter.server)


server.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


server.listen(3000, () => {
    console.log("O Servidor está funcionando!")
})