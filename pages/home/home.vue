<template>
	<view style="position: relative;">

		<!-- Second Element -->
		<div style="position: relative; top: 5px; left: 10px; width: calc(100% - 20px); height: 205px;">
			<div
				style="box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 6px 0px; border-radius: 9px; overflow: hidden; width: 100%; height: 100%;">
				<div style="display: flex; background: rgb(51, 127, 255);">
					<div class="rich-text"
						style="width: 378px; height: 205px; justify-content: center; align-items: center; text-align: center; color: rgb(16, 16, 16); line-height: 20px; display: flex;">
						<p>在编辑界面可以进行观点卡片的自定义</p>
					</div>
				</div>
			</div>
		</div>
		<navigator @click="handleFabClick()">
			<uni-fab :pattern="pattern" horizontal="right" vertical="bottom"  />
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
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
			};
		},
		onLoad(options) {
        this.pageQuery.pageNo = options.pageNo || 1;
        this.pageQuery.pageSize = options.pageSize || 10;
        this.pageQuery.isAsc = options.isAsc || '';
        this.pageQuery.sortBy = options.sortBy || '';
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
		          console.log(this.pageQuery);
							const {
								statusCode,
								data: res
							} = await uni.$http.post(
                  endpoint,
                  this.pageQuery
              );
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
					        url: '/pages/subpkg/MomentDetail/MomentDetail.vue'
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

<style lang="scss">


</style>