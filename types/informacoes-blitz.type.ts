import type { Equipamento } from './equipamento.type'
import type { Restricao } from './restricao.type'
import type { Veiculo } from './veiculo.type'

export type InformacoesBlitz = {
  veiculo: Veiculo
  equipamento: Equipamento
  restricoes: Restricao[]
  data_hora: string
  imagem: string
}
