<!-- my-card component -->

<template>
	<div class="card" @click="handleClick" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
		@touchend="handleTouchEnd" :style="{ background: background }">
		<div class=" card-header" :style="{ background: color }">
			<!-- Move the slot to the .card-header div -->
			<slot name="header"></slot>
			<!-- Add a div for user info -->
			<div class="user-info">
				<!-- Resize and position the image -->
				<image slot="header" src="/static/c1.png" class="card-avatar"></image>
				<!-- Display user name -->
				<h3 class="user-name">{{ userName }}</h3>
				<!-- Display time -->
				<p class="time-label">发布时间: {{ time }}</p>
			</div>
		</div>
		<div class="card-body">
			<!-- <h3 class="card-title">{{ name }}</h3> -->
			<p class="card-text">{{ introduction }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			// name: {
			// 	type: String,
			// 	default: "",
			// },
			introduction: {
				type: String,
				default: "Introduction for activity 0",
			},
			color: {
				type: String,
				default: "rgb(51, 127, 255)",
			},
			background: {
				type: String,
				default: "rgba(51, 127, 255, 1)",
			},
			height: {
				type: String,
				default: "35vh",
			},
			// Add props for user info
			userName: {
				type: String,
				default: "abcds",
			},
			time: {
				type: String,
				default: "asdfsdf",
			},
		},
		methods: {
			handleClick() {
				// Handle click event
				console.log("Card clicked!");
			},
			handleTouchStart(event) {
				// Handle touch start event
				console.log("Touch start:", event);
			},
			handleTouchMove(event) {
				// Handle touch move event
				console.log("Touch move:", event);
			},
			handleTouchEnd(event) {
				// Handle touch end event
				console.log("Touch end:", event);
			},
		},
	};
</script>
<style>
	/* 定义卡片的样式 */
	.card {
		box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 6px 0px;
		border-radius: 9px;
		overflow: hidden;
		width: calc(100% - 32px);
		/* 减去左右两侧的外边距 */
		height: 38vh;
		/* 设置为 1/4 的视口高度 */
		margin: 17px;
		/* 设置为 20 像素的外边距 */
		background: rgba(51, 127, 255, 1);
		/* 设置为您想要的颜色 */
	}

	.card-avatar {
		width: 40px;
		/* Adjust the width as needed */
		height: 40px;
		/* Adjust the height as needed */
		border-radius: 50%;
		/* Make it circular */
		margin: 9px;
		/* Add margin for spacing */
	}

	.user-info {
		display: flex;
		flex-direction: column;
		/* Display items in a column */
		align-items: flex-start;
		/* Align items to the top */
		margin-left: 0%;
		/* Add margin for spacing */
		margin-top: -3%;
		/* Adjust this value to move it up based on card height */
	}

	.user-name {
		font-size: 16px;
		font-weight: bold;
		margin-left: 37%;
		margin-top: -33%;
		color: #333333;

		/* Add margin for spacing */
	}

	.time-label {
		font-size: 12px;
		margin-left: 50px;
		font-size: 12px;
		/* Add margin for spacing */
		display: inline;
		/* Display on the same line */
	}

	.time {
		font-size: 12px;
		/* color: grey; /* Set color to grey */
		margin-left: 25px;
		/* Add margin for spacing */
		display: inline;
		/* Display on the same line */
	}

	.card-header {
		border-radius: 9px;
		display: flex;
		height: 27%;
		justify-content: space-between;
		align-items: center;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		justify-content: center;

		text-align: center;
		color: rgb(16, 16, 16);
		margin-top: 35px;
		line-height: 20px;
		height: 1%;
	}

	/* 	.card-title {
		font-size: 18px;
		font-weight: bold;
		margin: 5px;
	} */

	.card-text {
		font-size: 14px;
		margin: 5px;
	}
</style>