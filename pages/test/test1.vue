<template>
	<view class="tabBox">

		<div class="search-content">
			<div class="search-bar">
				<img class="search-bar-image" src="../../static/search.png" alt="搜索图标" />
				<input type="text" placeholder="请输入搜索内容" />
			</div>
			<button-s @click="search">搜索</button-s>
		</div>
		<div class="TAB">
			<div class="tag-bar">
				<scroll-view scroll-x="true">
					<uni-segmented-control v-model="currentTab" :values="tabs" @click-item="changeTab"
						:style="{ backgroundColor: '#55aaff', color: '#f9f9f9'}" :inactiveColor="'#55aaff'" />
				</scroll-view>
			</div>
			<img class="sort-bar-image" src="../../static/sort.png" @click="showModalOnInput" />
		</div>

		<!-- 模态框 -->
		<div class="modal" v-if="showModal">
			<!-- 模态框内容 -->
			<div class="modal-content">
				<button class="close-button" @click="hideModal">关闭</button>
			</div>
		</div>

	</view>
	<!-- Resource List -->
	<!-- 边缘空白 -->
	<view class="square">
		<view @click="gotoDetail(resource)">
			<resource-card> :detail="resource">
			</resource-card>
		</view>
		<view @click="gotoDetail(resource)">
			<resource-card> :detail="resource">
			</resource-card>
		</view>
		<view @click="gotoDetail(resource)">
			<resource-card> :detail="resource">
			</resource-card>
		</view>
	</view>

	

	<navigator @click="handleFabClick()">
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" />
	</navigator>


</template>

<script>
	import unisegmentedcontrol
	from '../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue';

	export default {
		components: {},
		data() {
			return {
				showModal: false, // 控制模态框显示与隐藏
				type1: false,
				type2: false,
				type3: false,
				type4: false,
				typeispersonal: false,
				typeisofficial: false,
				official: 1,
				currentTab: 0,
				tabs: ['全部', '考研', '考公', '兼职', '求职', '面试', '资料'],
				List: [],
				data: {
					resource: {
						content: "",
						createTime: "",
						downloadTimes: 0,
						id: 0,
						tag: "",
						title: "",
						userId: 0
					},
					resourceRelationship: {
						college: {
							content: "",
							id: 0,
							name: ""
						},
						course: {
							content: "",
							id: 0,
							name: "",
							teacherId: 0
						},
						grade: {
							id: 0,
							name: "",
							gradename: "",
						},
						major: {
							id: 0,
							name: "",
							content: "",
						},
						school: {
							id: 0,
							name: "",
							content: "",
						},
					},
					user: {
						id: 0,
						name: "",
						introduction: "",
						avatar: "",
					},
				},
				pageQuery: {

					pageNo: 1,
					pageSize: 10,
					isAsc: '',
					sortBy: '',
				},
				pattern: {
					color: '#00557f',
					backgroundColor: '#FFFFFF',
					buttonColor: '#00557f',
				},
				code: '',
				pages: '',
				total: '',
				isloading: false,
			};

		},
		onLoad() {
			this.pageQuery.isAsc = ''; // 保留你的其他设置
			this.pageQuery.sortBy = '';
			uni.$on('header-click', this.handleHeaderClick);
			uni.$on('body-click', this.handleBodyClick);
			uni.$on('card-swipe', this.handleCardSwipe);

			this.loadData();
		},


		methods: {
			async loadData() {
				try {
					const endpoint = "/resource/1";
					this.isloading = true;

					const {
						statusCode,
						data: res,

					} = await uni.$http.get(endpoint);
					console.log(res);

					if (statusCode == "200") {
						// Assuming the response contains the resource details
						this.resource = res.data.resource;
						this.resourceRelationship = res.data.resourceRelationship;
						this.user = res.data.user;
						this.List = res.data;
						console.log(this.resource);
						console.log(this.user);
						console.log(this.List);
						uni.$showMsg("数据加载成功");
					} else {
						console.error("数据加载失败. 错误代码:", statusCode);
					}
				} catch (error) {
					console.error("获取数据失败:", error);
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

			changeTab(e) {
				console.log('Current tab value:', this.currentTab);
				//this.currentTab = tabIndex;
				if (this.currentTab != e.currentIndex) {
					this.pageQuery.pageNo = 1;
					this.total = 0;
					this.List = [];
					this.currentTab = e.currentIndex;
					this.loadData();
				}
			},
			handleHeaderClick(id) {
				let url;
				url = '/subpkg/UserHome/UserHome?id=' + id;
				console.log(url);
				uni.navigateTo({
					url: url
				});
			},
			handleBodyClick(id) {
				let url;
				if (this.currentTab === 1) {
					url = '/subpkg/ActivityDetail/ActivityDetail?id=' + id;
				} else if (this.currentTab === 0) {
					url = '/subpkg/MomentDetail/MomentDetail?id=' + id;
				}
				console.log(url);
				uni.navigateTo({
					url: url
				});
			},
			handleCardSwipe(direction) {
				//TODO:根据滑动方向切换tab
				// console.log('Card swiped',direction);
				// if(direction === 'left'){
				//   this.pageQuery.pageNo = 1;
				//   this.total = 0;
				//   this.CardsList = [];
				//   this.currentTab = 1;
				//   this.loadData();
				// }else if(direction === 'right'){
				//   if(this.currentTab === 1){
				//     this.pageQuery.pageNo = 1;
				//     this.total = 0;
				//     this.CardsList = [];
				//     this.currentTab = 0;
				//     this.loadData();
				//   }
				// }
				// Handle card swipe if needed
			},
			swiperChange(e) {
				this.currentTab = e.detail.current;
				this.loadData();
			},
			// 点击搜索按钮的事件
			search() {
				// 在这里添加搜索的逻辑
				console.log('搜索功能尚未实现');
			},
			// 输入框获取焦点时显示模态框
			showModalOnInput() {
				this.showModal = true;
			},
			// 关闭模态框
			hideModal() {
				this.showModal = false;
			},
		},
		onReachBottom() {
			console.log('buttom');
			if (this.isloading) return
			if (this.pageQuery.pageNo < this.pages) {
				this.pageQuery.pageNo++;
				this.loadData();
			} else return uni.$showMsg('数据加载完毕!')

		},
		onPullDownRefresh() {
			// 1. 重置关键数据
			this.pageQuery.pageNo = 1
			this.total = 0
			this.isloading = false
			this.List = []
			// 2. 重新发起请求
			this.loadData(() => uni.stopPullDownRefresh())
		},
	};
</script>

<style scoped>
	.square {
		overflow-y: scroll;
		padding-left: 60.12rpx;
		padding-right: 60.12rpx;
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

	.button-s {
		display: inline-block;
		padding: 10rpx 40rpx;
		width: 100;
		border-radius: 30rpx;
		background-color: #4891da;
		color: #fff;
		font-size: 30rpx;
		font-family: "楷体";
		font-weight: bold;
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

	.tabBox {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.button.active {
		background-color: #00aaff;
	}

	.search-bar {
		margin-top: 2px;
		margin-left: 8px;
		margin-right: 8px;
		margin-bottom: 3px;
		display: flex;
		align-items: center;
		/* 垂直居中 */
		background-color: #e0e0e0;
		/* 设置搜索栏的背景颜色 */
		padding: 0px;
		/* 添加一些内边距 */
		border-radius: 30px;
		/* 设置圆角 */
		width: 83%;
	}

	.search-bar input {
		flex: 1;
		/* 让输入框占据剩余空间 */
		padding: 8px;
		margin-right: 8px;
		border: none;
		/* 去掉输入框的边框 */
	}

	.search-bar button {
		padding: 2px 16px;
		/* 减少按钮的上下 padding，适应较小的高度 */
		cursor: pointer;
		border-radius: 30px;
		background-color: #fff;
		/* 设置背景颜色为白色 */
		color: #000;
		/* 设置文字颜色为黑色 */
		font-size: 14px;
		/* 调整按钮文字大小 */
	}

	.search-content {
		display: flex;
		align-items: center;
		/* 居中垂直对齐 */
		background-color: #f9f9f9;
	}

	.search-bar-image {
		width: 18px;
		height: 18px;
		margin-left: 8px;
	}

	.sort-bar-image {
		width: 25px;
		height: 25px;
		margin-right: 7px;
		margin-top: 7px;
	}

	.content {
		margin-top: 20px;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		/* 半透明黑色背景 */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background: #fff;
		padding: 20px;
		border-radius: 10px;
	}

	.min-people-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}

	.min-people-buttons {
		display: flex;
		gap: 0px;
		/* 设置按钮之间的间距 */
	}

	.TAB {
		display: flex;
		justify-content: space-between;
		background-color: #f9f9f9;
	}

	.tag-bar {
		width: 90%;
	}

	.change-button {
		width: 45px;
		/* 设置宽度为100px */
		height: 30px;
		/* 设置高度为40px */
		background-color: #3498db;
		/* 设置背景颜色 */
		color: #ffffff;
		/* 设置文字颜色 */
		border: none;
		/* 去掉边框 */
		border-radius: 5px;
		/* 设置圆角 */
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 8px;
	}

	.close-button {
		width: 100px;
		/* 设置宽度为100px */
		height: 40px;
		/* 设置高度为40px */
		margin-top: 10px;
	}

	.type-button {
		width: 60px;
		/* 设置宽度为100px */
		height: 30px;
		/* 设置高度为40px */
		background-color: #3498db;
		/* 设置背景颜色 */
		color: #ffffff;
		/* 设置文字颜色 */
		border: none;
		/* 去掉边框 */
		border-radius: 5px;
		/* 设置圆角 */
		margin-left: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 8px;
		/* 调整内边距 */
		font-size: 12px;
		/* 调整字号 */
	}

	.custom-style {
		width: 60px;
		/* 设置宽度为100px */
		height: 30px;
		/* 设置高度为40px */
		background-color: #ffffff;
		/* 设置背景颜色 */
		color: #000000;
		/* 设置文字颜色 */
		border: none;
		/* 去掉边框 */
		border-radius: 5px;
		/* 设置圆角 */
		margin-left: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 8px;
		/* 调整内边距 */
		font-size: 12px;
		/* 调整字号 */
	}
</style>