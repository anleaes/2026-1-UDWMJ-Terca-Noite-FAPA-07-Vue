<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Resumo do carrinho</div>
    </q-card-section>

    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-subtitle1">Total</div>
        <div class="text-h5 text-weight-bold text-primary">{{ formatBRL(total) }}</div>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn color="positive" label="Comprar" class="full-width" :disable="isEmpty" @click="$emit('checkout')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { formatBRL } from 'src/utils/formatters'

defineProps({
  total: {
    type: Number,
    required: true,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['checkout'])
</script>
