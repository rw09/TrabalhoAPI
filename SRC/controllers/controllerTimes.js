const express = require('express')
const server = express()
// const dados = require('./data/dadosTimes.json')
const dados = require('./data/dadosTimes2.json')
const fs = require('fs')


server.use(express.json())

server.get('/times/Todos', (req, res) => {
    const todosOsTimes = [];
    for (const pais in dados) {
        for(const time of dados[pais]) {
            todosOsTimes.push(time)
        }
    }
    console.log('todos os times')
    console.log(todosOsTimes)
    
    return res.json(todosOsTimes);
    
  }); 

server.get('/times/:pais', (req, res) => {

    const paisEscolhido = req.params.pais

    const dadosTimesDoPaisEscolhido = dados[`Times${paisEscolhido}`]

    return res.json(dadosTimesDoPaisEscolhido)
})


server.get('/times/:pais/:id', (req, res) => {
    
    const paisEscolhido = req.params.pais

    const dadosTimesDoPaisEscolhido = dados[`Times${paisEscolhido}`]

    const timeId = parseInt(req.params.id)

    const time = dadosTimesDoPaisEscolhido.find(c => parseInt(c.id) === timeId)

    if (!time) {
        return res.status(404).json({mensagem: "Time não encontrado :/"})
    }

    return res.json(time);
})


/*
server.get('/times/Alemanha', (req, res) => {
    return res.json(dados.TimesAlemanha)
})

server.get('/times/Brasil', (req, res) => {
    return res.json(dados.TimesBrasil)
})

server.get('/times/Espanha', (req, res) => {
    return res.json(dados.TimesEspanha)
})

server.get('/times/Franca', (req, res) => {
    return res.json(dados.TimesFranca)
})

server.get('/times/Inglaterra', (req, res) => {
    return res.json(dados.TimesInglaterra)
})

server.get('/times/Italia', (req, res) => {
    return res.json(dados.TimesItalia)
})
*/

module.exports = {server}