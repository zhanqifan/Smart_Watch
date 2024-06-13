<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const queryParams = ref({
   trainingTeamName:"",
   dayTime:""
  })

 const handleQuery = () =>{
    console.log('搜索')
 }
 const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
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
        <el-col :span="9">
          <el-form-item label="训练时间" prop="contactUserName">
            <el-date-picker v-model="queryParams.dayTime" type="date" placeholder="请选择时间" :disabled-date="disabledDate" />
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="6">
          <el-form-item>
            <slot />
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
