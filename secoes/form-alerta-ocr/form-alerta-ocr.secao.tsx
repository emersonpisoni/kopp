import classNames from 'classnames'
import type { Dispatch, SetStateAction } from 'react'

import { LISTA_MOCK_2 } from '@constantes'
import { Botao, InputRadio, InputSelecao } from '@componentes'
import { FormFiltrosVeiculo } from '@secoes'
import { X } from '@icones'
import { VariacaoBotao } from '@componentes/botao/botao.enum'
import { useFiltrosVeiculo } from '@hooks'
import { ModoExibicaoMural } from 'enums'

import estilos from './form-alerta-ocr.module.scss'

const ESPACO_RESERVADO_SELECT = 'Selecione'

type FormAlertaOcrProps = {
  exibicaoInfo: string
  setExibicaoInfo: Dispatch<SetStateAction<string>>
  isAberto?: boolean
  fecharFiltros: () => void
}

export default function FormAlertaOcr({
  exibicaoInfo,
  setExibicaoInfo,
  isAberto = false,
  fecharFiltros
}: FormAlertaOcrProps) {
  const { dados, atualizarCampo, atualizarDados } = useFiltrosVeiculo()

  return (
    <div
      className={classNames(estilos.backgroundBlur, {
        [estilos.fechado]: !isAberto
      })}
    >
      <form className={estilos.formAlertaOcr}>
        <button
          className={estilos.botaoFechar}
          onClick={fecharFiltros}
          type='button'
        >
          <X />
        </button>
        <h1>Exibição</h1>
        <InputRadio
          className={estilos.inputRadio}
          inputName='configMural'
          valores={Object.values(ModoExibicaoMural)}
          setValor={setExibicaoInfo}
          opcaoSelecionada={exibicaoInfo}
        />
        <div className={estilos.containerFiltros}>
          <div className={estilos.containerEquipamento}>
            <h1>Filtros</h1>
            <h2>Equipamento</h2>
            <InputSelecao
              id='equipamento'
              className={estilos.inputSelecao}
              rotulo='Equipamento'
              espacoReservado={ESPACO_RESERVADO_SELECT}
              setValor={atualizarCampo}
              lista={LISTA_MOCK_2}
              isMultiSelecao
            />
          </div>

          <div>
            <h2>Veiculo</h2>
            <div className={estilos.filtrosVeiculo}>
              <FormFiltrosVeiculo
                dados={dados}
                atualizarDados={atualizarDados}
              />
            </div>
          </div>
        </div>

        <div className={estilos.botoes}>
          <Botao variacao={VariacaoBotao.REQUISICAO}>Pesquisar</Botao>
          <Botao variacao={VariacaoBotao.ACAO_PADRAO}>Limpar filtros</Botao>
          <Botao
            type='button'
            className={estilos.botaoCancelar}
            variacao={VariacaoBotao.NEGATIVO}
            onClick={fecharFiltros}
          >
            Cancelar
          </Botao>
        </div>
      </form>
    </div>
  )
}
