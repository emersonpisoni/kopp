import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'

import { InputRadio, Botao, BotaoMural } from '@componentes'
import {
  Pause,
  Gode,
  Pequeno,
  Medio,
  ExtraGrande,
  Grande,
  SetaEsquerda
} from '@icones'
import { VariacaoBotao } from '@componentes/botao/botao.enum'
import { Mural } from '@componentes/card-alerta-ocr/card-alerta-ocr.enum'
import { ModoExibicaoMural } from 'enums'

import estilos from './botoes-alerta-ocr.module.scss'

const OPCOES_MURAL = [
  { label: <Pequeno />, valor: Mural.PEQUENO },
  { label: <Medio />, valor: Mural.MEDIO },
  { label: <Grande />, valor: Mural.GRANDE },
  { label: <ExtraGrande />, valor: Mural.EXTRA_GRANDE }
]

type BotoesAlertaOcrProps = {
  exibicaoInfo: string
  muralTamanho: string
  setExibicaoInfo: Dispatch<SetStateAction<string>>
  onChangeTamanhoMural: (valor: Mural) => void
  toggleBarraFiltros: () => void
  isBarraFiltrosAberto?: boolean
}

export default function BotoesAlertaOcr({
  exibicaoInfo,
  muralTamanho,
  setExibicaoInfo,
  onChangeTamanhoMural,
  toggleBarraFiltros,
  isBarraFiltrosAberto = false
}: BotoesAlertaOcrProps) {
  const router = useRouter()

  return (
    <div className={estilos.botoes}>
      <InputRadio
        className={estilos.inputRadio}
        inputName='configMural'
        valores={Object.values(ModoExibicaoMural)}
        setValor={setExibicaoInfo}
        opcaoSelecionada={exibicaoInfo}
      />
      <div className={estilos.botoesLadoDireito}>
        <Botao
          className={estilos.botaoVoltar}
          variacao={VariacaoBotao.ACAO_SECUNDARIO}
          icone={SetaEsquerda}
          onClick={() => router.back()}
        />
        <Botao
          className={estilos.botaoCongelar}
          variacao={VariacaoBotao.ACAO_SECUNDARIO}
          icone={Pause}
        >
          Congelar
        </Botao>
        <Botao
          className={estilos.botaoFiltros}
          variacao={VariacaoBotao.ACAO_SECUNDARIO}
          icone={Gode}
          onClick={toggleBarraFiltros}
          selecionado={isBarraFiltrosAberto}
        >
          Filtros/Configurações de exibição
        </Botao>
        <BotaoMural
          opcoes={OPCOES_MURAL}
          opcaoSelecionada={muralTamanho}
          onChange={(valor: string) => onChangeTamanhoMural(valor as Mural)}
        />
      </div>
    </div>
  )
}
