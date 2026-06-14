<template>
  <div class="row justify-center">
    <div class="col-10 col-lg-8">
      <div v-if="game" class="row q-col-gutter-md">
        <div class="col-12">
          <h1 class="text-h4 text-left">{{ game.nome }}</h1>
          <q-card>
            <img :src="game.imagem" :alt="game.nome" class="game-image" />
          </q-card>
        </div>

        <div class="col-12 col-md-7">
          <GameEditFormCard
            :form="gameForm"
            :is-saving="isSaving"
            @submit="onSubmit"
            @update-field="onFieldUpdate"
          />
        </div>

        <div class="col-12 col-md-5">
          <GameInfoCard :game="game" />
        </div>
      </div>

      <div v-else-if="isLoading" class="text-center q-py-xl">
        Carregando jogo...
      </div>
    </div>
  </div>
</template>

<script setup>
import GameEditFormCard from 'src/components/GameEditFormCard.vue'
import GameInfoCard from 'src/components/GameInfoCard.vue'
import {
  buildGameUpdateRequest,
  createGameForm,
  updateGameFormField,
} from 'src/services/GameFormService'
import { getGame, updateGame } from 'src/services/GamesService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const game = ref(null)
const gameForm = ref(createGameForm())
const isLoading = ref(true)
const isSaving = ref(false)

function loadGame() {
  isLoading.value = true

  return getGame(route.params.id)
    .then((response) => {
      game.value = response
      gameForm.value = createGameForm(response)
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao carregar jogo')
    })
    .finally(() => {
      isLoading.value = false
    })
}

function onSubmit() {
  isSaving.value = true

  updateGame(route.params.id, buildGameUpdateRequest(game.value, gameForm.value))
    .then((response) => {
      game.value = response
      gameForm.value = createGameForm(response)
      alert('Jogo atualizado com sucesso')
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao atualizar jogo')
    })
    .finally(() => {
      isSaving.value = false
    })
}

function onFieldUpdate(field, value) {
  gameForm.value = updateGameFormField(gameForm.value, field, value)
}

onMounted(() => {
  loadGame()
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
