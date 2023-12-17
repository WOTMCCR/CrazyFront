//导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = "http://47.115.222.16:8080"
// $http.baseUrl = " http://localhost:8080"
// 47.115.222.16:8080


// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import router from './router' // 引入 Vue Router
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)
Vue.config.productionTip = false

App.mpType = 'app'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import axios from 'axios'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif


//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
}

$http.afterRequest = function() {
	uni.hideLoading()
}

//封装弹框的方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}