<template>
	<!-- Navigation options -->
	<view class="navigation-options">
		<navigator :style="{ color: currentTab === 0 ? '#ff0000' : '#333333' }" @click="changeTab(1)">
			<text class="nav-option">Moment</text>
		</navigator>
	</view>

	<!-- Swiper for left-right swiping -->
	<!-- Activity List -->
	<!-- 边缘空白 -->
	<view class="my">
		<view  v-if="List.length > 0" v-for="(item, index) in List" :key="index" >
			<new-card :detail="item">
			</new-card>
		</view>
		<view v-else>
			<text>No moment data available.</text>
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
				id:1039,
				startX: 0, // 触摸开始时的x坐标
				flag: 0,
				sCode:200,
				hammer:null,
			};
		},
		onLoad() {
			this.loadData();
			uni.$on('header-swipe', this.handleHeaderSwipe);
			uni.$on('body-swipe', this.handleBodySwipe);
			uni.$on('card-option-swipe', this.handleCardOptionSwipe);
		},
		methods: {
			async loadData() {
				try {
					// Assuming you have a common API endpoint for both Activity and Moment data
					const endpoint = "/moment/"+this.id;
					const {
						statusCode,
						data: res
					} = await uni.$http.get(endpoint);
					// console.log(res);
					// console.log(statusCode);
					this.sCode = statusCode;
					if (statusCode == "200") {
						console.log(this.currentTab);
						// Update the corresponding list based on the current tab
						this.List = res;
						this.flag=0;
						uni.$showMsg("Data loaded successfully");
					} else {
						console.log(this.flag);
						if(this.flag==1){
							this.id=this.id+1;
						}else if(this.flag==2){
							this.id=this.id-1;
						}
						this.flag=0;
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
			handleHeaderSwipe(direction) {
			    console.log(`Header swiped ${direction}`);
				if (direction=='right') {
					this.id = this.id-1;
					console.log(this.id);
				// console.log('向右滑动'); // 向右滑动事件
					} else if (direction=='left') {
					// console.log('向左滑动'); // 向左滑动事件
					this.id = this.id+1;
					console.log(this.id);
				 }
				 this.loadData();
			  },
			
			  handleBodySwipe(direction) {
			    console.log(`Body swiped ${direction}`);
				if (direction=='right') {
					this.id = this.id-1;
					console.log(this.id);
				// console.log('向右滑动'); // 向右滑动事件
					} else if (direction=='left') {
					// console.log('向左滑动'); // 向左滑动事件
					this.id = this.id+1;
					console.log(this.id);
				 }
				 this.loadData();
			  },
			
			  handleCardOptionSwipe(direction) {
			    console.log(`Card option swiped ${direction}`);
				if (direction=='right') {
					this.id = this.id-1;
					console.log(this.id);
				// console.log('向右滑动'); // 向右滑动事件
					} else if (direction=='left') {
					// console.log('向左滑动'); // 向左滑动事件
					this.id = this.id+1;
					console.log(this.id);
				 }
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
</style>