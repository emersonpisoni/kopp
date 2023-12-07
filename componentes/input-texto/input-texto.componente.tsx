import classNames from 'classnames'
import { forwardRef } from 'react'

import { Olho, SetaSimplesBaixo, X } from '@icones'

import { EstiloInputTexto } from './input-texto.enum'
import type { InputTextoProps } from './input-texto.type'
import estilos from './input-texto.module.scss'

const ICONE = {
  [EstiloInputTexto.LIMPAR]: <X />,
  [EstiloInputTexto.SELECAO]: <SetaSimplesBaixo />,
  [EstiloInputTexto.SENHA]: <Olho />
}

const InputTexto = forwardRef<HTMLInputElement, InputTextoProps>(
  (
    {
      className,
      rotulo,
      espacoReservado,
      estiloInputTexto,
      detalhe: Detalhe,
      onClickIcone,
      value: valor,
      setValor,
      id,
      onChange,
      onFocus,
      onBlur,
      type = 'text'
    }: InputTextoProps,
    ref
  ) => {
    function renderizarIcone() {
      if (estiloInputTexto === EstiloInputTexto.LIMPAR && !valor) return <></>

      return (
        estiloInputTexto && (
          <i
            className={classNames(estilos.icone, {
              [estilos.selecao]: estiloInputTexto === EstiloInputTexto.SELECAO
            })}
            onClick={handleClickIcone}
          >
            {ICONE[estiloInputTexto]}
          </i>
        )
      )
    }

    function handleClickIcone() {
      if (estiloInputTexto === EstiloInputTexto.LIMPAR) {
        setValor('')
        return
      }

      onClickIcone?.()
    }

    return (
      <div className={classNames(className, estilos.inputTexto)}>
        <label htmlFor={id} className={estilos.rotulo}>
          {rotulo}
        </label>
        <input
          id={id}
          type={type}
          className={estilos.input}
          placeholder={espacoReservado}
          value={valor}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
        ></input>
        {Detalhe && (
          <div className={estilos.detalhe}>
            <Detalhe />
          </div>
        )}
        {renderizarIcone()}
      </div>
    )
  }
)

InputTexto.displayName = 'InputTexto'

export default InputTexto
