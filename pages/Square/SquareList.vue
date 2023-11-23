<template>
	<view>
		<!-- Navigation options -->
		<view class="navigation-options">
			<navigator :style="{ color: currentTab === 0 ? '#ff0000' : '#333333' }" @click="changeTab(0)">
				<button class="button" >个人</button>
			</navigator>
			<navigator :style="{ color: currentTab === 1 ? '#ff0000' : '#333333' }" @click="changeTab(1)">
				<button class="button" >组织</button>
			</navigator>
		</view>

	<!-- Swiper for left-right swiping -->
	<!-- Activity List -->
	<!-- 边缘空白 -->
	<view class=”square“>
		<view v-if="List.length > 0" v-for="(item, index) in List" :key="index" @click="gotoDetial(item)">
			<new-card :detail="item">
			</new-card>
		</view>
		<view v-else>
			<text>No activity data available.</text>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				official: 1,
				currentTab: 0,
				List: [],

			};
		},
		onLoad() {
			this.loadData();
		},
		onCardClick: function () {
		    console.log('卡片被点击了');
		    // 在这里可以添加处理点击事件的逻辑
		  },
		personalButtonClick: function () {
		    // 调用个人按钮相关的后端方法
		    console.log('个人按钮被点击了');
		    // 在这里可以添加具体的后端方法调用逻辑
		  },
		
		  // 点击“组织”按钮时触发的方法
		organizationButtonClick: function () {
		    // 调用组织按钮相关的后端方法
		    console.log('组织按钮被点击了');
		    // 在这里可以添加具体的后端方法调用逻辑
		  },
		methods: {
			async loadData() {
				try {
					// Assuming you have a common API endpoint for both Activity and Moment data
					const endpoint = this.currentTab === 0 ? "/moment/brief/{0}" :
						"/moment/brief/{1}";
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

	.nav-option {
		font-size: 16px;
		color: #333333;
		text-decoration: underline;
	}
	
	.button {
	  display: inline-block;
	  padding: 10rpx 40rpx;
	  width: 200rpx;
	  border-radius: 20rpx;
	  background-color: #007aff;
	  color: #fff;
	  font-size: 40rpx;
	  font-family: "楷体";
	  font-weight: bold;
	}
	
	.button.active {
	  background-color: #0059c6;
	}

</style>