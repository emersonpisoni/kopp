import type { PropsWithChildren } from 'react'

import { X } from '@icones'

import estilos from './tag-item.module.scss'

type TagItemProps = { onClick: () => void } & PropsWithChildren

export default function TagItem({ onClick, children }: TagItemProps) {
  return (
    <div className={estilos.tagItem}>
      <span>{children}</span>
      <button className={estilos.botaoItem} onClick={onClick}>
        <X />
      </button>
    </div>
  )
}
