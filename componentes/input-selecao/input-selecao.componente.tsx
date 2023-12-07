import classNames from 'classnames'
import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'

import { InputTexto, ListaSelecionadosSelect } from '@componentes'
import { useInputSelecao } from '@hooks'
import { normalizarString } from '@uteis'

import type { InputSelecaoOpcao, InputSelecaoProps } from './input-selecao.type'
import estilos from './input-selecao.module.scss'

export default function InputSelecao({
  className,
  lista,
  setValor,
  id,
  isMultiSelecao = false,
  ...inputTextoProps
}: InputSelecaoProps) {
  const [valorInput, setValorInput] = useState<InputSelecaoOpcao>({ valor: '' })
  const {
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
  } = useInputSelecao(lista, valorInput, setValorInput, isMultiSelecao)

  useEffect(() => {
    setValor(selecionados, id)
  }, [id, selecionados, setValor])

  function handleChange(evento: ChangeEvent<HTMLInputElement>) {
    const { value } = evento.target
    setValorInput({ valor: value })
  }

  function renderizarItemCustomizado(valorLista: string) {
    const valorInputAtualizado = normalizarString(valorInput.valor)
    const indiceValorNaoPesquisado = valorInputAtualizado ? 1 : 0

    const pedacoNaoPesquisadoNormalizado = valorInputAtualizado
      ? normalizarString(valorLista)
          .split(valorInputAtualizado)
          .slice(indiceValorNaoPesquisado)
          .join(valorInputAtualizado)
      : valorLista

    const pedacoNaoPesquisado = valorLista.substring(
      valorLista.length - pedacoNaoPesquisadoNormalizado.length,
      valorLista.length
    )

    const pedacoPesquisado = valorLista.substring(
      0,
      valorInputAtualizado.length
    )

    return (
      <>
        <span className={estilos.textoDestacado}>{pedacoPesquisado}</span>
        {pedacoNaoPesquisado}
      </>
    )
  }

  function renderizarOpcoes() {
    return listaAtualizada.map(({ valor, detalhe: Detalhe }) => {
      return (
        <li
          className={estilos.itemLista}
          key={valor}
          onClick={() => selecionarItem({ valor, detalhe: Detalhe })}
        >
          {Detalhe && (
            <div className={estilos.detalhe}>
              <Detalhe />
            </div>
          )}
          {renderizarItemCustomizado(valor)}
        </li>
      )
    })
  }

  function renderizarListagem() {
    return (
      selecaoAberta &&
      !!listaAtualizada.length && (
        <ul ref={listaItensRef} className={estilos.suspenso}>
          {renderizarOpcoes()}
          <ListaSelecionadosSelect
            onScroll={() => setImpedirFechamento(true)}
            selecionados={selecionados}
            removerSelecionado={removerSelecionado}
          />
        </ul>
      )
    )
  }

  function renderBotaoSelecionados() {
    return (
      !!selecionados.length && (
        <button
          className={estilos.botaoSelecionado}
          onClick={listarSelecionados}
        >
          {selecionados.length} selecionados
        </button>
      )
    )
  }

  return (
    <div className={classNames(className, estilos.inputSelecao)}>
      {renderBotaoSelecionados()}
      <InputTexto
        id={id}
        className={estilos.inputTexto}
        estiloInputTexto={estiloInputTexto}
        detalhe={valorInput?.detalhe}
        onClickIcone={alternarSelecao}
        onChange={handleChange}
        onFocus={abrirSelecao}
        value={valorInput?.valor}
        setValor={(valor) => setValorInput({ valor: valor.toString() })}
        onBlur={handleBlur}
        ref={inputRef}
        {...inputTextoProps}
      />
      {renderizarListagem()}
    </div>
  )
}
