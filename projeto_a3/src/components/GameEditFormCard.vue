<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Editar jogo</div>
    </q-card-section>

    <q-card-section>
      <q-form class="q-gutter-md" @submit="emit('submit')">
        <q-input
          :model-value="form.nome"
          outlined
          label="Nome *"
          :rules="[(val) => !!val?.trim() || 'Campo é obrigatório']"
          @update:model-value="emit('update-field', 'nome', $event)"
        />

        <q-input
          :model-value="form.descricao"
          outlined
          type="textarea"
          label="Descrição *"
          :rules="[(val) => !!val?.trim() || 'Campo é obrigatório']"
          @update:model-value="emit('update-field', 'descricao', $event)"
        />

        <q-input
          :model-value="form.valor"
          outlined
          type="number"
          min="0"
          step="0.01"
          label="Valor *"
          :rules="[
            (val) => !!String(val ?? '').trim() || 'Campo é obrigatório',
            (val) => Number(val) >= 0 || 'Informe um valor válido',
          ]"
          @update:model-value="emit('update-field', 'valor', $event)"
        />

        <div class="text-right">
          <q-btn label="Salvar" type="submit" color="primary" :loading="isSaving" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  form: {
    type: Object,
    required: true,
  },
  isSaving: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'update-field'])
</script>
