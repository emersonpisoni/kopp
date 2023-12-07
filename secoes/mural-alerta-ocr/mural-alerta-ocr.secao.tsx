'use client'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import CardAlertaOcr from '@componentes/card-alerta-ocr/card-alerta-ocr.componente'
import { Mural } from '@componentes/card-alerta-ocr/card-alerta-ocr.enum'

import estilos from './mural-alerta-ocr.module.scss'

// TODO: remover algoritmo para mocar comportamento dos veiculos aparecendo em tela
const MOCK = {
  placa: 'FDS1234',
  hora: new Date(),
  equipamento: 'QIYC123',
  imagem:
    'https://classic.exame.com/wp-content/uploads/2022/05/BMW-IX-8.jpg?quality=70&strip=info&w=1024'
}
function gerarStringAleatoria() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const resultado = Array.from(Array(6)).map(() => {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
    return caracteres.charAt(indiceAleatorio)
  })

  return resultado.join('')
}

type AlertaOcr = {
  placa: string
  equipamento: string
  hora: Date
  imagem: string
}

const QUANTIDADE_CARDS = {
  pequeno: 2,
  medio: 4,
  grande: 8,
  extraGrande: 24
}

type MuralAlertaOcrProps = {
  className?: string
  muralTamanho: Mural
  hasCabecalho?: boolean
}

export default function MuralAlertaOcr({
  muralTamanho,
  hasCabecalho = true
}: MuralAlertaOcrProps) {
  const quantidadeCards = QUANTIDADE_CARDS[muralTamanho]
  const [listaVeiculos, setListaVeiculos] = useState<AlertaOcr[] | []>([])

  // TODO: remover algoritmo para mocar comportamento dos veiculos aparecendo em tela
  useEffect(() => {
    setTimeout(() => {
      setListaVeiculos((antigo) => {
        const novoVeiculo = {
          ...MOCK,
          placa: gerarStringAleatoria()
        } as AlertaOcr

        return [novoVeiculo, ...antigo].slice(0, QUANTIDADE_CARDS.extraGrande)
      })
    }, 2000)
  }, [listaVeiculos, quantidadeCards])

  return (
    <section
      className={classNames(estilos.muralAlertaOcr, estilos[muralTamanho])}
    >
      {listaVeiculos.map(({ placa, hora, equipamento, imagem }, index) => {
        if (index >= quantidadeCards) return

        return (
          <CardAlertaOcr
            key={placa}
            imagem={imagem}
            placa={placa}
            hora={hora}
            equipamento={equipamento}
            muralTamanho={muralTamanho}
            hasCabecalho={hasCabecalho}
          />
        )
      })}
    </section>
  )
}
