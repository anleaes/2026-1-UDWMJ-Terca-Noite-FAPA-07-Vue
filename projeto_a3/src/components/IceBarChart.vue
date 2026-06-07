<template>
  <div class="text-h6 q-mb-md">{{ title }}</div>

  <div class="row justify-center">
    <div class="col-12">
      <ApexChart type="bar" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import ApexChart from 'vue3-apexcharts'
import { ref } from 'vue'
import { formatBRL } from 'src/utils/formatters'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  series: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  colors: {
    type: Array,
    required: false,
  },
  isAmountValue: {
    type: Boolean,
    default: false,
  },
})

const chartOptions = ref({
  series: props.series,
  chart: {
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    },
  },
  colors: props.colors,
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: props.categories,
    labels: {
      formatter: function (val) {
        if (!props.isAmountValue) {
          return val
        } else {
          return formatBRL(val)
        }
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        if (!props.isAmountValue) {
          return val
        } else {
          return formatBRL(val)
        }
      },
    },
  },
})
</script>
