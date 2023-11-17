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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
			};
		},
		onLoad() {
			//获取轮播图数据
			this.getSwiperList();
		},
		methods: {
			async getSwiperList() {
				const {
					statusCode,
					data: res
				} = await uni.$http.get("/posts?id=1");
				console.log(statusCode);
				if (statusCode !== "200") {
					console.log("成功");
				}
				if (res[0].meta.status !== "200")
					return uni.$showMsg();
				this.swiperList = res[0].message;
				console.log(res);
				uni.$showMsg("数据请求成功");
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss">


</style>