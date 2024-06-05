<script setup lang="ts">

import teamDetail from './component/teamDetail.vue'
// import cardDetail from './component/cardDetail.vue'
import { getDaliyReport } from '@/api/daliyReport';
import Pagination from '@/components/Pagination/index.vue'
const page =ref(1)
const getReport =async() =>{
  const res =await getDaliyReport()
  console.log(res)
  ReportList.value=res.rows
  total.value =res.total
}
const ReportList =ref()
const total =ref()
const handlePage = (value) =>{
  console.log(value)
}
onMounted(() => {
  getReport();
});
</script>
<template>
  <div>
    <keep-alive include="teamDetail">
      <teamDetail :ReportList="ReportList" :total="total" />
    </keep-alive>
    <!-- 分页组件 -->
    <Pagination :total="total" v-model:page="page" @pagination="handlePage" />
  </div>
</template>

<style lang="scss" scoped></style>
