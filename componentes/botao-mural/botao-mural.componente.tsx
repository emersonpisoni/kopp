import type { ReactNode } from 'react'

import estilos from './botao-mural.module.scss'

type BotaoMuralProps = {
  opcoes: { label: ReactNode; valor: string }[]
  opcaoSelecionada: string
  onChange: (valor: string) => void
}

export default function BotaoMural({
  opcoes,
  opcaoSelecionada,
  onChange
}: BotaoMuralProps) {
  return (
    <div className={estilos.botaoMural}>
      {opcoes.map(({ label, valor }) => {
        const isSelecionado = opcaoSelecionada === valor

        return (
          <div key={valor} className={estilos.opcao}>
            <input
              id={valor}
              type='radio'
              className={estilos.inputRadio}
              value={valor}
              checked={isSelecionado}
              onChange={() => onChange(valor)}
            />
            <label className={estilos.label} htmlFor={valor}>
              {label}
            </label>
          </div>
        )
      })}
    </div>
  )
}
