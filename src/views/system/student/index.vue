<template>
  <div>
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search_group" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px" class="search-form">
          <div class="input-group">
            <el-form-item label="学生姓名" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入" clearable style="width: 240px" @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="手环ID" prop="uuid">
              <el-input v-model="queryParams.uuid" placeholder="请输入" clearable style="width: 240px" @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="学号" prop="studentNumber">
              <el-input v-model="queryParams.studentNumber" placeholder="请输入" clearable style="width: 240px" @keyup.enter="handleQuery" />
            </el-form-item>
          </div>
          <div class="button-group">
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:studentInfo:add']">新增</el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['system:studentInfo:edit']"
              >修改</el-button
            >
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['system:studentInfo:remove']"
              >删除</el-button
            >
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:studentInfo:export']">导出</el-button>
            <el-button plain icon="Upload" @click="handleUpload">导入</el-button>
          </el-col> -->
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="studentInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="学生ID" align="center" prop="id" v-if="true" />
        <el-table-column label="学生姓名" align="center" prop="name" />
        <el-table-column label="手环ID" align="center" prop="uuid" />
        <el-table-column label="学号" align="center" prop="studentNumber" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:studentInfo:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:studentInfo:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改学生信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="studentInfoFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手环ID" prop="uuid">
          <el-input v-model="form.uuid" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="学号" prop="studentNumber">
          <el-input v-model="form.studentNumber" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="StudentInfo" lang="ts">
import { listStudentInfo, getStudentInfo, delStudentInfo, addStudentInfo, updateStudentInfo,expoetTemplate } from '@/api/system/studentInfo';
import { StudentInfoVO, StudentInfoQuery, StudentInfoForm } from '@/api/system/studentInfo/types';
// import * as XLSX from 'xlsx';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const studentInfoList = ref<StudentInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const studentInfoFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StudentInfoForm = {
  id: undefined,
  name: undefined,
  uuid: undefined,
  studentNumber: undefined,
}
const data = reactive<PageData<StudentInfoForm, StudentInfoQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    uuid: undefined,
    studentNumber: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    name: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    uuid: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    studentNumber: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询学生信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStudentInfo(queryParams.value);
  studentInfoList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  studentInfoFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StudentInfoVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加学生信息";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StudentInfoVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStudentInfo(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改学生信息";
}

/** 提交按钮 */
const submitForm = () => {
  studentInfoFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateStudentInfo(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStudentInfo(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StudentInfoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除学生信息编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStudentInfo(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('teacher/studentInfo/export', {
    ...queryParams.value
  }, `studentInfo_${new Date().getTime()}.xlsx`)
}
// const handleUpload = async() =>{
//   try {
//     const res = await expoetTemplate();
//     console.log(res);

//     // 检查 res 中是否包含了正确的二进制数据

//     // 将二进制数据转换成 Uint8Array 格式
//     const uint8Array = new Uint8Array(res);

//     // 通过 XLSX 库将 Uint8Array 格式的数据解析成 workbook 对象
//     const workbook = XLSX.read(uint8Array, { type: 'array' });

//     // 通过 workbook 获取第一个 sheet
//     const firstSheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[firstSheetName];

//     // 将 sheet 数据转换成 JSON 格式
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     // 输出 jsonData，检查是否得到了预期的数据格式
//     console.log(jsonData);

//     // 进行进一步的操作，如更新界面或其他逻辑处理
//   } catch (error) {
//     console.error('上传并解析 Excel 文件时出现错误:', error);
//     // 在控制台输出错误信息，便于调试
//   }
// // await getList();
// // proxy?.$modal.msgSuccess("导入成功");
// }
onMounted(() => {
  getList();
});
</script>
<style lang="scss" scoped>
.search_group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-form {
    display: flex;
    width: 100%;
    padding-left: 20px;
  }

  .input-group {
    display: flex;
    align-items: center;

    .el-form-item {
      margin-right: 10px;
    }
  }

  .button-group {
    display: flex;
    align-items: center;

    .el-form-item {
      margin-right: 0; // Remove margin for the last item
    }
  }
}
</style>
