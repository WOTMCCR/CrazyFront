<template>
	<uni-segmented-control v-model="currentTab" :values="tabs" @click="changeTab(1)" />
	<!-- Swiper for left-right swiping -->
	<!-- Activity List -->
	<!-- 边缘空白 -->
	<view class="square">
		<view v-if="List.length > 0" v-for="(item, index) in List" :key="index" @click="gotoDetail(item)">
			<new-card :detail="item">
			</new-card>
		</view>
		<view v-else>
			<text>No activity data available.</text>
		</view>
	</view>
	<navigator @click="handleFabClick()">
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom"  />
	</navigator>
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
	  
</template>

<script>
	import unisegmentedcontrol from '../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue';
	export default {
		components:{},
		data() {
			return {
				official: 1,
				currentTab: 0,
				tabs: ['动态', '活动'],
				List: [],
				pattern: {
				        color: '#00557f',
				        backgroundColor: '#FFFFFF',
				        buttonColor: '#00557f',
				},
			};
		},
		onLoad() {
			this.loadData();
		},
		onCardClick: function() {
			console.log('卡片被点击了');
			// 在这里可以添加处理点击事件的逻辑
		},
		activityButtonClick: function() {
			// 调用活动按钮相关的后端方法
			console.log('按钮被点击了');
			// 在这里可以添加具体的后端方法调用逻辑
		},

		// 点击动态按钮时触发的方法
		momentButtonClick: function() {
			// 调用组织按钮相关的后端方法
			console.log('组织按钮被点击了');
			// 在这里可以添加具体的后端方法调用逻辑
		},
		methods: {
			async loadData() {
				try {
					// Assuming you have a common API endpoint for both Activity and Moment data
					const endpoint = this.currentTab === 0 ? "/activity/isOfficial/0":
						"/moment/isOfficial/0";

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
			handleFabClick() {
			    // 处理悬浮按钮点击事件
			    console.log('Floating Action Button clicked');

			    uni.navigateTo({
			        url: '/pages/Square/CreateA'
			    });
			},
			gotoDetail(item) {
				let url;
				if(this.currentTab===0){
					url='/subpkg/ActivityDetail/ActivityDetail?id='+item.id;	
				}else if (this.currentTab===1){
					url='/subpkg/MomentDetail/MomentDetail?id=' + item.id;
				}
				uni.navigateTo({
					url: url
				});
			
			},
			clickCard(){
				console.log('***');
				//跳转到详情页面，并传递卡片的唯一标识
				wx.navigateTo({	
					// url:'/pages/Square/Detail',
					url: '../subpkg/MomentDetail/MomentDetail?cardId=1',
				})
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

	.square {
		padding-left: 40.12rpx;
		padding-right: 40.12rpx;
	}
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
		background-color: #4891da;
		color: #fff;
		font-size: 40rpx;
		font-family: "楷体";
		font-weight: bold;
	}

	.button.active {
		background-color: #00aaff;
	}
</style>