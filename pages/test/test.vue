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
  </view>
</template>

<script>
export default {
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
      introduction: ""
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Host", "127.0.0.1:4523");
      myHeaders.append("Connection", "keep-alive");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:4523/m1/3664198-0-default/activity/getnew/1", requestOptions)
        .then(response => response.json())
        .then(data => {
          this.user = data.user;
          this.timestamp = data.activityTime;
          this.title = data.name;
          this.address = data.schedule[0].address;
          this.time = data.schedule[0].time;
          this.organizer = data.official;
          this.requirements = data.participantMax;
          this.introduction = data.content;

          // 添加成功获取数据的提示
          uni.$showMsg("数据请求成功");
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          // 添加失败获取数据的提示
          uni.$showMsg("数据请求失败，请稍后重试");
        });
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
    margin-top: 20rpx; /* 这里增加了间隔 */
  }

  .timeline-text {
    color: #000000;
    font-size: 45.35rpx;
    font-family: Oswald;
    font-weight: 700;
    line-height: 42.77rpx;
  }
</style>
