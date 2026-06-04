function getApiBaseUrl() {
  const env = import.meta.env
  const apiBaseUrl = env.VITE_API_BASE_URL?.trim()

  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL não configurada.')
  }

  return new URL(apiBaseUrl).toString().replace(/\/$/, '')
}

function buildApiUrl(baseUrl, resourcePath) {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '')
  const normalizedResourcePath = resourcePath.replace(/^\/+/, '')

  return `${normalizedBaseUrl}/${normalizedResourcePath}`
}

export { buildApiUrl, getApiBaseUrl }
