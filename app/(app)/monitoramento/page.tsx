'use client'
import { useState } from 'react'

import { FormAlertaOcr } from '@secoes'
import { Mural } from '@componentes/card-alerta-ocr/card-alerta-ocr.enum'
import { MuralAlertaOcr, BotoesAlertaOcr } from '@secoes'

import { ModoExibicaoMural } from 'enums'
import estilos from './monitoramento.module.scss'

export default function Monitoramento() {
  const [muralTamanho, setMuralTamanho] = useState(Mural.EXTRA_GRANDE)
  const [exibicaoInfo, setExibicaoInfo] = useState<string>(
    ModoExibicaoMural.informacoes
  )
  const [isFiltrosAberto, setIsFiltrosAberto] = useState(false)

  return (
    <main>
      <div className={estilos.container}>
        <FormAlertaOcr
          exibicaoInfo={exibicaoInfo}
          setExibicaoInfo={setExibicaoInfo}
          isAberto={isFiltrosAberto}
          fecharFiltros={() => setIsFiltrosAberto(false)}
        />
        <BotoesAlertaOcr
          setExibicaoInfo={setExibicaoInfo}
          muralTamanho={muralTamanho}
          onChangeTamanhoMural={setMuralTamanho}
          exibicaoInfo={exibicaoInfo}
          toggleBarraFiltros={() => setIsFiltrosAberto((antigo) => !antigo)}
          isBarraFiltrosAberto={isFiltrosAberto}
        />
        <MuralAlertaOcr
          className={estilos.mural}
          muralTamanho={muralTamanho}
          hasCabecalho={exibicaoInfo === ModoExibicaoMural.informacoes}
        />
      </div>
    </main>
  )
}
