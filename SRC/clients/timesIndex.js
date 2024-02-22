document.addEventListener('DOMContentLoaded', function () {
    carregarListaTimes();
})


//com todos os times
function carregarListaTimes() {

    if(paisEscolhido === 'Todos') {
        paisEscolhido = ''
    }

    fetch(`http://localhost:3000/api/times/${paisEscolhido}`)
        .then(response => response.json())
        .then(data => paisEscolhido === '' ? mostrarListaTodosTimes(data) : mostrarListaTimes(data))
        .catch(error => console.error("Erro:", error))
}


function mostrarListaTimes(data) {
    
    data.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))

    let listaDeTimes = document.createElement('section')
    listaDeTimes.id = 'listaDeTimes'
    listaDeTimes.className = 'grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 p-8 bg-gray-50'

    let main = document.getElementById('main')

    main.appendChild(listaDeTimes)
    

    data.forEach(time => {
        let cardTime = document.createElement('div')
        cardTime.className = 'group p-[18px] border-2 border-gray-300 bg-white  hover:cursor-pointer hover:shadow-xl hover:bg-[#ebe8e8] transition duration-300 ease-in-out'
        
        let cardTimeConteudo = document.createElement('div')
        cardTimeConteudo.className = "p-1 grid text-center justify-items-center items-center grid-rows-[40px_minmax(100px,_1fr)_80px] pt-5 pb-3 h-full bg-[#ebe8e8] border border-gray-300 group-hover:opacity-80 group-hover:border-[#ebe8e8] transition ease-in-out duration-300"
        
        cardTime.appendChild(cardTimeConteudo)

        let divLogoLiga = document.createElement('div')
        divLogoLiga.className = 'grid items-center'
        // let imgLiga = document.createElement('img')
        // let nomeLiga = time.liga
        // imgLiga.src = `../img/competicoes/${time.pais}/${nomeLiga}.png`
        // imgLiga.className = 'h-7'
        // divLogoLiga.appendChild(imgLiga)

        cardTimeConteudo.appendChild(divLogoLiga)

        let escudo = document.createElement('img')
        escudo.src = time.escudo
        escudo.className = 'pt-5 max-h-[140px] max-w-[120px]'
        cardTimeConteudo.appendChild(escudo)

        let nome = document.createElement('h2')
        nome.className = 'font-semibold'
        nome.innerText = time.nome
        cardTimeConteudo.appendChild(nome)
        
        cardTime.addEventListener('click', function() {
            carregarDetalhesTime(time.id)
        })

        listaDeTimes.appendChild(cardTime)
       
    })
}




//Mostrar Todos os Times
function mostrarListaTodosTimes(data) {
    
    data.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))

    let listaDeTimes = document.createElement('section')
    listaDeTimes.id = 'listaDeTimes'
    listaDeTimes.className = 'grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 p-8 bg-gray-50'

    let main = document.getElementById('main')

    main.appendChild(listaDeTimes)
    

    data.forEach(time => {
        let cardTime = document.createElement('div')
        cardTime.className = 'group p-[18px] border-2 border-gray-300 bg-white  hover:cursor-pointer hover:shadow-xl hover:bg-[#ebe8e8] transition duration-300 ease-in-out'
        
        let cardTimeConteudo = document.createElement('div')
        cardTimeConteudo.className = "p-1 grid text-center justify-items-center items-center grid-rows-[40px_minmax(100px,_1fr)_80px] pt-5 pb-3 h-full bg-[#ebe8e8] border border-gray-300 group-hover:opacity-80 group-hover:border-[#ebe8e8] transition ease-in-out duration-300"
        
        cardTime.appendChild(cardTimeConteudo)

        let divLogoLiga = document.createElement('div')
        divLogoLiga.className = 'grid grid-cols-2 items-center gap-1'

        let imgBandeira = document.createElement('img')
        imgBandeira.src = `../img/bandeiras/small/${time.pais}.png`
        imgBandeira.className = 'h-5'

        let imgLiga = document.createElement('img')
        let nomeLiga = time.liga
        imgLiga.src = `../img/competicoes/${time.pais}/${nomeLiga}.png`
        imgLiga.className = 'h-7'

        divLogoLiga.appendChild(imgBandeira)
        divLogoLiga.appendChild(imgLiga)

        cardTimeConteudo.appendChild(divLogoLiga)

       
        let escudo = document.createElement('img')
        escudo.src = time.escudo
        escudo.className = 'pt-5 max-h-[140px] max-w-[120px]'
        cardTimeConteudo.appendChild(escudo)

        let nome = document.createElement('h2')
        nome.className = 'font-semibold'
        nome.innerText = time.nome
        cardTimeConteudo.appendChild(nome)
        
        cardTime.addEventListener('click', function() {
            carregarDetalhesTime(time.id)
        })

        listaDeTimes.appendChild(cardTime)
       
    })
}

/*
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
    cabecalho.className = `h-64 w-full bg-[${time.cores[0]}] flex mb-3 shadow-md pr-8 sticky top-0`
    cabecalho.id = 'cabecalho'

    let divEscudo = document.createElement('div')
    divEscudo.className = "flex  items-center pl-8 pr-10 w-1/3"

    let escudo = document.createElement('img')
    escudo.className = "h-5/6"
    escudo.src = time.escudo.replace('small', 'big')
    divEscudo.appendChild(escudo)

    cabecalho.appendChild(divEscudo)

    let divNomeApelido = document.createElement('div')
    divNomeApelido.className = "flex w-full flex-col justify-center items-center gap-5 pr-6"

    let nomeTime = document.createElement('h1')
    nomeTime.className = `text-5xl font-bold text-center text-[${time.cores[1]}]`
    nomeTime.innerText = time.nome_completo

    divNomeApelido.appendChild(nomeTime)

    let apelido = document.createElement('h2')
    time.cores.length > 2 ? apelido.className = `text-2xl font-bold text-[${time.cores[2]}]` : apelido.className = `text-2xl font-bold text-[${time.cores[1]}]` 
    apelido.innerText = `"${time.apelido}"`

    divNomeApelido.appendChild(apelido)

    cabecalho.appendChild(divNomeApelido)

    dialog.appendChild(cabecalho)


    let divConteudos = document.createElement('div')
    divConteudos.className = 'mt-5 mx-12 grid gap-4'

    dialog.appendChild(divConteudos)

    if(time.resumo) {

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
    }

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
    // let nomeLiga = time.liga.replaceAll(" ", "")
    let nomeLiga = time.liga
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
    website.innerHTML = '<b>Website:</b> ' + time.website
    website.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(website)

    let email = document.createElement('h4')
    email.innerHTML = '<b>E-mail:</b> ' + time.email
    email.className = 'bg-gray-200 p-2 pl-4'
    info.appendChild(email)

    divConteudos.appendChild(divInfo)


    if(time.uniformes && time.uniformes.length) {
    
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
    }

    if(time.estadio.nome != '' && time.estadio.foto != '') {
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
    }

    let divTitulos = document.createElement('div')
    divTitulos.className = 'my-4 px-12 pt-8 pb-8 border-2 border-gray-200 bg-gray-100 shadow-md'

    let tituloTitulos = document.createElement('h3')
    tituloTitulos.className = 'text-xl border-b-2 border-gray-300 mb-6 font-medium'
    tituloTitulos.innerText = 'Títulos:'

    divTitulos.appendChild(tituloTitulos)

    let listaTitulos = document.createElement('div')
    listaTitulos.className = 'grid items-center gap-3'

    //deixar assim?
    if(time.titulos && time.titulos.length === 0) {
        // let loading = document.createElement('img')
        // loading.src = '../img/loading.gif'
        // loading.className = 'text-center w-20'
        // listaTitulos.appendChild(loading)
        let semTitulos = document.createElement('h2')
        semTitulos.className = ''
        semTitulos.innerText = 'Não possui título nacional, continental ou mundial'
        listaTitulos.appendChild(semTitulos)
    }

    if(time.titulos && time.titulos.length) {
        // let titulos = JSON.parse(time.titulos)

        time.titulos.forEach(titulo => {
            let divTitulo = document.createElement('div')
            divTitulo.className = 'pt-4 pb-6 border-b border-gray-300'

            fetch(`http://localhost:3000/api/competicoes/${titulo.competicao}`)
            .then(response => response.json())
            .then(function(data) {

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
    }

    divTitulos.appendChild(listaTitulos)
    divConteudos.appendChild(divTitulos)
    
    
    dialog.addEventListener("scroll", function() {

        let cabecalho = dialog.children[0]

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


*/