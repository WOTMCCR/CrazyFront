<template>
	<view class="CreateActivity " :style="{ background: formData.color }">
		<view class="ColorList">
			<view class="ColorItem" v-for="(item, index) in gradientColors" :key="index" :style="{ background : item }"
				@click="changeColor(item)"></view>
		</view>

		<view class="Activity">
			<!-- 使用 span 标签显示标题 -->
			<span class="title">标题</span>
			<!-- 使用 uni-easyinput 组件作为输入框，绑定 v-model 和 placeholder -->
			<uni-easyinput v-model="formData.activity.name" placeholder="请输入标题" :styles="InputStyles"></uni-easyinput>
			<span class="time">时间</span>
			<uni-easyinput v-model="formData.activity.activityTime" placeholder="请输入时间 示例：2023-12-31 14:30:00"
				:styles="InputStyles"></uni-easyinput>
			<span class="location">地点</span>
			<uni-easyinput v-model="formData.activity.address" placeholder="请输入地点"
				:styles="InputStyles"></uni-easyinput>
			<span class="contact">联系方式</span>
			<uni-easyinput v-model="formData.activity.contact" placeholder="请输入负责人联系方式"
				:styles="InputStyles"></uni-easyinput>
			<view class="introduction">介绍
				<uni-easyinput v-model="formData.activity.content" placeholder="请输入活动内容、主题等"
					:styles="InputStyles"></uni-easyinput>
			</view>
			<!--      参与人数最大最小-->
			<span class="contact">最大参与人数</span>
			<uni-easyinput v-model="formData.activity.participantMax" placeholder="请输入最大参与人数"
				:styles="InputStyles"></uni-easyinput>
			<span class="contact">最小参与人数</span>
			<uni-easyinput v-model="formData.activity.participantNum" placeholder="请输入最小参与人数"
				:styles="InputStyles"></uni-easyinput>
			<!--      <span class="contact">活动类型</span>-->
			<!--      <uni-easyinput v-model="formData.activity.type" placeholder="请输入活动类型"-->
			<!--                     :styles="InputStyles"></uni-easyinput>-->


		</view>
		<view class="ScheduleList" v-for="(item, index) in formData.schedule.schedule" :key="index" @click = "gotoSchedule(index)">
			<Schedule :time="formatTime(item.time)" :address="item.address" :content="item.content" :title="item.title"
				:color="item.color" ></Schedule>
		</view>
    <view class="addSchedule" @click="addnew">
      <text class="timeline-text">+</text>
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
	import Schedule from '@/uni_modules/Schedule/Schedule.vue';

	export default {
		components: {
			uniEasyinput,
			Schedule,
		},
		data() {
			return {
				InputStyles: {
					color: 'black',
					background: 'rgba(0,0,0,0)',
				},

				// 表单数据对象
				formData: {
					activity: {
						activityTime: '2023-12-31 14:30:00',
						address: '地址：是这里',
						color: 'linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%)',
						contact: '联系方式是自定义的',
						content: '前端传入的活动',
						createTime: "",
						name: '吧啦吧啦不想学啦',
						official: false,
						participantMax: 0,
						participantNum: 0,
						restriction: false,
						type: 1,
						userId: 1
					},

					schedule: {
						schedule: [

							{
								// time: "2023-11-30T09:00:00",
								address: "城市大会中心，市城",
								content: "注册和欢迎很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长",
								// title: "注册活动",
								color: "#ffffff",
								contact: "registration@techsummit.com",
                time: "2023-11-30T09:00:00",
								arrangement: [{

										address: "会议大厅A",
										content: "签到和徽章领取",
										color: 'linear-gradient(180deg, #FED5AD 0%, #A1E8FF 100%)'
									},
									{
										address: "会议大厅B",
										content: "首席执行官致辞",
										color: 'linear-gradient(180deg, #befee6 0%, #d0f7fb 100%)'
									}
								]
							},
						]
					},
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
		onLoad() {
			uni.$on('updateScheduleList', (modifiedData) => {
				this.formData.schedule.schedule = [...this.formData.schedule.schedule, modifiedData];
			});
		},
		onShow() {
			console.log(this.formData.schedule.schedule);
		},
		methods: {
			addnew() {
				uni.navigateTo({
					url: '/subpkg/CreateSchedule/CreateSchedule'
				});
			},
			submit() {
				console.log("submit function called"); // 打印函数调用信息
				console.log(this.formData); // 调用 uni.request 发送请求
				if (this.formData.content === null || this.formData.content === '') {
					uni.showToast({
						title: '内容不能为空',
						icon: 'none',
					});
					return;
				}
				const userEnteredTime = this.formData.activity.activityTime;
				const parsedTime = new Date(userEnteredTime);
				if (isNaN(parsedTime.getTime())) {
					// 用户输入的时间无法解析为有效的日期时间
					uni.showToast({
						title: '请输入有效的日期时间格式',
						icon: 'none',
					});
					return;
				}
				// 转换为后端期望的日期时间格式
				this.formData.activity.activityTime = parsedTime.toISOString();
				const {
					data: res
				} = uni.$http.post('/activity/upload', this.formData);
				console.log("request success", res); // 打印请求成功信息
				this.handleBack();
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
				console.log(this.formData.schedule.schedule);
			},
      gotoSchedule(index) {
        uni.setStorageSync('ScheduleList', this.formData.schedule.schedule);
        uni.navigateTo({
          url: '/subpkg/ScheduleDetail/ScheduleDetail?index=' + index,
        });
      },
			formatTime(timestamp) {
				const date = new Date(timestamp);
				const options = {
					hour: 'numeric',
					minute: 'numeric'
				};
				return date.toLocaleTimeString('en-US', options);
			},
			async loadSchedule(options) {
				this.formData.schedule.schedule = [...this.formData.schedule.schedule, options]
			},

		},

	};
</script>

<style scoped lang="scss">
	.introduction .title .location .time .contact {
		font-size: 28.1rpx;
		font-family: Inter;
		line-height: 26.17rpx;
		color: #0f0f0f;
		display: block;
		font-family: "微软雅黑";
		font-size: 24px;
		font-weight: bold;
		color: #333;
		padding: 5px;
		margin: 5px;
		margin-bottom: 5px;
	}

	.CreateActivity {
		min-height: 2500rpx;
		margin-top: 10px;
		margin-left: 36.89rpx;
		margin-right: 42.15rpx;
		padding: 59.18rpx 28.1rpx;
		background-image: linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%);
		border-radius: 56.21rpx;
		filter: drop-shadow(0rpx 7.03rpx 10.54rpx #00000026);

		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		overflow: hidden;
	}

	.ColorList {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-self: stretch;

	}

	.ColorItem {
		width: 35.13rpx;
		height: 35.13rpx;
		border-radius: 175.64rpx;
		margin-right: 3.75px;
		box-shadow: 0rpx 5.27rpx 5.27rpx #00000040;
	}

	.addSchedule {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 5rpx 0 0rpx;
		background-color: #f6e0eb;
		width: 90%;
		border-radius: 4px 4px 35.81rpx 35.81rpx;
		filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
		overflow: hidden;
		margin: 35rpx auto;
		box-shadow: 1px 1px 1px 1px grey;
		/* 添加了右下方的阴影 */
	}

	.items-center {
		align-items: center;
	}

	.timeline-text {
		color: #00aa7f;
		font-size: 35rpx;
		font-family: Oswald;
		font-weight: 700;
		line-height: 51rpx;
	}


	.button {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-left: 360rpx;
		background-color: #3fb55e;
		/* Blue background color */
		border-radius: 7.03rpx;
		filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
		overflow: hidden;
		width: 240rpx;
		height: 80rpx;

		.word {
			color: #ffffff;
			font-size: 28.1rpx;
			font-weight: 700;
			line-height: 80rpx;
			/* Set line height equal to the button height */
			text-align: center;
			/* Center the text horizontally */
			flex: 1;
			/* Allow the text to take the available width */
		}
	}
</style>