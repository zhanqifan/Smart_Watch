<script setup lang="ts">
import { addTeamResponse } from '@/types/daliyManage';
import { Search } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
const queryParams = ref({
   trainingTeamName:"",
   dayTime:"",
   exerciseTypeName:"",
   data:dayjs().format('YYYY-MM-DD'),
   time:"",
  })
  const options1 = [
  {
    value: '100',
    label: '100米',
  },
  {
    value: '200',
    label: '200米',
  },
  {
    value: '300',
    label: '300米',
  },


]
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
 const handleQuery = () =>{
    console.log('搜索')
 }
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
const emit = defineEmits(['search'])
const search = () =>{
  emit('search',queryParams.value)
}
</script>
<template>
  <div>
    <div class="top">
      <el-form :model="queryParams" ref="queryFormRef" :inline="true">
        <el-row>
          <el-col :span="4" :offset="1">
            <el-form-item prop="tenantId">
              <el-input
                v-model="queryParams.trainingTeamName"
                :suffix-icon="Search"
                placeholder="请输入训练队名称"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="tenantId">
              <el-select v-model="queryParams.exerciseTypeName" filterable clearable placeholder="请选择多少米" style="width: 100%;">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item prop="tenantId" style="display: flex; flex-direction: row;" label="训练时间">
              <el-date-picker v-model="queryParams.data" style="width: 150px;" type="date" placeholder="请选择日期" :disabled-date="disabledDate" />
              <el-time-picker
                v-model="queryParams.time"
                is-range
                style="width: 200px;"
                arrow-control
                clearable
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item prop="tenantId">
              <el-button @click="search">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
