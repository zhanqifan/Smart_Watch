<script setup lang="ts">
import { getTrainId } from '@/api/daliyManage';
import { addTeamResponse } from '@/types/daliyManage';
// import ReconnectingWebSocket from 'reconnecting-websocket';
import { startAtOneButton } from '@/api/daliyManage';
const options = [
  {
    value: '100',
    label: '100米',
  },
  {
    value: '200',
    label: '200米',
  },
  {
    value: '300',
    label: '300米',
  },

]
const props=defineProps<{
  taskId:any
}>()
const list =ref<addTeamResponse>({}) //学生运动实时信息
const getTrainList =async() =>{
  console.log(props.taskId)
  const res =await getTrainId(props.taskId)
  list.value =res.data
  console.log(res.data)
}
// let ws: ReconnectingWebSocket | null = null;
// const startWatch = async() =>{
//   // ws:// 用于不安全的 WebSocket 连接。
// // wss:// 用于安全的 WebSocket 连接（类似于 HTTPS）。
// const ws = new ReconnectingWebSocket('ws://localhost:7700/teacher/trainingTask/detectionData');

// ws.onopen = () => {
//         console.log('WebSocket connected');

//         const params = {
//             taskId: '1798374432678703106',
//             studentIds: 1
//         };

//         ws.send(JSON.stringify(params));
//     };

//   ws.onmessage = (event) => {
//      console.log(event)
//   };

//   ws.onerror = (error) => {
//     console.error('WebSocket error:', error);
//   };

//   ws.onclose = () => {
//     console.log('WebSocket connection closed');
//   };
//   }
const intervalId =ref()
const gettest = async() =>{
  intervalId.value = setInterval(async () => {
        const res = await startAtOneButton({taskId: '1798374432678703106', studentIds: list.value.students});
        console.log(res);
    }, 1000); // 每5秒轮询一次
}
onMounted(()=>{
  getTrainList()
})
</script>
<template>
  <div>
    <div class="User">
      <p>{{ list?.exerciseTypeName}}</p>
      <el-form>
        <el-form-item label="运动类型" style="margin-bottom: -3px">
          <el-select v-model="list.exerciseTypeName">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <p>训练时间:00:14:"00"</p>
      <p>手环链接45/50</p>
      <div>
        <el-button type="primary" size="large">一键暂停</el-button>
        <el-button type="primary" size="large" @click="gettest">一键开始</el-button>
        <el-button type="primary" size="large">一键结束</el-button>
        <el-button type="primary" size="large">重置</el-button>
      </div>
    </div>
    <div class="card-list">
      <div class="box-card" v-for="i,index in 9" :key="index">
        <div class="top">
          <div class="my-name">01 蔡徐坤</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/Oxygen.png" />
            <div class="item-name">实时血氧</div>
          </div>
          <div class="right">33</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/hearts.png" />
            <div class="item-name">实时心率</div>
          </div>
          <div class="right">33</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/sports.png" />
            <div class="item-name">实时配速</div>
          </div>
          <div class="right">33</div>
        </div>
        <div class="footer">
          <p>共计时:3.15</p>
          <p>组次 2</p>
        </div>
        <div class="btn">
          <el-button type="warning" plain>暂停</el-button>
          <el-button plain>结束</el-button>
          <el-button type="primary" plain>开始</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.User{
    display: flex;
    align-items: center;
   font-size: 18px;
   font-weight: 500;
   justify-content: space-around;
}
:deep(.el-form-item--default .el-form-item__label ){
 font-size: 18px;
 font-weight: 500;
 color: black;
}
.card-list{
  display: grid;
  grid-template-columns: repeat(3,1fr);
.box-card {
        margin: 30px 10px;
        font-size: 20px;
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
