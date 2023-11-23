<template>
	<view>
		<!-- Navigation options -->
		<view class="navigation-options">
			<navigator :style="{ color: currentTab === 0 ? '#ff0000' : '#333333' }" @click="changeTab(0)">
				<text class="nav-option">Activity</text>
			</navigator>
			<navigator :style="{ color: currentTab === 1 ? '#ff0000' : '#333333' }" @click="changeTab(1)">
				<text class="nav-option">Moment</text>
			</navigator>
		</view>

		<view class="group">
			<image class="image_7" src="../static/back.png" />
				<view class="header">
					<image class="avatar" src="../static/head_sculpture.png" />
					<view class="NameAndDescription">
						<text class="name">用户昵称</text>
						<text class="description">我是第一个用户</text>
					</view>
				</view>			
		</view>

		<!-- Swiper for left-right swiping -->

		<!-- Activity List -->
		<view class="my">
			<view v-if="List.length > 0" v-for="(item, index) in List" :key="index" @click="gotoDetail(item)">
				<new-card :detail="item">
				</new-card>
			</view>
			<view v-else>
				<text>No activity data available.</text>
			</view>
		</view>
	</view>
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
				//"/activity/findByUser/{userId}" :
				const endpoint = this.currentTab === 0 ? "/activity/findByUserId/1" :
					"/moment/findByUserId/1";
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
		gotoDetail(item) {
			uni.navigateTo({
				url: '/subpkg/testdetail/testdetail?id=' + item.id
			});

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

<style scoped lang="scss">
.my {
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

.group {
	
.image_7 {
	width: 100vw;
	height: 60vw;
}

.header {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;

	padding: 0 48.84rpx 22.67rpx;
	background-color: #ffffff;
	border-radius: 55.81rpx;
	box-shadow: 0rpx 6.98rpx 6.98rpx #00000040;
	height: 160rpx;

	margin: -66.28rpx 0 -13.95rpx;
	.avatar {
		margin-top: -30.56rpx;
		border-radius: 83.72rpx;
		width: 174.42rpx;
		height: 174.42rpx;
	}

	.NameAndDescription {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		margin-top: 20rpx;

		.name {
			font-size: 27.91rpx;
			//字体
			font-family: open;
			line-height: 21.59rpx;
			font-weight: 600;
			color: #000000;
			margin-bottom: 15rpx;
		}

		.description {
			font-size: 27.91rpx;
			font-family: Inter;
			line-height: 25.85rpx;
			color: #536471;
		}

	}
}
}






</style>