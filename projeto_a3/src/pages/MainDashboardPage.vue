<template>
  <div class="row justify-center">
    <div v-if="isLoadingResults">Carregando ...</div>

    <div v-if="!isLoadingResults" class="col-10 col-lg-6">
      <h1 class="text-h4 text-left">Dashboard de Vendas {{ dashboard?.referencia }}</h1>

      <div class="row q-mb-md">
        <GeneralResults :generalResults="dashboard?.resumoGeral" />
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-6">
          <GameHighestSales :game="dashboard?.destaquesPrincipais?.jogoMaisVendidoPorValor" />
        </div>

        <div class="col-6">
          <GameBestSeller :game="dashboard?.destaquesPrincipais?.jogoMaisVendidoPorQuantidade" />
        </div>
      </div>

      <div class="row q-mb-md">
        <q-card class="col-12">
          <q-card-section>
            <IceBarChart
              v-if="
                barChartDataSeriesValueGames.length > 0 && barChartCategoriesValueGames.length > 0
              "
              title="Top 10 Jogos com Maior Receita"
              :colors="['#ff8f00']"
              :series="[{ name: 'Valor', data: Array.from(barChartDataSeriesValueGames) }]"
              :categories="barChartCategoriesValueGames"
              :isAmountValue="true"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-mb-md">
        <q-card class="col-12">
          <q-card-section>
            <IceBarChart
              v-if="barChartDataSeriesQntGames.length > 0 && barChartCategoriesQntGames.length > 0"
              title="Top 10 Jogos Mais Vendidos"
              :series="[{ name: 'Quantidade', data: Array.from(barChartDataSeriesQntGames) }]"
              :categories="barChartCategoriesQntGames"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-6">
          <q-card>
            <q-card-section>
              <IcePieChart
                v-if="
                  pieChartDataSeriesValueGames.length > 0 && pieChartLabelsValueGames.length > 0
                "
                title="Maior receitas por categoria"
                :series="Array.from(pieChartDataSeriesValueGames)"
                :labels="pieChartLabelsValueGames"
                :isAmountValue="true"
              />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-6">
          <q-card>
            <q-card-section>
              <IcePieChart
                v-if="pieChartDataSeriesQntGames.length > 0 && pieChartLabelsQntGames.length > 0"
                title="Mais vendidos por categoria"
                :series="Array.from(pieChartDataSeriesQntGames)"
                :labels="pieChartLabelsQntGames"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getMainDashBoard } from 'src/services/MainDashboardService'
import { onMounted, ref } from 'vue'
import GeneralResults from 'src/components/GeneralResults.vue'
import GameHighestSales from 'src/components/GameHighestSales.vue'
import GameBestSeller from 'src/components/GameBestSeller.vue'
import IceBarChart from 'src/components/IceBarChart.vue'
import IcePieChart from 'src/components/IcePieChart.vue'

const isLoadingResults = ref(true)
const dashboard = ref({})

const barChartDataSeriesValueGames = ref([])
const barChartCategoriesValueGames = ref([])

const barChartDataSeriesQntGames = ref([])
const barChartCategoriesQntGames = ref([])

const pieChartDataSeriesValueGames = ref([])
const pieChartLabelsValueGames = ref([])
const pieChartColorsValueGames = ref([])

const pieChartDataSeriesQntGames = ref([])
const pieChartLabelsQntGames = ref([])
const pieChartColorsQntGames = ref([])
const pieChartStyleColors = ref({})

onMounted(() => {
  getMainDashBoard()
    .then((data) => {
      dashboard.value = data
      populateValueBarChartInfo()
      populateQntBarChartInfo()
      populateValuePieChartInfo()
      populateQntPieChartInfo()
      isLoadingResults.value = false
    })
    .catch((error) => {
      console.error(error)
      isLoadingResults.value = false
      alert('Erro ao carregar Dashboard')
    })
})

function populateValueBarChartInfo() {
  dashboard.value.top10JogosPorValor.forEach((game) => {
    barChartDataSeriesValueGames.value.push(game.valor)
    barChartCategoriesValueGames.value.push(game.nome)
  })
}

function populateQntBarChartInfo() {
  dashboard.value.top10JogosPorQuantidade.forEach((game) => {
    barChartDataSeriesQntGames.value.push(game.quantidade)
    barChartCategoriesQntGames.value.push(game.nome)
  })
}

function populateValuePieChartInfo() {
  dashboard.value.top5EstilosPorValor.forEach((game) => {
    pieChartDataSeriesValueGames.value.push(game.valor)
    pieChartLabelsValueGames.value.push(game.estilo)
    pieChartColorsValueGames.value.push(pieChartStyleColors.value[game.estilo])
  })
}

function populateQntPieChartInfo() {
  dashboard.value.top5EstilosPorQuantidade.forEach((game) => {
    pieChartDataSeriesQntGames.value.push(game.quantidade)
    pieChartLabelsQntGames.value.push(game.estilo)
    pieChartColorsQntGames.value.push(pieChartStyleColors.value[game.estilo])
  })
}
</script>
