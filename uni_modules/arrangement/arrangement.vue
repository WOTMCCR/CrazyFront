<template>
  <div class="arrangement">
    <!-- 包裹时间的矩形 -->
    <div class="time-wrapper">
      <div class="time">{{ time }}</div>
    </div>

    <!-- 包裹地点、内容的矩形 -->
    <div class="content-wrapper">
      <div class="rounded-rectangle">
        <div class="address">地点：{{ address }}</div>
        <div class="content">内容：{{ content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 从父组件传递的时间、地点和内容
    time: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
  .arrangement {
    display: flex; /* 使用 flex 布局 */
    align-items: center; /* 垂直居中 */
    margin-top: 20px; /* 保持一定的上方间隔，可根据需要调整 */
  }

  .time-wrapper {
    width: 100px; /* 设置固定宽度 */
    height: 50px; /* 设置固定高度 */
    background-image: linear-gradient(180deg, #3366cc 0%, #3399ff 100%); /* 修改颜色 */
    border-radius: 10px; /* 设置圆角 */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white; /* 设置文字颜色为白色 */
    margin-right: 10px; /* 添加右侧间距，可根据需要调整 */
  }

  .time {
    font-size: 18px;
    font-weight: bold;
  }

  .content-wrapper {
    /* 样式可以根据需要自行修改 */
    width: 450rpx; /* 设置固定宽度 */
    padding: 10px; /* 设置内边距 */
    border-radius: 10px; /* 设置圆角 */
    background-image: linear-gradient(180deg, #ffe837 0%, #ffaa7f 100%); /* 修改颜色 */
  }

  .rounded-rectangle {
    width: 100%; /* 使用百分比使其占满剩余宽度 */
  }

  .address,
  .content {
    margin-bottom: 5px;
  }
</style>
