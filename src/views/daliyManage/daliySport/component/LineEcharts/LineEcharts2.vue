<script setup lang="ts">
import LineDemo from '@/components/echartsDemo/LineDemo.vue';
import { getLineData } from '@/api/daliyCondition';
const lineData = ref()
const getData = () => {
    getLineData().then(response => {
       const {heartRateDataToRealTime} = response.data
        lineData.value = {
            title: {
                text: '当日心率对比图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 'right',
                data: ['最高心率', '平均心率', '最低心率']
            },
            grid: {
                left: '3%',
                containLabel: true
            },

            xAxis: {
                name:'分钟',
                type: 'category',
                boundaryGap: false,
                data: ['10', '20', '30', '40', '50', '60', '70']
            },
            yAxis: {
                name: '次数',
                type: 'value'
            },
            series: [
                {
                    name: '最高心率',
                    type: 'line',
                    data: heartRateDataToRealTime.maxHeartRate,
                },
                {
                    name: '平均心率',
                    type: 'line',
                    data: heartRateDataToRealTime.avgHeartRate
                },
                {
                    name: '最低心率',
                    type: 'line',
                    data: heartRateDataToRealTime.minHeartRate
                },


            ]
        }
    }).catch(error => {
        console.log(error)
    })
}
onMounted(() => {
    getData()
})
</script>
<template>
  <div>
    <LineDemo v-if="lineData" :lineData="lineData"></LineDemo>
  </div>
</template>

<style lang="scss" scoped></style>
