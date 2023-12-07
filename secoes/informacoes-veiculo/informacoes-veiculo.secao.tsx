'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Botao } from '@componentes'
import { Expandir, Notas } from '@icones'
import { VariacaoBotao } from '@componentes/botao/botao.enum'
import type { InformacoesBlitz } from '@types'

import {
  CardEquipamento,
  CardGeral,
  CardRestricao,
  CardVeiculo
} from './componentes'
import estilos from './informacoes-veiculo.module.scss'

type InformacoesVeiculoProps = { informacoes: InformacoesBlitz }

export default function InformacoesVeiculo({
  informacoes: { data_hora, veiculo, equipamento, restricoes, imagem }
}: InformacoesVeiculoProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isImagemExpandida, setIsImagemExpandida] = useState(false)
  const [width, setWidth] = useState<number>(1100)

  useEffect(() => {
    if (width <= 1100) setIsImagemExpandida(false)
  }, [width])

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () =>
      window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  function alternarImagem() {
    setIsImagemExpandida((antigo) => !antigo)
  }

  return (
    <section
      className={classNames(estilos.secao, {
        [estilos.secaoImagemExpandida]: isImagemExpandida
      })}
      ref={sectionRef}
    >
      <div className={estilos.informacoesVeiculo}>
        <div className={estilos.imagemContainer}>
          <Image
            className={estilos.imagemVeiculo}
            src={imagem}
            fill
            alt={'carro'}
            draggable={false}
          />
          <Botao
            className={estilos.botaoExpandir}
            onClick={alternarImagem}
            variacao={VariacaoBotao.ACAO_SECUNDARIO}
            icone={isImagemExpandida ? Notas : Expandir}
          />
        </div>
        <CardVeiculo
          caracteristicas={veiculo}
          ref={sectionRef}
          arrastavel={isImagemExpandida}
        />
      </div>
      <div className={estilos.informacoesGerais}>
        <CardGeral
          caracteristicas={{
            kmh: veiculo.velocidadeMedida,
            dataHora: data_hora,
            equipamento: equipamento.descricao,
            corRestricao: restricoes[0].cor, // adicionar cor da restrição quando estiver no back
            placa: veiculo.placa,
            especie: veiculo.especie
          }}
          ref={sectionRef}
          arrastavel={isImagemExpandida}
        />
        <CardEquipamento
          caracteristicas={equipamento}
          ref={sectionRef}
          arrastavel={isImagemExpandida}
        />
      </div>
      <CardRestricao
        restricao={restricoes[0].descricao}
        ref={sectionRef}
        arrastavel={isImagemExpandida}
      />
    </section>
  )
}
