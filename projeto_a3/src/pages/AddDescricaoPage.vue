<template>
  <div class="row justify-center">
    <div class="col-6">
      <h1 class="text-h4 text-left">Adicionar Descrição</h1>
      <q-card class="my-card">
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="row">
              <div class="col-12">
                <q-select
                  outlined
                  use-input
                  input-debounce="0"
                  v-model="category"
                  :options="categories"
                  @filter="filterCategories"
                  label="Categoria *"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <q-input
                  outlined
                  label="Descrição *"
                  type="textarea"
                  v-model="description"
                  :rules="[(val) => !!val || 'Campo é obrigatório']"
                />
              </div>
            </div>
            <div class="text-right">
              <q-btn label="Salvar" type="submit" color="primary" />
              <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const description = ref('')
const category = ref('')

const stringCategories = [
  'RPG (Role-Playing Game)',
  'Ação e Aventura',
  'FPS (First-Person Shooter)',
  'Metroidvania',
  'Roguelike / Roguelite',
  'Estratégia (RTS / TBS)',
  'Soulslike',
  'Simulação',
  'Sobrevivência',
  'Hack and Slash',
  'Quebra-cabeça (Puzzle)',
  'Plataforma',
  'Luta',
  'Esportes',
  'Stealth',
]

const categories = ref(stringCategories)

function filterCategories(val, update) {
  if (val === '') {
    update(() => {
      categories.value = stringCategories
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    categories.value = stringCategories.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}

function onSubmit() {
  // Lógica para lidar com o envio do formulário
  console.log('Categoria:', category.value)
  console.log('Descrição:', description.value)
}
function onReset() {
  // Lógica para lidar com o reset do formulário
  category.value = ''
  description.value = ''
}
</script>

<style scoped></style>
