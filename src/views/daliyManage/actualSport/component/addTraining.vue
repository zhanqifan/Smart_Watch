<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import RenderDialog from '@/components/Mycomponent/RenderDialog.vue';
import { addTrainTest } from '@/api/daliyManage';
import useUserStore from '@/store/modules/user';
const router= useRouter()
const props = defineProps<{
  options:Array<any>//训练队
  options1:Array<any>//运动类型
}>()
const addTraining = () =>{
  dialogRef.value.open()
}
const handleActuall =()=>{
    router.push('/')
}
const user = useUserStore()
const formRef=ref()

const dialogRef = ref()
const sportForm =ref({
  trainingTeamId:'',//训练队id
  exerciseTypeName:'',//训练类型名称
  number:1,//组数
  teacherName:user.nickname//教师姓名
})
// const options1 = [
//   {
//     value: '100',
//     label: '100米',
//   },
//   {
//     value: '200',
//     label: '200米',
//   },
//   {
//     value: '300',
//     label: '300米',
//   },


// ]
const rules = reactive({
  trainingTeamId:[{ required: true, message: '请选择',trigger: 'change'  }],
  exerciseTypeName: [{ required: true, message: '请选择' ,trigger: 'change'}],
  // number: [{ required: true, message: '请输入运动次数' ,trigger: 'blur'},],

})
const handleSend = ()=>{
    formRef.value.validate(async(valid:boolean)=>{

      if(valid){
        dialogRef.value.load(true)
       const team= props.options.find(item=>item.trainingTeamId===sportForm.value.trainingTeamId)
       const res =await addTrainTest({...sportForm.value,trainingTeamName:team.trainingTeamName})
       console.log(res.data.id)
       router.push({
        path:'/daliysportmenu/studentsport',
        query:{
          taskId:res.data.id
        }
       })
        console.log('sumbt')
      }
      else{
        console.log('ERR')
      }
      dialogRef.value.load(false)
    })
}
</script>
<template>
  <div>
    <el-button type="primary" :icon="Plus" class="btn" round @click="addTraining" @Upactuall="handleActuall">添加训练</el-button>
    <RenderDialog :title="'添加训练'" ref="dialogRef" @send="handleSend">
      <el-form ref="formRef" style="max-width: 600px" :model="sportForm" :rules="rules" label-width="auto" class="ruleForm">
        <el-form-item label="训练队" prop="trainingTeamId">
          <el-select v-model="sportForm.trainingTeamId" placeholder="请选择" size="large" style="width: 100%;">
            <el-option v-for="item in options" :key="item.trainingTeamId" :label="item.trainingTeamName" :value="item.trainingTeamId" />
          </el-select>
        </el-form-item>
        <el-form-item label="运动类型" prop="exerciseTypeName">
          <el-select v-model="sportForm.exerciseTypeName" placeholder="请选择" size="large" style="width: 100%;">
            <el-option v-for="item in options1" :key="item.value" :label="item.exerciseTypeName" :value="item.exerciseTypeId" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="组数" prop="number">
        <el-input v-model.number="sportForm.number" placeholder="请输入运动次数"></el-input>
      </el-form-item> -->
      </el-form>
    </RenderDialog>
  </div>
</template>

<style lang="scss" scoped>
   .btn{
    width: 30vw;
    height: 20vh;
    font-size: 30px;
   }
.ruleForm{
  padding: 30px;
}
// @media(max-width:750px){
//   .btn{
//     width: 100px !important;
//     height: 50px!important;
//     font-size: 30px;
//    }
// }
</style>
