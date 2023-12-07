import classNames from 'classnames'
import { forwardRef, useState } from 'react'
import type { RefObject, PropsWithChildren } from 'react'

import { Arrastar, Mais, Menos } from '@icones'
import { useDrag } from '@hooks'

import estilos from './card-info-arrastavel.module.scss'

type CardInfoArrastavelProps = {
  className?: string
  titulo?: string
  arrastavel?: boolean
  coordenadas: { posicaoX: number; posicaoY: number }
  minimizado?: boolean
} & PropsWithChildren

const CardInfoArrastavel = forwardRef<HTMLDivElement, CardInfoArrastavelProps>(
  (
    {
      className,
      titulo,
      arrastavel = false,
      children,
      coordenadas: { posicaoX, posicaoY } = { posicaoX: 0, posicaoY: 0 },
      minimizado = false
    }: CardInfoArrastavelProps,
    ref
  ) => {
    const { cardRef, cabecalhoRef } = useDrag(
      posicaoX,
      posicaoY,
      arrastavel,
      ref as RefObject<HTMLDivElement>
    )
    const [estaMinimizado, setEstaMinimizado] = useState(minimizado)

    function alternarMinimizado() {
      setEstaMinimizado((antigo) => !antigo)
    }

    return (
      <div
        className={classNames(estilos.cardInfoArrastavel, className, {
          [estilos.arrastavel]: arrastavel,
          [estilos.minimizado]: estaMinimizado && arrastavel
        })}
        ref={cardRef}
        draggable={arrastavel}
      >
        {arrastavel && (
          <header className={estilos.cabecalho} ref={cabecalhoRef}>
            {titulo && <h1 className={estilos.titulo}>{titulo}</h1>}
            <i className={estilos.iconeArrastar}>
              <Arrastar />
            </i>
            <button
              className={estilos.botaoExpandir}
              onClick={alternarMinimizado}
            >
              {estaMinimizado ? <Mais /> : <Menos />}
            </button>
          </header>
        )}
        <div className={estilos.conteudo}>{children}</div>
      </div>
    )
  }
)

CardInfoArrastavel.displayName = 'CardInfoArrastavel'

export default CardInfoArrastavel
