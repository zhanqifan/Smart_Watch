<script setup lang="ts">
import RingDemo from '@/components/echartsDemo/RingDemo.vue';
import { getDaily } from '@/api/daliyCondition';
const ringData = ref()
const getData = () => {
    getDaily().then(response => {
        // 这里可以对接口返回的数据进行处理

        const data = [
            { value: response.data.braceletOnlineNumber, name: '手环在线人数' },]
        ringData.value = {
            title: {
                text: '当前运动步数\n 1334',
                left: 'center',
                top: 'center',
                textStyle:{
                    fontSize:15
                }
            },

            series: [
                {
                    type: 'pie',
                    radius: ['80%', '100%'], // 调整内外半径
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',

                    },
                    labelLine: {
                        show: false
                    },

                    data: data
                }
            ]
        }
    })
        .catch(error => {
            console.error("接口请求失败:", error);
        });
}
onMounted(() => {
    getData()
})
</script>
<template>
  <div>
    <RingDemo v-if="ringData" :ringData="ringData" />
  </div>
</template>

<style lang="scss" scoped></style>
