import classNames from 'classnames'

import { Relogio } from '@icones'
import { RestricaoTag } from '@componentes'
import type { Equipamento, Veiculo } from '@types'

import estilos from './card-info-veiculo.module.scss'

type CardInfoVeiculoProps = Pick<
  Veiculo,
  'placa' | 'especie' | 'marca' | 'cor'
> & {
  corRestricao: string
  onClick: () => void
  selecionado?: boolean
  dataHora: string
  equipamento: Equipamento
}

export default function CardInfoVeiculo({
  placa,
  marca,
  cor,
  corRestricao,
  especie,
  dataHora,
  equipamento: { cidade, uf, local },
  onClick,
  selecionado = false
}: CardInfoVeiculoProps) {
  const horaFormatada = dataHora.split(' ')[1]

  function handleClick() {
    onClick?.()
  }

  return (
    <button
      className={classNames(estilos.cardInfoVeiculo, {
        [estilos.cardSelecionado]: selecionado
      })}
      onClick={handleClick}
    >
      <header className={estilos.cabecalho}>
        <div className={estilos.infosVeiculo}>
          <span>{placa}</span>
          <span>
            {marca}, {cor}
          </span>
        </div>
        <RestricaoTag tipoVeiculo={especie} cor={corRestricao} />
      </header>
      <address className={estilos.endereco}>
        <span>{local}</span>
        <span>Bairro {'bairro*'}</span>
        <span>Cidade {cidade}</span>
        <span>Estado {uf}</span>
      </address>
      <div className={estilos.horario}>
        <Relogio /> <span>{horaFormatada}</span>
      </div>
    </button>
  )
}
