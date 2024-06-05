<script setup lang="ts">
import { addTeamResponse } from '@/types/daliyManage';
import SearchTop from '../component/Search/SearchTop.vue';
const router= useRouter()
const props=defineProps<{
  ReportList:Array<addTeamResponse>
}>()
// 查看详情
const goDetail = (taskId:string) =>{
   router.push({
    path:'/trainmanage/datalist',
    query:{
      taskId
    }
  })
}
</script>
<template>
  <div>
    <SearchTop />
    <el-card shadow="hover" class="card" v-for="item in ReportList" :key="item.id">
      <div class="left_detail">
        <p>
          训练队伍名称:<span>{{item.trainingTeamName}}</span>
        </p>
        <p>
          训练人数:<span>{{item.trainingPeopleNumber}}人</span>
        </p>
        <p>
          运动类型:<span>{{ item.exerciseTypeName }}</span>
        </p>
        <p>
          教师名称:<span class="">{{ item.teacherName }}</span>
        </p>
      </div>
      <div class="right_detail" @click="goDetail(item.id)">
        查看报告详情<el-icon><DArrowRight /></el-icon>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.card{
  margin:10px 20px ;
  border-radius: 10px;
  color: #fff;
  font-weight: 900;
}
:deep(.el-card__body){
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #409EFF;

  .left_detail{
    display: flex;
    font-size:1.5vw;
    span{
      margin:0 20px
    }
  }
  .right_detail{
    display: flex;
  align-items: center;
  font-size: 23px;
  }
}
</style>
