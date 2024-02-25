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

    let listaDeTimes = document.getElementById('listaDeTimes')
    
    if(listaDeTimes) {
        listaDeTimes.innerHTML = ''
    } else {
        listaDeTimes = document.createElement('section')    
    }
    
    listaDeTimes.id = 'listaDeTimes'
    listaDeTimes.className = 'grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 p-8 bg-gray-50 min-[1500px]:grid-cols-6 min-[1900px]:grid-cols-7'

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

    let listaDeTimes = document.getElementById('listaDeTimes')
    
    if(listaDeTimes) {
        listaDeTimes.innerHTML = ''
    } else {
        listaDeTimes = document.createElement('section')    
    }

    listaDeTimes.id = 'listaDeTimes'
    listaDeTimes.className = 'grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 p-8 bg-gray-50 min-[1500px]:grid-cols-6 min-[1900px]:grid-cols-7'

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


function filtrarPorNome(e) {
    let nome = e.value

    if(nome.length == 0) {
        nome = ''
        carregarListaTimes()
    } else {

        if(paisEscolhido != 'Todos' && paisEscolhido != '') {
            fetch(`http://localhost:3000/api/times/filtrar/${paisEscolhido}/${nome}`)
            .then(response => response.json())
            .then(function(data) {
                paisEscolhido === '' ? mostrarListaTodosTimes(data) : mostrarListaTimes(data)
            })
            .catch(error => console.error("Erro:", error))

        } else {
            fetch(`http://localhost:3000/api/times/filtrar/${nome}`)
            .then(response => response.json())
            .then(function(data) {
                paisEscolhido === '' ? mostrarListaTodosTimes(data) : mostrarListaTimes(data)
            })
            .catch(error => console.error("Erro:", error))
        }
    }
}