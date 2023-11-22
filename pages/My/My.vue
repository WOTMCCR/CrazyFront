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

	.nav-option {
		font-size: 16px;
		color: #333333;
		text-decoration: underline;
	}
</style>