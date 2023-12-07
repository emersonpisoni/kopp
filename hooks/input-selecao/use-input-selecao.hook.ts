import { useState, useCallback, useEffect, useRef } from 'react'

import { normalizarString } from '@uteis'
import { EstiloInputTexto } from '@componentes/input-texto/input-texto.enum'
import type { InputSelecaoOpcao } from '@componentes/input-selecao/input-selecao.type'

export default function useInputSelecao(
  lista: InputSelecaoOpcao[],
  valor: InputSelecaoOpcao = { valor: '' },
  setValor: (valor: InputSelecaoOpcao) => void,
  isMultiSelecao = false
) {
  const [listaAtualizada, setListaAtualizada] = useState(lista)
  const [selecaoAberta, setSelecaoAberta] = useState(false)
  const [pesquisaAntiga, setPesquisaAntiga] = useState<string>('')
  const [estiloInputTexto, setEstiloInputTexto] = useState(
    EstiloInputTexto.SELECAO
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const listaItensRef = useRef<HTMLUListElement>(null)
  const [selecionados, setSelecionados] = useState<string[]>([])
  const [impedirFechamento, setImpedirFechamento] = useState(false)
  const [desfocado, setDesfocado] = useState(true)

  const temOcorrencia = useCallback(
    (valorLista: string) => {
      const { valor: valorInput } = valor

      const caracteresValorLista = normalizarString(valorLista).split(
        normalizarString(valorInput)
      )

      return !caracteresValorLista[0]
    },
    [valor]
  )

  const filtrar = useCallback(
    (valores: InputSelecaoOpcao[]) => {
      const listaFiltrada = valores.filter(({ valor: valorLista }) =>
        temOcorrencia(valorLista)
      )
      setListaAtualizada(listaFiltrada)
    },
    [temOcorrencia]
  )

  const atualizarPesquisa = useCallback(() => {
    const { valor: valorInput } = valor

    const valorTeveIncremento = pesquisaAntiga.length < valorInput.length
    const inicioPesquisaAntigaIgualAoInput =
      !valorInput.split(pesquisaAntiga)[0]

    if (
      pesquisaAntiga &&
      valorTeveIncremento &&
      inicioPesquisaAntigaIgualAoInput
    ) {
      filtrar(listaAtualizada)
    } else {
      filtrar(lista)
    }

    setPesquisaAntiga(valor?.valor)
  }, [filtrar, lista, listaAtualizada, pesquisaAntiga, valor])

  const definirEstiloInput = useCallback(() => {
    if (!selecaoAberta && valor?.valor) {
      setEstiloInputTexto(EstiloInputTexto.LIMPAR)
    } else {
      setEstiloInputTexto(EstiloInputTexto.SELECAO)
    }
  }, [valor?.valor, selecaoAberta])

  useEffect(() => {
    const input = valor?.valor
    const inputMudou = input && input !== pesquisaAntiga

    if (inputMudou) {
      if (!selecaoAberta) {
        setSelecaoAberta(true)
      }
      atualizarPesquisa()
    } else if (!input) {
      setListaAtualizada(lista)
      setPesquisaAntiga('')
    }
  }, [
    valor,
    selecaoAberta,
    pesquisaAntiga,
    atualizarPesquisa,
    lista,
    selecionados,
    impedirFechamento
  ])

  useEffect(() => {
    definirEstiloInput()
  }, [definirEstiloInput, selecaoAberta])

  useEffect(() => {
    if (desfocado && !impedirFechamento) {
      fecharSelecao()
    } else if (!desfocado) {
      abrirSelecao()
    } else {
      setDesfocado(false)
      setImpedirFechamento(false)
    }
  }, [desfocado, impedirFechamento])

  function handleBlur() {
    const DELAY_BLUR = 100

    setTimeout(() => {
      setDesfocado(true)
    }, DELAY_BLUR)
  }

  function selecionarItem(selecionado: InputSelecaoOpcao) {
    setValor(selecionado)

    adicionarNaLista(selecionado.valor)
  }

  function adicionarNaLista(novoValor: string) {
    if (isMultiSelecao)
      setSelecionados((selecionados) => {
        if (selecionados.includes(novoValor)) return selecionados

        return [...selecionados, novoValor]
      })
  }

  function alternarSelecao() {
    setSelecaoAberta((selecao) => !selecao)
    setDesfocado((desfocado) => !desfocado)
  }

  function abrirSelecao() {
    inputRef.current?.focus()
    setDesfocado(false)
    setSelecaoAberta(true)
  }

  function fecharSelecao() {
    setDesfocado(true)
    setSelecaoAberta(false)
  }

  const removerSelecionado = useCallback((item: string) => {
    setSelecionados((selecionados) =>
      selecionados.filter((selecionado) => selecionado != item)
    )
    setImpedirFechamento(true)
  }, [])

  function listarSelecionados() {
    abrirSelecao()
    setListaAtualizada([])
  }

  return {
    listaAtualizada,
    selecaoAberta,
    selecionarItem,
    alternarSelecao,
    inputRef,
    listaItensRef,
    abrirSelecao,
    estiloInputTexto,
    handleBlur,
    selecionados,
    removerSelecionado,
    listarSelecionados,
    setImpedirFechamento
  }
}
