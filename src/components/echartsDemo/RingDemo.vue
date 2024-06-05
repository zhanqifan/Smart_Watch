<script setup lang="ts">
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { LegendComponent,TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([LegendComponent, PieChart, CanvasRenderer,TitleComponent])
const props=defineProps<{
    ringData:object,
}>()

const option = ref({...props.ringData})
</script>
<template>
  <v-chart :option="option" ref="chartRef" style="height:15vh;width: 25vw;" autoresize />
</template>

<style lang="scss" scoped></style>
