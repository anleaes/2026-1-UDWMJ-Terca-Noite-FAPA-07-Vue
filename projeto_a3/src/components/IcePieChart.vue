<template>
  <div class="text-h6 text-center q-mb-md">{{ title }}</div>

  <div class="row justify-center">
    <div class="col-12">
      <ApexChart type="donut" width="100%" height="360" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import { formatBRL } from 'src/utils/formatters'
import { ref } from 'vue'
import ApexChart from 'vue3-apexcharts'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  series: {
    type: Array,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
  isAmountValue: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const chartOptions = ref({
  series: props.series,
  labels: props.labels,
  chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
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
  legend: {
    position: 'bottom',
    offsetY: 0,
  },
})
</script>
