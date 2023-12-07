import SockJS from 'sockjs-client'
import Stomp, { over } from 'stompjs'
import type { Dispatch, SetStateAction } from 'react'

import { Accordion, InputSelecao, Botao } from '@componentes'
import { VariacaoBotao } from '@componentes/botao/botao.enum'
import { LISTA_MOCK_2 } from '@constantes'
import { FormFiltrosVeiculo } from '@secoes'
import {
  WEBSOCKET_ROOT_LINK,
  WEBSOCKET_SUBSCRIBE_ENDPOINT,
  WEBSOCKET_SEND_MESSAGE_ENDPOINT
} from '@constantes/server/server.constante'
import type { InformacoesBlitz } from '@types'
import { useFiltrosVeiculo } from '@hooks'

import estilos from './form-modo-blitz.module.scss'

type FormModoBlitzProps = {
  setVeiculos: Dispatch<SetStateAction<InformacoesBlitz[]>>
  setCardSelecionado: Dispatch<SetStateAction<string>>
}

let stompClient: Stomp.Client
const ESPACO_RESERVADO_SELECT = 'Selecione'

export default function FormModoBlitz({
  setVeiculos,
  setCardSelecionado
}: FormModoBlitzProps) {
  const { dados, atualizarCampo, atualizarDados } = useFiltrosVeiculo()

  function connectWs() {
    const Sock = new SockJS(WEBSOCKET_ROOT_LINK)
    stompClient = over(Sock)
    stompClient.connect({}, onConnected, onError)
  }

  function onConnected() {
    stompClient.subscribe(WEBSOCKET_SUBSCRIBE_ENDPOINT, onMessageReceived)
  }

  function onError(error: unknown) {
    console.error(error)
  }

  function onMessageReceived(payload: { body: string }) {
    const payloadParsed: InformacoesBlitz = JSON.parse(payload.body)
    setVeiculos((veiculos) => [payloadParsed, ...veiculos])
    setCardSelecionado(payloadParsed.veiculo.placa)
  }

  function sendWs() {
    const chatMessage = {
      senderName: 'teste',
      status: 'JOIN'
    }
    stompClient.send(
      WEBSOCKET_SEND_MESSAGE_ENDPOINT,
      {},
      JSON.stringify(chatMessage)
    )
  }

  return (
    <>
      <Accordion
        className={estilos.accordionEquipamento}
        textoBotao='Equipamento'
        textoAuxiliar={
          <>
            filtros de <span style={{ fontWeight: 500 }}>Equipamento</span>
          </>
        }
      >
        <InputSelecao
          id='equipamento'
          className={estilos.inputSelecao}
          rotulo='Equipamento'
          espacoReservado={ESPACO_RESERVADO_SELECT}
          setValor={atualizarCampo}
          lista={LISTA_MOCK_2}
          isMultiSelecao
        />
      </Accordion>
      <Accordion
        className={estilos.accordionVeiculo}
        textoBotao='Veículo'
        textoAuxiliar={
          <>
            filtros de <span style={{ fontWeight: 500 }}>Veículo</span>
          </>
        }
      >
        <FormFiltrosVeiculo atualizarDados={atualizarDados} dados={dados} />
      </Accordion>
      <div className={estilos.botoes}>
        {/* alterar ações do webscoket quando implementação estiver completa no back */}
        <Botao onClick={connectWs} variacao={VariacaoBotao.REQUISICAO}>
          Pesquisar
        </Botao>
        <Botao onClick={sendWs} variacao={VariacaoBotao.ACAO_PADRAO}>
          Limpar filtros
        </Botao>
      </div>
    </>
  )
}
