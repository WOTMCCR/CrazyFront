<template>
    <view class="new-card" :style="{ background: detail.color }"  @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
      <view class="header" @touchstart="onTouchStart" @touchmove="onTouchMove"
            @touchend="onTouchEnd('header')">
        <image class="avatar" v-if="detail && detail.user" :src="detail.user.avatar"/>
        <!--     detail && detail.user确保异步不报错          -->
        <view class="NameAndTime" v-if="detail && detail.user">
          <text class="name">{{ detail.user.name }}</text>
          <text class="time">时间:{{ formattedTime }}</text>
        </view>
      </view>

      <!-- Body Section -->
      <text class="text-body" @touchstart="onTouchStart" @touchmove="onTouchMove"
            @touchend="onTouchEnd('body')">{{ detail.content }}
      </text>

      <!-- Card Option Section -->
      <view class="card-option" @touchstart="onTouchStart" @touchmove="onTouchMove"
            @touchend="onTouchEnd('card-option')">
        <view class="flex-row">
          <image class="image_1" src="/static/Vector.svg"/>
          <text class="font">11</text>
        </view>
        <view class="flex-row">
          <image class="image_2" src="/static/share.svg"/>
          <text class="font">2</text>
        </view>
        <view class="flex-row">
          <image class="image_3" src="/static/fav.svg"/>
          <text class="font">239</text>
        </view>
      </view>
      </view>
</template>

<script>
import {cname} from "better-mock/src/random/name";

export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    },
    color: {
      type: String,
      default: 'linear-gradient(180deg, #befee6 0%, #d0f7fb 100%)'
    }
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
    };
  },
  onLoad() {
    console.log(this.color);
  },
  methods: {
    onTouchEnd(section) {
      const deltaX = this.moveX - this.startX;
      const deltaY = this.moveY - this.startY;
      // Calculate the time difference
      const timeDiff = new Date().getTime() - this.touchStartTime;
      // console.log("timeDiff: " + timeDiff);
      // Determine the direction of touch move (left or right)
      const direction = Math.abs(deltaX) > Math.abs(deltaY) ? (deltaX > 0 ? 'right' : 'left') : '';
      // Check if it's a click (based on time difference)
      if (timeDiff < 100) {
        this.handleSectionClick(section);
      } else {
        // It's a swipe event
        this.handleSectionSwipe(section, direction);
      }
    },
    onTouchStart(e) {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.touchStartTime = new Date().getTime();
    },
    onTouchMove(e) {
      this.moveX = e.touches[0].clientX;
      this.moveY = e.touches[0].clientY;
    },
    handleSectionClick(section) {
      switch (section) {
        case 'header':
          // console.log("header click");
          uni.$emit('header-click', this.detail.user.id);
          break;
        case 'body':
          // console.log("body click");
          uni.$emit('body-click', this.detail.id);
          break;
        case 'card-option':
          // console.log("card-option click");
          uni.$emit('card-option-click', this.detail.id);
          break;
        default:
          break;
      }
    },
    handleSectionSwipe(section, direction) {
      uni.$emit('card-swipe', direction);
      // Emit the swipe event for the specific section
      switch (section) {
        case 'header':
          // console.log("header swipe " + direction);
          uni.$emit('header-swipe', direction);
          break;
        case 'body':
          // console.log("body swipe " + direction);
          uni.$emit('body-swipe', direction);
          break;
        case 'card-option':
          // console.log("card-option swipe " + direction);
          uni.$emit('card-option-swipe', direction);
          break;
        default:
          break;
      }
    }
  },
  computed: {
    // 将从后端获取的时间字符串格式化 detail.createTime
    formattedTime() {
      const date = new Date(this.detail.createTime);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");
      const second = date.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
  },
};
</script>

<style lang="scss">
.new-card {
  min-height: 375rpx; // Set your desired minimum height here
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50rpx;
  padding: 47.09rpx 55.81rpx 47.09rpx;
  border-radius: 55.81rpx;
  filter: drop-shadow(0rpx 6.98rpx 10.47rpx #00000026);

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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center; // Vertically center the text
    align-items: center; // Horizontally center the text
    font-size: 27.91rpx;
    font-family: Inter;
    line-height: 41.86rpx;
    color: #000000;
    word-break: break-all;
    text-align: center;
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

  