'use client'

import classNames from 'classnames'
import { useState, useEffect } from 'react'

import { Botao, CardInfoVeiculo } from '@componentes'
import { BLITZ_MOCK, INFOS_BLITZ_MOCK } from '@constantes'
import { InformacoesVeiculo } from '@secoes'
import { SetaEsquerda } from '@icones'
import { VariacaoBotao } from '@componentes/botao/botao.enum'
import type { InformacoesBlitz } from '@types'
import FormModoBlitz from '@secoes/form-modo-blitz/form-modo-blitz.secao'

import estilos from './blitz.module.scss'

export default function Blitz() {
  const [cardSelecionado, setCardSelecionado] = useState('')
  // remover mocks quando implementação estiver completa no back
  const [veiculos, setVeiculos] = useState<InformacoesBlitz[]>(INFOS_BLITZ_MOCK)
  const [veiculoSelecionado, setVeiculoSelecionado] =
    useState<InformacoesBlitz>(BLITZ_MOCK)

  useEffect(() => {
    setVeiculoSelecionado(veiculos[0])
  }, [veiculos])

  useEffect(() => {
    const informacoesVeiculoAtual = veiculos.find(
      ({ veiculo }) => veiculo.placa === cardSelecionado
    )

    setVeiculoSelecionado(informacoesVeiculoAtual || BLITZ_MOCK)
  }, [cardSelecionado])

  return (
    <div className={classNames(estilos.blitz)}>
      <div className={estilos.container}>
        <FormModoBlitz
          setVeiculos={setVeiculos}
          setCardSelecionado={setCardSelecionado}
        />
        <section className={estilos.informacoesTempoReal}>
          <div className={estilos.cardsContainer}>
            <p className={estilos.dataAtual}>00 de Outubro de 2023*</p>
            <div className={estilos.cards}>
              {veiculos.map(
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
                      equipamento={equipamento}
                      // alterar cor de restrição quando for adicionado no back
                      corRestricao={restricoes[0].cor || '#bbb'}
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
          <div className={estilos.descricao}>
            <Botao
              className={estilos.voltar}
              variacao={VariacaoBotao.ACAO_SECUNDARIO}
              icone={SetaEsquerda}
            >
              Voltar para a visualização automática
            </Botao>
            <InformacoesVeiculo informacoes={veiculoSelecionado} />
          </div>
        </section>
      </div>
    </div>
  )
}
