'use client'

import Link from 'next/link'
import estilos from './cabecalho.module.scss'
import { CabecalhoProps } from './cabecalho.type'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

export default function Cabecalho({ rotas }: CabecalhoProps) {
  const pathname = usePathname()
  return (
    <div className={estilos.cabecalho}>
      {rotas.map(({ rota, titulo }) => (
        <Link
          className={classNames({
            [estilos.active]: pathname === rota
          })}
          key={rota}
          href={rota}
        >
          {titulo}
        </Link>
      ))}
    </div>
  )
}
