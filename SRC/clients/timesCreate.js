function adicionarTime() {

    const id = document.getElementById('id').value
    const nome = document.getElementById('nomeTime').value
    const nome_completo = document.getElementById('nomeTimeCompleto').value
    const apelido = document.getElementById('apelido').value
    let fundacao = document.getElementById('fundacao').value
    fundacao = fundacao.split('-').reverse().join('/')
    const presidente = document.getElementById('presidente').value
    const website = document.getElementById('website').value
    const email = document.getElementById('email').value
    const cidade = document.getElementById('cidade').value
    const estado = document.getElementById('estado').value
    const pais = document.getElementById('pais').value
    const liga = document.getElementById('selectLiga').value

    const inputFotoEscudo = document.getElementById('input-fotoEscudo');
    const urlFotoEscudo = document.getElementById('url-fotoEscudo').value;

    let fotoEscudo = ''
    
    if(inputFotoEscudo.files[0]) {
        fotoEscudo = inputFotoEscudo.files[0];
    } else if(urlFotoEscudo) {
        fotoEscudo = urlFotoEscudo
    }

    const cor1 = document.getElementById('cor1').value
    const cor2 = document.getElementById('cor2').value
    const cor3 = document.getElementById('cor3').value

    // let cores = [ cor1, cor2 ]

    // if(cor3 !== '#F3F4F6') {
    //     cores.push(cor3)
    // }

    const resumo = document.getElementById('resumo').value

    const nomeEstadio = document.getElementById('nomeEstadio').value
    const inauguracaoEstadio = document.getElementById('inauguracaoEstadio').value
    const capacidadeEstadio = document.getElementById('capacidadeEstadio').value


    const inputFotoEstadio = document.getElementById('input-fotoEstadio');
    const urlFotoEstadio = document.getElementById('url-fotoEstadio').value;

    let fotoEstadio = ''
    
    if(inputFotoEstadio.files[0]) {
        fotoEstadio = inputFotoEstadio.files[0];
    } else if(urlFotoEstadio) {
        fotoEstadio = urlFotoEstadio
    }

    
    const inputFotoUniformeHome = document.getElementById('input-fotoUniformeHome');
    const urlFotoUniformeHome = document.getElementById('url-fotoUniformeHome').value;

    let fotoUniformeHome = ''
    
    if(inputFotoUniformeHome.files[0]) {
        fotoUniformeHome = inputFotoUniformeHome.files[0];
    } else if(urlFotoUniformeHome) {
        fotoUniformeHome = urlFotoUniformeHome
    }

    const inputFotoUniformeAway = document.getElementById('input-fotoUniformeAway');
    const urlFotoUniformeAway = document.getElementById('url-fotoUniformeAway').value;

    let fotoUniformeAway = ''
    
    if(inputFotoUniformeAway.files[0]) {
        fotoUniformeAway = inputFotoUniformeAway.files[0];
    } else if(urlFotoUniformeAway) {
        fotoUniformeAway = urlFotoUniformeAway
    }

    const inputFotoUniformeThird = document.getElementById('input-fotoUniformeThird');
    const urlFotoUniformeThird = document.getElementById('url-fotoUniformeThird').value;

    let fotoUniformeThird = ''
    
    if(inputFotoUniformeThird.files[0]) {
        fotoUniformeThird = inputFotoUniformeThird.files[0];
    } else if(urlFotoUniformeThird) {
        fotoUniformeThird = urlFotoUniformeThird
    }

    const inputFotoUniformeGK = document.getElementById('input-fotoUniformeGK');
    const urlFotoUniformeGK = document.getElementById('url-fotoUniformeGK').value;

    let fotoUniformeGK = ''
    
    if(inputFotoUniformeGK.files[0]) {
        fotoUniformeGK = inputFotoUniformeGK.files[0];
    } else if(urlFotoUniformeGK) {
        fotoUniformeGK = urlFotoUniformeGK
    }

    const marca_uniforme = document.getElementById('marcaUniforme').value



    const formData = new FormData()

    formData.append('id', id);
    formData.append('nome', nome);
    formData.append('nome_completo', nome_completo);
    formData.append('apelido', apelido);
    formData.append('fundacao', fundacao);
    formData.append('presidente', presidente);
    formData.append('website', website);
    formData.append('email', email);
    formData.append('cidade', cidade);
    formData.append('estado', estado);
    formData.append('pais', pais);
    formData.append('liga', liga);

    formData.append('fotoEscudo', fotoEscudo);

    // formData.append('cores', cores);
    formData.append('cor1', cor1);
    formData.append('cor2', cor2);
    formData.append('cor3', cor3);

    formData.append('resumo', resumo);

    formData.append('nomeEstadio', nomeEstadio);
    formData.append('inauguracaoEstadio', inauguracaoEstadio);
    formData.append('capacidadeEstadio', capacidadeEstadio);

    formData.append('fotoEstadio', fotoEstadio);

    formData.append('fotoUniformeHome', fotoUniformeHome);
    formData.append('fotoUniformeAway', fotoUniformeAway);
    formData.append('fotoUniformeThird', fotoUniformeThird);
    formData.append('fotoUniformeGK', fotoUniformeGK);

    formData.append('marca_uniforme', marca_uniforme);

    let divTitulos = document.getElementById('divTitulosCadastro')

    let titulos = []

    for (const child of divTitulos.children) {

        if(child.children[1].value) {
            let anosTitulo = child.children[1].value.replaceAll(" ", "").split(",");

            let anosTituloFiltrado = anosTitulo.filter(ano => ano != '')

            anosTituloFiltrado.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))

            let titulo = {
                "competicao": child.children[0].innerText.replace(":", ""),
                "edicoes": anosTituloFiltrado
            }
            titulos.push(JSON.stringify(titulo))
            // console.log(JSON.stringify(titulo))
            // formData.append(`titulo-${i}`, JSON.stringify(titulo))
        }
    }

    formData.append('titulos', JSON.stringify(titulos))
    
    fetch('http://localhost:3000/api/times', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let dialogCadastro = document.getElementById('dialogCadastro')
        // dialogCadastro.remove()
    })
    .catch(error => console.error("Erro:", error))
}



function criarDialogCadastro() {
    let paisDoTimeSerCriado = 'Alemanha'
    let proximoID = null

    fetch(`http://localhost:3000/api/times/proximoID`)
    .then(response => response.json())
    .then(function(data) {
        proximoID = data.proximoID

        let inputID = document.getElementById('id')

        if(inputID) {
            inputID.value = data.proximoID
        }
    })
    .catch(error => console.error("Erro:", error))

    let dialogCadastro = document.createElement('dialog')
    dialogCadastro.className = 'h-full w-5/6'
    dialogCadastro.id = 'dialogCadastro'

    let tituloCadastro = document.createElement('h1')
    tituloCadastro.className = 'text-2xl font-bold text-center p-5 mt-8'
    tituloCadastro.innerText = 'Cadastrar Time'

    dialogCadastro.appendChild(tituloCadastro)

    let form = document.createElement('form')
    form.className = 'mt-5 mx-12 grid grid p-5'
    form.id = 'formCadastroTime'

    form.addEventListener('submit', function (event){
        event.preventDefault()
        adicionarTime()
    })


    dialogCadastro.appendChild(form)

    let tituloInfo = document.createElement('h3')
    tituloInfo.className = 'text-lg border-2 border-gray-300 font-medium bg-gray-200 pl-4 py-3'
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
    inputID.className = 'border border-gray-400 bg-gray-100 p-2'
    inputID.type = 'number'
    inputID.id = 'id'
    inputID.setAttribute('readonly', true)
    inputID.value = proximoID
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
    inputNome.setAttribute('autofocus', true)
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
    divApelido.appendChild(inputApelido)

    divInfo.appendChild(divApelido)


    //fundacao
    let divFundacao = document.createElement('div')
    divFundacao.className = 'py-3 pl-5 pr-10 border-r border-gray-200 grid gap-0'

    let labelFundacao = document.createElement('label')
    labelFundacao.innerText = 'Fundação:'
    divFundacao.appendChild(labelFundacao)

    let inputFundacao = document.createElement('input')
    inputFundacao.className = 'border border-gray-400 p-2'
    inputFundacao.type = 'date'
    inputFundacao.id = 'fundacao'
    divFundacao.appendChild(inputFundacao)

    divInfo.appendChild(divFundacao)


    //presidente
    let divPresidente = document.createElement('div')
    divPresidente.className = 'py-3 pr-5 pl-10 border-l border-gray-200 grid gap-0'

    let labelPresidente = document.createElement('label')
    labelPresidente.innerText = 'Presidente:'
    divPresidente.appendChild(labelPresidente)

    let inputPresidente = document.createElement('input')
    inputPresidente.className = 'border border-gray-400 p-2'
    inputPresidente.type = 'text'
    inputPresidente.id = 'presidente'
    divPresidente.appendChild(inputPresidente)

    divInfo.appendChild(divPresidente)

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
        //precisa? estou passando para a função
        paisDoTimeSerCriado = selectPais.value

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


    //foto escudo
    let divFotoEscudo = document.createElement('div')
    divFotoEscudo.className = 'py-3 pr-10 pl-5 border-r border-gray-200 row-span-4 grid gap-0 pt-14'

    let labelEscudo = document.createElement('label')
    labelEscudo.innerText = 'Escudo:'

    divFotoEscudo.appendChild(labelEscudo)

    let fotoEscudo = document.createElement('img')
    fotoEscudo.className = 'border border-gray-200 w-52 h-52'
    // fotoEstadio.src = '../img/SemImagem.png'
    fotoEscudo.id = 'imagem-fotoEscudo'

    fotoEscudo.addEventListener("error", function() {
        erroImagem(this)
    })

    divFotoEscudo.appendChild(fotoEscudo)

    let inputFotoEscudo = document.createElement('input')
    inputFotoEscudo.className = 'mt-4'
    inputFotoEscudo.type = 'file'
    inputFotoEscudo.id = 'input-fotoEscudo'
    inputFotoEscudo.name = 'fotoEscudo'

    inputFotoEscudo.addEventListener("change", function() {
        carregarFoto(this)
    })

    divFotoEscudo.appendChild(inputFotoEscudo)

    let divInputURLEscudo = document.createElement('div')
    divInputURLEscudo.className = 'flex justify-between mt-2'

    let inputURLEscudo = document.createElement('input')
    inputURLEscudo.className = 'border border-gray-400 p-2 text-sm w-2/3'
    inputURLEscudo.type = 'text'
    inputURLEscudo.id = 'url-fotoEscudo'
    inputURLEscudo.setAttribute("placeholder", "Escolha um arquivo ou cole aqui a URL da imagem")
    divInputURLEscudo.appendChild(inputURLEscudo)

    let botaoCarregarURLEscudo = document.createElement('button')
    botaoCarregarURLEscudo.className = 'p-2 text-xs border border-gray-300 bg-gray-200'
    botaoCarregarURLEscudo.innerHTML = 'Carregar Imagem'
    botaoCarregarURLEscudo.setAttribute("type", "button")

    botaoCarregarURLEscudo.addEventListener("click", function() {
        carregarURLFoto(inputURLEscudo)
    })

    divInputURLEscudo.appendChild(botaoCarregarURLEscudo)

    divFotoEscudo.appendChild(divInputURLEscudo)

    divInfo.appendChild(divFotoEscudo)


    //cores do time
    let divCores = document.createElement('div')
    divCores.className = 'py-3 pl-10 pr-5 border-l border-gray-200 grid gap-0 pt-14 row-span-4 content-start'

    let labelCores = document.createElement('label')
    labelCores.innerText = 'Cores:'
    divCores.appendChild(labelCores)

    let divInputsCores = document.createElement('div')
    divInputsCores.className = 'grid grid-cols-3 w-1/2 gap-1 justify-start'

    let inputCor1 = document.createElement('input')
    inputCor1.className = 'border border-gray-400 p-2 h-12'
    inputCor1.type = 'color'
    inputCor1.id = 'cor1'
    inputCor1.value = '#ffffff'
    inputCor1.setAttribute('required', true)
    divInputsCores.appendChild(inputCor1)

    let inputCor2 = document.createElement('input')
    inputCor2.className = 'border border-gray-400 p-2 h-12'
    inputCor2.type = 'color'
    inputCor2.id = 'cor2'
    inputCor2.value = '#000000'
    inputCor2.setAttribute('required', true)
    divInputsCores.appendChild(inputCor2)

    let inputCor3 = document.createElement('input')
    inputCor3.className = 'border border-gray-400 p-2 h-12'
    inputCor3.type = 'color'
    inputCor3.id = 'cor3'
    inputCor3.value = '#F3F4F6'
    inputCor3.setAttribute('required', true)
    divInputsCores.appendChild(inputCor3)

    divCores.appendChild(divInputsCores)
    divInfo.appendChild(divFotoEscudo)
    divInfo.appendChild(divCores)


    //resumo
    let divResumo = document.createElement('div')
    divResumo.className = 'py-3 px-5 grid col-span-2 mt-10'

    let labelResumo = document.createElement('label')
    labelResumo.innerText = 'Resumo:'
    divResumo.appendChild(labelResumo)

    let textAreaResumo = document.createElement('textarea')
    textAreaResumo.className = 'border border-gray-400 p-2 h-48'
    textAreaResumo.id = 'resumo'
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
    inputFotoEstadio.id = 'input-fotoEstadio'
    inputFotoEstadio.name = 'fotoEstadio'

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
    divCapacidadeEstadio.appendChild(inputCapacidadeEstadio)

    divEstadio.appendChild(divCapacidadeEstadio)


    //UNIFORMES
    let tituloUniformes = document.createElement('h3')
    tituloUniformes.className = 'text-lg border-2 border-gray-300 font-medium bg-gray-200 pl-4 py-3 mt-10'
    tituloUniformes.innerText = 'Uniformes:'
    form.appendChild(tituloUniformes)


    let divUniformes = document.createElement('div')
    divUniformes.className = 'grid grid-cols-2 gap-y-0 gap-x-0 px-8 pt-4 pb-8 bg-gray-100 shadow-md border-l-2 border-r-2 border-b-2 border-gray-200'
    form.appendChild(divUniformes)


    let divUniformeHome = document.createElement('div')
    divUniformeHome.className = 'py-3 pr-10 pl-5 border-r border-gray-200 row-span-4 grid gap-0'

    let labelUniformeHome = document.createElement('label')
    labelUniformeHome.innerText = 'Home:'
    divUniformeHome.appendChild(labelUniformeHome)

    let fotoUniformeHome = document.createElement('img')
    fotoUniformeHome.className = 'border border-gray-200 w-52 h-52'
    // fotoEstadio.src = '../img/SemImagem.png'
    fotoUniformeHome.id = 'imagem-fotoUniformeHome'

    fotoUniformeHome.addEventListener("error", function() {
        erroImagem(this)
    })

    divUniformeHome.appendChild(fotoUniformeHome)

    divUniformes.appendChild(divUniformeHome)


    let inputFotoUniformeHome = document.createElement('input')
    inputFotoUniformeHome.className = 'mt-4'
    inputFotoUniformeHome.type = 'file'
    inputFotoUniformeHome.id = 'input-fotoUniformeHome'
    inputFotoUniformeHome.name = 'fotoUniformeHome'

    inputFotoUniformeHome.addEventListener("change", function() {
        carregarFoto(this)
    })

    divUniformeHome.appendChild(inputFotoUniformeHome)

    let divInputURLUniformeHome = document.createElement('div')
    divInputURLUniformeHome.className = 'flex justify-between mt-2'

    let inputURLUniformeHome = document.createElement('input')
    inputURLUniformeHome.className = 'border border-gray-400 p-2 text-sm w-2/3'
    inputURLUniformeHome.type = 'text'
    inputURLUniformeHome.id = 'url-fotoUniformeHome'
    inputURLUniformeHome.setAttribute("placeholder", "Escolha um arquivo ou cole aqui a URL da imagem")
    divInputURLUniformeHome.appendChild(inputURLUniformeHome)

    let botaoCarregarURLUniformeHome = document.createElement('button')
    botaoCarregarURLUniformeHome.className = 'p-2 text-xs border border-gray-300 bg-gray-200'
    botaoCarregarURLUniformeHome.innerHTML = 'Carregar Imagem'
    botaoCarregarURLUniformeHome.setAttribute("type", "button")

    botaoCarregarURLUniformeHome.addEventListener("click", function() {
        carregarURLFoto(inputURLUniformeHome)
    })

    divInputURLUniformeHome.appendChild(botaoCarregarURLUniformeHome)

    divUniformeHome.appendChild(divInputURLUniformeHome)


    let divUniformeAway = document.createElement('div')
    divUniformeAway.className = 'py-3 pl-10 pr-5 border-l border-gray-200 row-span-4 grid gap-0'

    let labelUniformeAway = document.createElement('label')
    labelUniformeAway.innerText = 'Away:'
    divUniformeAway.appendChild(labelUniformeAway)

    let fotoUniformeAway = document.createElement('img')
    fotoUniformeAway.className = 'border border-gray-200 w-52 h-52'
    fotoUniformeAway.id = 'imagem-fotoUniformeAway'

    fotoUniformeAway.addEventListener("error", function() {
        erroImagem(this)
    })

    divUniformeAway.appendChild(fotoUniformeAway)

    divUniformes.appendChild(divUniformeAway)


    let inputFotoUniformeAway = document.createElement('input')
    inputFotoUniformeAway.className = 'mt-4'
    inputFotoUniformeAway.type = 'file'
    inputFotoUniformeAway.id = 'input-fotoUniformeAway'
    inputFotoUniformeAway.name = 'fotoUniformeAway'

    inputFotoUniformeAway.addEventListener("change", function() {
        carregarFoto(this)
    })

    divUniformeAway.appendChild(inputFotoUniformeAway)

    let divInputURLUniformeAway = document.createElement('div')
    divInputURLUniformeAway.className = 'flex justify-between mt-2'

    let inputURLUniformeAway = document.createElement('input')
    inputURLUniformeAway.className = 'border border-gray-400 p-2 text-sm w-2/3'
    inputURLUniformeAway.type = 'text'
    inputURLUniformeAway.id = 'url-fotoUniformeAway'
    inputURLUniformeAway.setAttribute("placeholder", "Escolha um arquivo ou cole aqui a URL da imagem")
    divInputURLUniformeAway.appendChild(inputURLUniformeAway)

    let botaoCarregarURLUniformeAway = document.createElement('button')
    botaoCarregarURLUniformeAway.className = 'p-2 text-xs border border-gray-300 bg-gray-200'
    botaoCarregarURLUniformeAway.innerHTML = 'Carregar Imagem'
    botaoCarregarURLUniformeAway.setAttribute("type", "button")

    botaoCarregarURLUniformeAway.addEventListener("click", function() {
        carregarURLFoto(inputURLUniformeAway)
    })

    divInputURLUniformeAway.appendChild(botaoCarregarURLUniformeAway)

    divUniformeAway.appendChild(divInputURLUniformeAway)


    let divUniformeThird = document.createElement('div')
    divUniformeThird.className = 'py-3 pr-10 pl-5 border-r border-gray-200 row-span-4 grid gap-0 pt-10'

    let labelUniformeThird = document.createElement('label')
    labelUniformeThird.innerText = 'Third:'
    divUniformeThird.appendChild(labelUniformeThird)

    let fotoUniformeThird = document.createElement('img')
    fotoUniformeThird.className = 'border border-gray-200 w-52 h-52'
    fotoUniformeThird.id = 'imagem-fotoUniformeThird'

    fotoUniformeThird.addEventListener("error", function() {
        erroImagem(this)
    })

    divUniformeThird.appendChild(fotoUniformeThird)

    divUniformes.appendChild(divUniformeThird)


    let inputFotoUniformeThird = document.createElement('input')
    inputFotoUniformeThird.className = 'mt-4'
    inputFotoUniformeThird.type = 'file'
    inputFotoUniformeThird.id = 'input-fotoUniformeThird'
    inputFotoUniformeThird.name = 'fotoUniformeThird'

    inputFotoUniformeThird.addEventListener("change", function() {
        carregarFoto(this)
    })

    divUniformeThird.appendChild(inputFotoUniformeThird)

    let divInputURLUniformeThird = document.createElement('div')
    divInputURLUniformeThird.className = 'flex justify-between mt-2'

    let inputURLUniformeThird = document.createElement('input')
    inputURLUniformeThird.className = 'border border-gray-400 p-2 text-sm w-2/3'
    inputURLUniformeThird.type = 'text'
    inputURLUniformeThird.id = 'url-fotoUniformeThird'
    inputURLUniformeThird.setAttribute("placeholder", "Escolha um arquivo ou cole aqui a URL da imagem")
    divInputURLUniformeThird.appendChild(inputURLUniformeThird)

    let botaoCarregarURLUniformeThird = document.createElement('button')
    botaoCarregarURLUniformeThird.className = 'p-2 text-xs border border-gray-300 bg-gray-200'
    botaoCarregarURLUniformeThird.innerHTML = 'Carregar Imagem'
    botaoCarregarURLUniformeThird.setAttribute("type", "button")

    botaoCarregarURLUniformeThird.addEventListener("click", function() {
        carregarURLFoto(inputURLUniformeThird)
    })

    divInputURLUniformeThird.appendChild(botaoCarregarURLUniformeThird)

    divUniformeThird.appendChild(divInputURLUniformeThird)


    let divUniformeGK = document.createElement('div')
    divUniformeGK.className = 'py-3 pl-10 pr-5 border-l border-gray-200 row-span-4 grid gap-0 pt-10'

    let labelUniformeGK = document.createElement('label')
    labelUniformeGK.innerText = 'GK:'
    divUniformeGK.appendChild(labelUniformeGK)

    let fotoUniformeGK = document.createElement('img')
    fotoUniformeGK.className = 'border border-gray-200 w-52 h-52'
    fotoUniformeGK.id = 'imagem-fotoUniformeGK'

    fotoUniformeGK.addEventListener("error", function() {
        erroImagem(this)
    })

    divUniformeGK.appendChild(fotoUniformeGK)

    divUniformes.appendChild(divUniformeGK)


    let inputFotoUniformeGK = document.createElement('input')
    inputFotoUniformeGK.className = 'mt-4'
    inputFotoUniformeGK.type = 'file'
    inputFotoUniformeGK.id = 'input-fotoUniformeGK'
    inputFotoUniformeGK.name = 'fotoUniformeGK'

    inputFotoUniformeGK.addEventListener("change", function() {
        carregarFoto(this)
    })

    divUniformeGK.appendChild(inputFotoUniformeGK)

    let divInputURLUniformeGK = document.createElement('div')
    divInputURLUniformeGK.className = 'flex justify-between mt-2'

    let inputURLUniformeGK = document.createElement('input')
    inputURLUniformeGK.className = 'border border-gray-400 p-2 text-sm w-2/3'
    inputURLUniformeGK.type = 'text'
    inputURLUniformeGK.id = 'url-fotoUniformeGK'
    inputURLUniformeGK.setAttribute("placeholder", "Escolha um arquivo ou cole aqui a URL da imagem")
    divInputURLUniformeGK.appendChild(inputURLUniformeGK)

    let botaoCarregarURLUniformeGK = document.createElement('button')
    botaoCarregarURLUniformeGK.className = 'p-2 text-xs border border-gray-300 bg-gray-200'
    botaoCarregarURLUniformeGK.innerHTML = 'Carregar Imagem'
    botaoCarregarURLUniformeGK.setAttribute("type", "button")

    botaoCarregarURLUniformeGK.addEventListener("click", function() {
        carregarURLFoto(inputURLUniformeGK)
    })

    divInputURLUniformeGK.appendChild(botaoCarregarURLUniformeGK)

    divUniformeGK.appendChild(divInputURLUniformeGK)


    //marca uniforme
    let divMarcaUniforme = document.createElement('div')
    divMarcaUniforme.className = 'py-3 pl-5 grid gap-0 col-span-2 mt-6'

    let labelMarcaUniforme = document.createElement('label')
    labelMarcaUniforme.innerText = 'Marca do Uniforme:'
    divMarcaUniforme.appendChild(labelMarcaUniforme)

    let inputMarcaUniforme = document.createElement('input')
    inputMarcaUniforme.className = 'border border-gray-400 p-2 w-2/5'
    inputMarcaUniforme.type = 'text'
    inputMarcaUniforme.id = 'marcaUniforme'
    divMarcaUniforme.appendChild(inputMarcaUniforme)

    divUniformes.appendChild(divMarcaUniforme)

    form.appendChild(divUniformes)

    document.body.appendChild(dialogCadastro)

    dialogCadastro.addEventListener("close", function () {
        dialogCadastro.remove()
    })

    dialogCadastro.showModal()
    }

    function carregarLigas(pais) {

    let selectLiga = document.getElementById('selectLiga')
    selectLiga.innerHTML = '';

    fetch(`http://localhost:3000/api/paises/ligas/${pais}`)
        .then(response => response.json())
        .then(function(data) {
            data.forEach(liga => {
                let option = document.createElement('option')
                option.value = liga
                option.innerText = liga
                selectLiga.appendChild(option)
            });
        })
        .then(function () {
            carregarCompeticoes(pais)
        })
        .catch(error => console.error("Erro:", error))
    }


    function carregarFoto(e) {

    let foto = document.getElementById(`imagem-${e.id.replace("input-", "")}`)
    foto.src = window.URL.createObjectURL(e.files[0]);

    let url = document.getElementById(`url-${e.id.replace("input-", "")}`)
    url.value = null
    }


    function carregarURLFoto(e) {

    let url = document.getElementById(e.id)
    let foto = document.getElementById(`imagem-${e.id.replace("url-", "")}`)
    foto.src = url.value

    let inputFoto = document.getElementById(`input-${e.id.replace("url-", "")}`)
    inputFoto.value = []
    }

    function erroImagem (e) {
    alert('Não Foi Possivel Carregar a Imagem')
    e.src = '../img/SemImagem.png'
    // e.src = 'https://media.internacional.groundsportech.com/wp-content/uploads/2022/04/24142703/RaioX_GuriasColoradasVsFlamengo_BrasileiraoA12022_7Rodada_Palco_CristoRei_FotoFernandoCampos_Aimore_2404.jpg'
    let url = document.getElementById(`url-${e.id.replace("imagem-", "")}`)
    url.value = null
    }

    function carregarCompeticoes(pais, form) {

    let divTituloAntiga = document.getElementById('tituloTitulos')
    let divTituloConteudoAntiga = document.getElementById('divTitulosCadastro')

    if(divTituloAntiga) {
        divTituloAntiga.remove()
    }
    if(divTituloConteudoAntiga) {
        divTituloConteudoAntiga.remove()
    }

    let botao = document.getElementById('botaoCadastrar')

    if(botao) {
        botao.remove()
    }

    //Títulos
    let tituloTitulos = document.createElement('h3')
    tituloTitulos.className = 'text-lg border-2 border-gray-300 font-medium bg-gray-200 pl-4 py-3 mt-10'
    tituloTitulos.innerText = 'Títulos:'
    tituloTitulos.id = 'tituloTitulos'

    if(!form) {
        form = document.getElementById('formCadastroTime')
    }

    form.appendChild(tituloTitulos)

    //TITULOS
    let divTitulos = document.createElement('div')
    divTitulos.className = 'grid grid-cols-2 gap-y-0 gap-x-0 px-8 pt-4 pb-8 bg-gray-100 shadow-md border-l-2 border-r-2 border-b-2 border-gray-200'
    divTitulos.id = 'divTitulosCadastro'
    form.appendChild(divTitulos)

    //BOTAO CADASTRAR
    let botaoCadastrar = document.createElement('button')
    botaoCadastrar.setAttribute("type", "submit")
    botaoCadastrar.className = 'px-10 py-3 bg-gray-200 hover:bg-gray-100 border-2 border-gray-300 text-2xl font-bold mt-10 w-1/2 mx-auto mb-5'
    botaoCadastrar.innerHTML = 'Cadastrar'
    botaoCadastrar.id = 'botaoCadastrar'
    
    form.appendChild(botaoCadastrar)


    fetch(`http://localhost:3000/api/paises/${pais}`)
    .then(response => response.json())
    .then(function(data) {
        
        let campeonatos = data.campeonatos
        let copas = data.copas

        campeonatos.forEach(campeonato => {
            let divCampeonato = document.createElement('div')
            divCampeonato.className = 'py-3 px-5 grid col-span-2 mt-5'

            let labelCampeonato = document.createElement('label')
            labelCampeonato.innerText = `${campeonato}:`
            labelCampeonato.className = 'font-semibold'
            divCampeonato.appendChild(labelCampeonato)

            let textAreaCampeonato = document.createElement('textarea')
            textAreaCampeonato.className = 'border border-gray-400 p-2 h-32'
            textAreaCampeonato.id = `campeonato-${campeonato}`
            textAreaCampeonato.setAttribute('placeholder', 'Ex: 2001-02, 2005-08, 2010-11, 2021-22')
            divCampeonato.appendChild(textAreaCampeonato)

            divTitulos.appendChild(divCampeonato)    
        });

        copas.forEach(copa => {
            let divCopa = document.createElement('div')
            divCopa.className = 'py-3 px-5 grid col-span-2 mt-5'

            let labelCopa = document.createElement('label')
            labelCopa.innerText = `${copa}:`
            labelCopa.className = 'font-semibold'
            divCopa.appendChild(labelCopa)

            let textAreaCopa = document.createElement('textarea')
            textAreaCopa.className = 'border border-gray-400 p-2 h-32'
            textAreaCopa.id = `copa-${copa}`
            textAreaCopa.setAttribute('placeholder', 'Ex: 2001-02, 2005-08, 2010-11, 2021-22')
            divCopa.appendChild(textAreaCopa)

            divTitulos.appendChild(divCopa)    
        });
        

        fetch(`http://localhost:3000/api/competicoes/continental/${data.continente}`)
        .then(response => response.json())
        .then(function(data) {

            data.forEach(campeonato => {
                let divCampeonato = document.createElement('div')
                divCampeonato.className = 'py-3 px-5 grid col-span-2 mt-5'
        
                let labelCampeonato = document.createElement('label')
                labelCampeonato.innerText = `${campeonato.nome}:`
                labelCampeonato.className = 'font-semibold'
                divCampeonato.appendChild(labelCampeonato)
        
                let textAreaCampeonato = document.createElement('textarea')
                textAreaCampeonato.className = 'border border-gray-400 p-2 h-32'
                textAreaCampeonato.id = campeonato.nome
                textAreaCampeonato.setAttribute('placeholder', 'Ex: 2001-02, 2005-08, 2010-11, 2021-22')
                divCampeonato.appendChild(textAreaCampeonato)
        
                divTitulos.appendChild(divCampeonato)    
            });
        })
        .then(function() {
            let divCampeonato = document.createElement('div')
            divCampeonato.className = 'py-3 px-5 grid col-span-2 mt-5'

            let labelCampeonato = document.createElement('label')
            labelCampeonato.innerText = 'FIFA Club World Cup:'
            labelCampeonato.className = 'font-semibold'
            divCampeonato.appendChild(labelCampeonato)

            let textAreaCampeonato = document.createElement('textarea')
            textAreaCampeonato.className = 'border border-gray-400 p-2 h-32'
            textAreaCampeonato.id = 'FIFA Club World Cup'
            textAreaCampeonato.setAttribute('placeholder', 'Ex: 2001-02, 2005-08, 2010-11, 2021-22')
            divCampeonato.appendChild(textAreaCampeonato)

            divTitulos.appendChild(divCampeonato)   
        })
    })
}