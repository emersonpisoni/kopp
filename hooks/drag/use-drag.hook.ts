import { useRef, useEffect, useCallback } from 'react'
import type { RefObject } from 'react'

type Coordenadas = {
  diferencaX: number
  diferencaY: number
  posicaoX: number
  posicaoY: number
}

export default function useDrag(
  posicaoX: number,
  posicaoY: number,
  arrastavel: boolean,
  areaArrastavelRef: RefObject<HTMLDivElement>
) {
  const cardRef = useRef<HTMLDivElement>(null)
  const cabecalhoRef = useRef<HTMLDivElement>(null)
  const { current: coordenadas } = useRef<Coordenadas>({
    diferencaX: 0,
    diferencaY: 0,
    posicaoX: 0,
    posicaoY: 0
  })

  const definirPosicaoInicial = useCallback(() => {
    if (cardRef.current) {
      const RESPIRO = 80

      cardRef.current.style.left =
        posicaoX - cardRef.current.offsetWidth + RESPIRO + 'px'

      cardRef.current.style.top = posicaoY + 'px'
    }
  }, [posicaoX, posicaoY])

  useEffect(() => {
    definirPosicaoInicial()
  }, [cardRef, posicaoX, posicaoY, arrastavel, definirPosicaoInicial])

  useEffect(() => {
    if (!arrastavel) return

    arrastarElemento()

    function arrastarElemento() {
      if (!cardRef?.current || !areaArrastavelRef?.current) return

      const card = cardRef.current
      const areaArrastavel = areaArrastavelRef.current

      if (cabecalhoRef.current) {
        cabecalhoRef.current?.addEventListener(
          'mousedown',
          arrastarPressionando
        )
      }

      function arrastarPressionando(evento: MouseEvent) {
        evento.preventDefault()
        coordenadas.posicaoX = evento.clientX
        coordenadas.posicaoY = evento.clientY

        document.onmouseup = fecharElementoArrastavel
        document.onmousemove = arrastarElemento
      }

      function atualizarCoordenadas(evento: MouseEvent) {
        coordenadas.diferencaX = coordenadas.posicaoX - evento.clientX
        coordenadas.diferencaY = coordenadas.posicaoY - evento.clientY
        coordenadas.posicaoX = evento.clientX
        coordenadas.posicaoY = evento.clientY
      }

      function moverElementoEixoX() {
        const posicaoLeftContainerNaViewport = areaArrastavel.offsetLeft
        const larguraContainer = areaArrastavel.offsetWidth
        const posicaoLeftCard = card.offsetLeft

        const mouseUltrapassouDireita =
          coordenadas.posicaoX >=
          posicaoLeftContainerNaViewport + larguraContainer
        const mouseUltrapassouEsquerda =
          coordenadas.posicaoX <= posicaoLeftContainerNaViewport

        if (!mouseUltrapassouEsquerda && !mouseUltrapassouDireita) {
          card.style.left = posicaoLeftCard - coordenadas.diferencaX + 'px'
        }
      }

      function moverElementoEixoY(evento: MouseEvent) {
        const posicaoTopContainerNaViewport = areaArrastavel.offsetTop
        const alturaContainer = areaArrastavel.offsetHeight
        const metadeTamanhoCard = card.offsetHeight / 2
        const posicaoMouse = evento.pageY
        const posicaoTopCard = card.offsetTop

        const mouseUltrapassouFundo =
          posicaoMouse >=
          posicaoTopContainerNaViewport + alturaContainer - metadeTamanhoCard
        const mouseUltrapassouTopo =
          posicaoMouse <= posicaoTopContainerNaViewport

        if (!mouseUltrapassouTopo && !mouseUltrapassouFundo) {
          card.style.top = posicaoTopCard - coordenadas.diferencaY + 'px'
        }
      }

      function arrastarElemento(evento: MouseEvent) {
        evento.preventDefault()

        atualizarCoordenadas(evento)
        moverElementoEixoX()
        moverElementoEixoY(evento)
      }

      function fecharElementoArrastavel() {
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  }, [arrastavel, coordenadas, areaArrastavelRef])

  return {
    cardRef,
    cabecalhoRef
  }
}
