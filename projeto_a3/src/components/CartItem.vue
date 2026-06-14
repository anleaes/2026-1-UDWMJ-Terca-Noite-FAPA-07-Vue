<template>
  <q-item class="cart-item q-pa-md">
    <q-item-section avatar>
      <q-img :src="item.imagem" class="cart-item__image" fit="cover" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-subtitle1 text-weight-medium">
        {{ item.nome }}
      </q-item-label>
      <q-item-label caption>
        {{ item.estilo }}
      </q-item-label>
      <q-item-label caption>
        {{ formatBRL(item.valor) }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn color="negative" flat icon="delete" label="Remover" @click="$emit('remove')" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { formatBRL } from 'src/utils/formatters'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['remove'])
</script>

<style scoped>
.cart-item {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}

.cart-item__image {
  width: 96px;
  height: 56px;
  border-radius: 6px;
}
</style>
