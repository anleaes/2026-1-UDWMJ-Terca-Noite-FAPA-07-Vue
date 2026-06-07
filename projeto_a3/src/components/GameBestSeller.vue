<template>
  <q-card class="full-height">
    <div class="row no-wrap items-center">
      <div class="col-4 q-pl-md q-py-md">
        <q-img
          :src="
            game?.imagemUrl || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400'
          "
          spinner-color="primary"
          class="rounded-borders shadow-1"
          :ratio="1"
        />
      </div>

      <div class="col-8">
        <q-card-section class="q-pa-md">
          <div
            class="bg-blue-1 text-blue-9 text-bold q-pa-xs q-px-sm rounded-borders inline-block text-overline"
          >
            <q-icon name="local_fire_department" class="q-mr-xs" /> Mais Vendido
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
              <div class="text-subtitle1 text-weight-bold text-grey-8">
                {{ formatBRL(game?.valorArrecadado) }}
              </div>
            </div>
            <div>
              <div class="text-caption text-grey-7">Vendas</div>
              <div class="text-subtitle1 text-weight-bold text-primary">
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
