<template>
  <div class="row justify-center">
    <div class="col-10 col-lg-6">
      <h1 class="text-h4 text-left">Dashboard de Vendas</h1>
    </div>
  </div>
</template>

<script setup>
import { getMainDashBoard } from 'src/services/MainDashboardService'
import { onMounted, ref } from 'vue'

const dashboard = ref({})

onMounted(() => {
  getMainDashBoard()
    .then((data) => {
      dashboard.value = data
    })
    .catch((error) => {
      console.log(error)
      alert('Erro ao carregar Dashboard')
    })
})
</script>
