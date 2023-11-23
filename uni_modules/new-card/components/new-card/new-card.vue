<template>
	<view class="new-card" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
		<!-- Header Section -->
		<view class="header" @click="handleHeaderClick" @touchstart="onTouchStart" @touchmove="onTouchMove"
			@touchend="onTouchEnd('header')">
			<image class="avatar" src="/static/humanhead.png" />
			<view class="NameAndTime">
				<text class="name">{{ detail.name }}</text>
				<text class="time">时间:{{ formattedTime }}</text>
			</view>
		</view>

		<!-- Body Section -->
		<text class="text-body" @click="handleBodyClick" @touchstart="onTouchStart" @touchmove="onTouchMove"
			@touchend="onTouchEnd('body')">{{ detail.content }}</text>

		<!-- Card Option Section -->
		<view class="card-option" @click="handleCardOptionClick" @touchstart="onTouchStart" @touchmove="onTouchMove"
			@touchend="onTouchEnd('card-option')">
			<view class="flex-row">
				<image class="image_1" src="/static/Vector.svg" />
				<text class="font">11</text>
			</view>
			<view class="flex-row">
				<image class="image_2" src="/static/share.svg" />
				<text class="font">2</text>
			</view>
			<view class="flex-row">
				<image class="image_3" src="/static/fav.svg" />
				<text class="font">239</text>
			</view>
		</view>
	</view>
</template>
  
<script>
export default {
	props: {
		detail: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			startX: 0,
			startY: 0,
			moveX: 0,
			moveY: 0,
		};
	},
	methods: {
		onTouchStart(e) {
			this.startX = e.touches[0].clientX;
			this.startY = e.touches[0].clientY;
		},

		onTouchMove(e) {
			this.moveX = e.touches[0].clientX;
			this.moveY = e.touches[0].clientY;
		},

		onTouchEnd(section) {
			const deltaX = this.moveX - this.startX;
			const deltaY = this.moveY - this.startY;

			// Determine the direction of touch move (left or right)
			const direction = Math.abs(deltaX) > Math.abs(deltaY) ? (deltaX > 0 ? 'right' : 'left') : '';

			// Emit the swipe event for the specific section
			if (direction === 'left' || direction === 'right') {
				switch (section) {
					case 'header':
						console.log("header swipe " + direction);
						this.$emit('header-swipe', direction, this.detail);
						break;
					case 'body':
						console.log("body swipe " + direction);
						this.$emit('body-swipe', direction, this.detail);
						break;
					case 'card-option':
						console.log("card-option swipe " + direction);
						this.$emit('card-option-swipe', direction, this.detail);
						break;
					default:
						break;
				}
			}
		},

		handleHeaderClick() {
			// Emit the click event for the header section
			console.log("header click");
			this.$emit('header-click', this.detail);
		},

		handleBodyClick() {
			// Emit the click event for the body section
			console.log("body click");
			this.$emit('body-click', this.detail);
		},

		handleCardOptionClick() {
			// Emit the click event for the card-option section
			console.log("card-option click");
			this.$emit('card-option-click', this.detail);
		},

		handleHeaderSwipe() {
			// Emit the swipe event for the header section
			console.log("header swipe");
			this.$emit('header-swipe', this.detail);
		},

		handleBodySwipe() {
			// Emit the swipe event for the body section
			console.log("body swipe");
			this.$emit('body-swipe', this.detail);
		},

		handleCardOptionSwipe() {
			// Emit the swipe event for the card-option section
			this.$emit('card-option-swipe', this.detail);
		},
	},
	computed: {
		// 将从后端获取的时间字符串格式化 detail.createTime
		formattedTime() {
			const date = new Date(this.detail.createTime);
			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");
			const hour = date.getHours().toString().padStart(2, "0");
			const minute = date.getMinutes().toString().padStart(2, "0");
			const second = date.getSeconds().toString().padStart(2, "0");
			return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
		},
	},
};
</script>
  
<style lang="scss">
.new-card {
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

  