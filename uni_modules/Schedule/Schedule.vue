<template>
  <div class="Schedule">
    <!-- 包裹时间的矩形 -->
    <div class="time-wrapper">
      <div class="time" v-if="time">{{ time }}</div>
    </div>

    <!-- 包裹地点、内容的矩形 -->
    <!-- 子组件中直接使用传递过来的 color 属性 -->
    <div class="content-wrapper" :style="{ background: color }">

      <div class="rounded-rectangle">
<!--        <div class="content" v-if="title">主题：{{title}}</div>-->
        <div class="address" v-if="address">地点：{{ address }}</div>
        <div class="content" v-if="content">内容：{{ content }}</div>
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
      required: false
    },
    address: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    // title:{
    //   type: String,
    //   required: false
    // },
	color: {
	  type: String,
	  required: true
	}
  }
};
</script>

<style scoped>
  .Schedule {
      width: 100%; /* Use percentage width for responsiveness */
      max-width: 650rpx; /* Set a maximum width if needed */
      display: flex;
      align-items: center;
      padding: 0;
      border-radius: 30px;
      margin-top: 25px;
      background-image: linear-gradient(180deg, #fed0a9 0%, #fe8762 100%);
    }
  
    .time-wrapper {
      flex: 0 0 auto; /* Don't grow, don't shrink, use the content's size */
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      margin:0 4px 0 4px; /* Add some right margin, adjust as needed */
    }
  
    .time {
      font-size: 14px;
      font-weight: bold;
      font-family: Arial, sans-serif;
    }
  
    .content-wrapper {
      flex: 1; /* Grow to fill available space */
      padding: 20px;
      border-radius: 30px;
      background-image: linear-gradient(180deg, #BEFEE6 0%, #FED5AD 100%);
      min-height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
	
  .rounded-rectangle {
    width: 100%; /* 使用百分比使其占满剩余宽度 */
  }

  .address,
  .content {
    font-size: 14px;
    margin-bottom: 5px;
	  text-align: left;
  }
</style>