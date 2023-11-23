
<template>
	<div>
	  <p >here need a logo</p>
	  
	  <form class="login-form" v-if="!isRegister">
		<div class="slogan">疯吧<br />打破芥蒂，追寻真理</div>
		
		<div class="id-temp">账户</div>
		<div class="div-8">
		  <input type="text"  v-model="id" placeholder="请输入账户" class="input_Id" required/>
		</div>
		<div class="passwd-temp">密码</div>
		<div class="input-passwd">
		  <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••" class="div-12" required/>
		<img
		  loading="lazy"
		  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4204222-1ef5-4217-85fb-fa49a4071683?"
		  class="passwd-display"
		  @click="showPassword = !showPassword"
		/>
		</div>
		<div class="div-13">
		  <div class="div-14">
			<checkbox id="remember-login" class="div-15"></checkbox>
			<div for="remember-login" class="div-16">记住登录</div>
		  </div>
		  <button class="div-17" @click="forgetPasswd">忘记密码?</button>
		</div>
		<navigator url="/pages/home/home">
		<button class="div-18"  @click="submitForm">登录</button>
		</navigator>
	 
  
	  <div class="div-19">
		  <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
			创建→
		  </el-link>
	  <p class="login-text">部分功能需要账号登录才能使用哦</p>
	</div>
  </form>
  
	<form class="Register-form" v-if="isRegister">
	  <div class="slogan">疯吧<br />打破芥蒂，追寻真理</div>
	  <div class="id-temp">账户</div>
	  <div class="div-8">
		<input type="text" v-model="id" placeholder="请输入账户" class="input_Id" required/>
	  </div>
	  <div class="passwd-temp">密码</div>
	  <div class="input-passwd">
		<input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••" class="div-12" required/>
		<img
		  loading="lazy"
		  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4204222-1ef5-4217-85fb-fa49a4071683?"
		  class="passwd-display"
		  @click="showPassword = !showPassword"
		/>
	  </div>
	  <div class="passwd-temp">确认密码</div>
	  <div class="input-passwd">
		<input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••" class="div-12" required/>
		<img
		  loading="lazy"
		  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4204222-1ef5-4217-85fb-fa49a4071683?"
		  class="passwd-display"
		  @click="showPassword = !showPassword"
		/>
	  </div>
	  
	  <button class="div-21"  @click="submitForm">注册</button>
	  <div class="div-19">
		  <el-link type="info" :underline="false" @click="isRegister = flase; clearRegisterData()">
			返回登录
		  </el-link>
	</div>
	</form>
  
	</div>
  </template>
  
  
  
  <style scoped>
  .login-form {
	display: flex;
	flex-direction: column;
	align-items: center;
  }
  .Register-form {
	display: flex;
	flex-direction: column;
	align-items: center;
  }
  .div {
	background-color: #fff;
	display: flex;
	flex-direction: column;
  }
  .div-2 {
	align-self: stretch;
	background-color: #fff;
	display: flex;
	width: 100%;
	justify-content: space-between;
	gap: 20px;
	padding: 12px 14px 12px 21px;
  }
  @media (max-width: 991px) {
	.div-2 {
	  padding-left: 20px;
	}
  }
  .img {
	aspect-ratio: 2.57;
	object-fit: contain;
	object-position: center;
	width: 100%;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	flex: 1;
  }
  .div-3 {
	align-self: start;
	display: flex;
	margin-top: 4px;
	gap: 4px;
  }
  @media (max-width: 991px) {
	.div-3 {
	  justify-content: center;
	}
  }
  .img-2 {
	aspect-ratio: 1.43;
	object-fit: contain;
	object-position: center;
	width: 20px;
	overflow: hidden;
	max-width: 100%;
  }
  .img-3 {
	aspect-ratio: 1.14;
	object-fit: contain;
	object-position: center;
	width: 16px;
	overflow: hidden;
	max-width: 100%;
  }
  .img-4 {
	aspect-ratio: 1.79;
	object-fit: contain;
	object-position: center;
	width: 25px;
	overflow: hidden;
	max-width: 100%;
  }
  .div-4 {
	justify-content: space-between;
	align-self: stretch;
	background-color: #fff;
	display: flex;
	width: 100%;
	gap: 20px;
	padding: 1px 20px;
  }
  @media (max-width: 991px) {
	.div-4 {
	  justify-content: center;
	}
  }
  .img-5 {
	aspect-ratio: 2.72;
	object-fit: contain;
	object-position: center;
	width: 87px;
	overflow: hidden;
	align-self: center;
	max-width: 100%;
	margin: auto 0;
  }
  .div-5 {
	color: #000;
	text-align: center;
	font: 400 20px/51px Inter, sans-serif;
  }
  .img-6 {
	aspect-ratio: 2.72;
	object-fit: contain;
	object-position: center;
	width: 87px;
	overflow: hidden;
	align-self: center;
	max-width: 100%;
	margin: auto 0;
  }
  .slogan {
	color: #000;
	text-align: center;
	align-self: center;
	margin-top: 101px;
	font: 400 36px/43px ABeeZee, sans-serif;
  }
  @media (max-width: 991px) {
	.slogan {
	  margin-top: 40px;
	}
  }
  .id-temp {
	color: var(--text-0, #2a2b2e);
	align-self: center;
	margin-top: 25px;
	white-space: nowrap;
	font: 400 14px/17px Inter, sans-serif;
  }
  @media (max-width: 991px) {
	.id-temp {
	  white-space: initial;
	}
  }
  .div-8 {
	align-self: center;
	border-radius: 8px;
	border: 0.5px solid var(--text-1, #808194);
	display: flex;
	margin-top: 8px;
	width: 100%;
	max-width: 322px;
	justify-content: space-between;
	gap: 20px;
	padding: 14px 20px;
  }
  .input_Id {
	color: var(--text-2, #e0e0e5);
	font: 400 14px/17px Inter, sans-serif;
  }
  .img-7 {
	aspect-ratio: 1;
	object-fit: contain;
	object-position: center;
	width: 16px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	max-width: 100%;
  }
  .passwd-temp {
	color: var(--text-0, #2a2b2e);
	align-self: center;
	margin-top: 22px;
	white-space: nowrap;
	font: 400 14px/17px Inter, sans-serif;
  }
  @media (max-width: 991px) {
	.passwd-temp {
	  white-space: initial;
	}
  }
  .input-passwd {
	align-self: center;
	border-radius: 8px;
	border: 0.5px solid var(--text-1, #808194);
	display: flex;
	margin-top: 8px;
	width: 100%;
	max-width: 322px;
	justify-content: space-between;
	gap: 20px;
	padding: 10px 20px;
  }
  .div-12 {
	color: var(--text-2, #e0e0e5);
	font: 400 16px/24px Inter, sans-serif;
  }
  .passwd-display {
	aspect-ratio: 1;
	object-fit: contain;
	object-position: center;
	width: 16px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	align-self: center;
	max-width: 100%;
	margin: auto 0;
  }
  .div-13 {
	justify-content: space-between;
	align-self: center;
	display: flex;
	margin-top: 22px;
	width: 100%;
	max-width: 322px;
	padding-left: 2px;
	gap: 20px;
  }
  .div-14 {
	align-items: center;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	gap: 10px;
	padding: 0 20px;
  }
  .div-15 {
	border-radius: 2px;
	border: 1.5px solid var(--text-1, #808194);
	display: flex;
	width: 12px;
	height: 13px;
	flex-direction: column;
	margin: auto 0;
  }
  .div-16 {
	color: var(--text-0, #2a2b2e);
	align-self: stretch;
	flex-grow: 1;
	white-space: nowrap;
	font: 700 14px/17px Inter, sans-serif;
  }
  @media (max-width: 991px) {
	.div-16 {
	  white-space: initial;
	}
  }
  .div-17 {
	color: var(--text-0, #2a2b2e);
	text-align: center;
	white-space: nowrap;
	justify-content: center;
	aspect-ratio: 3.764705882352941;
	padding-left: 20px;
	font: 700 14px/17px Inter, sans-serif;
	background-color: transparent;
	border-color: transparent;
  }
  @media (max-width: 991px) {
	.div-17 {
	  white-space: initial;
	}
  }
  .div-18 {
	color: var(--text-3, #fff);
	text-align: center;
	white-space: nowrap;
	justify-content: center;
	align-items: center;
	align-self: center;
	border-radius: 4px;
	background-color: var(--actions-0, #4f90f0);
	margin-top: 22px;
	width: 100%;
	max-width: 322px;
	padding: 10px 20px;
	font: 700 20px/24px Inter, sans-serif;
  }
  @media (max-width: 991px) {
	.div-18 {
	  white-space: initial;
	}
  }
  .div-19 {
	align-self: center;
	margin-top: 22px;
	width: auto;
	max-width: auto;
  }
  .el-link{
	color: var(--text-0, #2a2b2e);
	text-align: center;
	white-space: nowrap;
	justify-content: center;
	align-items: center;
	align-self: center;
	border-radius: 4px;
	background-color: var(--actions-0, #4f90f0);
	margin-top: 22px;
	width: 100%;
	max-width: 322px;
	padding: 10px 20px;
	font: 700 20px/24px Inter, sans-serif;
  }
  .div-20 {
	color: var(--text-0, #2a2b2e);
	font: 400 14px/17px Inter, sans-serif;
  }
  .div-21{
	color: var(--text-3, #fff);
	text-align: center;
	white-space: nowrap;
	justify-content: center;
	align-items: center;
	align-self: center;
	border-radius: 4px;
	background-color: var(--actions-0, #4f90f0);
	margin-top: 22px;
	width: 100%;
	max-width: 322px;
	padding: 10px 20px;
	font: 700 20px/24px Inter, sans-serif;
  }
  .login-text {
	color: var(--text-0, #2a2b2e);
	text-align: center;
	white-space: nowrap;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 22px;
	width: 100%;
	max-width: 322px;
	padding: 10px 20px;
	font: 400 14px/17px Inter, sans-serif;
  }
  </style>
  
  <script>
  export default {
	data() {
	  return {
		showPassword: false,
		isRegister: false,
		id: '',
		password: '',
		registerId: '',
		registerPassword: '',
		confirmPassword: '',
	  };
	},
	methods: {
	  goToRegister() {
		wx.navigateTo({
		  url: '/pages/register/register'
		});
	  },
	  forgetPasswd() {
		wx.navigateTo({
		  url: '/pages/forgetPasswd/forgetPasswd'
		});
	  },
	  async submitForm() {
		 // 验证输入
		  if (!this.id || !this.password) {
			uni.$showMsg('账号或密码不能为空');
			return;
		  }
		console.log("登录按钮按下");
		const timeout = new Promise((resolve, reject) => {
		  setTimeout(() => {
			reject(new Error('请求超时'));
		  }, 10000);
		});
		console.log(this.id+this.password);
		try{
		  const res = await Promise.race([
			uni.$http.get('/login', {
				id: this.id,
				password: this.password,
			}),
			timeout,
		  ]);
		
		if (res.statusCode !== 200) {
		  uni.$showMsg('请求失败');
		  return;
		} 
  
		if(res.data.status!=='success'){
		  uni.$showMsg(res.data.msg);
		  return;
		}
		uni.$showMsg('登录成功');
		uni.navigateTo({
		  url: '/pages/home/home'
		});
	  } catch(error){
		uni.$showMsg(error.message);
	  }
	},
	async registerForm() {
		// 验证输入
		if (!this.registerId || !this.registerPassword || !this.confirmPassword) {
		  uni.$showMsg('账号或密码不能为空');
		  return;
		}
		if (this.registerPassword !== this.confirmPassword) {
		  uni.$showMsg('两次输入的密码不一致');
		  return;
		}
		console.log("注册按钮按下");
		const timeout = new Promise((resolve, reject) => {
		  setTimeout(() => {
			reject(new Error('请求超时'));
		  }, 10000);
		});
		console.log(this.registerId + this.registerPassword);
		try {
		  const res = await Promise.race([
			uni.$http.post('/register', {
			  id: this.registerId,
			  password: this.registerPassword,
			}),
			timeout,
		  ]);
  
		  if (res.statusCode !== 200) {
			uni.$showMsg('请求失败');
			return;
		  }
  
		  if (res.data.status !== 'success') {
			uni.$showMsg(res.data.msg);
			return;
		  }
		  uni.$showMsg('注册成功');
		  uni.navigateTo({
			url: '/pages/home/home'
		  });
		} catch (error) {
			uni.$showMsg(error.message);
		  }
	// ...
  },
  clearRegisterData() {
		this.registerId = '';
		this.registerPassword = '';
		this.confirmPassword = '';
		this.username = '';
		this.password = '';
	  },
	},
  };
  </script>
  