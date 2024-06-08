<script setup lang="ts">
const props=defineProps<{
    title:string
}>()
const loading= ref(false)
const emit=defineEmits(['send'])
const isShow = ref(false)
const sumbit =()=>{
  emit('send')
}
const open =()=>{
    console.log(props.title)
    isShow.value=true
}
const load = (type) =>{
  loading.value=type
}
defineExpose({
    open,load
})
</script>
<template>
  <el-dialog v-model="isShow" :title="title" width="500" align-center>
    <el-divider style="height: 10px;margin:0" />
    <slot />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="sumbit" :loading="loading"> 确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog{
  font-weight: 900;
}
</style>
