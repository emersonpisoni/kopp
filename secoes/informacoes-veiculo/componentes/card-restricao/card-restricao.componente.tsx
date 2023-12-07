import classNames from 'classnames'
import { forwardRef } from 'react'

import { CardInfoArrastavel } from '@componentes'

import estilos from './card-restricao.module.scss'

type CardRestricaoProps = {
  restricao: string
  arrastavel?: boolean
}

const CardRestricao = forwardRef<HTMLDivElement, CardRestricaoProps>(
  ({ restricao, arrastavel = false }: CardRestricaoProps, ref) => {
    return (
      <CardInfoArrastavel
        ref={ref}
        titulo='Restrição'
        arrastavel={arrastavel}
        coordenadas={{ posicaoX: 490, posicaoY: 330 }}
        minimizado
      >
        <div
          className={classNames(estilos.container, {
            [estilos.containerArrastavel]: arrastavel
          })}
        >
          <h2 className={estilos.tituloRestricao}>Restrição</h2>
          <p className={estilos.restricao}>{restricao}</p>
        </div>
      </CardInfoArrastavel>
    )
  }
)

CardRestricao.displayName = 'CardRestricao'

export default CardRestricao
