<template>
	<view class="my-card" bindtap="onCardClick">
		<!-- avtuar 姓名与时间 -->
		<view class="header">
			<image class="avatar" src="/static/humanhead.png" />
			<view class="NameAndTime">
				<text class="name">{{ detail.name }}</text>
				<text class="time">时间:{{ formattedTime }}</text>
			</view>
		</view>

		<!-- 文章主体 -->
		<text class="text-body">{{ detail.content }}</text>
		<!-- 评论转发点赞部分 -->
		<view class="card-option">
			<view class="flex-row">
				<image class="image_1" src="/static/Vector.svg" />
				<text class="font">
					11
				</text>
			</view>
			<view class="flex-row">
				<image class="image_2" src="/static/share.svg" />
				<text class="font">
					2
				</text>
			</view>
			<view class="flex-row">
				<image class="image_3" src="/static/fav.svg" />
				<text class="font">
					239
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			methods: {
				onCardClick: function() {
					// 触发自定义事件，传递点击事件到父组件
					this.triggerEvent('cardclick');
				}
			}
		},
		props: {
			detail: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			// 将从后端获取的时间字符串格式化 detail.createTime
			formattedTime() {
				const timestamp = new Date(this.detail.createTime);

				const options = {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: 'numeric',
					minute: 'numeric',
					hour12: false
				};

				const formatter = new Intl.DateTimeFormat('zh-CN', options);
				const formattedDate = formatter.format(timestamp);
				return formattedDate.toString();
			}



		},

		methods: {},
	};
</script>

<style scoped lang="scss">
	.my-card {
		margin-top: 30rpx;
		padding: 47.09rpx 55.81rpx 47.09rpx;
		background-image: linear-gradient(180deg, #befee6 0%, #d0f7fb 100%);
		// max-width: 100rpx;
		// margin: 0 auto;
		border-radius: 55.81rpx;
		filter: drop-shadow(0rpx 6.98rpx 10.47rpx #00000026);
		overflow: hidden;

		.header {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.avatar {
				border-radius: 83.72rpx;
				width: 83.72rpx;
				height: 83.72rpx;
			}

			.NameAndTime {
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				margin-top: 10rpx;

				.name {
					font-size: 27.91rpx;
					//字体
					font-family: open;
					line-height: 21.59rpx;
					font-weight: 600;
					color: #000000;
					margin-bottom: 15rpx;
				}

				.time {
					font-size: 27.91rpx;
					font-family: Inter;
					line-height: 25.85rpx;
					color: #536471;
				}

			}
		}

		.text-body {
			font-size: 27.91rpx;
			font-family: Inter;
			line-height: 41.86rpx;
			color: #000000;
			word-break: break-all;
		}

		.card-option {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 2.55rpx;

			.flex-row {
				display: flex;
				align-items: center;

				.image_1,
				.image_2,
				.image_3 {
					width: 30rpx;
					height: 30rpx;
					vertical-align: middle;
				}

				.font {
					margin-left: 10rpx;
					font-size: 23rpx;
					font-family: Inter;
					color: #536471;
				}
			}
		}
	}
</style>