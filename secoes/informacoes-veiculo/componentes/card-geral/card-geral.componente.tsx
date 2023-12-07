import { forwardRef } from 'react'

import { CardInfoArrastavel, TextoComIcone } from '@componentes'
import { Raio, Relogio } from '@icones'
import { VEICULOS_ICONES } from '@constantes'
import type { Especie } from '@types'

import estilos from './card-geral.module.scss'

type Geral = {
  equipamento: string
  placa: string
  especie: Especie
  kmh: number
  dataHora: string
  corRestricao: string
}

type CardGeralProps = {
  caracteristicas: Geral
  arrastavel?: boolean
}

const CardGeral = forwardRef<HTMLDivElement, CardGeralProps>(
  (
    {
      caracteristicas: {
        especie,
        equipamento,
        placa,
        kmh,
        dataHora,
        corRestricao
      },
      arrastavel = false
    }: CardGeralProps,
    ref
  ) => {
    const VeiculoIcone =
      // alterar para VEICULOS_ICONES[caracteristicas.especie] quando estiver correto no back
      VEICULOS_ICONES[especie as keyof typeof VEICULOS_ICONES] ||
      VEICULOS_ICONES['carro']
    const horaFormatada = dataHora.split(' ')[1]

    return (
      <CardInfoArrastavel
        ref={ref}
        titulo='Geral'
        arrastavel={arrastavel}
        coordenadas={{ posicaoX: 0, posicaoY: 20 }}
      >
        {arrastavel && (
          <span className={estilos.equipamento}>{equipamento}</span>
        )}
        <div className={estilos.listaInformacoes}>
          <div className={estilos.containerPlacaRestricao}>
            <TextoComIcone texto={placa} Icone={VeiculoIcone} />
            <div
              className={estilos.restricao}
              style={{ backgroundColor: `${corRestricao}` }}
            />
          </div>
          <TextoComIcone texto={kmh + 'KM/H'} Icone={Raio} />
          <TextoComIcone texto={horaFormatada} Icone={Relogio} />
        </div>
      </CardInfoArrastavel>
    )
  }
)

CardGeral.displayName = 'CardGeral'

export default CardGeral
