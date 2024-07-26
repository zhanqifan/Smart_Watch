<script setup lang="ts">
import { addTeamResponse } from '@/types/daliyManage';
import { getTeamList,getTrainType } from '@/api/daliyManage';
import { dayjs } from 'element-plus';
import TrainState from '@/store/modules/train';
import TrainDialog from './TrainDialog.vue';

interface QueryParams {
  trainingTeamName: string;
  dayTime: string;
  exerciseTypeName: string;
  time: Date | null;
}
const queryParams = ref<QueryParams>({
   trainingTeamName:"",
   dayTime:"",
   exerciseTypeName:"",
   time:new Date(),
  })
const trainState = TrainState()
const options = ref()//训练队
const options1 = ref()// 训练类型
const TrainRef = ref()
const route =useRoute()
defineProps<{
  ReportList:Array<addTeamResponse>,
}>()
const getTeam =async() =>{
      const res =await getTeamList()
      options.value=res.data.map(item => {
         return {
          trainingTeamId:item.teamName,
          trainingTeamName:item.teamName
         }
      });
    }
 const getType =async() =>{
  const res =await getTrainType()
  options1.value= res.data.map(item=>{
    return {
      exerciseTypeName:item.exerciseName,
      exerciseTypeId:item.exerciseName
    }
  })
 }

// 查看详情
const goDetail = (taskId:string) =>{
  TrainRef.value.open(taskId)
}
const emit = defineEmits(['search','reset'])
const search = () =>{
  emit('search',queryParams.value)
}
const reset = () =>{
  queryParams.value = ({
   trainingTeamName:"",
   dayTime:"",
   exerciseTypeName:"",
   time:null ,
  })
  emit('reset')
}
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
onMounted(()=>{
  getTeam()
  getType()
  if(trainState.state.dialogShow){
    TrainRef.value.open(route.query.taskId)
    trainState.changeState(false)
  }
})
</script>
<template>
  <div>
    <div class="top">
      <el-form :model="queryParams" ref="queryFormRef" :inline="true">
        <el-row>
          <el-col :span="4" :offset="1">
            <el-form-item prop="tenantId">
              <el-select v-model="queryParams.trainingTeamName"  placeholder="请选择训练队名称" style="width: 100%;">
                <el-option v-for="item in options" :key="item.trainingTeamId" :label="item.trainingTeamName" :value="item.trainingTeamId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="tenantId">
              <el-select v-model="queryParams.exerciseTypeName" clearable placeholder="请选择多少米" style="width: 100%;">
                <el-option v-for="item in options1" :key="item.value" :label="item.exerciseTypeName" :value="item.exerciseTypeId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="tenantId" style="display: flex; flex-direction: row;" label="训练时间">
              <!-- <el-date-picker v-model="queryParams.data" style="width: 150px;" type="date" placeholder="请选择日期" :disabled-date="disabledDate" /> -->

              <el-date-picker v-model="queryParams.time" :editable="false" type="date" placeholder="请选择时间" :disabled-date="disabledDate" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="tenantId">
              <el-button @click="search" type="primary">搜索</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-card shadow="hover" class="card" v-for="item in ReportList" :key="item.id">
      <div class="left_detail">
        <p>
          队名:<span>{{item.taskName}}</span>
        </p>
        <p>
          人数:<span>{{item.personNum??0}}人</span>
        </p>
        <p>
          运动类型:<span>{{ item.exerciseTypeName }}</span>
        </p>
        <p>
          教师:<span>{{ item.teacherName }}</span>
        </p>
        <p>
          时间:<span>{{ dayjs(item.createTime).format('MM-DD') }}</span>
        </p>
      </div>
      <div class="right_detail" @click="goDetail(item.id)">
        查看报告详情<el-icon><DArrowRight /></el-icon>
      </div>
    </el-card>
    <TrainDialog ref="TrainRef" />
  </div>
</template>

<style lang="scss" scoped>
.top {
  margin-top: 2vh;
}
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
    font-size:20px;
  //
    span{
      white-space: normal; /* 允许文本在容器内换行 */
    word-wrap: break-word; /* 在单词内部换行 */
    word-break: break-all; /* 在任何地方进行换行 */
    width: 100%; /* 让每个 p 标签占据整个宽度 */
      margin:0 20px
    }
  }
  .right_detail{
    display: flex;
  align-items: center;
  font-size: 20px;
  }
}
</style>
