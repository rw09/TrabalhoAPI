const express = require('express')
const server = express()
const dados = require('./data/dadosCompeticoes.json')
const fs = require('fs')


server.use(express.json())


server.get('/competicoes', (req, res) => {
    return res.json(dados.Competicao)
})


//depois trocar para id
server.get('/competicoes/:nome', (req, res) => {
    
    const competicaoNome = req.params.nome

    const competicao = dados.Competicao.find(c => c.nome === competicaoNome)

    if (!competicao) {
        return res.status(404).json({mensagem: "Competição não encontrada :/"})
    }
    
    return res.json(competicao);
})

module.exports = {server}