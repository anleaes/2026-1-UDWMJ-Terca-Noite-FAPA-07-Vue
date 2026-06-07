<template>
  <q-card>
    <div class="row no-wrap items-center">
      <div class="col-4 q-pl-md q-py-md">
        <q-img
          :src="
            game?.imagemUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'
          "
          spinner-color="amber"
          class="rounded-borders shadow-1"
          :ratio="1"
        />
      </div>

      <div class="col-8">
        <q-card-section class="q-pa-md">
          <div
            class="bg-amber-1 text-amber-9 text-bold q-pa-xs q-px-sm rounded-borders inline-block text-overline"
          >
            <q-icon name="trending_up" class="q-mr-xs" /> Maior Receita
          </div>

          <div class="text-h6 text-weight-bold text-grey-9 q-mt-sm ellipsis">
            {{ game?.nome || 'Carregando...' }}
          </div>
          <div class="text-caption text-grey-6 q-mb-md">
            Estilo: <span class="text-weight-medium">{{ game?.estilo }}</span>
          </div>

          <div class="row q-gutter-md">
            <div>
              <div class="text-caption text-grey-7">Arrecadado</div>
              <div class="text-subtitle1 text-weight-bold text-positive">
                {{ formatBRL(game?.valorArrecadado) }}
              </div>
            </div>
            <div>
              <div class="text-caption text-grey-7">Vendas</div>
              <div class="text-subtitle1 text-weight-bold text-grey-8">
                {{ game?.quantidade }} un.
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
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
</script>
