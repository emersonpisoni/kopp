import classNames from 'classnames'
import { useState } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'

import { SetaSimplesBaixo } from '@icones'

import estilos from './accordion.module.scss'

type AccordionProps = {
  textoBotao: string
  textoAuxiliar?: ReactNode
  className?: string
} & PropsWithChildren

export default function Accordion({
  className,
  textoBotao,
  textoAuxiliar,
  children
}: AccordionProps) {
  const [estaExpandido, setEstaExpandido] = useState(false)
  const textoAuliarPrefixo = estaExpandido ? 'Ocultar' : 'Exibir'

  function handleClick() {
    setEstaExpandido((anterior) => !anterior)
  }

  return (
    <div className={classNames(estilos.accordion, className)}>
      <button className={estilos.botaoExpansivel} onClick={handleClick}>
        <span className={estilos.textoBotao}>{textoBotao}</span>
        <div className={estilos.containerTextoIcone}>
          <span className={estilos.textoAuxiliar}>
            {textoAuliarPrefixo} {textoAuxiliar}
          </span>
          <i className={estilos.icone}>
            <SetaSimplesBaixo />
          </i>
        </div>
      </button>
      <div
        className={classNames(estilos.painel, {
          [estilos.expandido]: estaExpandido
        })}
      >
        {children}
      </div>
    </div>
  )
}
