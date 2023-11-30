<template>
  <div class="flex-col section_3" :style="{ background: cardColor }">
    <div class="flex-row justify-center self-stretch">
        <div class="relative section_4" @click="changeColor('linear-gradient(180deg, #BEFEE6 0%, #A1E8FF 100%)')"></div>
        <div class="relative section_5 ml-5" @click="changeColor('linear-gradient(180deg, #A1E8FF 0%, #3897F0 100%)')"></div>
        <div class="relative section_6 ml-5" @click="changeColor('linear-gradient(180deg, #3897F0 0%, #7B61FF 100%)')"></div>
        <div class="relative section_7 ml-5" @click="changeColor('linear-gradient(180deg, #FFC0CB 0%, #FFB6C1 100%)')"></div>
        <div class="relative section_8 ml-5" @click="changeColor('linear-gradient(180deg, #FFD700 0%, #FFA500 100%)')"></div>
        <div class="section_9 ml-5" @click="changeColor('linear-gradient(180deg, #fd5ba7 0%,  #e85a6d 100%)')"></div>
    </div>
    <span class="self-start font text_2">标题</span>
    <div class="flex-row justify-between items-center section_10 input">
      <span class="font_2 text_3">标题</span>
    </div>
    <span class="self-start font text_4">地点</span>
    <div class="flex-row justify-between items-center section_10 input">
      <span class="font_2 text_5">地点</span>
    </div>
    <span class="self-start font text_6">联系方式</span>
    <div class="flex-row justify-between items-center section_10 input">
      <span class="font_2 text_7">负责人联系方式</span>
    </div>
    <span class="self-start font text_8">介绍</span>
    <div class="flex-col self-stretch group_2">
      <div class="flex-row justify-between items-center self-stretch input">
        <span class="font_2">活动内容、主题等</span>
      </div>
      <div class="mt-24 flex-col justify-center items-center button text-wrapper" >
        <span class="text_9">创建</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardColor: 'linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%)',
    };
  },
  methods: {
    changeColor(color) {
      this.cardColor = color;
    },
  },
};
</script>

<style scoped lang="scss">
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-center {
  justify-content: flex-end;
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

.input {
  padding: 24.59rpx 14.05rpx;
  background-color: #fdeff9;
  border-radius: 14.05rpx;
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

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 24.59rpx;
}

.text-wrapper {
  padding: 28.1rpx 0;
  background-color: #ffffff;
  border-radius: 7.03rpx;
  filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
  overflow: hidden;
  width: 168.62rpx;
}

.text_9 {
  color: #545454;
  font-size: 28.1rpx;
  font-family: Lato;
  font-weight: 700;
  line-height: 26.56rpx;
}

</style>
