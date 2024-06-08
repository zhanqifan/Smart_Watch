<script setup lang="ts">
defineProps<{
  title:string
}>()
</script>
<template>
  <div>
    <el-card shadow="hover">
      <div class="title">
        <p>{{title}}</p>
      </div>
      <div>
        <slot />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 30px;

  p {
    margin: 0 20px;
    font-size: 20px;
    font-weight: 900;
    position: relative; /* 设置相对定位，以便伪元素参照 */

    &::before {
      content: '';
      position: absolute;
      left: -20px; /* 调整左偏移量 */
      top: 50%; /* 上下居中 */
      transform: translateY(-50%); /* 上下居中 */
      width: 10px; /* 宽度 */
      height: 100%; /* 高度 */
      background-color: #5470C6; /* 紫色 */
    }
  }
}
</style>
