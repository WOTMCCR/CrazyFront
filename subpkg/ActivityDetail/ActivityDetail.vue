<template>
  <view class="flex-col activity-section">
      <view class="flex-row items-center">
        <image
          class="user-avatar"
          :src="user.avatar"
        />
        <view class="flex-col items-start user-info">
          <text class="user-name">{{ user.name }}</text>
          <text class="timestamp">{{ timestamp }}</text>
        </view>
      </view>
      <view class="flex-col items-start activity-details mt-41">
        <text class="activity-title">标题：{{ title }}</text>
        <text class="activity-address">活动地址：{{ address }}</text>
        <text class="activity-time">时间：{{ time }}</text>
        <text class="activity-organizer">负责人：{{ organizer }}</text>
        <text class="activity-requirements">要求：{{ requirements }}</text>
        <text class="activity-introduction">介绍：{{ introduction }}</text>
      </view>
  
      <view class="flex-col justify-start items-center text-wrapper">
        <text class="timeline-text">时间线</text>
      </view>
  	
  	<!-- 第一次使用arrangement.vue -->
  	<arrangement
  	  :time="time1"
  	  :address="address1"
  	  :content="content1"
  	></arrangement>
  	
  	<!-- 第二次使用arrangement.vue -->
  	<arrangement
  	  :time="time2"
  	  :address="address2"
  	  :content="content2"
  	></arrangement>
  
      <!-- 第三次使用arrangement.vue -->
      <arrangement
        :time="time3"
        :address="address3"
        :content="content3"
      ></arrangement>
    </view>
</template>

<script>
import Arrangement from '@/uni_modules/arrangement/arrangement.vue';

export default {
  components: {
    Arrangement
  },
  data() {
    return {
      user: {
        name: "",
        id: "",
        avatar: ""
      },
      timestamp: "",
      title: "",
      address: "",
      time: "",
      organizer: "",
      requirements: "",
      introduction: "",
      time1: "12:00 PM",
      address1: "Location 1",
      content1: "Meeting 1 details",
      time2: "2:30 PM",
      address2: "Location 2",
      content2: "Meeting 2 details",
      time3: "4:00 PM",
      address3: "Location 3",
      content3: "Meeting 3 details",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Your existing fetch data logic...
    },
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

  .user-avatar {
    border-radius: 83.72rpx;
    width: 83.72rpx;
    height: 83.72rpx;
  }

  .user-info {
    margin-left: 22.67rpx;
  }

  .timestamp {
    color: #536471;
    line-height: 25.85rpx;
  }

  .activity-section {
    margin: 20rpx 10.47rpx 0;
    padding: 34.88rpx 43.6rpx 104.65rpx;
    background-image: linear-gradient(180deg, #befee6 0%, #d0f7fb 100%);
    border-radius: 55.81rpx;
    filter: drop-shadow(0rpx 6.98rpx 10.47rpx #00000026);
  }

  .activity-details {
    padding: 0 13.95rpx;
    margin-top: 71.51rpx;
  }

  .text-wrapper {
    padding: 20.93rpx 0 17.44rpx;
    background-color: #f7e0eb;
    border-radius: 55.81rpx;
    filter: drop-shadow(0rpx 6.98rpx 10.47rpx #00000026);
    overflow: hidden;
    margin-top: 20rpx;
  }

  .timeline-text {
    color: #000000;
    font-size: 45.35rpx;
    font-family: Oswald;
    font-weight: 700;
    line-height: 42.77rpx;
  }
</style>