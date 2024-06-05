<script setup lang="ts">
import addTraining from './actualSport/component/addTraining.vue';
import { getTeamList,getTrainType } from '@/api/daliyManage';
type Team ={
  trainingTeamName:string
  trainingTeamId:string
}
type Train ={
  trainName:string
  trainId:string
}
const options = ref<Team[]>([])
  const options1 = ref<Train[]>([])
// 获取训练队列表
const getTeam =async() =>{
      const res =await getTeamList()
      options.value=res.data.map(item => {
         return {
          trainingTeamId:item.id,
          trainingTeamName:item.teamName
         }
      });
    }
// 获取训练队类型
const getTrain =async() =>{
      const res =await getTrainType()
      options1.value=res.data.map(item => {
         return {
          trainId:item.exerciseName,
          trainName:item.exerciseName
         }
      });
}
onMounted(()=>{
  getTeam()
  getTrain()
})
</script>
<template>
  <div class="main">
    <addTraining :options="options" :options1="options1" />
  </div>
</template>

<style lang="scss">
.main{
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;

}
</style>
