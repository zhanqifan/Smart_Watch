<script setup lang="ts">

import teamDetail from './component/teamDetail.vue'
import { getDaliyReport } from '@/api/daliyReport';
import Pagination from '@/components/Pagination/index.vue'
import { dayjs } from 'element-plus';

const page = ref(1) // 当前页码
const loading = ref(true)
const ReportList = ref()
const total = ref()
const search = ref({
  pageSize: 10,
  pageNum: 1,
})

const getReport = async (pageSize = 10, pageNum = 1) => {
  const res = await getDaliyReport(search.value)
  ReportList.value = res.rows
  total.value = res.total
  loading.value = false
}

const handlePage = (pageQuery) => {
  search.value.pageNum = pageQuery.page
  search.value.pageSize = pageQuery.limit
  getReport()
}

const handlereset = () => {
  loading.value = true
  search.value.pageNum = 1
  search.value.pageSize = 10
  search.value = {
    pageSize: 10,
    pageNum: 1,
  }
  page.value = 1 // 重置当前页码为1
  getReport()
}

const handleSearch = ({ time, ...msg }: any) => {
  loading.value = true
  const params = {
    'params[beginTime]': dayjs(time[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    'params[endTime]': dayjs(time[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    ...msg
  }

  search.value = {
    ...search.value,
    ...params,
  }
  getReport()
}

onMounted(() => {
  getReport()
})
</script>

<template>
  <div v-loading="loading">
    <teamDetail :ReportList="ReportList" :total="total" @search="handleSearch" @reset="handlereset" />
    <!-- 分页组件 -->
    <Pagination :total="total" v-model:page="page" @pagination="handlePage" />
  </div>
</template>

<style lang="scss" scoped></style>
