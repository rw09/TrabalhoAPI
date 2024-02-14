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
    listaDeTimes.className = 'grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 p-8'

    let main = document.getElementById('main')

    main.appendChild(listaDeTimes)
    

    data.forEach(time => {
        let cardTime = document.createElement('div')
        cardTime.className = 'group p-4 border border-gray-500 bg-white hover:cursor-pointer hover:shadow-xl hover:bg-[#ebe8e8] transition duration-300 ease-in-out'
        
        let cardTimeConteudo = document.createElement('div')
        cardTimeConteudo.className = "grid grid-rows-[80px 175px 105px] gap-y-7 justify-items-center text-center h-full bg-[#ebe8e8] pt-5 pb-8 border border-gray-500 group-hover:opacity-80 group-hover:border-[#ebe8e8] transition ease-in-out duration-300"
        
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
    cabecalho.className = `h-64 w-full bg-[${time.cores[0]}] flex mb-3 shadow-md pr-8 sticky top-0`
    cabecalho.id = 'cabecalho'

    let divEscudo = document.createElement('div')
    divEscudo.className = "flex  items-center pl-8 pr-10 w-1/3"

    let escudo = document.createElement('img')
    // escudo.style.height = '90%'
    escudo.className = "h-5/6"
    escudo.src = time.escudo.replace('small', 'big')
    divEscudo.appendChild(escudo)

    escudo.addEventListener('click', () => deletarTime(time.pais, time.id))

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
    let nomeLiga = time.liga.replaceAll(" ", "")
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
        
        const inputFotoEscudo = document.getElementById('fotoEscudo');
        const fotoEscudo = inputFotoEscudo.files[0];

        const inputFotoEstadio = document.getElementById('fotoEstadio');
        const fotoEstadio = inputFotoEstadio.files[0];

        const formData = new FormData()

        formData.append('fotoEscudo', fotoEscudo);
        formData.append('fotoEstadio', fotoEstadio);
        formData.append('id', id);
        formData.append('nome', nome);
        formData.append('pais', pais);
        formData.append('email', email);
        formData.append('fundacao', fundacao);

        console.log(formData.get('nome'))
    
        fetch('http://localhost:3000/api/times', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        // })
        .catch(error => console.error("Erro:", error))
    }


    function deletarTime(pais, id) {
        fetch(`http://localhost:3000/api/times/${pais}/${id}`, {
            method: 'DELETE',
        })
        .then(() => console.log('deu certo'))
        .catch(error => console.error('Erro:', error))
    }



function criarDialogCadastro() {
    let dialogCadastro = document.createElement('dialog')
    dialogCadastro.className = 'h-full w-5/6'

    let tituloCadastro = document.createElement('h1')
    tituloCadastro.className = 'text-2xl font-bold text-center p-5 mt-8'
    tituloCadastro.innerText = 'Cadastrar Time'

    dialogCadastro.appendChild(tituloCadastro)

    let form = document.createElement('form')
    form.className = 'mt-5 mx-12 grid grid p-5'
    // form.className = 'mt-5 mx-12 grid gap-8 grid p-5'
    

    dialogCadastro.appendChild(form)

    let tituloInfo = document.createElement('h3')
    tituloInfo.className = 'text-lg border-2 border-gray-300 font-medium bg-gray-200 pl-4 py-3'
    // tituloInfo.className = 'text-lg border-b-2 border-gray-400 font-medium'
    tituloInfo.innerText = 'Informações:'

    form.appendChild(tituloInfo)


    //INFO
    let divInfo = document.createElement('div')
    divInfo.className = 'grid grid-cols-2 gap-y-0 gap-x-0 px-8 pt-4 pb-8 bg-gray-100 shadow-md border-l-2 border-r-2 border-b-2 border-gray-200'
    form.appendChild(divInfo)

    //id
    let divID = document.createElement('div')
    divID.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labelID = document.createElement('label')
    labelID.innerText = 'ID:'
    divID.appendChild(labelID)

    let inputID = document.createElement('input')
    inputID.className = 'border border-gray-400 p-2'
    inputID.type = 'number'
    inputID.id = 'id'
    inputID.setAttribute('required', true)
    divID.appendChild(inputID)

    divInfo.appendChild(divID)

    //nome
    let divNome = document.createElement('div')
    divNome.className = 'py-3 pr-5 pl-10 border-l border-gray-200 grid gap-0'

    let labelNome = document.createElement('label')
    labelNome.innerText = 'Nome:'
    divNome.appendChild(labelNome)

    let inputNome = document.createElement('input')
    inputNome.className = 'border border-gray-400 p-2'
    inputNome.type = 'text'
    inputNome.id = 'nomeTime'
    inputNome.setAttribute('required', true)
    divNome.appendChild(inputNome)

    divInfo.appendChild(divNome)


    //nome completo
    let divNomeCompleto = document.createElement('div')
    divNomeCompleto.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labelNomeCompleto = document.createElement('label')
    labelNomeCompleto.innerText = 'Nome Completo:'
    divNomeCompleto.appendChild(labelNomeCompleto)

    let inputNomeCompleto = document.createElement('input')
    inputNomeCompleto.className = 'border border-gray-400 p-2'
    inputNomeCompleto.type = 'text'
    inputNomeCompleto.id = 'nomeTimeCompleto'
    inputNomeCompleto.setAttribute('required', true)
    divNomeCompleto.appendChild(inputNomeCompleto)

    divInfo.appendChild(divNomeCompleto)


    //apelido
    let divApelido = document.createElement('div')
    divApelido.className = 'py-3 pr-5 pl-10 border-l border-gray-200 grid gap-0'

    let labelApelido = document.createElement('label')
    labelApelido.innerText = 'Apelido:'
    divApelido.appendChild(labelApelido)

    let inputApelido = document.createElement('input')
    inputApelido.className = 'border border-gray-400 p-2'
    inputApelido.type = 'text'
    inputApelido.id = 'apelido'
    // inputApelido.setAttribute('required', true)
    divApelido.appendChild(inputApelido)

    divInfo.appendChild(divApelido)


    //presidente
    let divPresidente = document.createElement('div')
    divPresidente.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labelPresidente = document.createElement('label')
    labelPresidente.innerText = 'Presidente:'
    divPresidente.appendChild(labelPresidente)

    let inputPresidente = document.createElement('input')
    inputPresidente.className = 'border border-gray-400 p-2'
    inputPresidente.type = 'text'
    inputPresidente.id = 'presidente'
    // inputPresidente.setAttribute('required', true)
    divPresidente.appendChild(inputPresidente)

    divInfo.appendChild(divPresidente)


    //marca uniforme
    let divMarcaUniforme = document.createElement('div')
    divMarcaUniforme.className = 'py-3 pr-5 pl-10 border-l border-gray-200 grid gap-0'

    let labelMarcaUniforme = document.createElement('label')
    labelMarcaUniforme.innerText = 'Marca do Uniforme:'
    divMarcaUniforme.appendChild(labelMarcaUniforme)

    let inputMarcaUniforme = document.createElement('input')
    inputMarcaUniforme.className = 'border border-gray-400 p-2'
    inputMarcaUniforme.type = 'text'
    inputMarcaUniforme.id = 'marcaUniforme'
    // inputMarcaUniforme.setAttribute('required', true)
    divMarcaUniforme.appendChild(inputMarcaUniforme)

    divInfo.appendChild(divMarcaUniforme)


    //website
    let divWebsite = document.createElement('div')
    divWebsite.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labelWebsite = document.createElement('label')
    labelWebsite.innerText = 'Website:'
    divWebsite.appendChild(labelWebsite)

    let inputWebsite = document.createElement('input')
    inputWebsite.className = 'border border-gray-400 p-2'
    inputWebsite.type = 'text'
    inputWebsite.id = 'website'
    // inputWebsite.setAttribute('required', true)
    divWebsite.appendChild(inputWebsite)

    divInfo.appendChild(divWebsite)


    //email
    let divEmail = document.createElement('div')
    divEmail.className = 'py-3 pr-5 pl-10 border-l border-gray-200 grid gap-0'

    let labelEmail = document.createElement('label')
    labelEmail.innerText = 'E-mail:'
    divEmail.appendChild(labelEmail)

    let inputEmail = document.createElement('input')
    inputEmail.className = 'border border-gray-400 p-2'
    inputEmail.type = 'text'
    inputEmail.id = 'email'
    // inputEmail.setAttribute('required', true)
    divEmail.appendChild(inputEmail)

    divInfo.appendChild(divEmail)


    //cidade
    let divCidade = document.createElement('div')
    divCidade.className = 'pb-3 pl-5 pr-10 border-r border-gray-200 grid gap-0 pt-10'

    let labelCidade = document.createElement('label')
    labelCidade.innerText = 'Cidade:'
    divCidade.appendChild(labelCidade)

    let inputCidade = document.createElement('input')
    inputCidade.className = 'border border-gray-400 p-2'
    inputCidade.type = 'text'
    inputCidade.id = 'cidade'
    // inputCidade.setAttribute('required', true)
    divCidade.appendChild(inputCidade)

    divInfo.appendChild(divCidade)


    //estado
    let divEstado = document.createElement('div')
    divEstado.className = 'pb-3 pr-5 pl-10 border-l border-gray-200 grid gap-0 pt-10'

    let labelEstado = document.createElement('label')
    labelEstado.innerText = 'Estado:'
    divEstado.appendChild(labelEstado)

    let inputEstado = document.createElement('input')
    inputEstado.className = 'border border-gray-400 p-2'
    inputEstado.type = 'text'
    inputEstado.id = 'estado'
    // inputCidade.setAttribute('required', true)
    divEstado.appendChild(inputEstado)

    divInfo.appendChild(divEstado)


    //país
    let divPais = document.createElement('div')
    divPais.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labelPais = document.createElement('label')
    labelPais.innerText = 'País:'
    divPais.appendChild(labelPais)

    let selectPais = document.createElement('select')
    selectPais.className = 'border border-gray-400 p-2'
    selectPais.id = 'pais'
    selectPais.setAttribute('required', true)

    selectPais.addEventListener('change', function() {
        carregarLigas(selectPais.value)
    })

    divPais.appendChild(selectPais)

    fetch(`http://localhost:3000/api/paises`)
    .then(response => response.json())
    .then(function(data) {
        data.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))

        data.forEach(pais => {
            let option = document.createElement('option')
            option.value = pais.nome
            option.innerText = pais.nome
            selectPais.appendChild(option)
        });
    })
    .then(function () {
        carregarLigas(selectPais.value)
    })

    divInfo.appendChild(divPais)


    //liga
    let divLiga = document.createElement('div')
    divLiga.className = 'py-3 pr-5 pl-10 border-l border-gray-200 grid gap-0'

    let labelLiga = document.createElement('label')
    labelLiga.innerText = 'Liga:'
    divLiga.appendChild(labelLiga)

    let selectLiga = document.createElement('select')
    selectLiga.className = 'border border-gray-400 p-2'
    selectLiga.id = 'selectLiga'
    selectLiga.setAttribute('required', true)
    divLiga.appendChild(selectLiga)

    divInfo.appendChild(divLiga)


    //resumo
    let divResumo = document.createElement('div')
    divResumo.className = 'py-3 px-5 grid col-span-2 mt-10'

    let labelResumo = document.createElement('label')
    labelResumo.innerText = 'Resumo:'
    divResumo.appendChild(labelResumo)

    let textAreaResumo = document.createElement('textarea')
    textAreaResumo.className = 'border border-gray-400 p-2 h-40'
    textAreaResumo.id = 'resumo'
    // textAreaResumo.setAttribute('required', true)
    divResumo.appendChild(textAreaResumo)

    divInfo.appendChild(divResumo)



    //ESTADIO
    let tituloEstadio = document.createElement('h3')
    tituloEstadio.className = 'text-lg border-2 border-gray-300 font-medium bg-gray-200 pl-4 py-3 mt-10'
    tituloEstadio.innerText = 'Estádio:'
    form.appendChild(tituloEstadio)

    let divEstadio = document.createElement('div')
    divEstadio.className = 'grid grid-cols-2 gap-y-0 gap-x-0 px-8 pt-4 pb-8 bg-gray-100 shadow-md border-l-2 border-r-2 border-b-2 border-gray-200'
    form.appendChild(divEstadio)

    
    //nome estádio
    let divNomeEstadio = document.createElement('div')
    divNomeEstadio.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labeNomeEstadio = document.createElement('label')
    labeNomeEstadio.innerText = 'Nome:'
    divNomeEstadio.appendChild(labeNomeEstadio)

    let inputNomeEstadio = document.createElement('input')
    inputNomeEstadio.className = 'border border-gray-400 p-2'
    inputNomeEstadio.type = 'text'
    inputNomeEstadio.id = 'nomeEstadio'
    // inputNomeEstadio.setAttribute('required', true)
    divNomeEstadio.appendChild(inputNomeEstadio)

    divEstadio.appendChild(divNomeEstadio)


    //foto estádio
    let divFotoEstadio = document.createElement('div')
    divFotoEstadio.className = 'py-3 pr-5 pl-10 border-l border-gray-200 row-span-6 grid gap-0'

    let labelFotoEstadio = document.createElement('label')
    labelFotoEstadio.innerText = 'Foto:'
    divFotoEstadio.appendChild(labelFotoEstadio)

    let fotoEstadio = document.createElement('img')
    fotoEstadio.className = 'border border-gray-200 w-96 h-64'
    // fotoEstadio.src = '../img/SemImagem.png'
    fotoEstadio.id = 'imagem-fotoEstadio'

    fotoEstadio.addEventListener("error", function() {
        erroImagem(this)
    })

    divFotoEstadio.appendChild(fotoEstadio)

    let inputFotoEstadio = document.createElement('input')
    inputFotoEstadio.className = 'mt-4'
    inputFotoEstadio.type = 'file'
    inputFotoEstadio.id = 'fotoEstadio'
    inputFotoEstadio.name = 'fotoEstadio'
    // inputFotoEstadio.setAttribute('required', true)

    inputFotoEstadio.addEventListener("change", function() {
        carregarFoto(this)
    })

    divFotoEstadio.appendChild(inputFotoEstadio)

    let divInputURL = document.createElement('div')
    divInputURL.className = 'flex justify-between mt-2'

    let inputURLEstadio = document.createElement('input')
    inputURLEstadio.className = 'border border-gray-400 p-2 text-sm w-2/3'
    inputURLEstadio.type = 'text'
    inputURLEstadio.id = 'url-fotoEstadio'
    inputURLEstadio.setAttribute("placeholder", "Escolha um arquivo ou cole aqui a URL da imagem")
    // inputURLEstadio.setAttribute('required', true)
    divInputURL.appendChild(inputURLEstadio)

    let botaoCarregarURL = document.createElement('button')
    botaoCarregarURL.className = 'p-2 text-xs border border-gray-300 bg-gray-200'
    botaoCarregarURL.innerHTML = 'Carregar Imagem'
    botaoCarregarURL.setAttribute("type", "button")

    botaoCarregarURL.addEventListener("click", function() {
        carregarURLFoto(inputURLEstadio)
    })

    divInputURL.appendChild(botaoCarregarURL)

    divFotoEstadio.appendChild(divInputURL)

    divEstadio.appendChild(divFotoEstadio)


    //inauguração estádio
    let divInauguracaoEstadio = document.createElement('div')
    divInauguracaoEstadio.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labeInauguracaoEstadio = document.createElement('label')
    labeInauguracaoEstadio.innerText = 'Inauguração:'
    divInauguracaoEstadio.appendChild(labeInauguracaoEstadio)

    let inputInauguracaoEstadio = document.createElement('input')
    inputInauguracaoEstadio.className = 'border border-gray-400 p-2'
    inputInauguracaoEstadio.type = 'text'
    inputInauguracaoEstadio.id = 'inauguracaoEstadio'
    // inputInauguracaoEstadio.setAttribute('required', true)
    divInauguracaoEstadio.appendChild(inputInauguracaoEstadio)

    divEstadio.appendChild(divInauguracaoEstadio)


    //capacidade estádio
    let divCapacidadeEstadio = document.createElement('div')
    divCapacidadeEstadio.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0 pb-36'

    let labeCapacidadeEstadio = document.createElement('label')
    labeCapacidadeEstadio.innerText = 'Capacidade:'
    divCapacidadeEstadio.appendChild(labeCapacidadeEstadio)

    let inputCapacidadeEstadio = document.createElement('input')
    inputCapacidadeEstadio.className = 'border border-gray-400 p-2'
    inputCapacidadeEstadio.type = 'text'
    inputCapacidadeEstadio.id = 'capacidadeEstadio'
    // inputCapacidadeEstadio.setAttribute('required', true)
    divCapacidadeEstadio.appendChild(inputCapacidadeEstadio)

    divEstadio.appendChild(divCapacidadeEstadio)




    document.body.appendChild(dialogCadastro)

    dialogCadastro.showModal()
}

function carregarLigas(pais) {

    let selectLiga = document.getElementById('selectLiga')
    
    selectLiga.innerHTML = '';

    fetch(`http://localhost:3000/api/paises/ligas/${pais}`)
        .then(response => response.json())
        .then(function(data) {
            data.forEach(liga => {
                console.log(liga)
                let option = document.createElement('option')
                option.value = liga
                option.innerText = liga
                selectLiga.appendChild(option)
            });
        })
        .catch(error => console.error("Erro:", error))
}


function carregarFoto(e) {
    // alert(e.id)
    // console.log(e.files)
    let foto = document.getElementById(`imagem-${e.id}`)
    foto.src = window.URL.createObjectURL(e.files[0]);

    let url = document.getElementById(`url-${e.id}`)
    url.value = null
}


function carregarURLFoto(e) {
    let url = document.getElementById(e.id)
    // console.log(url.value)
    let foto = document.getElementById(`imagem-${e.id.replace("url-", "")}`)
    // console.log(foto)
    foto.src = url.value

    //depois remover o arquivo selecionado do input
    let inputFotoEstadio = document.getElementById('fotoEstadio')
    inputFotoEstadio.value = []
}

function erroImagem (e) {
    alert('Não Foi Possivel Carregar a Imagem')
    e.src = '../img/SemImagem.png'
    let url = document.getElementById(`url-${e.id.replace("imagem-", "")}`)
    url.value = null
}