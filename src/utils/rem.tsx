// rem 函数
function setRem() {
  const defaultWidth = 1920; // 默认宽度
  const defaultFontSize = 192; // 默认字体大小
  const mobileBaseWidth = 375; // 移动端基准宽度
  const mobileBaseFontSize = 80; // 移动端基准字体大小

  const screenWidth = window.innerWidth; // 获取屏幕的宽度
  let currentScale = screenWidth / defaultWidth; // 计算当前的屏幕大小和默认宽度之间的比例

  // 防止缩放太小
  if (currentScale < 0.85) {
    if (screenWidth > 1024 && screenWidth < 1366) {
      currentScale = 0.855;
    } else if (screenWidth >= 1366) {
      currentScale = 1;
    } else {
      currentScale = 0.855;
    }
  }

  // 根据屏幕宽度判断是否为移动端
  if (screenWidth <= 750) {
    const mobileScale = screenWidth / mobileBaseWidth;
    const currentFontSize = (mobileScale * mobileBaseFontSize).toFixed(2);
    document.documentElement.style.fontSize = currentFontSize + 'px';
  } else {
    // 当前为 PC 或平板时
    const currentFontSize = (currentScale * defaultFontSize).toFixed(2);
    document.documentElement.style.fontSize = currentFontSize + 'px';
  }
}

// 调用方法
setRem();
// 监听窗口在变化时重新设置根字体大小
window.onresize = function () {
  setRem();
};
