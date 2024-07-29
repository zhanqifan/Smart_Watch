<template>
  <div>
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="input_Search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="训练队名" prop="teamName">
            <el-input v-model="queryParams.teamName" placeholder="请输入训练队名" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()">删除</el-button>
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" >导出</el-button>
          </el-col> -->
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="trainingTeamList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="唯一标识" align="center" prop="id" v-if="true" />
        <el-table-column label="训练队名" align="center" prop="teamName" />

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="绑定学生" placement="top">
              <el-button link type="primary" icon="User" @click="handleStudent(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改训练队对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="trainingTeamFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="训练队名" prop="teamName">
          <el-input v-model="form.teamName" placeholder="请输入训练队名" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog title="绑定学生" v-model="isShow">
      <el-form ref="studentFormRef" :model="form1" :rules="rules1" label-width="80px">
        <el-form-item label="训练队名" prop="studentId">
          <el-select v-model="form1.studentId" multiple filterable placeholder="请选择" style="width: 100%;" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShow=false">取 消</el-button>
          <el-button :loading="buttonLoading" type="primary" @click="submit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="TrainingTeam" lang="ts">
import { listStudentInfo } from '@/api/system/studentInfo';
import { listTrainingTeam, getTrainingTeam, delTrainingTeam, addTrainingTeam, updateTrainingTeam, PostStundetId } from '@/api/teacher/trainingTeam';
import { TrainingTeamVO, TrainingTeamQuery, TrainingTeamForm } from '@/api/teacher/trainingTeam/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const trainingTeamList = ref<TrainingTeamVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const trainingTeamFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});
const studentFormRef =ref()
const initFormData: TrainingTeamForm = {
  id: undefined,
  teamName: undefined,
}
const data = reactive<PageData<TrainingTeamForm, TrainingTeamQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    teamName: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "唯一标识不能为空", trigger: "blur" }
    ],
    teamName: [
      { required: true, message: "训练队名不能为空", trigger: "blur" }
    ],
  }
});

const rules1=reactive({
  studentId: [
      { required: true, message: "学生绑定不为空", trigger: "change" }
    ],

  })
const { queryParams, form, rules } = toRefs(data);

/** 查询训练队列表 */
const getList = async () => {
  loading.value = true;
  const res = await listTrainingTeam(queryParams.value);
  trainingTeamList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
// const delTag = async(tagValue:string | number) =>{
//   const res =await delStundetId({tagValue})
//   // console.log(res)
// }
/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  trainingTeamFormRef.value?.resetFields();
}
const isShow =ref(false)
const form1 = ref({
  studentId:[],
  trainingTeamId:""
})
const options = ref()
const handleStudent = async(row:any) =>{
    form1.value.trainingTeamId=row.id
    const _id = row?.id
    const res =await listStudentInfo({pageNum:1,pageSize:9999})
  const result = await getTrainingTeam(_id);
  if(result.data.studentList){
   form1.value.studentId = result.data.studentList.map((item:any)=>item.id)}
   else{
    form1.value.studentId=[]
   }
     options.value=res.rows.map((item:any)=>{return{value:item.id,label:item.name}})
     isShow.value=true
  }
  const submit = async() =>{
    studentFormRef.value.validate(async(valid:boolean)=>{
     if(valid){
      const res =await PostStundetId(form1.value)
      console.log(res)
      isShow.value=false
      await getList();
      proxy?.$modal.msgSuccess("修改成功");
     }
    })

  }
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: TrainingTeamVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加训练队";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: TrainingTeamVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getTrainingTeam(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改训练队";
}

/** 提交按钮 */
const submitForm = () => {
  trainingTeamFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateTrainingTeam(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addTrainingTeam(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: TrainingTeamVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除训练队编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delTrainingTeam(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('teacher/trainingTeam/export', {
    ...queryParams.value
  }, `trainingTeam_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
<style lang="scss" scoped>
.input_Search{
  padding-top: 20px;
}
</style>
