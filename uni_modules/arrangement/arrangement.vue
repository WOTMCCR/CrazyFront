<template>
  <div class="arrangement">
    <!-- 包裹时间的矩形 -->
    <div class="time-wrapper">
      <div class="time">{{ time }}</div>
    </div>

    <!-- 包裹地点、内容的矩形 -->
    <!-- 子组件中直接使用传递过来的 color 属性 -->
    <div class="content-wrapper" :style="{ background: color }">

      <div class="rounded-rectangle">
        <div class="address">地点：{{ address }}</div>
        <div class="content">内容：{{ content }}</div>
		<!-- <div class="content">颜色：{{ color }}</div> -->
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
    },
	color: {
	  type: String,
	  required: true
	}
  }
};
</script>

<style scoped>
  .arrangement {
	width: 650rpx;
    display: flex; /* 使用 flex 布局 */
    align-items: center; /* 垂直居中 */
	padding: 0px; /* 设置内边距 */
	border-radius: 30px; /* 设置圆角 */
    margin-top: 25px; /* 保持一定的上方间隔，可根据需要调整 */
	background-image: linear-gradient(180deg, #fed0a9 0%, #fe8762 100%); /* 修改颜色 */
  }

  .time-wrapper {
    width: 70px; /* 设置固定宽度 */
    display: flex;
    justify-content: center;
    align-items: center;
    color: black; /* 设置文字颜色黑色 */
    margin-right: 0px; /* 添加右侧间距，可根据需要调整 */
  }

  .time {
    font-size: 14px;
    font-weight: bold;
	font-family: Arial, sans-serif;
  }

  .content-wrapper {
    /* 样式可以根据需要自行修改 */
    width: 480rpx; /* 设置固定宽度 */
    padding: 20px; /* 设置内边距 */
    border-radius: 30px; /* 设置圆角 */
    background-image: linear-gradient(180deg, #BEFEE6 0%, #FED5AD 100%); /* 修改颜色 */
	
	min-height: 120px; /* 设置最小高度，根据需要调整 */
	display: flex;
	flex-direction: column; /* 确保是垂直方向的列布局 */
	justify-content: center; /* 垂直方向居中 */
	align-items: center; /* 水平方向居中 */
  }
  .rounded-rectangle {
    width: 100%; /* 使用百分比使其占满剩余宽度 */
  }

  .address,
  .content {
    font-size: 14px;
    margin-bottom: 5px;
	text-align: center; /* 文本水平居中 */
  }
</style>
