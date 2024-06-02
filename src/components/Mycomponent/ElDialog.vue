<script setup lang="ts"></script>
<template>
  <el-dialog v-model="centerDialogVisible" title="Warning" width="500" center>
    <span> It should be noted that the content will not be aligned in center by default </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
