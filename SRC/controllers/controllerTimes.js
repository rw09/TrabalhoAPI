const express = require('express')
const server = express()
// const dados = require('./data/dadosTimes.json')
const dados = require('./data/dadosTimes2.json')
const fs = require('fs')
const path = require('path'); 

const fileUpload = require('express-fileupload');
server.use(fileUpload());

server.use(express.json())


server.get('/times/Todos', (req, res) => {
    
    const times = [];
    
    for(const pais in dados) {
        for(const time of dados[pais]) {
            times.push(time)
        }
    }
        
    return res.json(times);
}) 

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


server.post('/times', function(req, res)  {
    
    const novoTime = req.body;

    console.log(novoTime)

    let fotoEstadio;
    let uploadPath;

    let paisDoTime = 'Tokyio'

    if (!fs.existsSync(`src/img/estadios/${paisDoTime}`)) {
        fs.mkdirSync(`src/img/estadios/${paisDoTime}`, { recursive: true });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    fotoEstadio = req.files.fotoEstadio;
    // uploadPath = path.join(__dirname, '..', 'hello', fotoEstadio.name)
    // uploadPath = path.join(__dirname, '..', 'img', 'estadios', paisDoTime, fotoEstadio.name)
    uploadPath = `src/img/estadios/${paisDoTime}/${fotoEstadio.name}`

    console.log(uploadPath)

    // Use the mv() method to place the file somewhere on your server
    fotoEstadio.mv(uploadPath, function(err) {
        if (err)
        return res.status(500).send(err);

        res.send('File uploaded!');
    });
    
    // res.status(200).json({ mensagem: "Time criado com sucesso" });
})


server.delete("/times/:pais/:id", (req, res) => {
    const timeId = parseInt(req.params.id)

    console.log('time idddd: ' + timeId)
    const paisTime = req.params.pais

    dados[`Times${paisTime}`] = dados[`Times${paisTime}`].filter(t => t.id !== timeId)
    // dados.TimesAlemanha = dados.TimesAlemanha.filter(u => u.id !== timeId)

    console.log(dados[`Times${paisTime}`])

    salvarDados(dados)

    return res.status(200).json({mensagem: "Time excluido com sucesso"})
})

function salvarDados(){
    // fs.writeFileSync(__dirname + '/data/dadosTimes2.json', JSON.stringify(dados, null, 2))
    fs.writeFileSync(__dirname + '/data/dadosTimes.json', JSON.stringify(dados, null, 2))
}

module.exports = {server, salvarDados}