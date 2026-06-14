function createGameForm(game = {}) {
  return {
    nome: game.nome ?? '',
    descricao: game.descricao ?? '',
    valor: String(game.valor ?? ''),
  }
}

function buildUpdateGamePayload(form) {
  return {
    nome: form.nome.trim(),
    descricao: form.descricao.trim(),
    valor: Number(form.valor),
  }
}

function buildGameUpdateRequest(game, form) {
  return {
    ...game,
    ...buildUpdateGamePayload(form),
  }
}

function updateGameFormField(form, field, value) {
  return {
    ...form,
    [field]: value,
  }
}

function buildBuyGameRoute(id) {
  return `/jogos/${id}/comprar`
}

export {
  buildBuyGameRoute,
  buildGameUpdateRequest,
  buildUpdateGamePayload,
  createGameForm,
  updateGameFormField,
}
