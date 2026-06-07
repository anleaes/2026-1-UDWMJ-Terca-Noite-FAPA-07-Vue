<template>
  <div class="row justify-center">
    <div class="col-10 col-lg-6">
      <h1 class="text-h4 text-left">Bem vindo Usuário</h1>
      <!-- TODO: Substituir "Usuário" pelo nome do usuário logado -->

      <div class="row">
        <div class="col-12">
          <q-input v-model="stringSearch" outlined label="Pesquisar por nome" type="text">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>

      <div>
        <div class="row q-mt-lg q-col-gutter-md">
          <div v-for="game in filteredGames" :key="game.nome" class="col-12 col-sm-6 col-md-4">
            <q-card class="my-card full-height">
              <img :src="game.imagem" width="460" height="215" />

              <q-card-section>
                <div class="text-h6">{{ game.nome }}</div>
                <div class="text-subtitle2">{{ game.estilo }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ game.descricao }}
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div v-if="filteredGames.length === 0" class="q-mt-lg text-grey-7">
          Nenhum jogo encontrado para esse nome.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAllGames } from 'src/services/GamesService'
import { computed, onMounted, ref } from 'vue'

const games = ref([])

onMounted(() => {
  getAllGames()
    .then((response) => {
      games.value = response
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao carregar jogos')
    })
})

const stringSearch = ref('')

const filteredGames = computed(() => {
  const search = stringSearch.value.trim().toLowerCase()

  if (!search) {
    return games.value
  }

  return games.value.filter((game) => game.nome.toLowerCase().includes(search))
})
</script>
