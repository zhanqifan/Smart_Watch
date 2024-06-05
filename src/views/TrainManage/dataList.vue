<script setup lang="ts">
import { getReportDetail } from '@/api/daliyReport';
const route = useRoute()
const router = useRouter()
const getDetail = async() =>{
const res =await getReportDetail(route.query.taskId)
 console.log(res)
}
const currentPageWidth = ref(window.innerWidth);//页面宽度
const tableData = [
{ name: '高启强', averageHeartRate: 155, maxHeartRate: 160, averagePace: 110, maxPace: 110, averageBloodOxygen: 110, maxBloodOxygen: 110, highStartStrong: 155 },
        { name: '高启盛', averageHeartRate: 155, maxHeartRate: 160, averagePace: 100, maxPace: 100, averageBloodOxygen: 100, maxBloodOxygen: 100, highStartStrong: 155 },
        { name: '高启兰', averageHeartRate: 155, maxHeartRate: 160, averagePace: 101, maxPace: 101, averageBloodOxygen: 101, maxBloodOxygen: 101, highStartStrong: 155 },
        { name: '老墨', averageHeartRate: 155, maxHeartRate: 160, averagePace: 101, maxPace: 101, averageBloodOxygen: 101, maxBloodOxygen: 101, highStartStrong: 155 },
        { name: '安欣', averageHeartRate: 155, maxHeartRate: 160, averagePace: 101, maxPace: 101, averageBloodOxygen: 100, maxBloodOxygen: 100, highStartStrong: 155 }
]
const tableHeaders = [
  { prop: 'name', label: '姓名' },
  { prop: 'averageHeartRate', label: '平均心率' },
  { prop: 'maxHeartRate', label: '最高心率' },
  { prop: 'averagePace', label: '平均配速' },
  { prop: 'maxPace', label: '最高配速' },
  { prop: 'averageBloodOxygen', label: '平均血氧' },
  { prop: 'maxBloodOxygen', label: '最高血氧' },
];
const goBack = () => {
  router.go(-1); // 路由页面回退
};
onMounted(()=>{
  getDetail()
})
</script>
<template>
  <div>
    <div class="top">
      <div class="left_detail">
        <p>训练队伍名称:<span>1组</span></p>
        <p>训练类型:<span>100米</span></p>
        <p>授课老师:<span>张三老师</span></p>
        <p>训练时间:<span class="">2024-3-24 14:00-15:00 </span></p>
        <p>受训人数:<span>43</span></p>
      </div>
      <div>
        <el-button type="primary" @click="goBack">返回</el-button>
        <el-button type="primary">导出报告</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%; white-space: nowrap; overflow: hidden;">
        <el-table-column
          v-for="item in tableHeaders"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="currentPageWidth/7"
          :sortable="item.prop !== 'name'"
          :fixed="item.prop === 'name' ? 'left' : null"
          align="center"
        />
      </el-table>
    </div>
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
