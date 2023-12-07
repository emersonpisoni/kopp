import { Carro, Motocicleta, Caminhao } from '@icones'
import type { InputSelecaoOpcao } from '@componentes/input-selecao/input-selecao.type'
import type { Veiculo, InformacoesBlitz, Equipamento, Restricao } from '@types'

export const LISTA_MOCK: InputSelecaoOpcao[] = [
  {
    valor: 'Veículo 1',
    detalhe: () => <Carro />
  },
  {
    valor: 'Veículo 2',
    detalhe: () => <Motocicleta />
  },
  {
    valor: 'Texto para pesquisa',
    detalhe: () => <Caminhao />
  },
  {
    valor: 'Texto',
    detalhe: () => <Caminhao />
  },
  {
    valor: 'Pato',
    detalhe: () => <Caminhao />
  }
]

export const LISTA_MOCK_2 = [
  { valor: 'Pastel' },
  { valor: 'Cadarço' },
  { valor: 'Piquirito' },
  { valor: 'Cachorro quente' },
  { valor: 'Panqueca' },
  { valor: 'Pizza' },
  { valor: 'Lasanha' },
  { valor: 'Pernil' },
  { valor: 'xxxx' }
]

export const LISTA_MOCK_3 = [
  'Exibir informações',
  'Exibir apenas imagens',
  'Exibir Ambos'
]

export const VEICULO_MOCK: Veiculo = {
  placa: 'JKH2GI5',
  perfil: 'desconhecido',
  especie: 'carro',
  categoria: 'Particular',
  cor: 'Prata',
  anoFabricacao: '2000',
  marca: 'Fiat',
  modelo: 'Toro',
  velocidadeMedida: 46
}

export const EQUIPAMENTO_MOCK: Equipamento = {
  descricao: 'KRA108',
  local: 'Rodovia BR-116',
  numero: '123',
  sentidoVia: 'LESTE/OESTE',
  cidade: 'BRASÍLIA',
  uf: 'DF'
}

export const RESTRICAO_MOCK: Restricao = {
  descricao:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  cor: '#FFDE6A' // precisa adicionar no back
}

export const MOCK_INFOS_GERAIS = {
  data_hora: '28/03/2023 11:09:40',
  imagem:
    'https://classic.exame.com/wp-content/uploads/2022/05/BMW-IX-8.jpg?quality=70&strip=info&w=1024'
}

export const BLITZ_MOCK: InformacoesBlitz = {
  veiculo: VEICULO_MOCK,
  equipamento: EQUIPAMENTO_MOCK,
  restricoes: [RESTRICAO_MOCK],
  ...MOCK_INFOS_GERAIS
}

export const INFOS_BLITZ_MOCK: InformacoesBlitz[] = [
  { ...BLITZ_MOCK, veiculo: { ...VEICULO_MOCK, placa: 'ABC1234' } },
  {
    ...BLITZ_MOCK,
    veiculo: {
      ...VEICULO_MOCK,
      placa: 'DEF5678',
      perfil: 'carro'
    } as Veiculo,
    restricoes: [RESTRICAO_MOCK]
  },
  {
    ...BLITZ_MOCK,
    veiculo: { ...VEICULO_MOCK, placa: 'GHI9128' },
    restricoes: [RESTRICAO_MOCK]
  },
  {
    ...BLITZ_MOCK,
    veiculo: { ...VEICULO_MOCK, placa: 'KLM5461' },
    restricoes: [RESTRICAO_MOCK]
  },
  { ...BLITZ_MOCK, veiculo: { ...VEICULO_MOCK, placa: 'PQR' } },
  {
    ...BLITZ_MOCK,
    veiculo: {
      ...VEICULO_MOCK,
      placa: 'RST413',
      especie: 'desconhecido'
    } as Veiculo,
    restricoes: [RESTRICAO_MOCK]
  },
  {
    ...BLITZ_MOCK,
    veiculo: { ...VEICULO_MOCK, placa: 'VXW5234' },
    restricoes: [RESTRICAO_MOCK]
  }
].reverse()
