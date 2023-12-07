import estilos from './texto-com-icone.module.scss'

type TextoComIconeProps = {
  texto: string
  Icone: () => JSX.Element
}

export default function TextoComIcone({ texto, Icone }: TextoComIconeProps) {
  return (
    <div className={estilos.textoComIcone}>
      <Icone /> <span className={estilos.texto}>{texto}</span>
    </div>
  )
}
