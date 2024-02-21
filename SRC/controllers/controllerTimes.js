const express = require('express')
const server = express()
const dados = require('./data/dadosTimes.json')
const fs = require('fs')
const path = require('path'); 

const fileUpload = require('express-fileupload');
server.use(fileUpload());

server.use(express.json())


server.get('/times/proximoID', (req, res) => {

    let times = dados.TimesAlemanha.concat(dados.TimesBrasil, dados.TimesEspanha, dados.TimesFrança, dados.TimesInglaterra, dados.TimesItália)

    let maiorId = 0;

    times.forEach(time => {
        if (time.id > maiorId) {
            maiorId = time.id
        }
    })

    return res.json({ proximoID: maiorId + 1 })
});

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

    novoTime.titulos = JSON.parse(novoTime.titulos)
    
    let novoTitulos = []
    novoTime.titulos.forEach(titulo => {
        titulo = JSON.parse(titulo)    
        novoTitulos.push(titulo)
    });

    delete novoTime.titulos

    novoTime.titulos = novoTitulos

    let fotoEstadio = req.body.fotoEstadio;
    let fotoEscudo = req.body.fotoEscudo;
    let fotoUniformeHome = req.body.fotoUniformeHome;
    let fotoUniformeAway = req.body.fotoUniformeAway;
    let fotoUniformeThird = req.body.fotoUniformeThird;
    let fotoUniformeGK = req.body.fotoUniformeGK;
    let uploadPath;


    // let paisDoTime = 'Teste'
    let paisDoTime = novoTime.pais

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

            if (!fs.existsSync(`src/img/estadios/${paisDoTime}`)) {
                fs.mkdirSync(`src/img/estadios/${paisDoTime}`, { recursive: true });
            }

            fotoEstadio = req.files.fotoEstadio;
            uploadPath = `src/img/estadios/${paisDoTime}/${novoTime.nomeEstadio}.png`

            // Use the mv() method to place the file somewhere on your server
            fotoEstadio.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            });

            fotoEstadio = uploadPath.replace("src", "..")
        } else {
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

    return res.status(200).json({ mensagem: "Time criado com sucesso" });
    
})


server.put('/times/:id', function(req, res)  {
    
    const timeId = parseInt(req.params.id)

    let times = dados.TimesAlemanha.concat(dados.TimesBrasil, dados.TimesEspanha, dados.TimesFrança, dados.TimesInglaterra, dados.TimesItalia);
    let time = times.find(t => t.id === timeId);
       
    const novoTime = req.body

    novoTime.titulos = JSON.parse(novoTime.titulos)
    
    let novoTitulos = []
    novoTime.titulos.forEach(titulo => {
        titulo = JSON.parse(titulo)    
        novoTitulos.push(titulo)
    });

    delete novoTime.titulos

    novoTime.titulos = novoTitulos

    let fotoEstadio = req.body.fotoEstadio;
    let fotoEscudo = req.body.fotoEscudo;
    let fotoUniformeHome = req.body.fotoUniformeHome;
    let fotoUniformeAway = req.body.fotoUniformeAway;
    let fotoUniformeThird = req.body.fotoUniformeThird;
    let fotoUniformeGK = req.body.fotoUniformeGK;
    let uploadPath;

    // let paisDoTime = 'Teste'
    let paisDoTime = novoTime.pais

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

            // Use the mv() method to place the file somewhere on your server
            fotoEstadio.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                } 
            });

            fotoEstadio = uploadPath.replace("src", "..")
        } else {
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

    

    //atualizando os dados
    time.nome = novoTime.nome
    time.nome_completo = novoTime.nome_completo
    time.apelido = novoTime.apelido
    time.fundacao = novoTime.fundacao
    time.presidente = novoTime.presidente
    time.website = novoTime.website
    time.email = novoTime.email
    time.escudo = novoTime.escudo
    time.cidade = novoTime.cidade
    time.estado = novoTime.estado
    time.pais = novoTime.pais
    time.liga = novoTime.liga
    time.estadio = novoTime.estadio
    time.uniformes = novoTime.uniformes
    time.marca_uniforme = novoTime.marca_uniforme
    time.titulos = novoTime.titulos
    salvarDados(dados)

    return res.status(200).json({mensagem: "Time atualizado com sucesso!"})
})


server.delete("/times/:pais/:id", (req, res) => {
 
    const timeId = parseInt(req.params.id)

    const paisTime = req.params.pais

    dados[`Times${paisTime}`] = dados[`Times${paisTime}`].filter(t => t.id !== timeId)
 
    salvarDados(dados)

    return res.status(200).json({mensagem: "Time excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosTimes.json', JSON.stringify(dados, null, 2))
}

module.exports = {server, salvarDados}