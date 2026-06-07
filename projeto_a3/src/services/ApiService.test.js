import assert from 'node:assert/strict'
import test from 'node:test'

import { put } from './ApiService.js'

test('put sends JSON payload and returns parsed response', async () => {
  const originalFetch = global.fetch
  let receivedUrl = ''
  let receivedOptions = {}

  global.fetch = async (url, options) => {
    receivedUrl = url
    receivedOptions = options

    return {
      json: async () => ({ id: 1, nome: 'Atualizado' }),
    }
  }

  try {
    const response = await put('http://localhost:3000/jogos/1', {
      nome: 'Atualizado',
    })

    assert.equal(receivedUrl, 'http://localhost:3000/jogos/1')
    assert.equal(receivedOptions.method, 'PUT')
    assert.equal(receivedOptions.headers['Content-Type'], 'application/json')
    assert.equal(receivedOptions.body, JSON.stringify({ nome: 'Atualizado' }))
    assert.deepEqual(response, { id: 1, nome: 'Atualizado' })
  } finally {
    global.fetch = originalFetch
  }
})
