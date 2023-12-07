<template>
	<view class="mt-10"></view>
  <view class="flex-col section_3">
    <view class="flex-row items-center">
      <image
        class="image_7"
        :src="imageSrc"
      />
      <view class="flex-col items-start ml-13">
        <text class="font text_2">{{ username }}</text>
        <text class="font text_3 mt-7">{{ timestamp }}</text>
      </view>
    </view>
    <view class="flex-col items-start group_2 mt-41">
      <text class="font">标题：{{ title }}</text>
      <text class="font">活动地址：{{ address }}</text>
      <text class="font">时间：{{ time }}</text>
      <text class="font">负责人：{{ organizer }}</text>
      <text class="font">要求：{{ requirements }}</text>
      <text class="font">介绍：{{ introduction }}</text>
    </view>
	<view class="mt-10"></view>
	<view class="mt-74 flex-col justify-start items-center button text-wrapper">
	      <text class="text_4">时间线</text>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: "https://ide.code.fun/api/image?token=6569458efcfbac00113616d6&name=c2c19904ed48e72c673d99a1d72c81c5.png",
      username: "Gavin Nelson",
      timestamp: "今天 12:00",
      title: "原神·启动",
      address: "", // Add the actual address data
      time: "", // Add the actual time data
      organizer: "", // Add the actual organizer data
      requirements: "要玩原神",
      introduction: "原神交友会已经报名准备参加",
    };
  },
};
</script>

<style scoped>
  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .items-center {
    align-items: center;
  }

  .items-start {
    align-items: flex-start;
  }

  .ml-13 {
    margin-left: 22.67rpx;
  }

  .mt-7 {
    margin-top: 12.21rpx;
  }

  .mt-41 {
    margin-top: 71.51rpx;
  }

  .section_3 {
      margin: 0 10.47rpx;
      padding: 34.88rpx 43.6rpx 104.65rpx;
      background-image: linear-gradient(180deg, #befee6 0%, #d0f7fb 100%);
      border-radius: 55.81rpx;
      filter: drop-shadow(0rpx 6.98rpx 10.47rpx #00000026);
}

  .image_7 {
    border-radius: 83.72rpx;
    width: 83.72rpx;
    height: 83.72rpx;
  }

  .font {
    font-size: 27.91rpx;
    font-family: Inter;
    line-height: 41.86rpx;
    color: #000000;
  }

  .text_2 {
    font-weight: 600;
    line-height: 21.59rpx;
  }

  .text_3 {
    color: #536471;
    line-height: 25.85rpx;
  }

  .group_2 {
    padding: 0 13.95rpx;
  }
.mt-10 {
    margin-top: 30rpx; /* 调整间隔的大小，根据需要调整 */
  }

  .mt-74 {
    margin-top: 74rpx;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .justify-start {
    justify-content: flex-start;
  }

  .items-center {
    align-items: center;
  }

  .button {
    margin: 0 34.88rpx;
  }

  .text-wrapper {
    padding: 20.93rpx 0 17.44rpx;
    background-color: #f7e0eb;
    border-radius: 55.81rpx;
    filter: drop-shadow(0rpx 6.98rpx 10.47rpx #00000026);
    overflow: hidden;
  }

  .text_4 {
    color: #000000;
    font-size: 45.35rpx;
    font-family: Oswald;
    font-weight: 700;
    line-height: 42.77rpx;
  }
  
  /* Add any other styles based on your design */
</style>
