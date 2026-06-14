<template>
  <q-item clickable class="game-list-item q-pa-md" @click="$emit('select')">
    <q-item-section avatar>
      <q-img :src="game.imagem" class="game-list-item__image" fit="cover" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-subtitle1 text-weight-medium">
        {{ game.nome }}
      </q-item-label>
      <q-item-label caption>
        {{ game.estilo }}
      </q-item-label>
      <q-item-label caption lines="2">
        {{ game.descricao }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="text-subtitle2 text-weight-bold text-primary">
        {{ formatBRL(game.valor) }}
      </div>
    </q-item-section>
  </q-item>
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
.game-list-item {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.game-list-item:hover {
  border-color: var(--q-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.game-list-item__image {
  width: 96px;
  height: 56px;
  border-radius: 6px;
}
</style>
