<script setup lang="ts">
import SearchTop from './daliySport/component/searchHeader/SearchTop.vue'
import TeamSport from './daliySport/component/teamSport/teamSport.vue';
import LineEcharts1 from './daliySport/component/LineEcharts/LineEcharts1.vue';
import LineEcharts2 from './daliySport/component/LineEcharts/LineEcharts2.vue';
import BaseCard from '@/components/Mycomponent/BaseCard.vue';
// import { getUserInfo } from '@/api/user/user';
// onMounted(async()=>{
//   const res = await getUserInfo()
//   console.log(res.data)
// })
</script>
<template>
  <div>
    <el-card class="card">
      <!-- 顶部搜索 -->
      <SearchTop>
        <!-- <el-button type="primary" size="large">导出图片</el-button> -->
      </SearchTop>

      <!-- 队伍训练情况 -->
      <div class="Top">
        <div class="Team_condition">
          <p class="Team_text">队伍训练情况</p>
          <TeamSport />
        </div>
        <div class="data_condition">
          <div class="data_list" v-for="(item,index) in 1" :key="index">
            <p class="data_item">
              <span class="label">平均心率(次/分)</span>
              <span class="value">135</span>
            </p>
            <!-- <p class="data_item">
              <span class="label">平均配速(公里/分)</span>
              <span class="value">135</span>
            </p>

            <p class="data_item">
              <span class="label">平均血氧</span>
              <span class="value">135</span>
            </p> -->
          </div>
        </div>
      </div>
    </el-card>
    <!-- 心率 -->
    <BaseCard :title="'心率'">
      <div class="flex">
        <LineEcharts1 class="flex-1" />
        <LineEcharts2 class="flex-1" />
      </div>
    </BaseCard>
    <!-- <BaseCard :title="'配速'">
      <div class="flex">
        <LineEcharts1 class="flex-1" />
        <LineEcharts2 class="flex-1" />
      </div>
    </BaseCard>
    <BaseCard :title="'血氧'">
      <div class="flex">
        <LineEcharts1 class="flex-1" />
        <LineEcharts2 class="flex-1" />
      </div>
    </BaseCard> -->
  </div>
</template>

<style lang="scss" scoped>

.Top{
    display: flex;
.Team_condition{
    width: 500px;
    display: flex;
    flex-direction: column;
    .Team_text{
        text-align: center;
        margin: 0;
        font-size: 25px;
        font-weight: 900;
        margin-right: 130px;
    }
}
.data_condition{
    width: 100%;
    display: flex;
    font-size:15px;
    align-items: center;
    // justify-content: start;
    //  justify-content: space-around;
     .data_list{
        width:35%;

        .data_item {
          padding: 0 70px;
        display: flex;
        justify-content: space-between;
      }
      .label {
        text-align: left;
      }

      .value {
        text-align: right;
      }&:not(:last-child) {

        border-right: 1px solid #ccc;
      }
     }
}
}
</style>
