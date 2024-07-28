<script setup lang="ts">
import { getTrainId } from '@/api/daliyManage';
import { addTeamResponse } from '@/types/daliyManage';
import { startAtOneButton } from '@/api/daliyManage';
import TrainState from '@/store/modules/train';
import { getHeartRateColor,findInterval,getBatteryColor } from '../../utils/HeartRateColor';
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
const trainState= TrainState()
const props=defineProps<{
  taskId:any
}>()
const router = useRouter()
const list =ref<addTeamResponse>({} as addTeamResponse) //学生运动实时信息
const intervalId =ref<number|null>(null)//定时器id

const watchOnline = ref({
  braceletsOnlineNum:0,
  braceletsTotalNum:0
})//手表在线信息

// 基础信息列表
const getTrainList =async() =>{
  console.log(props.taskId)
  const res =await getTrainId(props.taskId)
  list.value =res.data
}
const btnShow =ref(true)
const startParams = ref({
      taskId: props.taskId,
      studentIds: "",
      isRecord:false
})
// 开始定时器
const startInterval = async () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value); // 避免多次启动定时器
  }
   let number = 0;
    intervalId.value = setInterval(async () => {
    const studentIds = list.value?.students
    const res = await startAtOneButton({...startParams.value,studentIds,number:number++});
    // 处理手环掉线  处理方法:只替换有返回的部分
    res.data.taskHealthMetricsVoList.forEach((newData:any) => {
      const existingData = list.value?.studentInfoList.find(
        (item) => item.studentId === newData.studentId
      );
      if (existingData) {
        Object.assign(existingData, newData); // 替换相同项
      }
    });
  // 在线状态实时替换
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
const stopInterval = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
    btnShow.value=true
    ElMessage({
      type:'success',
      message:'操作成功'
    })
    router.push({
    path:'/trainmanage/trainingreport',
    query:{
      taskId:props.taskId
    }
  })
  trainState.changeState(true)
  }
};
// 一键开始
const open = () =>{
    startParams.value.isRecord=true
    btnShow.value=false
}


const screenWidth = ref(window.innerWidth);

// 监听窗口大小变化
window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

// 根据屏幕宽度决定卡片列表的布局样式
const cardListStyle = ref({
  display: screenWidth.value < 750 ? 'block' : 'grid',
  gridTemplateColumns: screenWidth.value < 750 ? '1fr' : 'repeat(3, 1fr)',
  paddingBottom :screenWidth.value < 750 ? '30px' : '',
})

onMounted(()=>{
  getTrainList()
  startInterval()
})
// 防止没结束定时器就刷新页面
onBeforeUnmount(()=>{
  clearInterval(intervalId.value as number);
    intervalId.value = null;
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
      <p>手环链接{{watchOnline.braceletsOnlineNum}}/{{ watchOnline.braceletsTotalNum }}</p>
      <div>
        <!-- <el-button type="primary" size="large" @click="stopInterval(false)">一键暂停</el-button> -->
        <el-button type="primary" v-show="btnShow" size="large" @click="open">一键开始</el-button>
        <el-button type="danger" v-show="!btnShow" size="large" @click="stopInterval">一键结束</el-button>
        <!-- <el-button type="primary" size="large" @click="reset">重置</el-button> -->
      </div>
    </div>
    <div class="card-list" :style="cardListStyle">
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
            <img src="@/assets/images/hearts.png" />
            <div class="item-name ">实时心率</div>
          </div>
          <div class="right" :class="getHeartRateColor(i.heartRate)">{{ i.heartRate?i.heartRate:0 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.User {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-around;
}

:deep(.el-form-item--default .el-form-item__label) {
  font-size: 18px;
  font-weight: 500;
  color: black;
}


.card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.box-card {
  margin: 30px 10px;
  font-size: 30px;
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

  .left {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }

    .item-name {
      padding-left: 10px;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    padding: 10px 55px;
    margin-top: 20px;
  }

  .right {
    font-weight: 700;
    color: #70b605;
    font-size: 20px;
    display: flex;
    align-items: center;
    &.green {
      color: #70b605;
      transition: font-size 0.3s ease;
    }

    &.yellow {
      color: yellow;
      transition: font-size 0.3s ease;
      transform: scale(1.5);
    }

    &.red {
      color: red;
      transition: font-size 0.3s ease;
      transform: scale(1.5);
    }

    &.purple {
      color: purple;
      transition: font-size 0.3s ease;
      transform: scale(1.5);
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 0 55px;
    font-size: 13px;
  }

  .btn {
    float: right;
    padding-right: 35px;
    padding-bottom: 20px;

    :deep(.el-button) {
      width: 70px;
    }
  }
}

.battery-container {
  width: 68px;
  height: 34px;
  border: 4px solid #dfe6ee;
  border-radius: 4px;
  position: relative;
  transform: scale(0.7);
  transform-origin: left top;
  margin-right: 10px;

  &:after {
    content: "";
    display: block;
    height: 12px;
    width: 4px;
    position: absolute;
    background: #dfe6ee;
    right: -8px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }

  .shell {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2px;
    background: #f8fafc;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 2px;

    .block {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
