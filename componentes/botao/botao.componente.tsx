'use client'

import classnames from 'classnames'
import type { MouseEvent } from 'react'

import { VariacaoBotao } from './botao.enum'
import type { BotaoProps } from './botao.type'
import estilos from './botao.module.scss'

export default function Botao({
  variacao = VariacaoBotao.PADRAO,
  selecionado = false,
  icone: Icone,
  ariaLabel,
  className,
  children,
  type,
  disabled = false,
  onClick
}: BotaoProps) {
  function handleClick(evento: MouseEvent<HTMLButtonElement>) {
    if (!disabled) onClick?.(evento)
  }

  return (
    <button
      className={classnames(estilos.botao, className, {
        [estilos[variacao]]: estilos[variacao],
        [estilos.selecionado]: selecionado
      })}
      type={type}
      aria-label={ariaLabel}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      {Icone ? <Icone /> : <></>}
      <span>{children}</span>
    </button>
  )
}
