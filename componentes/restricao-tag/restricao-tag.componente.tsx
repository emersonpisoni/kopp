import { VEICULOS_ICONES } from '@constantes'

import estilos from './restricao-tag.module.scss'

type RestricaoTagProps = {
  cor: string
  tipoVeiculo: keyof typeof VEICULOS_ICONES
}

export default function RestricaoTag({ cor, tipoVeiculo }: RestricaoTagProps) {
  // Remover VEICULOS_ICONES['carro'] quando o back mandar as infos corretas
  const Veiculo = VEICULOS_ICONES[tipoVeiculo] || VEICULOS_ICONES['carro']

  return (
    <div className={estilos.restricaoTag} style={{ background: cor }}>
      <Veiculo />
    </div>
  )
}
