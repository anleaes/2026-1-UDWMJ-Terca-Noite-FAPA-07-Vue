<template>
  <div class="row justify-center">
    <div class="col-10 col-lg-6">
      <h1 class="text-h4 text-left">Bem vindo Usuário</h1>
      <!-- TODO: Substituir "Usuário" pelo nome do usuário logado -->

      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input v-model="stringSearch" outlined label="Pesquisar por nome" type="text">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-sm">
          <q-select
            v-model="selectedCategoryId"
            outlined
            label="Categoria"
            :options="categoryOptions"
            emit-value
            map-options
          />
        </div>

        <div class="col-12 col-sm-auto">
          <q-btn-toggle
            v-model="viewMode"
            spread
            no-caps
            toggle-color="primary"
            :options="viewModeOptions"
          />
        </div>
      </div>

      <div>
        <div v-if="viewMode === 'card'" class="row q-mt-lg q-col-gutter-md">
          <div v-for="game in paginatedGames" :key="game.nome" class="col-12 col-sm-6 col-md-4">
            <GameCard :game="game" @select="navigate(game.id)" />
          </div>
        </div>

        <q-list v-if="viewMode === 'list'" class="q-mt-lg q-gutter-y-sm">
          <GameItemList
            v-for="game in paginatedGames"
            :key="game.nome"
            :game="game"
            @select="navigate(game.id)"
          />
        </q-list>

        <div v-if="filteredGames.length > 0" class="row justify-center q-mt-lg q-mb-lg">
          <q-pagination v-model="currentPage" :max="totalPages" direction-links boundary-links />
        </div>

        <div v-if="filteredGames.length === 0" class="q-mt-lg text-grey-7">
          Nenhum jogo encontrado para os filtros selecionados.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GameCard from 'src/components/GameCard.vue'
import GameItemList from 'src/components/GameItemList.vue'
import { getAllCategories, getAllGames } from 'src/services/GamesService'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const games = ref([])
const categories = ref([])
const selectedCategoryId = ref('')
const viewMode = ref('card')
const currentPage = ref(1)
const itemsPerPage = 10
const viewModeOptions = [
  { label: 'Cards', value: 'card', icon: 'view_module' },
  { label: 'Lista', value: 'list', icon: 'view_list' },
]

onMounted(() => {
  getAllGames()
    .then((response) => {
      games.value = response
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao carregar jogos')
    })

  getAllCategories()
    .then((response) => {
      categories.value = response
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao carregar categorias')
    })
})

function navigate(id) {
  router.push(`/jogos/${id}`)
}

const stringSearch = ref('')

const categoryOptions = computed(() => [
  { label: 'Todas as categorias', value: '' },
  ...categories.value.map((category) => ({
    label: category.nome,
    value: category.id,
  })),
])

const selectedCategory = computed(() => {
  return categories.value.find((category) => category.id === selectedCategoryId.value)
})

const filteredGames = computed(() => {
  const search = stringSearch.value.trim().toLowerCase()
  const categoryName = selectedCategory.value?.nome

  return games.value.filter((game) => {
    const matchesSearch = !search || game.nome.toLowerCase().includes(search)
    const matchesCategory = !categoryName || game.estilo === categoryName

    return matchesSearch && matchesCategory
  })
})

const totalPages = computed(() => Math.ceil(filteredGames.value.length / itemsPerPage))

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage

  return filteredGames.value.slice(start, end)
})

watch([stringSearch, selectedCategoryId], () => {
  currentPage.value = 1
})
</script>

