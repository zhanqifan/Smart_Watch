<script setup lang="ts">
import watchControl from './actualSport/component/watchtControl.vue'
const route= useRoute()
</script>
<template>
  <div>
    <!-- 学生实时运动 -->
    <watchControl :taskId="route.query.taskId" />
  </div>
</template>

<style lang="scss" scoped></style>
