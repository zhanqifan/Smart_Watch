<script setup lang="ts">
// import { dayjs } from 'element-plus';
import { getStudentList } from '@/api/studentManage';
const list =ref() //学生运动实时信息
// const watchOnline = ref({
//   braceletsOnlineNum:0,
//   braceletsTotalNum:0
// })//手表在线信息
// 基础信息列表
const getTrainList =async() =>{
  const res =await getStudentList()
  list.value =res.data
}


onMounted(()=>{
  getTrainList()
})
</script>
<template>
  <div>
    <div class="header">
      <p class="title">2022级15班心率实时监测</p>
      <div class="buttons">
        <el-button type="primary" size="large" @click="startInterval">开始</el-button>
        <el-button type="primary" size="large" @click="stopInterval">结束</el-button>
      </div>
    </div>
    <div class="card-list">
      <div class="box-card" v-for="i,index in list" :key="index">
        <div class="top">
          <div class="my-name">{{i.name}}</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/Oxygen.png" />
            <div class="item-name">步数</div>
          </div>
          <div class="right">{{ 0 }}</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/hearts.png" />
            <div class="item-name">BMP</div>
          </div>
          <div class="right">{{ 0 }}</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/sports.png" />
            <div class="item-name">体脂率</div>
          </div>
          <div class="right">{{ 0 }}</div>
        </div>
        <!-- <div class="footer">
          <p>共计时:{{ i.timestamp?dayjs(i.timestamp).format('mm:ss') :0 }}</p>
          <p>组次 {{i.number}}</p>
        </div> -->
        <!-- <div class="btn">
          <el-button type="warning" plain>暂停</el-button>
          <el-button plain>结束</el-button>
          <el-button type="primary" plain>开始</el-button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  .title {
  text-align: center;
  font-size: 30px;
  flex: 1;
  margin: 10px;
}
}



:deep(.el-form-item--default .el-form-item__label ){
 font-size: 18px;
 font-weight: 500;
 color: black;
}
.card-list{
  display: grid;
  grid-template-columns: repeat(4,1fr);
.box-card {
        margin: 30px 10px;
        font-size: 20px;
        border-radius: 20px;
        box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);
        .top {
        display: flex;
        justify-content: space-between;
      }
      .my-name {
        background-color: #5b84ff;
        border-radius: 0 30px 30px 0;
        padding: 15px 20px;
        color: white;
      }
      .left{
        display: flex;
        align-items: center;
        img{
          width: 20px;
          height: 20px;
        }
        .item-name{
          padding-left: 10px;
        }
      }
      .content {
        display: flex;
        justify-content: space-between;
        padding: 10px 55px;
      }
      .right {
        font-weight: 700;
        color: #70b605;
      }
      .footer{
        display: flex;
        justify-content: space-between;
        padding: 0 55px;
        font-size: 13px;
      }
      .btn{
        float: right;
        padding-right: 35px;
        padding-bottom: 20px;
       :deep(.el-button){
        width: 70px;
       }
      }
      }


   }
</style>
