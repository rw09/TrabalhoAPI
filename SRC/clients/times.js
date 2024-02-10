document.addEventListener('DOMContentLoaded', function () {
    carregarListaTimes();
})


//sem todos os times
// function carregarListaTimes() {
//     fetch(`http://localhost:3000/api/times/${paisEscolhido}`)
//         .then(response => response.json())
//         .then(data => mostrarListaTimes(data))
//         .catch(error => console.error("Erro:", error))
//         console.log('ola' + paisEscolhido)
// }


//com todos os times
function carregarListaTimes() {
    fetch(`http://localhost:3000/api/times/${paisEscolhido}`)
        .then(response => response.json())
        .then(data => paisEscolhido === 'Todos' ? mostrarListaTodosTimes(data) : mostrarListaTimes(data))
        .catch(error => console.error("Erro:", error))
}


function mostrarListaTimes(data) {
    
    data.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))

    let listaDeTimes = document.createElement('section')
    listaDeTimes.id = 'listaDeTimes'
    listaDeTimes.className = 'grid grid-cols-5 gap-6 p-7'

    let main = document.getElementById('main')

    main.appendChild(listaDeTimes)
    

    data.forEach(time => {
        let cardBorda = document.createElement('div')
        cardBorda.className = 'p-4 border border-black'
        let cardTime = document.createElement('div')
        // cardTime.className = 'card'
        cardTime.className = "grid grid-rows-[175px 105px] justify-items-center h-72 bg-[#ebe8e8] py-5 px-2.5 border border-gray-500  hover:bg-[ghostwhite] hover:cursor-pointer hover:opacity-75"
        // cardTime.className = "grid grid-rows-[175px 105px] justify-items-center h-72 bg-[#ebe8e8] py-5 px-2.5 border-[15px] border-white box-shadow-md rounded-sm hover:bg-[ghostwhite] hover:cursor-pointer hover:opacity-75"
        // cardTime.style.gridTemplateRows = '175px 105px'
        cardBorda.appendChild(cardTime)
        let escudo = document.createElement('img')
        escudo.className = "escudo"
        escudo.style.paddingTop = '55px'
        escudo.src = time.escudo
        cardTime.appendChild(escudo)

        let nome = document.createElement('h2')
        nome.className = "text-center leading-8"
        nome.innerText = time.nome
        cardTime.appendChild(nome)
        
        cardTime.addEventListener('click', function() {
            carregarDetalhesTime(time.id)
        })
        
        listaDeTimes.appendChild(cardBorda)
       
    })
}



function carregarDetalhesTime(id, liga) {

    //depois melhorar
    if(liga != undefined) {
        if(liga === 'Bundesliga') {
            paisEscolhido = 'Alemanha'
        } else if(liga === 'Premier League') {
            paisEscolhido = 'Inglaterra'
        } else if(liga === 'Brasileirão') {
            paisEscolhido = 'Brasil'
        }
        
        
    }
    fetch(`http://localhost:3000/api/times/${paisEscolhido}/${id}`)
        .then(response => response.json())
        .then(function(data) {
            criarDialog(data)
        })
        .catch(error => console.error("Erro:", error))
}


function criarDialog(time) {
    let dialog = document.createElement('dialog')
    let cabecalho = document.createElement('div')
    cabecalho.style.height = '270px'
    cabecalho.style.display = 'grid'
    cabecalho.style.gridTemplateColumns = '270px 1fr'
    cabecalho.style.gridTemplateRows = '120px 1fr 1fr'

    let logoDiv = document.createElement('div')
    logoDiv.style.backgroundColor = '#fff'
    logoDiv.style.gridRow = '1 / span 3';
    logoDiv.style.display = 'flex'
    logoDiv.style.justifyContent = 'center'
    logoDiv.style.alignItems = 'center'
    // logoDiv.style.border = '2px solid black'

    let logo = document.createElement('img')
    logo.style.height = '90%'
    logo.src = time.escudo.replace('small', 'big')
    logoDiv.appendChild(logo)

    cabecalho.appendChild(logoDiv)

    let nomeDiv = document.createElement('div')
    // nomeDiv.style.gridRow = '1 / span 2';
    nomeDiv.style.backgroundColor = time.cores[0]
    nomeDiv.style.color = time.cores[1]
    // nomeDiv.style.textAlign = 'center'
    nomeDiv.style.display = 'flex'
    nomeDiv.style.justifyContent = 'center'
    nomeDiv.style.alignItems = 'center'

    let nome = document.createElement('h1')
    nome.innerText = time.nome_completo

    nomeDiv.appendChild(nome)

    cabecalho.appendChild(nomeDiv)








    let corpo = document.createElement('div')
    corpo.style.height = '320px'
    corpo.style.backgroundColor = '#f5a000'
    corpo.style.color = '#ffffff'
    corpo.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam eos, harum modi alias accusamus odio, voluptatibus iusto eius sequi porro excepturi reiciendis animi, voluptates dicta! Non sapiente voluptatum numquam ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam eos, harum modi alias accusamus odio, voluptatibus iusto eius sequi porro excepturi reiciendis animi, voluptates dicta! Non sapiente voluptatum numquam ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam eos, harum modi alias accusamus odio, voluptatibus iusto eius sequi porro excepturi reiciendis animi, voluptates dicta! Non sapiente voluptatum numquam ex?"
    // cabecalho.className = 'cabeçalho'
    // cabecalho.style.backgroundColor = time.cores[0]
    // cabecalho.style.color = time.cores[1]
    // let logoCard = document.createElement('div')
    // logoCard.style.backgroundColor = '#ffffff'
    // let logo = document.createElement('img')
    // logo.src = time.escudo.replace('small', 'big')
    // logoCard.appendChild(logo)
    // header.appendChild(logoCard)
    dialog.appendChild(cabecalho)
    dialog.appendChild(corpo)

    document.body.appendChild(dialog)

    dialog.showModal()
}


























































//////////////////////////// testando pegar elementos


function mostrarDetalhesTime(id, liga) {

    //depois melhorar
    if(liga != undefined) {
        if(liga === 'Bundesliga') {
            paisEscolhido = 'Alemanha'
        } else if(liga === 'Premier League') {
            paisEscolhido = 'Inglaterra'
        } else if(liga === 'Brasileirão') {
            paisEscolhido = 'Brasil'
        }
        
        
    }
    fetch(`http://localhost:3000/api/times/${paisEscolhido}/${id}`)
        .then(response => response.json())
        .then(function(data) {
            criarNovoDialog(data)
        })
        .catch(error => console.error("Erro:", error))
}


function criarNovoDialog(time) {
    
    
    
    let dialog = document.createElement('dialog')
    let cabecalho = document.createElement('div')
    cabecalho.style.height = '270px'
    cabecalho.style.display = 'grid'
    cabecalho.style.gridTemplateColumns = '270px 1fr'
    cabecalho.style.gridTemplateRows = '120px 1fr 1fr'

    let logoDiv = document.createElement('div')
    logoDiv.style.backgroundColor = '#fff'
    logoDiv.style.gridRow = '1 / span 3';
    logoDiv.style.display = 'flex'
    logoDiv.style.justifyContent = 'center'
    logoDiv.style.alignItems = 'center'
    // logoDiv.style.border = '2px solid black'

    let logo = document.createElement('img')
    logo.style.height = '90%'
    logo.src = time.escudo.replace('small', 'big')
    logoDiv.appendChild(logo)

    cabecalho.appendChild(logoDiv)

    let nomeDiv = document.createElement('div')
    // nomeDiv.style.gridRow = '1 / span 2';
    nomeDiv.style.backgroundColor = time.cores[0]
    nomeDiv.style.color = time.cores[1]
    // nomeDiv.style.textAlign = 'center'
    nomeDiv.style.display = 'flex'
    nomeDiv.style.justifyContent = 'center'
    nomeDiv.style.alignItems = 'center'

    let nome = document.createElement('h1')
    nome.innerText = time.nome_completo

    nomeDiv.appendChild(nome)

    cabecalho.appendChild(nomeDiv)








    let corpo = document.createElement('div')
    corpo.style.display = 'flex'
    // corpo.style.height = '320px'
    corpo.style.backgroundColor = '#f5a000'
    corpo.style.color = '#ffffff'
    // corpo.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam eos, harum modi alias accusamus odio, voluptatibus iusto eius sequi porro excepturi reiciendis animi, voluptates dicta! Non sapiente voluptatum numquam ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam eos, harum modi alias accusamus odio, voluptatibus iusto eius sequi porro excepturi reiciendis animi, voluptates dicta! Non sapiente voluptatum numquam ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam eos, harum modi alias accusamus odio, voluptatibus iusto eius sequi porro excepturi reiciendis animi, voluptates dicta! Non sapiente voluptatum numquam ex?"
    // cabecalho.className = 'cabeçalho'
    // cabecalho.style.backgroundColor = time.cores[0]
    // cabecalho.style.color = time.cores[1]
    // let logoCard = document.createElement('div')
    // logoCard.style.backgroundColor = '#ffffff'
    // let logo = document.createElement('img')
    // logo.src = time.escudo.replace('small', 'big')
    // logoCard.appendChild(logo)
    // header.appendChild(logoCard)
    dialog.appendChild(cabecalho)
    dialog.appendChild(corpo)


    console.log('aqui')
    console.log(time['uniforme'])

    let uniformes = time['uniforme']

    console.log(uniformes)

    uniformes.forEach(uniforme => {
        let img = document.createElement('img')
        img.src = uniforme.img
        let modelo = document.createElement('h5')
        modelo.innerText = uniforme.modelo
        corpo.appendChild(modelo)
        corpo.appendChild(img)
    });

    let estadioNome = document.createElement('h1')
    estadioNome.innerHTML = `Estádio: ${time['estadio'].nome}`

    corpo.appendChild(estadioNome)


    let fotoEstadio = document.createElement('img')
    fotoEstadio.src = time['estadio'].foto

    corpo.appendChild(fotoEstadio)


    console.log(time.titulos)


    document.body.appendChild(dialog)

    console.log(time.titulos)

    let titulos = time.titulos

    titulos.forEach(titulo => {
        console.log(titulo.competicao)
        console.log(titulo.edicoes.toString().replaceAll(',', ', '))

        let nomeTitulo = document.createElement('h2')
        nomeTitulo.innerHTML = `${titulo.competicao} (${titulo.edicoes.length})`
        let tituloEdicoes = document.createElement('p')
        tituloEdicoes.innerHTML = titulo.edicoes.toString().replaceAll(',', ', ')
        dialog.appendChild(nomeTitulo)
        dialog.appendChild(tituloEdicoes)
    });

    console.log('dados pais')
    console.log(time.pais)

    console.log(`http://localhost:3000/api/paises/${time.pais}`)

    fetch(`http://localhost:3000/api/paises/${time.pais}`)
    .then(response => response.json())
    .then(function(data) {
        console.log('pais11:')
        console.log(data.campeonatos)
        console.log(data.copas)

        let img = document.createElement('img')
        img.src = data.bandeira
        dialog.appendChild(img)
    })
    .catch(error => console.error("Erro:", error))



    let info = document.createElement('div')
    let infoConteudo = document.createElement('p')
    
    
    infoConteudo.innerHTML = '<b>Nome Completo:</b> ' + time.nome_completo + '<br>'

    infoConteudo.innerHTML += '<b>Fundação:</b> ' + time.fundacao + '<br>'

    infoConteudo.innerHTML += '<b>Cidade:</b> ' + time.cidade + '<br>'

    infoConteudo.innerHTML += '<b>Estado:</b> ' + time.estado + '<br>'

    infoConteudo.innerHTML += '<b>País:</b> ' + time.pais + '<br>'

    infoConteudo.innerHTML += '<b>Liga:</b> ' + time.liga + '<br>'

    infoConteudo.innerHTML += '<b>Presidente:</b> ' + time.presidente + '<br>'

    infoConteudo.innerHTML += '<b>Website:</b> ' + time.website + '<br>'

    infoConteudo.innerHTML += '<b>E-mail:</b> ' + time.email + '<br>'

    infoConteudo.innerHTML += '<b>Marca Uniforme:</b> ' + time.marca_uniforme + '<br>'


    infoConteudo.innerHTML += '<br><br><br>' + time.resumo

    info.appendChild(infoConteudo)
    dialog.appendChild(info)


    fetch(`http://localhost:3000/api/paises/${time.pais}/${time.liga}`)
    .then(response => response.json())
    .then(function(data) {
        console.log('liga')
        console.log(data)

        let logoLiga = document.createElement('img')
        logoLiga.src = data.logo
        dialog.appendChild(logoLiga)
        
    })
    .catch(error => console.error("Erro:", error))

    

    dialog.showModal()
}
















//backup pra quando mostrar todos, contem a bandeira e o logo da liga
function mostrarListaTodosTimes(data) {
    
    data.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))

    let listaDeTimes = document.createElement('section')
    listaDeTimes.id = 'listaDeTimes'
    listaDeTimes.className = 'grid grid-cols-5 gap-x-6 gap-y-10 p-8'

    let main = document.getElementById('main')

    main.appendChild(listaDeTimes)
    

    data.forEach(time => {
        let cardTime = document.createElement('div')
        cardTime.className = 'group p-4 border border-black bg-white hover:cursor-pointer hover:shadow-xl hover:bg-[#ebe8e8] transition duration-300 ease-in-out'
        
        let cardTimeConteudo = document.createElement('div')
        cardTimeConteudo.className = "grid grid-rows-[80px 175px 105px] gap-y-7 justify-items-center text-center h-full bg-[#ebe8e8] pt-5 pb-8 border border-black group-hover:opacity-80 group-hover:border-[#ebe8e8] transition ease-in-out duration-300"
        
        cardTime.appendChild(cardTimeConteudo)

        let logoLiga = document.createElement('img')
        logoLiga.src=`../img/ligas/${time.liga}.png`
        logoLiga.className = 'w-2/6'
      
        cardTimeConteudo.appendChild(logoLiga)

        let escudo = document.createElement('img')
        escudo.src = time.escudo
        cardTimeConteudo.appendChild(escudo)

        let nome = document.createElement('h2')
        nome.innerText = time.nome
        cardTimeConteudo.appendChild(nome)
        
        cardTime.addEventListener('click', function() {
            mostrarDetalhesTime(time.id, time.liga)
        })

        listaDeTimes.appendChild(cardTime)
       
    })
}
