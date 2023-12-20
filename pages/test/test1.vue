<template>
  <div class="determine-size">
    <input v-model="min" class="uni-countdown__number" placeholder=""/>
    <p>-</p>
	<input v-model="max" class="uni-countdown__number" placeholder=""/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      min: '',
	  max: '',
    };
  },
  watch: {
    min: function(newVal) {
    },
	max: function(newVal) {
	}
  }
};
</script>

<style scoped>
/* 在这里添加样式，如果需要的话 */
.determine-size{
	display: flex;
	align-items: center; /* 垂直居中 */
}
.uni-countdown__number{
	margin-top: 0px;
	margin-left: 8px;
	margin-right: 8px;
	display: flex;
	align-items: center; /* 垂直居中 */
	background-color: #e0e0e0; /* 设置搜索栏的背景颜色 */
	padding: 10px; /* 添加一些内边距 */
	border-radius: 30px; /* 设置圆角 */
	width: 120px;
	height: 20px;
}
</style>
