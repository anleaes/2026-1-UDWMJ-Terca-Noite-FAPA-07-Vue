<template>
  <q-card class="my-card full-height cursor-pointer zoom-card" @click="$emit('select')">
    <img :src="game.imagem" width="460" height="215" />

    <q-card-section>
      <div class="text-h6">{{ game.nome }}</div>
      <div class="text-subtitle2">{{ game.estilo }}</div>
      <div class="text-subtitle2 text-weight-bold text-primary">{{ formatBRL(game.valor) }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ game.descricao }}
    </q-card-section>
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

defineEmits(['select'])
</script>

<style scoped>
.zoom-card {
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.zoom-card:hover {
  transform: scale(1.03);
  z-index: 1;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
</style>
