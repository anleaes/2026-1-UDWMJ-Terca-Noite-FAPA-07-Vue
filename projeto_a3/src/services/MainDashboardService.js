import { get } from './ApiService'
import { buildApiUrl, getApiBaseUrl } from './api-url'

function getMainDashBoard() {
  const url = buildApiUrl(getApiBaseUrl(), '/main-dashboard')
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

export { getMainDashBoard }
