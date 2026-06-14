<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Comprar jogo</div>
    </q-card-section>

    <q-card-section class="q-gutter-y-md">
      <div>
        <div class="text-subtitle2 text-grey-7">Valor</div>
        <div class="text-h5 text-weight-bold">{{ formatBRL(game.valor) }}</div>
      </div>

      <div>
        <div class="text-subtitle2 text-grey-7">Estilo</div>
        <div>{{ game.estilo }}</div>
      </div>

      <div>
        <div class="text-subtitle2 text-grey-7">Descrição</div>
        <div>{{ game.descricao }}</div>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn color="positive" label="Adicionar ao Carrinho" class="full-width" @click="$emit('add-to-cart')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { formatBRL } from 'src/utils/formatters'

defineProps({
  game: {
    type: Object,
    required: true,
  },
})

defineEmits(['add-to-cart'])
</script>
