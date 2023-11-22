<template>
<view class="flex-col page">
  <view class="flex-col flex-1 group">
    <image
      class="shrink-0 image_7"
      src="../static/my.png"
    />
    <view class="flex-col relative group_2">
      <view class="flex-row relative section_3">
        <image
          class="image_8"
          src="../static/pig.png"
        />
		<view class="flex-col items-start flex-1 self-center ml-7">
          <text class="text_2">用户昵称</text>
          <text class="font_2 text_3 mt-9">我是第一个用户</text>
        </view>
      </view>
 <view v-if="List.length > 0" v-for="(item, index) in List" :key="index">
 	<my-card :time="item.createTime" :introduction="item.content" :isShadow="true" @click="clickCard"
 		:color.sync="'rgb(51, 127, 255)'" :height.sync="item.height" :background.sync="'#cccccc'">
 	</my-card>
 </view>
 <view v-else>
 	<text>No activity data available.</text>
 </view>
 
    </view>
  </view>

<<<<<<< HEAD
</view>
=======
		<!-- Swiper for left-right swiping -->

		<!-- Activity List -->
		<view v-if="List.length > 0" v-for="(item, index) in List" :key="index">
			<my-card :introduction="item.content" :isShadow="true" @click="clickCard" :height.sync="item.height">
			</my-card>
		</view>
		<view v-else>
			<text>No activity data available.</text>
		</view>



	</view>
>>>>>>> origin/yzy
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				List: [],

			};
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData() {
				try {
					// Assuming you have a common API endpoint for both Activity and Moment data
					const endpoint = this.currentTab === 0 ? "/activity/findById?userId=1" :
						"/moment/findAllMomentAndUser";
					const {
						statusCode,
						data: res
					} = await uni.$http.get(endpoint);
					console.log(res);
					console.log(statusCode);
					if (statusCode == "200") {
						console.log(this.currentTab);
						// Update the corresponding list based on the current tab
						this.List = res;
						uni.$showMsg("Data loaded successfully");
					} else {
						console.error("Failed to load data. Server returned status code:", statusCode);
					}
				} catch (error) {
					console.error("Error fetching data:", error);
				} finally {
					uni.hideLoading();
				}
			},
			clickCard() {
				// Handle card click if needed
			},
			changeTab(tabIndex) {
				this.currentTab = tabIndex;
				this.loadData();
			},
			swiperChange(e) {
				this.currentTab = e.detail.current;
				this.loadData();
			},
		},
	};
</script>

<style scoped>
	.navigation-options {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
.ml-7 {
  margin-left: 12.21rpx;
}
.mt-9 {
  margin-top: 15.7rpx;
}
.ml-13 {
  margin-left: 22.67rpx;
}
.mt-7 {
  margin-top: 12.21rpx;
}
.page {
  background-color: #e9e9e9;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  overflow-y: auto;
}
.image_7 {
  width: 100vw;
  height: 69.7674vw;
}
.group_2 {
  margin: -66.28rpx 0 -13.95rpx;
}
.section_3 {
  padding: 0 48.84rpx 22.67rpx;
  background-color: #ffffff;
  border-radius: 55.81rpx;
  box-shadow: 0rpx 6.98rpx 6.98rpx #00000040;
  height: 139.53rpx;
}
.image_8 {
  margin-top: -57.56rpx;
  border-radius: 83.72rpx;
  width: 174.42rpx;
  height: 174.42rpx;
}
.text_2 {
  color: #000000;
  font-size: 34.88rpx;
  font-family: Inter;
  line-height: 32.48rpx;
}
.list {
  padding: 33.14rpx 34.88rpx 0 40.12rpx;
}
.section_4 {
  margin-right: 5.23rpx;
  padding: 48.84rpx 55.81rpx;
  background-image: linear-gradient(180deg, #befee6 0%, #d0f7fb 100%);
  border-radius: 55.81rpx;
  filter: drop-shadow(0rpx 6.98rpx 10.47rpx #00000026);
  overflow: hidden;
}
.list-item:first-child {
  margin-top: 0;
}
.image_9 {
  border-radius: 83.72rpx;
  width: 83.72rpx;
  height: 83.72rpx;
}
.font_3 {
  font-size: 27.91rpx;
  font-family: Inter;
  line-height: 21.59rpx;
  font-weight: 600;
  color: #000000;
}
.font_4 {
  font-size: 27.91rpx;
  font-family: Inter;
  line-height: 25.85rpx;
  color: #536471;
}
.font {
  font-size: 27.91rpx;
  font-family: Inter;
  line-height: 41.86rpx;
  color: #000000;
}
.text_4 {
  word-break: break-all;
}
.group_3 {
  padding: 0 3.49rpx;
}
.image_10 {
  width: 29.65rpx;
  height: 27.91rpx;
}
.image_11 {
  width: 34.88rpx;
  height: 34.88rpx;
}
.font_2 {
  font-size: 22.67rpx;
  font-family: Inter;
  line-height: 16.71rpx;
  color: #536471;
}
.text_5 {
  line-height: 16.5rpx;
}
.text_3 {
  color: #a9a9a9;
  font-size: 24.42rpx;
  line-height: 22.73rpx;
}
.group_4 {
  margin-right: 10.47rpx;
}
.image_12 {
  width: 29.65rpx;
  height: 26.16rpx;
}
.text_6 {
  line-height: 16.94rpx;
}
.tab-bar {
  padding: 20.93rpx 104.65rpx 10.47rpx;
  background-color: #ffffff;
}
.pos_3 {
  position: absolute;
  left: 103.83rpx;
  top: 50%;
  transform: translateY(-50%);
}
.image_13 {
  width: 54rpx;
  height: 54rpx;
}
.font_5 {
  font-size: 27.91rpx;
  font-family: Jost;
  line-height: 25.85rpx;
  color: #545454;
}
.text_7 {
  text-shadow: 0rpx 6.98rpx 6.98rpx #00000040;
}
.text_8 {
  font-size: 29.65rpx;
  line-height: 27.49rpx;
}
.text_9 {
  font-size: 29.65rpx;
  line-height: 27.45rpx;
}
.pos_4 {
  position: absolute;
  right: 117.42rpx;
  top: 50%;
  transform: translateY(-50%);
}
.text_10 {
  font-size: 29.65rpx;
  line-height: 27.52rpx;
}
	.nav-option {
		font-size: 16px;
		color: #333333;
		text-decoration: underline;
	}
</style>