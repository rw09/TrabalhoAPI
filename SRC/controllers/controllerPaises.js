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

//Pegar a liga do time
server.get('/paises/:pais/:liga', (req, res) => {

    const nomePais = req.params.pais

    const nomeLiga = req.params.liga

    const dadosPais = dadosPaises.Pais.find(p => p.nome === nomePais)

    const dadosLiga = dadosPais.campeonatos.find(c => c.nome === nomeLiga)

    return res.json(dadosLiga)
})


//Pegar todas as competições de um país
// server.get('/paises/:pais/', (req, res) => {

//     const nomePais = req.params.pais

//     const nomeCompeticao = req.params.competicao

//     const dadosPais = dadosPaises.Pais.find(p => p.nome === nomePais)

//     const dadosCompeticao = dadosPais.campeonatos.find(c => c.nome === nomeCompeticao)

//     const competicoesEncontradas = dadosPais.campeonatos.concat(dadosPais.copas).filter(c => c.nome === nomeCompeticao);

//     if(!dadosCompeticao) {
//         dadosCompeticao = dadosPais.copas.find(c => c.nome === nomeCompeticao)
//     }

//     return res.json(competicoesEncontradas)
// })


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