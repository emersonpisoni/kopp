import { forwardRef } from 'react'

import { CardInfoArrastavel } from '@componentes'
import type { Equipamento } from '@types'

import estilos from './card-equipamento.module.scss'

type CardEquipamentoProps = {
  caracteristicas: Equipamento
  arrastavel?: boolean
}

const CardEquipamento = forwardRef<HTMLDivElement, CardEquipamentoProps>(
  (
    {
      caracteristicas: { cidade, uf, local, descricao },
      arrastavel = false
    }: CardEquipamentoProps,
    ref
  ) => {
    return (
      <CardInfoArrastavel
        ref={ref}
        titulo='Equipamento'
        arrastavel={arrastavel}
        minimizado
        className={estilos.cardEquipamento}
        coordenadas={{ posicaoX: 490, posicaoY: 210 }}
      >
        <header className={estilos.cabecalho}>
          <h1 className={estilos.tituloEquipamento}>Equipamento</h1>
          <span>{descricao}</span>
        </header>
        <h2 className={estilos.tituloLocalizacao}>Localização</h2>
        <address className={estilos.endereco}>
          <span>{local}</span>
          {/* adicionar info bairro no back */}
          <span>Bairro {'bairro*'}</span>
          <span>Cidade {cidade}</span>
          <span>Estado {uf}</span>
        </address>
      </CardInfoArrastavel>
    )
  }
)

CardEquipamento.displayName = 'CardEquipamento'

export default CardEquipamento
