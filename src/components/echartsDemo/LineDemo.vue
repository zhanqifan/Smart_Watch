<script setup lang="ts">
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([ TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  CanvasRenderer])

const props=defineProps<{
    lineData:object
}>()

const option = ref({...props.lineData})
</script>
<template>
  <v-chart :option="option" ref="chartRef" style="height: 40vh; width: 45vw;" autoresize />
</template>

<style lang="scss" scoped></style>
