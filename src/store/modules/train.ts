import { defineStore } from 'pinia';

export const TrainState = defineStore(
  'train',
  () => {
    const state = reactive({
      dialogShow: true //第一次进入训练报告管理打开弹窗表格
    });

    const changeState = (value: boolean) => {
      state.dialogShow = value;
    };
    return {
      state,
      changeState
    };
  },
  {
    persist: true
  }
);

export default TrainState;
