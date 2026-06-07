<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Informações do jogo</div>
    </q-card-section>

    <q-card-section class="q-gutter-y-md">
      <div>
        <div class="text-subtitle2 text-grey-7">Estilo</div>
        <div>{{ game.estilo }}</div>
      </div>

      <div>
        <div class="text-subtitle2 text-grey-7">Valor</div>
        <div>{{ formatBRL(game.valor) }}</div>
      </div>

      <div>
        <div class="text-subtitle2 text-grey-7">Receita do mês</div>
        <div>{{ formatBRL(game.receita_total_mes) }}</div>
      </div>

      <div>
        <div class="text-subtitle2 text-grey-7">Quantidade de vendas do mês</div>
        <div>{{ game.quantidade_vendas_mes }}</div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-btn color="primary" label="Ir para compra" :to="buildBuyGameRoute(game.id)" class="full-width" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { buildBuyGameRoute } from 'src/pages/view-game-form'
import { formatBRL } from 'src/utils/formatters'

defineProps({
  game: {
    type: Object,
    required: true,
  },
})
</script>
