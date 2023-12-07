'use client'

import { ChangeEvent, useState } from 'react'

import {
  Botao,
  Toggle,
  InputTexto,
  InputRadio,
  Accordion,
  CardInfoVeiculo
} from '@componentes'
import { BLITZ_MOCK, INFOS_BLITZ_MOCK, LISTA_MOCK_3 } from '@constantes'
import { InformacoesVeiculo } from '@secoes'
import { Gode } from '@icones'
import { EstiloInputTexto } from '@componentes/input-texto/input-texto.enum'
import { VariacaoBotao } from '@componentes/botao/botao.enum'

import styles from '../page.module.scss'

export default function Home() {
  const [valor, setValor] = useState<string>()
  const [ativo, setAtivo] = useState(false)
  const [valorRadio, setValorRadio] = useState('')
  const [cardSelecionado, setCardSelecionado] = useState('')

  function handleChange(evento: ChangeEvent<HTMLInputElement>) {
    const { value } = evento.target
    setValor(value)
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Botao variacao={VariacaoBotao.REQUISICAO}>Botão requisição</Botao>
        <Botao variacao={VariacaoBotao.NEGATIVO}>Botão negativo</Botao>
        <Botao variacao={VariacaoBotao.ACAO_PADRAO}>Botão acao padrão</Botao>
        <Botao variacao={VariacaoBotao.ACAO_SECUNDARIO} icone={Gode}>
          Botão acao secundario
        </Botao>
        <Botao
          variacao={VariacaoBotao.ACAO_SECUNDARIO}
          icone={Gode}
          selecionado
        >
          Botão acao secundario selecionado
        </Botao>
        <Botao variacao={VariacaoBotao.PADRAO}>Botão padrao</Botao>
        <InformacoesVeiculo informacoes={BLITZ_MOCK} />
        <Accordion
          textoBotao='Teste de accordion'
          textoAuxiliar={
            <>
              filtros de <span style={{ fontWeight: 500 }}>Equipamento</span>
            </>
          }
        >
          <Toggle
            rotulo='Toggle teste'
            ativo={ativo}
            onChange={() => setAtivo((ativo) => !ativo)}
          />
          <InputTexto
            id='input-texto'
            className={styles.inputTexto}
            rotulo='Restrição'
            estiloInputTexto={EstiloInputTexto.LIMPAR}
            onChange={handleChange}
            value={valor}
            setValor={(valor) => setValor(valor.toString())}
          />
        </Accordion>
        <InputRadio
          valores={LISTA_MOCK_3}
          setValor={setValorRadio}
          inputName='radioButton'
        />
        {valorRadio}
        <div className={styles.cards}>
          {INFOS_BLITZ_MOCK.map(
            (
              {
                veiculo: { placa, especie, marca, cor },
                equipamento,
                restricoes,
                data_hora
              },
              i
            ) => {
              return (
                <CardInfoVeiculo
                  key={i}
                  placa={placa}
                  especie={especie}
                  marca={marca}
                  cor={cor}
                  // alterar cor de restrição quando for adicionado no back
                  corRestricao={restricoes[0].cor}
                  equipamento={equipamento}
                  selecionado={cardSelecionado === placa}
                  onClick={() =>
                    setCardSelecionado((antigo) =>
                      antigo === placa ? '' : placa
                    )
                  }
                  dataHora={data_hora}
                />
              )
            }
          )}
        </div>
      </div>
    </main>
  )
}
