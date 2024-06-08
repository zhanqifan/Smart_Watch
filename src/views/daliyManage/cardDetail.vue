<script setup lang="ts">
import RingEchart from './RingEchart.vue';
</script>
<template>
  <div class="Top">
    <div class="data_condition">
      <div class="data_list" v-for="(item,index) in 3" :key="index">
        <p class="data_item">
          <span class="label">实时血氧</span>
          <span class="value">135</span>
        </p>
        <p class="data_item">
          <span class="label">实时心率</span>
          <span class="value">135</span>
        </p>

        <p class="data_item">
          <span class="label">实时配速</span>
          <span class="value">135</span>
        </p>
      </div>
      <RingEchart />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Top{
    display: flex;

.data_condition{
    width: 100%;
    display: flex;
    font-size:15px;
    align-items: center;
     justify-content: space-around;
     .data_list{
        width:35%;

        .data_item {
          padding: 0 30px;
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
