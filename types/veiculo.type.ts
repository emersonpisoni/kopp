export type Veiculo = {
  placa: string
  perfil: string
  especie: Especie
  categoria: string
  cor: string
  anoFabricacao: string
  marca: string
  modelo: string
  velocidadeMedida: number
}

export type Especie = 'caminhao' | 'carro' | 'motocicleta' | 'desconhecido'
