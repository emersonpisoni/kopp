import classNames from 'classnames'

import type { InputRadioProps } from './input-radio.type'
import estilos from './input-radio.module.scss'

export default function InputRadio({
  valores,
  className,
  inputName,
  setValor,
  opcaoSelecionada
}: InputRadioProps) {
  return (
    <div className={classNames(className, estilos.radioSection)}>
      {valores.map((valor) => {
        return (
          <div key={valor} className={estilos['container']}>
            <input
              type='radio'
              id={valor}
              name={inputName}
              value={valor}
              checked={opcaoSelecionada === valor}
              onChange={(e) => setValor(e.target.value)}
            />
            <label htmlFor={valor}>{valor}</label>
          </div>
        )
      })}
    </div>
  )
}
