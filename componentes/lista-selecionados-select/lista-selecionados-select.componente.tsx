import classNames from 'classnames'
import { useRef, useState } from 'react'

import { TagItem } from '@componentes'
import { SetaSimplesBaixo } from '@icones'

import estilos from './lista-selecionados-select.module.scss'

type ListaSelecionadosSelectProps = {
  selecionados: string[]
  removerSelecionado: (valor: string) => void
  onScroll: () => void
}

export default function ListaSelecionadosSelect({
  selecionados,
  removerSelecionado,
  onScroll
}: ListaSelecionadosSelectProps) {
  const container = useRef<HTMLDivElement>(null)

  const [scrollSelecionados, setScrollSelecionados] = useState(false)

  function renderBotaoScrollEsquerdo() {
    return (
      scrollSelecionados && (
        <button
          className={classNames(estilos.botaoRolagem, estilos.esquerdo)}
          onClick={() => {
            onScroll()
            if (container.current) {
              container.current.scrollLeft -= 40

              if (container?.current?.scrollLeft <= 0)
                setScrollSelecionados(false)
            }
          }}
        >
          <SetaSimplesBaixo />
        </button>
      )
    )
  }

  function renderBotaoScrollDireito() {
    return (
      <button
        className={classNames(estilos.botaoRolagem, estilos.direito)}
        onClick={() => {
          onScroll()
          if (container.current) container.current.scrollLeft += 40

          setScrollSelecionados(true)
        }}
      >
        <SetaSimplesBaixo />
      </button>
    )
  }

  return (
    !!selecionados.length && (
      <div className={estilos.containerSelecionados}>
        {renderBotaoScrollEsquerdo()}
        <div className={estilos.itensSelecionados} ref={container}>
          {selecionados.map((valor) => {
            return (
              <TagItem
                key={valor}
                onClick={() => {
                  removerSelecionado(valor)
                }}
              >
                {valor}
              </TagItem>
            )
          })}
        </div>
        {renderBotaoScrollDireito()}
      </div>
    )
  )
}
