<template>
  <q-card class="col-12">
    <q-card-section class="row justify-around text-subtitle1">
      <div class="col-12 col-sm-3 q-py-sm">
        <div class="text-overline text-grey-7">Valor Total</div>
        <div class="text-h5 text-weight-bold text-positive">
          <q-icon name="payments" size="sm" class="q-mr-xs" />
          {{ formatBRL(generalResults?.valorTotalMes) }}
        </div>
      </div>

      <q-separator vertical class="hidden sm-block" />

      <div class="col-12 col-sm-3 q-py-sm">
        <div class="text-overline text-grey-7">Qtd. Jogos Vendidos</div>
        <div class="text-h5 text-weight-bold text-primary">
          <q-icon name="sports_esports" size="sm" class="q-mr-xs" />
          {{ generalResults?.quantidadeJogosVendidos }}
        </div>
      </div>

      <q-separator vertical class="hidden sm-block" />

      <div class="col-12 col-sm-3 q-py-sm">
        <div class="text-overline text-grey-7">Ticket Médio</div>
        <div class="text-h5 text-weight-bold text-orange">
          <q-icon name="analytics" size="sm" class="q-mr-xs" />
          {{ formatBRL(generalResults?.ticketMedio) }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { formatBRL } from 'src/utils/formatters'

defineProps({
  generalResults: {
    type: Object,
    required: true,
  },
})
</script>
