<template>
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
.ml-7 {
  margin-left: 12.21rpx;
}
.mt-9 {
  margin-top: 15.7rpx;
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

.list-item:first-child {
  margin-top: 0;
}

.font {
  font-size: 27.91rpx;
  font-family: Inter;
  line-height: 41.86rpx;
  color: #000000;
}

.font_2 {
  font-size: 22.67rpx;
  font-family: Inter;
  line-height: 16.71rpx;
  color: #536471;
}

.text_3 {
  color: #a9a9a9;
  font-size: 24.42rpx;
  line-height: 22.73rpx;
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


.pos_4 {
  position: absolute;
  right: 117.42rpx;
  top: 50%;
  transform: translateY(-50%);
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