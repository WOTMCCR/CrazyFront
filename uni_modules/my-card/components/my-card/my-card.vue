<template>
  <view class="my-card" @tap="onCardClick">
    <!-- avtuar 姓名与时间 -->
    <view class="header">
      <image class="avatar" src="/static/humanhead.png" />
      <view class="NameAndTime">
        <text class="name">{{ detail.user.name }}</text>
        <text class="time">时间:{{ formattedTime }}</text>
      </view>
    </view>
	<!-- 文章内容主体 -->
	<view class="body">
	      <text>{{ detail.content }}</text>
	</view>
    <text class="text-body">{{ detail.content }}</text>
    <!-- 评论转发点赞部分 -->
    <view class="card-option">
      <view class="flex-row" @tap="commentClick">
        <image class="image_1" src="/static/Vector.svg" />
        <text class="font">{{ comment }}</text>
      </view>
      <view class="flex-row" @tap="forwardClick">
        <image class="image_2" src="/static/share.svg" />
        <text class="font">{{ forward }}</text>
      </view>
      <view class="flex-row" @tap="likeClick">
        <image class="image_3" src="/static/fav.svg" />
        <text class="font">{{ like }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	
  data() {
    return {
      comment: "111",
      forward: "222",
      like: "333",
    };
  },
  methods: {
    onCardClick: function () {
      // 触发自定义事件，传递点击事件到父组件
      this.$emit("cardclick");
    },
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // 将从后端获取的时间字符串格式化 detail.createTime
    formattedTime() {
      const date = new Date(this.detail.createTime);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },

};
</script>

<style scoped lang="scss">
.my-card {
  margin-top: 30rpx;
  padding: 47.09rpx 55.81rpx 47.09rpx;
  background-image: linear-gradient(180deg, #befee6 0%, #d0f7fb 100%);
  border-radius: 55.81rpx;
  filter: drop-shadow(0px 6.98px 10.47rpx #00000026);
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .avatar {
      border-radius: 83.72rpx;
      width: 83.72rpx;
      height: 83.72rpx;
    }

    .NameAndTime {
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;
      margin-top: 10rpx;

      .name {
        font-size: 27.91rpx;
        font-family: open;
        line-height: 21.59rpx;
        font-weight: 600;
        color: #000000;
        margin-bottom: 15rpx;
      }

      .time {
        font-size: 27.91rpx;
        font-family: Inter;
        line-height: 25.85rpx;
        color: #536471;
      }
    }
  }

  .text-body {
    font-size: 27.91rpx;
    font-family: Inter;
    line-height: 41.86rpx;
    color: #000000;
    word-break: break-all;
  }
    .body {
      margin-top: 20px;
      font-size: 24px;
      line-height: 1.5;
      color: #333; // 自定义文章主体的文字颜色
    }

  .card-option {
    margin-top: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.55rpx;

    .flex-row {
      display: flex;
      align-items: center;

      .image_1,
      .image_2,
      .image_3 {
        width: 30rpx;
        height: 30rpx;
        vertical-align: middle;
      }

      .font {
        margin-left: 10rpx;
        font-size: 23rpx;
        font-family: Inter;
        color: #536471;
      }
    }
  }
}
</style>