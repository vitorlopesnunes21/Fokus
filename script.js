const html = document.querySelector('html')
const focoBT = document.querySelector('.app__card-button--foco')
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBT = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBT = document.querySelector('#start-pause span')
const iniciarOuPausarIcon = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer') 

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const somPlay = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')
const somBeep = new Audio('/sons/beep.mp3')


let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBT.classList.add('active')
});

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBT.classList.add('active')
});

longoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBT.classList.add('active')
});

function alterarContexto(contexto) {
    mostarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;

        case "descanso-longo":
            titulo.innerHTML = `Hoar de voltar à superfíce.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        // somBeep.play()
        alert('tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        tempoDecorridoEmSegundos = 1500
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostarTempo()


}

startPauseBT.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        somPause.play()
        return
    }
    somPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBT.textContent = "Pausar"
    iniciarOuPausarIcon.setAttribute('src', '/imagens/pause.png')
}
function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBT.textContent = "Começar"
    iniciarOuPausarIcon.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostarTempo()
