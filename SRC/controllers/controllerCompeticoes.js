const express = require('express')
const server = express()
const dados = require('./data/dadosCompeticoes.json')
const fs = require('fs')


server.use(express.json())


server.get('/competicoes', (req, res) => {
    return res.json(dados.Competicao)
})


server.get('/competicoes/:nome', (req, res) => {
    const competicaoNome = req.params.nome

    const competicao = dados.Competicao.find(c => c.nome === competicaoNome)

    if (!competicao) {
        return res.status(404).json({mensagem: "Competição não encontrada :/"})
    }
    
    return res.json(competicao);
})

//pegar competições pelo nivel
server.get('/competicoes/continental/:continente', (req, res) => {
    let continente = req.params.continente

    const competicaoNivel = `Continental - ${continente}`

    const competicao = dados.Competicao.filter(c => c.nivel === competicaoNivel)

    if (!competicao) {
        return res.status(404).json({mensagem: "Competição não encontrada :/"})
    }
    
    return res.json(competicao);
})

module.exports = {server}