import type { InputTextoProps } from '@componentes/input-texto/input-texto.type'

export type InputSelecaoOpcao = {
  valor: string
  detalhe?: () => JSX.Element
}

export type InputSelecaoProps = {
  className?: string
  lista: Array<InputSelecaoOpcao>
  setValor: (valor: string[], chave?: string) => void
  isMultiSelecao?: boolean
} & Pick<InputTextoProps, 'rotulo' | 'espacoReservado' | 'id'>
