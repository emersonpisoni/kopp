import type { VariacaoBotao } from './botao.enum'

export type BotaoProps = {
  variacao?: VariacaoBotao
  selecionado?: boolean
  ariaLabel?: string
  icone?: () => React.JSX.Element
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children' | 'type' | 'disabled' | 'onClick'
>
