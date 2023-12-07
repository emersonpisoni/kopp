import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  Dispatch,
  SetStateAction
} from 'react'

import type { EstiloInputTexto } from './input-texto.enum'

export type InputTextoProps = {
  className?: string
  rotulo: string
  espacoReservado?: string
  estiloInputTexto?: EstiloInputTexto
  detalhe?: () => JSX.Element
  onClickIcone?: () => void
  setValor: Dispatch<SetStateAction<object | string>>
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
