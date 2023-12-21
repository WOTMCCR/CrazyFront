<template>
  <view class="flex-col activity-section">
      <view class="flex-row items-center" @click = "gotoUser(formData.activity.user.id)">
        <image
          class="user-avatar"
          :src="formData.activity.user.avatar"
        />
        <view class="flex-col items-start user-info">
          <text class="user-name">{{ formData.activity.user.name }}</text>
          <text class="timestamp">{{ formData.activity.createTime }}</text>
        </view>
      </view>
      <view class="flex-col items-start activity-details mt-41">
        <text class="activity-title">标题：{{ formData.activity.name }}</text>
        <text class="activity-address">活动地址：{{ formData.activity.address }}</text>
        <text class="activity-time">时间：{{ formData.activity.activityTime }}</text>
        <text class="activity-organizer">负责人：{{ formData.activity.contact }}</text>
        <text class="activity-introduction">介绍：{{ formData.activity.content }}</text>
      </view>
  
      <view class="flex-col justify-start items-center text-wrapper">
        <text class="timeline-text">时间线</text>
      </view>
    <view class="ScheduleList" v-for="(item, index) in formData.schedule.schedule" :key="index" @click = "gotoSchedule(index)">
      <Schedule :time="formatTime(item.time)" :address="item.address" :content="item.content" :title="item.title"
                :color="item.color" ></Schedule>
    </view>
		<button class="attend" @click="attendActivity">参与活动</button>
    </view>
</template>

<script>
import Schedule from "@/uni_modules/Schedule/Schedule.vue";

export default {
  components: {
    Schedule
  },
  data() {
    return {
      formData: {
        activity: {
          // title: '主题',
          activityTime: '',
          address: '',
          color: 'linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%)',
          contact: '',
          content: '',
          createTime: "",
          name: '',
          official: false,
          participantMax: 0,
          participantNum: 0,
          restriction: false,
          type: 1,
          userId: 1,
          user: {
          },
        },
        schedule: {
          schedule: [

          ]
        },
      },
    };
  },
  onLoad(options) {
    const id = BigInt(options.id);
    this.loadData(id);
  },
  methods: {
    async loadData(id) {
      console.log(id);
      const endpoint = "/activity/" + id;
      const {
        data:res
      } = await uni.$http.get(endpoint);
      console.log(this.res);
	  
      this.formData.activity = res.data.activity;
      this.formData.schedule = res.data.schedule;
      console.log(this.formData);
      console.log(this.formData.activity)
      console.log(this.formData.schedule)
    },
    gotoSchedule(index) {
      uni.setStorageSync('ScheduleList', this.formData.schedule.schedule);
      uni.navigateTo({
        url: '/subpkg/ScheduleDetail/ScheduleDetail?index=' + index,
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const options = {
        hour: 'numeric',
        minute: 'numeric'
      };
      return date.toLocaleTimeString('en-US', options);
    },
    gotoUser(id) {
      let url;
      url = '/subpkg/UserHome/UserHome?id=' + id;
      console.log(url);
      uni.navigateTo({
        url: url
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
    margin-top: 20rpx;
  }

  .timeline-text {
    color: #000000;
    font-size: 45.35rpx;
    font-family: Oswald;
    font-weight: 700;
    line-height: 42.77rpx;
  }
  .attend{
	  margin-top: 8px;
	  width: 120px; /* 设置宽度为100px */
	  height: 50px; /* 设置高度为40px */
	  background-color: #0055ff; /* 设置背景颜色 */
	  color: #ffffff; /* 设置文字颜色 */
	  border: none; /* 去掉边框 */
	  border-radius: 5px; /* 设置圆角 */
	  margin-left: 8px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  padding: 0 8px; /* 调整内边距 */
	  font-size: 12px; /* 调整字号 */
  }
</style>