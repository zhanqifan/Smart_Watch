<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import RenderDialog from '@/components/Mycomponent/RenderDialog.vue';
const dialogRef = ref()
const addTraining = () =>{
  dialogRef.value.open()
}
</script>
<template>
  <div class="main">
    <el-button type="primary" :icon="Plus" class="btn" round @click="addTraining">添加训练</el-button>
    <RenderDialog :title="'添加训练'" ref="dialogRef"> </RenderDialog>
  </div>
</template>

<style lang="scss">
.main{
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   .btn{
    width: 30vw;
    height: 20vh;
    font-size: 30px;
   }
}
</style>
