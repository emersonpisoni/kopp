import { useReducer, useCallback } from 'react'

import type { FiltrosCercamentoEletronico } from '@types'

export default function useFiltrosVeiculo() {
  const [dados, atualizarDados] = useReducer(
    (
      previa: FiltrosCercamentoEletronico,
      proximo: Partial<FiltrosCercamentoEletronico>
    ) => {
      return { ...previa, ...proximo }
    },
    {
      toggleSonoro: false,
      toggleRestricao: false
    }
  )

  const atualizarCampo = useCallback((valor: string[], chave?: string) => {
    if (!chave) return
    atualizarDados({ [chave]: [...valor] })
  }, [])

  return { dados, atualizarDados, atualizarCampo }
}
