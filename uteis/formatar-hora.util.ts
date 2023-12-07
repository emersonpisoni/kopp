export default function formatarHoraParaString(data: Date) {
  const formatoHora = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return formatoHora.format(data)
}
