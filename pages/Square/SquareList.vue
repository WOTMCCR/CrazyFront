<template>
  <view class="tabBox">
    <uni-segmented-control
        v-model="currentTab"
        :values="tabs"
        @click-item="changeTab"
        :style="{ backgroundColor: '#3498db', color: '#fff'}"
        :inactiveColor="'#3498db'"
    />
  </view>
  <!-- Swiper for left-right swiping -->
  <!-- Activity List -->
  <!-- 边缘空白 -->
  <view class="square">
    <view v-if="CardsList.length > 0" v-for="(item, index) in CardsList" :key="index" @click="gotoDetail(item)">
      <new-card :detail="item">
      </new-card>
    </view>
    <view v-else>
      <text>No activity data available.</text>
    </view>
  </view>

  <navigator @click="handleFabClick()">
    <uni-fab :pattern="pattern" horizontal="right" vertical="bottom"/>
  </navigator>

</template>

<script>
import unisegmentedcontrol
  from '../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue';
import {data} from "uview-ui/libs/mixin/mixin";

export default {

  components: {},
  data() {
    return {
      official: 1,
      currentTab: 0,
      //切换
      tabs: ['动态', '活动'],
      //卡片列表
      CardsList: [],
      //请求体
      pageQuery: {
        pageNo: 1,
        pageSize: 6,
        isAsc: '',
        sortBy: '',
      },
      //悬浮窗
      pattern: {
        color: '#00557f',
        backgroundColor: '#FFFFFF',
        buttonColor: '#00557f',
      },
      code: '',
      pages: '',
      total: '',
      isloading: false,
    };
  },
  onLoad(options) {
    this.pageQuery.isAsc = options.isAsc || '';
    this.pageQuery.sortBy = options.sortBy || '';
    this.loadData();
  },
  onCardClick: function () {
    console.log('卡片被点击了');
    // 在这里可以添加处理点击事件的逻辑
  },
  activityButtonClick: function () {
    // 调用活动按钮相关的后端方法
    console.log('按钮被点击了');
    // 在这里可以添加具体的后端方法调用逻辑
  },
  // 点击动态按钮时触发的方法
  momentButtonClick: function () {
    // 调用组织按钮相关的后端方法
    console.log('组织按钮被点击了');
    // 在这里可以添加具体的后端方法调用逻辑
  },
  methods: {
    async loadData(cb) {
      try {
        // Assuming you have a common API endpoint for both Activity and Moment data
        const endpoint = this.currentTab === 0 ? "/moment/isOfficial/0" : "/activity/isOfficial/0";
        this.isloading = true;
        console.log(this.pageQuery);
        const {
          statusCode,
          data: res
        } = await uni.$http.post(
            endpoint,
            this.pageQuery
        );
        console.log(res);
        console.log(statusCode);
        if (statusCode === 200) {
          this.CardsList = [...this.CardsList, ...res.data.list];
          this.total = res.data.total;
          this.pages = res.data.pages;
          console.log(this.pages);
          uni.$showMsg("Data loaded successfully");
          //回调函数，请求完就停止下拉效果
          cb && cb()
        } else {
          console.error("Failed to load data. Server returned status code:", statusCode);
        }
        this.isloading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        uni.hideLoading();
      }
    },
    // 处理悬浮按钮点击事件
    handleFabClick() {
      console.log('Floating Action Button clicked');
      uni.navigateTo({
        url: '/pages/Square/CreateA'
      });
    },
    gotoDetail(item) {
      let url;
      if (this.currentTab === 0) {
        url = '/subpkg/ActivityDetail/ActivityDetail?id=' + item.id;
      } else if (this.currentTab === 1) {
        url = '/subpkg/MomentDetail/MomentDetail?id=' + item.id;
      }
      uni.navigateTo({
        url: url
      });

    },
    changeTab(e) {
      console.log('Current tab value:', this.currentTab);
      //this.currentTab = tabIndex;
      if (this.currentTab != e.currentIndex) {
        this.pageQuery.pageNo = 1;
        this.total = 0;
        this.CardsList = [];
        this.currentTab = e.currentIndex;
        this.loadData();
      }
    },
  },
  updated() {
    console.log('detail prop on updated:', this.detail);
  },
  onReachBottom() {
    if (this.isloading) return
    if (this.pageQuery.pageNo < this.pages) {
      this.pageQuery.pageNo++;
      this.loadData();
    } else return uni.$showMsg('数据加载完毕!')

  },
  onPullDownRefresh() {
    // 1. 重置关键数据
    this.pageQuery.pageNo = 1
    this.total = 0
    this.isloading = false
    this.CardsList = []
    // 2. 重新发起请求
    this.loadData(() => uni.stopPullDownRefresh())
  },
};
</script>

<style scoped>
.square {
  padding-left: 40.12rpx;
  padding-right: 40.12rpx;
}

.navigation-options {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.nav-option {
  font-size: 16px;
  color: #333333;
  text-decoration: underline;
}

.button {
  display: inline-block;
  padding: 10rpx 40rpx;
  width: 200rpx;
  border-radius: 20rpx;
  background-color: #4891da;
  color: #fff;
  font-size: 40rpx;
  font-family: "楷体";
  font-weight: bold;
}

.button.active {
  background-color: #00aaff;
}

.tabBox {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>