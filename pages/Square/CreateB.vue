git<template>
  <view class="flex-col section_3" :style="{ background: formData.color }">
    <div class="flex-row justify-end self-stretch">
        <div class="relative section_4" @click="changeColor('linear-gradient(180deg, #BEFEE6 0%, #A1E8FF 100%)')"></div>
        <div class="relative section_5 ml-5" @click="changeColor('linear-gradient(180deg, #A1E8FF 0%, #3897F0 100%)')"></div>
        <div class="relative section_6 ml-5" @click="changeColor('linear-gradient(180deg, #3897F0 0%, #7B61FF 100%)')"></div>
        <div class="relative section_7 ml-5" @click="changeColor('linear-gradient(180deg, #FFC0CB 0%, #FFB6C1 100%)')"></div>
        <div class="relative section_8 ml-5" @click="changeColor('linear-gradient(180deg, #FFD700 0%, #FFA500 100%)')"></div>
        <div class="section_9 ml-5" @click="changeColor('linear-gradient(180deg, #fd5ba7 0%,  #e85a6d 100%)')"></div>
    </div>
    <view>
        <!-- 使用 span 标签显示标题 -->
        <span class="self-start font title">安排内容</span>
        <!-- 使用 uni-easyinput 组件作为输入框，绑定 v-model 和 placeholder -->
        <uni-easyinput v-model="formData.content" placeholder="请输入安排内容" > </uni-easyinput>
		<span class="self-start font title">时间</span>
		<uni-easyinput v-model="formData.time" placeholder="请输入时间"></uni-easyinput>
        <span class="self-start font title">地点</span>
        <uni-easyinput v-model="formData.address" placeholder="请输入地点"></uni-easyinput>
        <!-- 使用 button 组件作为提交按钮，绑定 @click 事件 -->
		
      </view>
	  <view class="flex-col justify-start items-center text-wrapper" @click="addnew">
	    <text class="timeline-text">+</text>
	  </view>
		
		<div class="flex-col items-center button submit-wrapper"   @click="submit">
		    <span class="text_9">添加安排</span>
		</div>
	</view>
</template>
<script>
	import uniEasyinput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue';
	import Arrangement from '@/uni_modules/Schedule/Schedule.vue';
	export default {
	components: {
	      uniEasyinput,
		  Arrangement,
	    },
	data() {
		return {	
   	          // 表单数据对象
			  
   		formData: {
   		            time: '',
   		            address: '',
   		            color: 'linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%)',
   		            content: '',
   		        },
       };
			
     },
     methods: {
   	  submit() {
   	        console.log("submit function called"); // 打印函数调用信息
			console.log(this.formData);    	        // 调用 uni.request 发送请求
   	        uni.request({
   	          // 请求地址
   	          url: 'http://47.115.222.16:8080',
   	          // 请求方式
   	          method: 'POST',
   	          // 请求参数
   	          data: this.formData,
   	          // 请求头
   	          header: {
   	            'content-type': 'application/json',
   	          },
   	          // 请求成功
   	          success: (res) => {
   	            console.log("request success", res); // 打印请求成功信息
   	            // 提示创建成功
   	            uni.showToast({
   	              title: '创建成功',
   	              icon: 'success',
   	            });
   	            // 返回上一页
   	            this.handleBack();
   	          },
   	          // 请求失败
   	          fail: (err) => {
   	            console.log("request fail", err); // 打印请求失败信息
   	            // 提示创建失败
   	            uni.showToast({
   	              title: '创建失败',
   	              icon: 'none',
   	            });
   	          },
   	        });
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
	
	 .title {
		 display:block;
	    font-family: "微软雅黑";
	        font-size: 24px;
	        font-weight: bold;
	        color: #333;
	        padding: 5px;
	        margin: 5px;
			 margin-bottom: 5px;
}

	.text-wrapper {
	    padding: 5rpx 0 0rpx;
	    background-color:#f6e0eb;
	    width: 90%;
	    border-radius: 4px 4px 35.81rpx 35.81rpx;
	    filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
	    overflow: hidden;
	    margin: 35rpx auto;
	    box-shadow: 1px 1px 1px 1px grey; /* 添加了右下方的阴影 */
	}
	
	.submit-wrapper {
		  padding: 33rpx 0;
		  background-color: #3F51B5; /* 蓝色背景 */
		  border-radius: 7.03rpx;
		  filter: drop-shadow(0rpx 8.78rpx 13.17rpx #252c6126, 0rpx 3.51rpx 3.51rpx #8890c233);
		  overflow: hidden;
		  width: 168.62rpx;
		}
		
		.flex-col {
		  display: flex;
		  flex-direction: column;
		  justify-content: flex-end; /* 添加这个属性，让子元素在主轴上靠近末尾 */
		}
		
		.button {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: flex-end; /* 将内容放在主轴的末尾（右侧） */
		  align-self: flex-end; /* 使其自身在交叉轴上靠近末尾 */
		  margin-top: 24.59rpx; /* 修改 margin-top 的值 */
		}
	
.flex-row {
  display: flex;
  flex-direction: row;
}

.self-stretch {
  align-self: stretch;
}

.ml-5 {
  margin-left: 8.78rpx;
}

.section_3 {
  margin-top:10px;
  margin-left: 36.89rpx;
  margin-right: 42.15rpx;
  padding: 59.18rpx 28.1rpx;
  background-image: linear-gradient(180deg, #f7e0eb 0%, #fed5ad 100%);
  border-radius: 56.21rpx;
  filter: drop-shadow(0rpx 7.03rpx 10.54rpx #00000026);
  overflow: hidden;
}

.section_4,
.section_5,
.section_6,
.section_7,
.section_8,
.section_9 {
  width: 35.13rpx;
  height: 35.13rpx;
  border-radius: 175.64rpx;
  box-shadow: 0rpx 5.27rpx 5.27rpx #00000040;
}

.section_4 {
  background-image: linear-gradient(180deg, #BEFEE6 0%, #A1E8FF 100%);
}

.section_5 {
  background-image: linear-gradient(180deg, #3897F0 0%, #A1E8FF 100%);
}

.section_6 {
  background-image: linear-gradient(180deg, #3897F0 0%, #7B61FF 100%);
}

.section_7 {
  background-image: linear-gradient(180deg, #FFC0CB 0%, #FFB6C1 100%); /* 粉红色系 */
}

.section_8 {
  background-image: linear-gradient(180deg, #FFD700 0%, #FFA500 100%); /* 黄色/橙色系 */
}

.section_9 {
  background-image: linear-gradient(180deg, #fd5ba7 0%,  #e85a6d 100%); /* 绿色系 */
}

.font {
  font-size: 28.1rpx;
  font-family: Inter;
  line-height: 26.17rpx;
  color: #0f0f0f;
}

.text_2,
.text_4,
.text_6,
.text_8 {
  margin-top: 28.1rpx;
  line-height: 25.82rpx;
}

.section_10 {
  align-self: stretch;
  margin-top: 17.56rpx;
}

.font_2,
.text_3,
.text_5,
.text_7 {
  line-height: 22.61rpx;
}

.group_2 {
  margin-top: 17.56rpx;
}

.text_9 {
  color: #ffffff;
  font-size: 28.1rpx;
  font-family: Lato;
  font-weight: 700;
  line-height: 26.56rpx;
}

</style>