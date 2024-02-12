document.addEventListener('DOMContentLoaded', function () {
    carregarListaTimes();
})


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


/*
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
*/
/*
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
*/
































































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
            carregarDetalhesTime(time.id, time.pais)
        })

        listaDeTimes.appendChild(cardTime)
       
    })
}


function carregarDetalhesTime(id, pais) {

    fetch(`http://localhost:3000/api/times/${pais}/${id}`)
        .then(response => response.json())
        .then(function(data) {
            criarDialog(data)
        })
        .catch(error => console.error("Erro:", error))
}



function criarDialog(time) {
    
    let dialog = document.createElement('dialog')
    dialog.className = 'w-5/6'
        
    let cabecalho = document.createElement('div')
    cabecalho.className = `h-64 w-full bg-[${time.cores[0]}] flex mb-3 shadow-md pr-5 sticky top-0`
    cabecalho.id = 'cabecalho'

    let divEscudo = document.createElement('div')
    divEscudo.className = "flex justify-center items-center px-5 m-4 w-1/4"

    let escudo = document.createElement('img')
    // escudo.style.height = '90%'
    escudo.className = "h-5/6"
    escudo.src = time.escudo.replace('small', 'big')
    divEscudo.appendChild(escudo)

    cabecalho.appendChild(divEscudo)

    let divNomeApelido = document.createElement('div')
    divNomeApelido.className = "flex w-full flex-col justify-center items-center gap-8 pr-5"

    let nomeTime = document.createElement('h1')
    nomeTime.className = `text-5xl font-bold text-center text-[${time.cores[1]}]`
    nomeTime.innerText = time.nome_completo

    divNomeApelido.appendChild(nomeTime)

    let apelido = document.createElement('h2')
    apelido.className = `text-2xl font-bold text-[${time.cores[1]}]`
    apelido.innerText = `"${time.apelido}"`

    divNomeApelido.appendChild(apelido)

    cabecalho.appendChild(divNomeApelido)

    dialog.appendChild(cabecalho)


    let divConteudos = document.createElement('div')
    divConteudos.className = 'mt-5 mx-12 grid gap-4'

    dialog.appendChild(divConteudos)

    let divResumo = document.createElement('div')
    divResumo.className = 'my-4 px-12 pt-8 pb-12 border-2 border-gray-200 bg-gray-100 shadow-md'

    let tituloResumo = document.createElement('h3')
    tituloResumo.className = 'text-xl border-b-2 border-gray-300 mb-6 font-medium'
    tituloResumo.innerText = 'Resumo:'

    divResumo.appendChild(tituloResumo)

    let resumo = document.createElement('p')
    resumo.className = 'text-lg'
    resumo.innerText = time.resumo

    divResumo.appendChild(resumo)

    divConteudos.appendChild(divResumo)

    let divInfo = document.createElement('div')
    divInfo.className = 'my-4 px-12 pt-8 pb-12 border-2 border-gray-200 bg-gray-100 shadow-md'

    let tituloInfo = document.createElement('h3')
    tituloInfo.className = 'text-xl border-b-2 border-gray-300 mb-6 font-medium'
    tituloInfo.innerText = 'Info:'

    divInfo.appendChild(tituloInfo)


    let info = document.createElement('div')
    info.className = 'grid grid-cols-2 gap-y-2 gap-x-8'

    divInfo.appendChild(info)

    let fundacao = document.createElement('h4')
    fundacao.innerHTML = '<b>Fundação:</b> ' + time.fundacao
    fundacao.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(fundacao)

    let divCores = document.createElement('div')
    divCores.className = 'flex gap-x-2 justify-start items-center bg-gray-200 p-2 pl-4'
    info.appendChild(divCores)

    let coresTitulo = document.createElement('h4')
    coresTitulo.innerHTML = '<b>Cores:</b> '
    divCores.appendChild(coresTitulo)

    time.cores.forEach(cor => {
        let divCor = document.createElement('div')
        divCor.className = `bg-[${cor}] border-black border-2 w-6 h-6`
        divCores.appendChild(divCor)
    });

    let cidade = document.createElement('h4')
    cidade.innerHTML = '<b>Cidade:</b> ' + time.cidade
    cidade.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(cidade)

    let estado = document.createElement('h4')
    estado.innerHTML = '<b>Estado:</b> ' + time.estado
    estado.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(estado)

    let divPais = document.createElement('div')
    divPais.className = 'flex gap-x-2 justify-start items-center bg-gray-200 p-2 pl-4'
    info.appendChild(divPais)

    let pais = document.createElement('h4')
    pais.innerHTML = '<b>País:</b> ' + time.pais
    divPais.appendChild(pais)

    let bandeiraPais = document.createElement('img')
    bandeiraPais.className = 'h-5'
    bandeiraPais.src = `../img/bandeiras/small/${time.pais}.png`

    divPais.appendChild(bandeiraPais)

    let divLiga = document.createElement('div')
    divLiga.className = 'flex gap-x-2 justify-start items-center bg-gray-200 p-2 pl-4'
    info.appendChild(divLiga)

    let liga = document.createElement('h4')
    liga.innerHTML = '<b>Liga:</b> ' + time.liga
    divLiga.appendChild(liga)

    let logoLiga = document.createElement('img')
    logoLiga.className = 'h-6'
    let nomeLiga = time.liga.replace(" ", "")
    logoLiga.src = `../img/competicoes/${time.pais}/${nomeLiga}.png`

    divLiga.appendChild(logoLiga)
    
    let presidente = document.createElement('h4')
    presidente.innerHTML = '<b>Presidente:</b> ' + time.presidente
    presidente.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(presidente)

    let marcaUniforme = document.createElement('h4')
    marcaUniforme.innerHTML = '<b>Marca do Uniforme:</b> ' + time.marca_uniforme
    marcaUniforme.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(marcaUniforme)

    let website = document.createElement('h4')
    // website.innerHTML = `<b>Website:</b> <a href=${time.website}>${time.website}</a>`
    website.innerHTML = '<b>Website:</b> ' + time.website
    website.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(website)

    let email = document.createElement('h4')
    // email.innerHTML = `<b>E-mail:</b> <a href="mailto:${time.email}">${time.email}</a>`
    email.innerHTML = '<b>E-mail:</b> ' + time.email
    email.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(email)

    

    
    


    divConteudos.appendChild(divInfo)


    let divUniformes = document.createElement('div')
    divUniformes.className = 'my-4 px-12 pt-8 pb-14 border-2 border-gray-200 bg-gray-100 shadow-md'

    let tituloUniformes = document.createElement('h3')
    tituloUniformes.className = 'text-xl border-b-2 border-gray-300 mb-6 font-medium'
    tituloUniformes.innerText = 'Uniformes:'

    let divImagensUniformes = document.createElement('div')
    divImagensUniformes.className = 'flex gap-12 justify-center'

    time.uniformes.forEach(uniforme => {
        let div = document.createElement('div')
        div.className = 'flex flex-col justify-center items-center gap-4'
        let modelo = document.createElement('h3')
        modelo.innerText = uniforme.modelo
        let img = document.createElement('img')
        img.src = uniforme.img

        div.appendChild(modelo)
        div.appendChild(img)

        divImagensUniformes.appendChild(div)
        
    });

    divUniformes.appendChild(tituloUniformes)

    divUniformes.appendChild(divImagensUniformes)

    divConteudos.appendChild(divUniformes)


    let divEstadio = document.createElement('div')
    divEstadio.className = 'my-4 px-12 pt-8 pb-8 border-2 border-gray-200 bg-gray-100 shadow-md'

    let tituloEstadio = document.createElement('h3')
    tituloEstadio.className = 'text-xl border-b-2 border-gray-300 mb-6 font-medium'
    tituloEstadio.innerText = 'Estádio:'

    let divInfoEstadio = document.createElement('div')
    divInfoEstadio.className = 'flex flex-col gap-4 justify-center items-center'

    let nomeEstadio = document.createElement('h3')
    nomeEstadio.className = 'font-semibold'
    nomeEstadio.innerText = time['estadio']['nome']

    let fotoEstadio = document.createElement('img')
    fotoEstadio.className = 'w-1/2'
    fotoEstadio.src = time.estadio.foto

    divInfoEstadio.appendChild(nomeEstadio)
    divInfoEstadio.appendChild(fotoEstadio)

    divEstadio.appendChild(tituloEstadio)

    let divInauguracaoCapacidadeEstadio = document.createElement('div')
    divInauguracaoCapacidadeEstadio.className = 'flex justify-between w-2/4 px-8'

    let inauguracao = document.createElement('h3')
    inauguracao.innerHTML = `<b>Inauguração:</b> ${time['estadio']['inauguracao']}`

    let capacidade = document.createElement('h3')
    capacidade.innerHTML = `<b>Capacidade:</b> ${time['estadio']['capacidade']}`

    divInauguracaoCapacidadeEstadio.appendChild(inauguracao)
    divInauguracaoCapacidadeEstadio.appendChild(capacidade)

    divInfoEstadio.appendChild(divInauguracaoCapacidadeEstadio)

    divEstadio.appendChild(divInfoEstadio)

    divConteudos.appendChild(divEstadio)

    let divTitulos = document.createElement('div')
    divTitulos.className = 'my-4 px-12 pt-8 pb-8 border-2 border-gray-200 bg-gray-100 shadow-md'

    let tituloTitulos = document.createElement('h3')
    tituloTitulos.className = 'text-xl border-b-2 border-gray-300 mb-6 font-medium'
    tituloTitulos.innerText = 'Títulos:'

    divTitulos.appendChild(tituloTitulos)

    let listaTitulos = document.createElement('div')
    listaTitulos.className = 'grid items-center gap-3'

    //deixar assim?
    if(time.titulos.length === 0) {
        let loading = document.createElement('img')
        loading.src = '../img/loading.gif'
        loading.className = 'text-center w-20'

        listaTitulos.appendChild(loading)
    }

    
    time.titulos.forEach(titulo => {
        let divTitulo = document.createElement('div')
        divTitulo.className = 'pt-4 pb-6 border-b border-gray-300'

        fetch(`http://localhost:3000/api/competicoes/${titulo.competicao}`)
        .then(response => response.json())
        .then(function(data) {
            console.log(data)

            let divTituloImagensNome = document.createElement('div')
            divTituloImagensNome.className = 'flex gap-2 h-16 pb-2'

            divTitulo.appendChild(divTituloImagensNome)

            let logo = document.createElement('img')
            logo.src = data.logo

            let trofeu = document.createElement('img')
            trofeu.src = data.trofeu

            divTituloImagensNome.appendChild(logo)
            divTituloImagensNome.appendChild(trofeu)

            let nomeCompeticao = document.createElement('h2')
            nomeCompeticao.className = 'pt-4 font-semibold'
            nomeCompeticao.innerText = `${titulo.competicao} (${titulo.edicoes.length})`
    
            let edicoes = document.createElement('p')
            edicoes.innerText = titulo.edicoes.toString().replaceAll(',', ', ')
    
            divTituloImagensNome.appendChild(nomeCompeticao)
            divTitulo.appendChild(edicoes)
    
            listaTitulos.appendChild(divTitulo)

        })
        .catch(error => console.error("Erro:", error))
    });


    divTitulos.appendChild(listaTitulos)
    divConteudos.appendChild(divTitulos)
    
    
    dialog.addEventListener("scroll", function() {

        // let cabecalho = document.getElementById("cabecalho");

        let cabecalho = dialog.children[0]

        // console.log(cabecalho)

        // console.log(dialog.scrollTop)
        // alert('deu')

        if (dialog.scrollTop > 20) {
            cabecalho.style.transition = "transform 0.2s ease";
            cabecalho.style.transform = "scaleY(0.5)"
            cabecalho.style.transformOrigin = "top";

            for (let i = 0; i < cabecalho.children.length; i++) {
                cabecalho.children[i].style.transition = "transform 0.2s ease";
                cabecalho.children[i].style.transform = "scaleX(0.5)";
            }
        } else {
            cabecalho.style.transform = "scaleY(1)"

            for (let i = 0; i < cabecalho.children.length; i++) {
                cabecalho.children[i].style.transform = "scaleX(1)";
            }
        }
    });


    document.body.appendChild(dialog)

    dialog.showModal()
}












//backup
/* 
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

        data.campeonatos.forEach(campeonato => {
            let img1 = document.createElement('img')
            let img2 = document.createElement('img')
            img1.src = campeonato.logo
            img2.src = campeonato.trofeu
            dialog.appendChild(img1)
            dialog.appendChild(img2)
        });

        data.copas.forEach(copa => {
            let img1 = document.createElement('img')
            let img2 = document.createElement('img')
            img1.src = copa.logo
            img2.src = copa.trofeu
            dialog.appendChild(img1)
            dialog.appendChild(img2)
        });

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
*/

// document.getElementById("conteudo").addEventListener("scroll", scrollFunction);

    function scrollFunction() {
        alert('scroll')
        console.log('scroll')
        var header = document.getElementById("cabecalho");

        console.log(header)
        // Verifica se a posição de rolagem vertical do conteúdo ultrapassou 50px
        if (this.scrollTop > 50) {
            header.style.fontSize = "14px"; // Tamanho de fonte reduzido
        } else {
            header.style.fontSize = "20px"; // Tamanho de fonte original
        }
    }

    document.getElementById('formCadastrarTime').addEventListener('submit', function (event){
        event.preventDefault()
        adicionarTime()
    })


    function adicionarTime() {
        const id = document.getElementById('id').value
        const nome = document.getElementById('nome').value
        const pais = document.getElementById('pais').value
        const email = document.getElementById('email').value
        const fundacao = document.getElementById('fundacao').value
    
        fetch('http://localhost:3000/api/times', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nome: nome,
                pais: pais,
                email: email,
                fundacao: fundacao
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // loadClientesList()
        })
        .catch(error => console.error("Erro:", error))
    }