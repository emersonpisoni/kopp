import classNames from 'classnames'

import styles from './toggle.module.scss'

type ToggleProps = {
  className?: string
  rotulo: string
  ativo?: boolean
  onChange: () => void
}

export default function Toggle({
  className,
  rotulo,
  ativo,
  onChange
}: ToggleProps) {
  return (
    <label className={styles.toggleContainer}>
      {rotulo}
      <input
        checked={ativo}
        onChange={onChange}
        className={classNames(className, styles.toggle)}
        type='checkbox'
        role='switch'
      />
    </label>
  )
}
