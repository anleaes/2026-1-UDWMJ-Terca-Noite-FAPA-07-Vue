<template>
  <div class="row justify-center">
    <div class="col-10 col-lg-8">
      <div v-if="game" class="row q-col-gutter-md">
        <div class="col-12">
          <h1 class="text-h4 text-left">{{ game.nome }}</h1>
        </div>

        <div class="col-12 col-md-7">
          <BuyGameBannerCard :game="game" />
        </div>

        <div class="col-12 col-md-5">
          <BuyGameDetailsCard :game="game" />
        </div>
      </div>

      <div v-else-if="isLoading" class="text-center q-py-xl">
        Carregando jogo...
      </div>
    </div>
  </div>
</template>

<script setup>
import BuyGameBannerCard from 'src/components/BuyGameBannerCard.vue'
import BuyGameDetailsCard from 'src/components/BuyGameDetailsCard.vue'
import { getGame } from 'src/services/GamesService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const game = ref(null)
const isLoading = ref(true)

function loadGame() {
  isLoading.value = true

  return getGame(route.params.id)
    .then((response) => {
      game.value = response
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao carregar jogo')
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  loadGame()
})
</script>
