<script setup lang="ts">

import teamDetail from './component/teamDetail.vue'
// import cardDetail from './component/cardDetail.vue'
import { getDaliyReport } from '@/api/daliyReport';
import Pagination from '@/components/Pagination/index.vue'
const page =ref(1)
const loading = ref(true)
const getReport =async() =>{
  const res =await getDaliyReport()
  console.log(res)
  ReportList.value=res.rows
  total.value =res.total
  loading.value=false
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
  <div v-loading="loading">
    <teamDetail :ReportList="ReportList" :total="total" />
    <!-- 分页组件 -->
    <Pagination :total="total" v-model:page="page" @pagination="handlePage" />
  </div>
</template>

<style lang="scss" scoped></style>
