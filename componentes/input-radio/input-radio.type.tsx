import type { Dispatch, SetStateAction } from 'react'

export type InputRadioOpcao = {
  valor: string
  detalhe?: () => JSX.Element
}

export type InputRadioProps = {
  className?: string
  valores: string[]
  inputName: string
  setValor: Dispatch<SetStateAction<string>>
  opcaoSelecionada?: string
}
