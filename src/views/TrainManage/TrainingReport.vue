<script setup lang="ts">

import teamDetail from './component/teamDetail.vue'
// import cardDetail from './component/cardDetail.vue'
import { getDaliyReport } from '@/api/daliyReport';
import Pagination from '@/components/Pagination/index.vue'
const page =ref(1)
const loading = ref(true)
const getReport =async(pageSize=10,pageNum=1) =>{
  const res =await getDaliyReport({pageSize,pageNum})
  console.log(res)
  ReportList.value=res.rows
  total.value =res.total
  loading.value=false
}
const ReportList =ref()
const total =ref()
const search =ref({
  pageSize:10,
  pageNum:1,
})
const handlePage = (pageQuerm) =>{
     search.value.pageNum=pageQuerm.page
     search.value.pageSize=pageQuerm.limit

}

const handleSearch = (value) =>{
  search.value={...search.value,...value}

  console.log(search.value)
}

onMounted(() => {
  getReport();
});
</script>
<template>
  <div v-loading="loading">
    <teamDetail :ReportList="ReportList" :total="total" @search="handleSearch" />
    <!-- 分页组件 -->
    <Pagination :total="total" v-model:page="page" @pagination="handlePage" />
  </div>
</template>

<style lang="scss" scoped></style>
