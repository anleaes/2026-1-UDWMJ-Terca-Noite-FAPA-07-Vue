import { get, post, remove } from './ApiService'
import { buildApiUrl, getApiBaseUrl } from './api-url'

function getCartGames() {
  const url = buildApiUrl(getApiBaseUrl(), '/carrinho')
  return new Promise((resolve, reject) => {
    get(url)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function addGameToCart(game) {
  const url = buildApiUrl(getApiBaseUrl(), '/carrinho')
  const cartItem = {
    id: `${game.id}-${Date.now()}`,
    jogoId: game.id,
    nome: game.nome,
    estilo: game.estilo,
    valor: game.valor,
    imagem: game.imagem,
    descricao: game.descricao,
  }

  return new Promise((resolve, reject) => {
    post(url, cartItem)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function removeCartGame(cartItemId) {
  const url = buildApiUrl(getApiBaseUrl(), `/carrinho/${cartItemId}`)
  return new Promise((resolve, reject) => {
    remove(url)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { addGameToCart, getCartGames, removeCartGame }
