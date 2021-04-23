export function formattedDate() {
  const fullDate = new Date()

  const date = fullDate.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  }).replace('.', '').replace('de', '')

  return date
}