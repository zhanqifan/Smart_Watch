<script setup lang="ts">
import RingDemo from '@/components/echartsDemo/RingDemo.vue';
import { getDaily } from '@/api/daliyCondition';
const ringData = ref()
const getData = () => {
    getDaily().then(response => {
            // 这里可以对接口返回的数据进行处理

            const data = [
                { value: response.data.trainingPeopleNumber, name: '训练队人数',selected:true },
                { value: response.data.braceletOnlineNumber, name: '手环在线人数' },]
            ringData.value = {

                legend: {
                    orient: 'vertical',
                    x: 'right',
                    top: '10%',
                    data: ['训练队人数', '手环在线人数',],
                    textStyle: {
                        fontSize: '12px', // 设置字体大小为移动端尺寸
                    },
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '80%'], // 调整内外半径
                        center: ['30%', '50%'], // 将圆环向左移动+
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',

                        },
                        labelLine: {
                            show: false
                        },

                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold',
                                formatter: function ({ data }: any) {
                                    return data.value + '人'
                                }
                            },
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
