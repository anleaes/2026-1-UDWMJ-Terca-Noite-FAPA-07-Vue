import { get, put } from './ApiService'
import { buildApiUrl, getApiBaseUrl } from './api-url'

function getAllGames() {
  const url = buildApiUrl(getApiBaseUrl(), '/jogos')
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

function getGame(id) {
  const url = buildApiUrl(getApiBaseUrl(), `/jogos/${id}`)
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

function updateGame(id, gamePayload) {
  const url = buildApiUrl(getApiBaseUrl(), `/jogos/${id}`)
  return new Promise((resolve, reject) => {
    put(url, gamePayload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { getAllGames, getGame, updateGame }
