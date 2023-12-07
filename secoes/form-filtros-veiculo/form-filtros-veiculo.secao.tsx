import { useCallback } from 'react'
import type { Dispatch, ChangeEvent } from 'react'

import { InputTexto, InputSelecao, Toggle } from '@componentes'
import { LISTA_MOCK_2 } from '@constantes'
import type { FiltrosCercamentoEletronico } from '@types'

import estilos from './form-filtros-veiculo.module.scss'

const ESPACO_RESERVADO_SELECT = 'Selecione'

type FormFiltrosVeiculoProps = {
  atualizarDados: Dispatch<Partial<FiltrosCercamentoEletronico>>
  dados: FiltrosCercamentoEletronico
}

export default function FormFiltrosVeiculo({
  atualizarDados,
  dados: { placa, toggleSonoro, toggleRestricao }
}: FormFiltrosVeiculoProps) {
  const atualizarCampo = useCallback(
    (valor: string[], chave?: string) => {
      if (!chave) return
      atualizarDados({ [chave]: [...valor] })
    },
    [atualizarDados]
  )

  return (
    <>
      <InputTexto
        id='placa'
        className={estilos.inputSelecaoPlaca}
        rotulo='Placa'
        espacoReservado='XYZ1234'
        onChange={(evento: ChangeEvent<HTMLInputElement>) =>
          atualizarDados({ placa: evento.target.value })
        }
        setValor={(valor) => atualizarDados({ placa: valor.toString() })}
        value={placa}
      />
      <InputSelecao
        id='cor'
        className={estilos.inputSelecaoCor}
        rotulo='Cor'
        espacoReservado={ESPACO_RESERVADO_SELECT}
        setValor={atualizarCampo}
        lista={LISTA_MOCK_2}
        isMultiSelecao
      />
      <InputSelecao
        id='tipo'
        className={estilos.inputSelecaoTipo}
        rotulo='Tipo'
        espacoReservado={ESPACO_RESERVADO_SELECT}
        setValor={atualizarCampo}
        lista={LISTA_MOCK_2}
        isMultiSelecao
      />
      <InputSelecao
        id='categoria'
        className={estilos.inputSelecaoCategoria}
        rotulo='Categoria'
        espacoReservado={ESPACO_RESERVADO_SELECT}
        setValor={atualizarCampo}
        lista={LISTA_MOCK_2}
        isMultiSelecao
      />
      <InputSelecao
        id='anoFabricacao'
        className={estilos.inputSelecaoAnoFabricacao}
        rotulo='Ano fabricação'
        espacoReservado={ESPACO_RESERVADO_SELECT}
        setValor={atualizarCampo}
        lista={LISTA_MOCK_2}
        isMultiSelecao
      />
      <InputSelecao
        id='especie'
        className={estilos.inputSelecaoEspecie}
        rotulo='Espécie'
        espacoReservado={ESPACO_RESERVADO_SELECT}
        setValor={atualizarCampo}
        lista={LISTA_MOCK_2}
        isMultiSelecao
      />
      <InputSelecao
        id='restricao'
        className={estilos.inputSelecaoRestricao}
        rotulo='Restrição'
        espacoReservado={ESPACO_RESERVADO_SELECT}
        setValor={atualizarCampo}
        lista={LISTA_MOCK_2}
        isMultiSelecao
      />
      <div className={estilos.toggles}>
        <Toggle
          className={estilos.toggleAlertaSonoro}
          rotulo='Alerta sonoro'
          ativo={toggleSonoro}
          onChange={() => atualizarDados({ toggleSonoro: !toggleSonoro })}
        />
        <Toggle
          className={estilos.toggleAlertaRestricao}
          rotulo='Somente com restrição'
          ativo={toggleRestricao}
          onChange={() => atualizarDados({ toggleRestricao: !toggleRestricao })}
        />
      </div>
    </>
  )
}
