<script setup lang="ts">
import { getTrainId } from '@/api/daliyManage';
import { addTeamResponse } from '@/types/daliyManage';
// import ReconnectingWebSocket from 'reconnecting-websocket';
import { startAtOneButton,resetWatch } from '@/api/daliyManage';
import { dayjs } from 'element-plus';
// import { resetWatch } from '@/api/daliyManage';
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
const intervalId =ref<number|null>(null)//定时器id
// 存储暂停的学生ID
const pausedStudents = ref<number[]>([]);
const watchOnline = ref({
  braceletsOnlineNum:0,
  braceletsTotalNum:0
})//手表在线信息

// 基础信息列表
const getTrainList =async() =>{
  console.log(props.taskId)
  const res =await getTrainId(props.taskId)
  console.log(res.data)
  list.value =res.data
}


// 开始定时器
const startInterval = async () => {
  if (intervalId.value !== null) {
    ElMessage.error('请先结束再点击开始');
    clearInterval(intervalId.value); // 避免多次启动定时器
    return;
  }
  let number = 0;

  intervalId.value = setInterval(async () => {
    // 处理暂停学生
    // const studentIds = list.value.students.filter(
    //   (studentId) => !pausedStudents.value.includes(studentId)
    // );
    const studentIds = list.value.students.filter(
      (studentId) => !pausedStudents.value.includes(studentId)
    );
    console.log(studentIds)
    const res = await startAtOneButton({
      taskId: props.taskId,
      studentIds: studentIds,
      number: number++,
    });
    console.log(res);
    // 处理手环掉线  处理方法:只替换有返回的部分
    res.data.taskHealthMetricsVoList.forEach((newData) => {
      const existingData = list.value.studentInfoList.find(
        (item) => item.studentId === newData.studentId
      );
      if (existingData) {
        Object.assign(existingData, newData); // 替换相同项
      }
    });
    watchOnline.value = {
      braceletsOnlineNum: res.data.braceletsOnlineNum,
      braceletsTotalNum: res.data.braceletsTotalNum,
    };
  }, 1000); // 每1秒轮询一次
  ElMessage({
    type: 'success',
    message: '操作成功',
  });
};
// 结束定时器
const stopInterval = (control:boolean) => {
  if (intervalId.value !== null) {
      control?pausedStudents.value=[]:false//结束则情况储存暂停学生的id
    clearInterval(intervalId.value);
    intervalId.value = null;
    ElMessage({
      type:'success',
      message:'操作成功'
    })
  }
};

// 电池块显示
const findInterval = (num: number) => {
  const intervalSize = 100 / 5;
  const interval = Math.floor(num / intervalSize);
  return interval === 5 ? interval : interval + 1;
};
// 电量颜色计算
const getBatteryColor = (num: number) => {
  const interval = findInterval(num);
  if (interval >= 0 && interval <= 1) {
    return '#FE5F69';
  } else if (interval > 1 && interval <= 4) {
    return '#FFC95C';
  } else {
    return '#64BA8C';
  }
};

// 重置
const reset  = async() =>{
  if(intervalId){
    stopInterval(false)
  }
  pausedStudents.value=[]//清空
  const res =await resetWatch(props.taskId)
  console.log(res)
  // getTrainList()//初始化数据
}

// 停止当前学生数据更新
const stopSingle = (studentId: number) => {
  if(!intervalId.value)return
  if (!pausedStudents.value.includes(studentId)) {
    pausedStudents.value.push(studentId);//添加需要暂停的学生id
    stopInterval(false); // 停止定时器
    startInterval(); // 重新启动定时器
  }
};
// 心率颜色变化
const getHeartRateColor = (heartRate:number) => {
  if ( heartRate >=40 &&heartRate <= 150) {
    return 'green'; // 绿色
  } else if (heartRate > 150 && heartRate <= 180) {
    return 'yellow'; // 黄色
  } else if (heartRate > 180) {
    return 'red'; // 红色
  } else if (heartRate <= 40 || heartRate >= 200) {
    return 'purple'; // 紫色
  } else {
    return ''; // 默认样式
  }
};
// 开始单个学生
const startSingle = (id:any)=>{
  if(!intervalId.value)return
  pausedStudents.value= pausedStudents.value.filter(item=>item!==id)
  stopInterval(false); // 停止定时器
  startInterval(); // 重新启动定时器
}
onMounted(()=>{
  getTrainList()
})
</script>
<template>
  <div>
    <div class="User">
      <p>{{ list?.teacherName}}</p>
      <el-form>
        <el-form-item label="运动类型" style="margin-bottom: -3px">
          <el-select v-model="list.exerciseTypeName">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <p>训练时间:00:00:"00"</p>
      <p>手环链接{{watchOnline.braceletsOnlineNum}}/{{ watchOnline.braceletsTotalNum }}</p>
      <div>
        <el-button type="primary" size="large" @click="stopInterval(false)">一键暂停</el-button>
        <el-button type="primary" size="large" @click="startInterval()">一键开始</el-button>
        <el-button type="primary" size="large" @click="stopInterval(true)">一键结束</el-button>
        <el-button type="primary" size="large" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="card-list">
      <div class="box-card" v-for="i,index in list.studentInfoList" :key="index">
        <div class="top">
          <div class="my-name">{{ i.studentName }}</div>
          <!-- 电池 -->
          <div class="battery-container">
            <div class="shell">
              <div
                v-for="(item, index) in findInterval(i.battery ?? 100)"
                class="block"
                :key="index"
                :style="{ background: getBatteryColor(i.battery ?? 100) }"
              ></div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/Oxygen.png" />
            <div class="item-name">实时血氧</div>
          </div>
          <div class="right">{{ i.bloodOxygen?i.bloodOxygen:0 }}</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/hearts.png" />
            <div class="item-name ">实时心率</div>
          </div>
          <div class="right" :class="getHeartRateColor(i.heartRate)">{{ i.heartRate?i.heartRate:0 }}</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/sports.png" />
            <div class="item-name">实时配速</div>
          </div>
          <div class="right">{{ i.matchingSpeed?i.matchingSpeed:0 }}</div>
        </div>
        <div class="footer">
          <p>共计时:{{ i.timestamp?dayjs(i.timestamp).format('mm:ss') :0 }}</p>
          <p>组次 {{i.number}}</p>
        </div>
        <div class="btn">
          <el-button type="warning" plain @click="stopSingle(i.studentId)">暂停</el-button>
          <el-button plain @click="stopSingle(i.studentId)">结束</el-button>
          <el-button type="primary" @click="startSingle(i.studentId)" plain>开始</el-button>
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
        align-items: center;
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
        font-size: 20px;
        &.green {
    color: #70B605;
    transition: font-size 0.3s ease; /* 过渡动画 */
  }
  &.yellow {
    color: yellow;
    transition: font-size 0.3s ease; /* 过渡动画 */
    transform: scale(1.5); /* 将字体放大 1.5 倍 */
  }
  &.red {
    color: red;
    transition: font-size 0.3s ease; /* 过渡动画 */
    transform: scale(1.5); /* 将字体放大 1.5 倍 */
  }
  &.purple {
    color: purple;
    transition: font-size 0.3s ease; /* 过渡动画 */
    transform: scale(1.5); /* 将字体放大 1.5 倍 */
  }
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
   .battery-container{
  width: 68px;
  height: 34px;
  border: 4px solid #DFE6EE ;
  border-radius: 4px;
  position: relative;
  transform: scale(0.7);
  transform-origin: left top;
  margin-right: 10px;
  &:after{
    content: "";
    display: block;
    height: 12px;
    width: 4px;
    position: absolute;
    background:#DFE6EE ;
    right: -8px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
  // 电池块
  .shell{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2px;
    background: #F8FAFC ;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-column-gap: 2px;
    .block{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
