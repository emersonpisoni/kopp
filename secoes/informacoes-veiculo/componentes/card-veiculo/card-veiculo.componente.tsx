import { forwardRef } from 'react'

import { CardInfoArrastavel, TextoComIcone } from '@componentes'
import { VEICULOS_ICONES } from '@constantes'
import type { Veiculo } from '@types'

import estilos from './card-veiculo.module.scss'

enum CHAVES_INFO_VEICULO {
  placa = 'Placa',
  tracao = 'Tração',
  especie = 'Espécie',
  categoria = 'Categoria',
  cor = 'Cor',
  anoFabricacao = 'Ano',
  marca = 'Marca',
  modelo = 'Modelo'
}

type CardVeiculoProps = {
  caracteristicas: Veiculo
  arrastavel?: boolean
}

const CardVeiculo = forwardRef<HTMLDivElement, CardVeiculoProps>(
  (
    {
      caracteristicas: { placa, ...caracteristicas },
      arrastavel = false
    }: CardVeiculoProps,
    ref
  ) => {
    // alterar para VEICULOS_ICONES[caracteristicas.especie] quando estiver correto no back
    const VeiculoIcone = VEICULOS_ICONES['carro']

    return (
      <CardInfoArrastavel
        ref={ref}
        titulo='Veículo'
        className={estilos.cardVeiculo}
        arrastavel={arrastavel}
        coordenadas={{ posicaoX: 490, posicaoY: 20 }}
      >
        {!arrastavel && (
          <header className={estilos.cabecalho}>
            <h1 className={estilos.tituloVeiculo}>Veículo</h1>
            <TextoComIcone texto={placa} Icone={VeiculoIcone} />
          </header>
        )}
        <ul>
          {Object.keys(caracteristicas).map((chave) => (
            <li key={chave} className={estilos.itemInfoVeiculo}>
              <span className={estilos.chave}>
                {CHAVES_INFO_VEICULO[chave as keyof typeof CHAVES_INFO_VEICULO]}
              </span>
              <span className={estilos.valor}>
                {caracteristicas[chave as keyof typeof caracteristicas]}
              </span>
            </li>
          ))}
        </ul>
      </CardInfoArrastavel>
    )
  }
)

CardVeiculo.displayName = 'CardVeiculo'

export default CardVeiculo
