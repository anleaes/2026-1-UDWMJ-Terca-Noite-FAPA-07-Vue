<template>
  <q-card>
    <img :src="game.imagem" :alt="game.nome" class="game-image" />
  </q-card>
</template>

<script setup>
defineProps({
  game: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.game-image {
  display: block;
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
