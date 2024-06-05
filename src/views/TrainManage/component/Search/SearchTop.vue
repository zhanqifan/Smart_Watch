<script setup lang="ts">
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
</script>
<template>
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
            <el-select v-model="queryParams.exerciseTypeName" filterable placeholder="请选择多少米" style="width: 100%;">
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
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.top {
  margin-top: 2vh;
}
</style>
