import { get } from './ApiService'
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

export { getAllGames }
