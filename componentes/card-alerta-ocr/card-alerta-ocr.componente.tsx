import classNames from 'classnames'
import Image from 'next/image'

import { Relogio, SetaSimplesBaixo } from '@icones'
import { formatarHoraParaString } from '@uteis'

import { Mural } from './card-alerta-ocr.enum'
import estilos from './card-alerta-ocr.module.scss'

type CardAlertaOcrProps = {
  hasCabecalho?: boolean
  imagem: string
  placa: string
  hora: Date
  equipamento: string
  muralTamanho?: Mural
}

export default function CardAlertaOcr({
  hasCabecalho = true,
  imagem,
  placa,
  hora,
  equipamento,
  muralTamanho = Mural.EXTRA_GRANDE
}: CardAlertaOcrProps) {
  const horaFormatada = formatarHoraParaString(hora)

  return (
    <div className={classNames(estilos.cardAlertaOcr, estilos[muralTamanho])}>
      {hasCabecalho && (
        <>
          <SetaSimplesBaixo className={estilos.setaBaixo} />
          <header className={estilos.cabecalho}>
            <div className={estilos.placa}>{placa}</div>
            <div className={estilos.hora}>
              <Relogio />
              {horaFormatada}
            </div>
          </header>
          <span className={estilos.equipamento}>{equipamento}</span>
        </>
      )}
      <Image
        className={estilos.imagemVeiculo}
        src={imagem}
        alt={`Veículo placa ${placa}`}
        fill
      />
    </div>
  )
}
