const formatBRL = (value) => {
  // Verificação de segurança caso o valor seja nulo, indefinido ou texto inválido
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ 0,00'
  }

  // Usa a API nativa do Javascript para formatar
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export { formatBRL }
