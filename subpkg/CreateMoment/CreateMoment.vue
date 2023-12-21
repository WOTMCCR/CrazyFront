<template>
	<view class="CreateMoment" :style="{ background: formData.color }">

		<view class="InputBox">
			<uni-easyinput v-model="formData.content" type="textarea" :auto-height="true" :inputBorder="false"
				:styles="InputStyles" :maxlength='-1'></uni-easyinput>
		</view>

		<view class="ColorList">
			<view class="ColorItem" v-for="(item, index) in gradientColors" :key="index" :style="{ background : item }"
				@click="changeColor(item)"></view>
		</view>

		<view class="button" @click="submit">
			<view class="word">
				发布
			</view>
		</view>
	</view>

</template>
<script>
	import uniEasyinput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue';
	import Arrangement from '@/uni_modules/Schedule/Schedule.vue';
	import image from "uview-ui/libs/config/props/image";
	export default {
		computed: {
			image() {
				return image
			}
		},
		components: {
			uniEasyinput,
			Arrangement,
		},
		data() {
			return {
				InputStyles: {
					color: 'black',
					background: 'rgba(0,0,0,0)',
				},
				formData: {
					userId: 1,
					official: false,
					createTime: '',
					color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
					content: '',
				},
				gradientColors: [
					'#ffffff',
					'#F7E0EB',
					'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
					'linear-gradient(180deg, #befee6 0%, #d0f7fb 100%)',
					'linear-gradient(180deg, #F7E0EB 0%, #FED5AD 100%)',
					'linear-gradient(180deg, #FED5AD 0%, #A1E8FF 100%)',
				],

			};

		},
		methods: {
			submit() {
				if (this.formData.content === null || this.formData.content === '') {
					uni.showToast({
						title: '内容不能为空',
						icon: 'none',
					});
					return;
				}
				// console.log("submit function called"); // 打印函数调用信息
				// console.log(this.formData);    	        // 调用 uni.request 发送请求
				this.formData.createTime = new Date().getTime();
				const requestData = {
					color: this.formData.color,
					content: this.formData.content,
					liked: 0,
					userId: 1,
					official: false,
				};
				const {
					statusCode,
					data: res
				} = uni.$http.post('/moment/upload', requestData);
        uni.$showMsg("发布成功");
        this.handleBack();
        // console.log(statusCode);
        // console.log(res);
				// if (statusCode === 200) {
				// 	console.log("request success", res); // 打印请求成功信息
				// 	// 提示创建成功
				// 	uni.$showMsg("发布成功");
				// 	this.handleBack();
				// } else {
				// 	console.log("request fail", res); // 打印请求失败信息
				// 	// 提示创建失败
				// 	uni.$showMsg("发布失败");
				// }
			},
			// 返回上一页
			handleBack() {
				console.log("handleBack function called"); // 打印函数调用信息
				uni.navigateBack({
					delta: 1, // 返回的页面数，1 表示返回上一级页面
				});
			},
			changeColor(color) {
				this.formData.color = color;
			},
		},
	};
</script>

<style scoped lang="scss">
	.CreateMoment {
		position: relative;
		margin-top: 10px;
		margin-left: 36.89rpx;
		margin-right: 42.15rpx;
		padding: 59.18rpx 28.1rpx;
		background-image: linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%);
		border-radius: 56.21rpx;
		filter: drop-shadow(0rpx 7.03rpx 10.54rpx #00000026);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: calc(43vh);
	}

	.InputBox {
		margin-bottom: 40rpx;
		border-radius: 7.03rpx;
		filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
		overflow: hidden;
		width: 85%;
		/* Adjust as needed */
		text-align: center;
		/* Center text inside */
	}

	.ColorList {
		position: absolute;
		left: 45rpx;
		bottom: 45rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.ColorItem {
		width: 35.13rpx;
		height: 35.13rpx;
		border-radius: 175.64rpx;
		margin-right: 3.75px;
		box-shadow: 0rpx 5.27rpx 5.27rpx #00000040;
	}

	.button {
		position: absolute;
		right: 75rpx;
		bottom: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;

		background-color: #3fb55e;
		/* Blue background color */
		border-radius: 7.03rpx;
		filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
		overflow: hidden;
		width: 120rpx;
		height: 65rpx;
    .word {
      color: #ffffff;
      font-size: 28.1rpx;
      font-weight: 700;
      line-height: 65rpx;
      /* Set line height equal to the button height */
      text-align: center;
      /* Center the text horizontally */
      flex: 1;
      /* Allow the text to take the available width */
    }
	}


</style>