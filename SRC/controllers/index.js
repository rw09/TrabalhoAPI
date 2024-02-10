const express = require('express')
const server = express()
const cors = require('cors')
const fs = require('fs')

const timesRouter = require('./controllerTimes')
const paisesRouter = require('./controllerPaises')

server.use(express.json())
server.use(cors())

server.use('/api', timesRouter.server)
server.use('/api', paisesRouter.server)


server.listen(3000, () => {
    console.log("O Servidor está funcionando!")
})