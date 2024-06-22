<script setup lang="ts">
import { getReportDetail } from '@/api/daliyReport';
import { FullDetailsReportVoList } from '@/types/daliyReport';
const dialogVisible = ref(false)
const headerInfo = ref()//顶部信息
const open = async(taskId:string) =>{
  dialogVisible.value=true
  const res =await getReportDetail(taskId)
    headerInfo.value =res.data
     res.data.fullDetailsReportVoList.forEach(item=>item.averageHeartRate=item.averageHeartRate.toFixed(2))
    tableData.value =res.data.fullDetailsReportVoList
}
const tableData = ref<FullDetailsReportVoList[]>()
const tableHeaders = [
  { prop: 'studentName', label: '姓名' },
  { prop: 'averageHeartRate', label: '平均心率' },
  { prop: 'maxHeartRate', label: '最高心率' },
  // { prop: 'averagePace', label: '平均配速' },
  // { prop: 'maxPace', label: '最高配速' },
  // { prop: 'averageBloodOxygen', label: '平均血氧' },
  // { prop: 'maxBloodOxygen', label: '最高血氧' },
];

defineExpose({
  open
})
</script>
<template>
  <div>
    <el-dialog v-model="dialogVisible" :fullscreen="true">
      <div class="top">
        <div class="left_detail">
          <p>
            训练队伍名称:<span>{{headerInfo?.trainingName}}</span>
          </p>
          <p>
            训练类型:<span>{{headerInfo?.trainingType}}</span>
          </p>
          <p>
            授课老师:<span>{{headerInfo?.teacherName}}</span>
          </p>
          <!-- <p>
          训练时间:<span class="">{{ headerInfo?.trainingDate }}</span>
        </p> -->
          <p>
            受训人数:<span>{{headerInfo?.personNum }}</span>
          </p>
        </div>
        <div>
          <el-button type="primary" @click="dialogVisible=false">返回</el-button>
          <!-- <el-button type="primary" @click="exportRe">导出报告</el-button> -->
        </div>
      </div>
      <div>
        <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%; white-space: nowrap; overflow: hidden;">
          <el-table-column
            v-for="item in tableHeaders"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :sortable="item.prop !== 'name'"
            :fixed="item.prop === 'name' ? 'left' : null"
            align="center"
          />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 20px;
.left_detail{
  display: flex;
  p{
    margin: 20px 5px;
    span{
      margin: 0 5px;
    }
  }

}
}
:deep(.el-table ){
  font-size: 18px;
  tr{
  height: 45px;
  }
  }
</style>
