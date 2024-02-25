const express = require('express')
const server = express()
const dadosPaises = require('./data/dadosPaises.json')
const fs = require('fs')


server.use(express.json())

server.get('/paises', (req, res) => {

    return res.json(dadosPaises.Pais)
})


server.get('/paises/:pais', (req, res) => {
    const nomePais = req.params.pais

    const dadosPais = dadosPaises.Pais.find(p => p.nome === nomePais)

    return res.json(dadosPais)
})

//Pegar todas as ligas do País
server.get('/paises/ligas/:pais', (req, res) => {
    const nomePais = req.params.pais

    const dadosPais = dadosPaises.Pais.find(p => p.nome === nomePais)

    const dadosLigas = dadosPais.campeonatos

    return res.json(dadosLigas)
})

//Pegar a liga do time
server.get('/paises/:pais/:liga', (req, res) => {
    const nomePais = req.params.pais

    const nomeLiga = req.params.liga

    const dadosPais = dadosPaises.Pais.find(p => p.nome === nomePais)

    const dadosLiga = dadosPais.campeonatos.find(c => c.nome === nomeLiga)

    return res.json(dadosLiga)
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