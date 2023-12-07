  <template>
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
  		methods: {
  			async loadData() {
  				try {
  					// Assuming you have a common API endpoint for both Activity and Moment data
  					const endpoint = this.currentTab === 0 ? "/activity/isOfficial/0" :
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
  			gotoDetail(item) {
  				let url;
  				if (this.currentTab === 0) {
  					url = '/subpkg/ActivityDetail/ActivityDetail?id=' + item.id;
  				} else if (this.currentTab === 1) {
  					url = '/subpkg/MomentDetail/MomentDetail?id=' + item.id;
  				}
  				uni.navigateTo({
  					url: url
  				});

  			}
  			// ,
  			// clickCard(){
  			// 	console.log('***'),
  			// 	//跳转到详情页面，并传递卡片的唯一标识
  			// 	wx.navigateTo({	
  			// 		// url:'/pages/Square/Detail',
  			// 		url: '../subpkg/MomentDetail/MomentDetail?cardId=1',
  			// 	})
  			// 	// Handle card click if needed
  			// }
  			,
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
  </style>