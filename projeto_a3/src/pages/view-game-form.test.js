import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildBuyGameRoute,
  buildGameUpdateRequest,
  buildUpdateGamePayload,
  createGameForm,
  updateGameFormField,
} from './view-game-form.js'

test('createGameForm keeps only editable fields for the form', () => {
  const form = createGameForm({
    id: 1,
    nome: 'Cyberpunk 2077',
    descricao: 'Night City',
    valor: 150,
    estilo: 'RPG de Ação',
  })

  assert.deepEqual(form, {
    nome: 'Cyberpunk 2077',
    descricao: 'Night City',
    valor: '150',
  })
})

test('buildUpdateGamePayload trims text and converts valor to number', () => {
  const payload = buildUpdateGamePayload({
    nome: '  Elden Ring  ',
    descricao: '  Terras Intermédias  ',
    valor: '250.5',
  })

  assert.deepEqual(payload, {
    nome: 'Elden Ring',
    descricao: 'Terras Intermédias',
    valor: 250.5,
  })
})

test('buildGameUpdateRequest keeps readonly game fields while applying form edits', () => {
  const payload = buildGameUpdateRequest(
    {
      id: 1,
      nome: 'Cyberpunk 2077',
      descricao: 'Night City',
      valor: 150,
      estilo: 'RPG de Ação',
      imagem:
        'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7',
      quantidade_vendas_mes: 100,
      receita_total_mes: 15000,
    },
    {
      nome: '  Cyberpunk 2077 Ultimate  ',
      descricao: '  Night City revisitada  ',
      valor: '199.9',
    },
  )

  assert.deepEqual(payload, {
    id: 1,
    nome: 'Cyberpunk 2077 Ultimate',
    descricao: 'Night City revisitada',
    valor: 199.9,
    estilo: 'RPG de Ação',
    imagem:
      'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7',
    quantidade_vendas_mes: 100,
    receita_total_mes: 15000,
  })
})

test('updateGameFormField returns a new form object with only one field changed', () => {
  const nextForm = updateGameFormField(
    {
      nome: 'Cyberpunk 2077',
      descricao: 'Night City',
      valor: '150',
    },
    'descricao',
    'Night City revisitada',
  )

  assert.deepEqual(nextForm, {
    nome: 'Cyberpunk 2077',
    descricao: 'Night City revisitada',
    valor: '150',
  })
})

test('buildBuyGameRoute creates the purchase route for a game id', () => {
  assert.equal(buildBuyGameRoute(7), '/jogos/7/comprar')
})
