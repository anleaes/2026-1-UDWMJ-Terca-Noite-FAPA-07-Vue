import { get, post, remove } from './ApiService'
import { buildApiUrl, getApiBaseUrl } from './api-url'
import { useCartStore } from 'src/stores/cart-store'

function getCartGames() {
  const cartStore = useCartStore()

  if (cartStore.items.length > 0) {
    return Promise.resolve(cartStore.items)
  }

  const url = buildApiUrl(getApiBaseUrl(), '/carrinho')
  return new Promise((resolve, reject) => {
    get(url)
      .then((response) => {
        cartStore.setItems(response)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function addGameToCart(game) {
  const cartStore = useCartStore()
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
        cartStore.addItem(response)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function removeCartGame(cartItemId) {
  const cartStore = useCartStore()
  const url = buildApiUrl(getApiBaseUrl(), `/carrinho/${cartItemId}`)
  return new Promise((resolve, reject) => {
    remove(url)
      .then((response) => {
        cartStore.removeItem(cartItemId)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { addGameToCart, getCartGames, removeCartGame }
