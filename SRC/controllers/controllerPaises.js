const express = require('express')
const server = express()
const dadosPaises = require('./data/dadosPaises.json')
const fs = require('fs')


server.use(express.json())


server.get('/paises/:pais', (req, res) => {

    const nomePais = req.params.pais

    const dadosPais = dadosPaises.Pais.find(p => p.nome === nomePais)

    return res.json(dadosPais)
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


module.exports = {server}