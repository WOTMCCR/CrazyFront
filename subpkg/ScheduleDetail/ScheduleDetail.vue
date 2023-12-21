<template>
  <view class="flex-col section_3" :style="{ background: formData.color }">
    <view>
      <span class="self-start font title">安排内容</span>
      <view class = "content"> {{formData.content}}</view>
      <span class="self-start font title">时间</span>
      <view class = "content"> {{formData.time}}</view>
      <span class="self-start font title">地点</span>
      <view class="content"> {{formData.address}}</view>

    </view>
    <view class="ArrangementList" v-for="(item, index) in formData.arrangement" :key="index">
      <my-arrangement  :address="item.address" :content="item.content" :title="item.title"
                       :color="item.color"></my-arrangement>
    </view>

    <div class="flex-col items-center button submit-wrapper"   @click="submit">
      <span class="text_9">返回</span>
    </div>
  </view>
</template>
<script>
import uniEasyinput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue';
import Arrangement from '@/uni_modules/Schedule/Schedule.vue';
export default {
  components: {
    uniEasyinput,
  },
  data() {
    return {
      // 表单数据对象

      gradientColors: [
        '#ffffff',
        '#F7E0EB',
        'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(180deg, #befee6 0%, #d0f7fb 100%)',
        'linear-gradient(180deg, #F7E0EB 0%, #FED5AD 100%)',
        'linear-gradient(180deg, #FED5AD 0%, #A1E8FF 100%)',
      ],
      formData: {
        time: "",
        address:"",
        content: "",
        color: "",
        contact: "",
        arrangement: [
        ]
      },
    };

  },
  onLoad(options) {
    const ScheduleList = uni.getStorageSync('ScheduleList');
    if (ScheduleList) {
      this.formData = ScheduleList[options.index];
    }
    uni.removeStorageSync('ScheduleList')
  },
  methods: {
    submit() {
      this.handleBack();
    },
    // 返回上一页
    handleBack() {
      console.log("handleBack function called"); // 打印函数调用信息
      uni.navigateBack({
        delta: 1, // 返回的页面数，1 表示返回上一级页面
      });
    },
    changeColor(color) {
      this.formData.color = color;
    },
  },
};
</script>

<style scoped lang="scss">

.content{
  font-size: 25rpx;
  font-family: Inter;
  display: block;
  font-weight: bold;
  color: #333;
  padding: 5px;
}

.items-center {
  align-items: center;
}

.ColorList {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-self: stretch;

}

.ColorItem {
  width: 35.13rpx;
  height: 35.13rpx;
  border-radius: 175.64rpx;
  margin-right: 3.75px;
  box-shadow: 0rpx 5.27rpx 5.27rpx #00000040;
}

.timeline-text {
  color: #00aa7f;
  font-size: 35rpx;
  font-family: Oswald;
  font-weight: 700;
  line-height: 51rpx;
}

.title {
  display:block;
  font-family: "微软雅黑";
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 5px;
  margin: 5px;
  margin-bottom: 5px;
}

.text-wrapper {
  padding: 5rpx 0 0rpx;
  background-color:#f6e0eb;
  width: 90%;
  border-radius: 4px 4px 35.81rpx 35.81rpx;
  filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
  overflow: hidden;
  margin: 35rpx auto;
  box-shadow: 1px 1px 1px 1px grey; /* 添加了右下方的阴影 */
}

.submit-wrapper {
  padding: 33rpx 0;
  background-color: #3F51B5; /* 蓝色背景 */
  border-radius: 7.03rpx;
  filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
  overflow: hidden;
  width: 168.62rpx;
}

.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 添加这个属性，让子元素在主轴上靠近末尾 */
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end; /* 将内容放在主轴的末尾（右侧） */
  align-self: flex-end; /* 使其自身在交叉轴上靠近末尾 */
  margin-top: 24.59rpx; /* 修改 margin-top 的值 */
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.self-stretch {
  align-self: stretch;
}

.ml-5 {
  margin-left: 8.78rpx;
}

.section_3 {
  margin-top:10px;
  margin-left: 36.89rpx;
  margin-right: 42.15rpx;
  padding: 59.18rpx 28.1rpx;
  background-image: linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%);
  border-radius: 56.21rpx;
  filter: drop-shadow(0rpx 7.03rpx 10.54rpx #00000026);
  overflow: hidden;
}

.section_4,
.section_5,
.section_6,
.section_7,
.section_8,
.section_9 {
  width: 35.13rpx;
  height: 35.13rpx;
  border-radius: 175.64rpx;
  box-shadow: 0rpx 5.27rpx 5.27rpx #00000040;
}

.section_4 {
  background-image: linear-gradient(180deg, #BEFEE6 0%, #A1E8FF 100%);
}

.section_5 {
  background-image: linear-gradient(180deg, #3897F0 0%, #A1E8FF 100%);
}

.section_6 {
  background-image: linear-gradient(180deg, #3897F0 0%, #7B61FF 100%);
}

.section_7 {
  background-image: linear-gradient(180deg, #FFC0CB 0%, #FFB6C1 100%); /* 粉红色系 */
}

.section_8 {
  background-image: linear-gradient(180deg, #FFD700 0%, #FFA500 100%); /* 黄色/橙色系 */
}

.section_9 {
  background-image: linear-gradient(180deg, #fd5ba7 0%,  #e85a6d 100%); /* 绿色系 */
}

.font {
  font-size: 28.1rpx;
  font-family: Inter;
  line-height: 26.17rpx;
  color: #0f0f0f;
}

.text_2,
.text_4,
.text_6,
.text_8 {
  margin-top: 28.1rpx;
  line-height: 25.82rpx;
}

.section_10 {
  align-self: stretch;
  margin-top: 17.56rpx;
}

.font_2,
.text_3,
.text_5,
.text_7 {
  line-height: 22.61rpx;
}

.group_2 {
  margin-top: 17.56rpx;
}

.text_9 {
  color: #ffffff;
  font-size: 28.1rpx;
  font-family: Lato;
  font-weight: 700;
  line-height: 26.56rpx;
}

</style>
