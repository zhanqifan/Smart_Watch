<template>
  <div>
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="input_Search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="运动名称" prop="exerciseName">
            <el-input v-model="queryParams.exerciseName" placeholder="请输入运动名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="组数" prop="number">
            <el-input v-model="queryParams.number" placeholder="请输入组数" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" >导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="exerciseTypeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="唯一标识" align="center" prop="id" v-if="true" />
        <el-table-column label="运动名称" align="center" prop="exerciseName" />
        <el-table-column label="组数" align="center" prop="number" />
        <el-table-column label="备注" align="center" prop="remarks" />
        <el-table-column label="租户号" align="center" prop="tenantId" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['teacher:exerciseType:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['teacher:exerciseType:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改运动类型对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="exerciseTypeFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运动名称" prop="exerciseName">
          <el-input v-model="form.exerciseName" placeholder="请输入运动名称" />
        </el-form-item>
        <el-form-item label="组数" prop="number">
          <el-input v-model="form.number" placeholder="请输入组数" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
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

<script setup name="ExerciseType" lang="ts">
import { listExerciseType, getExerciseType, delExerciseType, addExerciseType, updateExerciseType } from '@/api/teacher/exerciseType/index';
import { ExerciseTypeVO, ExerciseTypeQuery, ExerciseTypeForm } from '@/api/teacher/exerciseType/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const exerciseTypeList = ref<ExerciseTypeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const exerciseTypeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ExerciseTypeForm = {
  id: undefined,
  exerciseName: undefined,
  number: undefined,
  remarks: undefined,
  tenantId: undefined,
}
const data = reactive<PageData<ExerciseTypeForm, ExerciseTypeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    exerciseName: undefined,
    number: undefined,
    remarks: undefined,
    tenantId: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "唯一标识不能为空", trigger: "blur" }
    ],
    exerciseName: [
      { required: true, message: "运动名称不能为空", trigger: "blur" }
    ],
    number: [
      { required: true, message: "组数不能为空", trigger: "blur" }
    ],
    remarks: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询运动类型列表 */
const getList = async () => {
  loading.value = true;
  const res = await listExerciseType(queryParams.value);
  exerciseTypeList.value = res.rows;
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
  exerciseTypeFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ExerciseTypeVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加运动类型";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ExerciseTypeVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getExerciseType(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改运动类型";
}

/** 提交按钮 */
const submitForm = () => {
  exerciseTypeFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateExerciseType(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addExerciseType(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ExerciseTypeVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除运动类型编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delExerciseType(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('teacher/exerciseType/export', {
    ...queryParams.value
  }, `exerciseType_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
<style lang="scss">
.input_Search{
  padding-top: 20px;
}
</style>
