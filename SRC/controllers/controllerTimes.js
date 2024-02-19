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

    // console.log(novoTime)

    let fotoEstadio;
    let fotoEscudo;
    let fotoUniformeHome;
    let fotoUniformeAway;
    let fotoUniformeThird;
    let fotoUniformeGK;
    let uploadPath;
    
    let paisDoTime = 'Auebas'
    // let paisDoTime = novoTime.pais

    // console.log(req.files)

    if(req.files) {
        
        if(req.files.fotoEscudo) {
            
            if (!fs.existsSync(`src/img/escudos/${paisDoTime}/big`)) {
                fs.mkdirSync(`src/img/escudos/${paisDoTime}/big`, { recursive: true });
            }

            //temp
            if (!fs.existsSync(`src/img/escudos/${paisDoTime}/small`)) {
                fs.mkdirSync(`src/img/escudos/${paisDoTime}/small`, { recursive: true });
            }

            fotoEscudo = req.files.fotoEscudo;
            uploadPath = `src/img/escudos/${paisDoTime}/big/${novoTime.nome}.png`

            // Use the mv() method to place the file somewhere on your server
            fotoEscudo.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            })

            uploadPath = `src/img/escudos/${paisDoTime}/small/${novoTime.nome}.png`

            // Use the mv() method to place the file somewhere on your server
            fotoEscudo.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            })

            fotoEscudo = uploadPath.replace("src", "..")

        } else {
            fotoEscudo = req.body.fotoEscudo
        }


        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        if(req.files.fotoEstadio) {

            console.log(req.files.fotoEstadio)
            console.log(fotoEstadio)
            
            if (!fs.existsSync(`src/img/estadios/${paisDoTime}`)) {
                fs.mkdirSync(`src/img/estadios/${paisDoTime}`, { recursive: true });
            }

            fotoEstadio = req.files.fotoEstadio;
            uploadPath = `src/img/estadios/${paisDoTime}/${novoTime.nomeEstadio}.png`

            console.log('********** UPILOADIPATI')
            console.log(uploadPath)
            console.log('********** foto estadio 2.name')
            console.log(fotoEstadio.name)

                // Use the mv() method to place the file somewhere on your server
            fotoEstadio.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            });

            fotoEstadio = uploadPath.replace("src", "..")
            console.log('********** foto estadio 3 a vingança')
            console.log(fotoEstadio)
        } else {
            console.log('entrou aqui e nao devia ter entrado')
            fotoEstadio = req.body.fotoEstadio
        }


        if(req.files.fotoUniformeHome) {
            
            if (!fs.existsSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`)) {
                fs.mkdirSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`, { recursive: true });
            }

            fotoUniformeHome = req.files.fotoUniformeHome;
            uploadPath = `src/img/uniformes/${paisDoTime}/${novoTime.nome}/1.png`

            fotoUniformeHome.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            });

            fotoUniformeHome = uploadPath.replace("src", "..")

        } else {
            fotoUniformeHome = req.body.fotoUniformeHome
        }

        if(req.files.fotoUniformeAway) {
            
            if (!fs.existsSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`)) {
                fs.mkdirSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`, { recursive: true });
            }

            fotoUniformeAway = req.files.fotoUniformeAway;
            uploadPath = `src/img/uniformes/${paisDoTime}/${novoTime.nome}/2.png`

            fotoUniformeAway.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            });

            fotoUniformeAway = uploadPath.replace("src", "..")

        } else {
            fotoUniformeAway = req.body.fotoUniformeAway
        }

        if(req.files.fotoUniformeThird) {
            
            if (!fs.existsSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`)) {
                fs.mkdirSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`, { recursive: true });
            }

            fotoUniformeThird = req.files.fotoUniformeThird;
            uploadPath = `src/img/uniformes/${paisDoTime}/${novoTime.nome}/3.png`

            fotoUniformeThird.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            });

            fotoUniformeThird = uploadPath.replace("src", "..")

        } else {
            fotoUniformeThird = req.body.fotoUniformeThird
        }

        if(req.files.fotoUniformeGK) {
            
            if (!fs.existsSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`)) {
                fs.mkdirSync(`src/img/uniformes/${paisDoTime}/${novoTime.nome}`, { recursive: true });
            }

            fotoUniformeGK = req.files.fotoUniformeGK;
            uploadPath = `src/img/uniformes/${paisDoTime}/${novoTime.nome}/gk.png`

            fotoUniformeGK.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            });

            fotoUniformeGK = uploadPath.replace("src", "..")

        } else {
            fotoUniformeGK = req.body.fotoUniformeGK
        }
    }

    novoTime.escudo = fotoEscudo

    delete novoTime.fotoEscudo

    let cores = [novoTime.cor1, novoTime.cor2]

    if(novoTime.cor3 != '#f3f4f6') {
        cores.push(novoTime.cor3)
    }

    novoTime.cores = cores

    delete novoTime.cor1;
    delete novoTime.cor2;
    delete novoTime.cor3;


    let uniformes = []
    fotoUniformeHome ? uniformes.push({ modelo: 'Home', img: fotoUniformeHome }) : null
    fotoUniformeAway ? uniformes.push({ modelo: 'Away', img: fotoUniformeAway }) : null
    fotoUniformeThird ? uniformes.push({ "modelo": 'Third', "img": fotoUniformeThird }) : null
    fotoUniformeGK ? uniformes.push({ "modelo": 'GK', "img": fotoUniformeGK }) : null
    

    novoTime.uniformes = uniformes

    delete novoTime.fotoUniformeHome;
    delete novoTime.fotoUniformeAway;
    delete novoTime.fotoUniformeThird;
    delete novoTime.fotoUniformeGK;

    let estadio = {
        "nome": novoTime.nomeEstadio,
        "inauguracao": novoTime.inauguracaoEstadio,
        "capacidade": novoTime.capacidadeEstadio,
        "foto": fotoEstadio
    }

    novoTime.estadio = estadio

    delete novoTime.nomeEstadio;
    delete novoTime.inauguracaoEstadio;
    delete novoTime.capacidadeEstadio;
    delete novoTime.fotoEstadio;

    
    dados[`Times${novoTime.pais}`].push(novoTime)
    salvarDados(dados)

    return res.json(novoTime)
    
    // return  res.status(200).json({ mensagem: "Time criado com sucesso" });
})


server.delete("/times/:pais/:id", (req, res) => {
 
    const timeId = parseInt(req.params.id)

    const paisTime = req.params.pais

    dados[`Times${paisTime}`] = dados[`Times${paisTime}`].filter(t => t.id !== timeId)
 
    salvarDados(dados)

    return res.status(200).json({mensagem: "Time excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosTimes2.json', JSON.stringify(dados, null, 2))
    // fs.writeFileSync(__dirname + '/data/dadosTimes.json', JSON.stringify(dados, null, 2))
}

module.exports = {server, salvarDados}