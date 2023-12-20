<template>
  <view class="tabBox">
    <uni-segmented-control
        v-model="currentTab"
        :values="tabs"
        @click-item="changeTab"
        :style="{ backgroundColor: '#3498db', color: '#fff'}"
        :inactiveColor="'#3498db'"
    />

    <!-- Swiper for left-right swiping -->

    <div class="search-content">
      <img class="search-bar-image" src="../../static/android-funnel.png" @click="showModalOnInput"/>
      <div class="search-bar">
        <img class="search-bar-image" src="../../static/search.png" alt="搜索图标"/>
        <input type="text" placeholder="请输入搜索内容"/>
        <button @click="search">搜索</button>
      </div>
    </div>


  <!-- 模态框 -->
  <div class="modal" v-if="showModal">
    <!-- 模态框内容 -->
    <div class="modal-content">
      <!-- 这里可以放模态框的内容，例如提示信息、搜索结果等 -->
      <div class="min-people-container">
        <div>
          最小参加人数：{{ minpeople }}
        </div>
        <div class="min-people-buttons">
          <button class="change-button" @click="decreaseMinPeople1" :disabled="minpeople === 0">-1</button>
          <button class="change-button" @click="decreaseMinPeople5" :disabled="minpeople <= 4">-5</button>
          <button class="change-button" @click="increaseMinPeople5">+5</button>
          <button class="change-button" @click="increaseMinPeople1">+1</button>
        </div>
      </div>
      <div class="min-people-container">
        <div>
          最大参加人数：{{ maxpeople }}
        </div>
        <div class="min-people-buttons">
          <button class="change-button" @click="decreaseMaxPeople1" :disabled="maxpeople <= minpeople">-1</button>
          <button class="change-button" @click="decreaseMaxPeople5" :disabled="maxpeople <= minpeople + 4">-5</button>
          <button class="change-button" @click="increaseMaxPeople5">+5</button>
          <button class="change-button" @click="increaseMaxPeople1">+1</button>
        </div>
      </div>
      <div class="min-people-container">
        <div>
          最少花费：{{ mincost }}
        </div>
        <div class="min-people-buttons">
          <button class="change-button" @click="decreaseMincost50" :disabled="mincost <= 49">-50</button>
          <button class="change-button" @click="decreaseMincost100" :disabled="mincost <= 99">-100</button>
          <button class="change-button" @click="increaseMincost100">+100</button>
          <button class="change-button" @click="increaseMincost50">+50</button>
        </div>
      </div>
      <div class="min-people-container">
        <div>
          最多花费：{{ maxcost }}
        </div>
        <div class="min-people-buttons">
          <button class="change-button" @click="decreaseMaxcost50" :disabled="maxcost <= mincost + 49">-50</button>
          <button class="change-button" @click="decreaseMaxcost100" :disabled="maxcost <= mincost + 99">-100</button>
          <button class="change-button" @click="increaseMaxcost100">+100</button>
          <button class="change-button" @click="increaseMaxcost50">+50</button>
        </div>
      </div>
      <div class="min-people-container">
        <div>
          活动类型：
        </div>
        <div class="min-people-buttons">
          <button :class="{ 'type-button': type1, 'custom-style': !type1 }" @click="typeplaning">计划中</button>
          <button :class="{ 'type-button': type2, 'custom-style': !type2 }" @click="typerecruit">招募中</button>
          <button :class="{ 'type-button': type3, 'custom-style': !type3 }" @click="typeconduct">进行中</button>
          <button :class="{ 'type-button': type4, 'custom-style': !type4 }" @click="typeend">已结束</button>
        </div>
      </div>
      <div class="min-people-container">
        <div>
          个人或组织：
        </div>
        <div class="min-people-buttons">
          <button :class="{ 'type-button': typeispersonal, 'custom-style': !typeispersonal }" @click="typepersonal">
            计划中
          </button>
          <button :class="{ 'type-button': typeisofficial, 'custom-style': !typeisofficial }" @click="typeofficial">
            招募中
          </button>
        </div>
      </div>
      <button class="close-button" @click="hideModal">关闭</button>
    </div>
  </div>
  </view>
  <!-- Activity List -->
  <!-- 边缘空白 -->
  <view class="square">
    <view v-if="CardsList.length > 0" v-for="(item, index) in CardsList" :key="index">
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

export default {
  components: {},
  data() {
    return {
      showModal: false, // 控制模态框显示与隐藏

      minpeople: 0,
      maxpeople: 0,
      mincost: 0,
      maxcost: 0,
      type1: false,
      type2: false,
      type3: false,
      type4: false,
      typeispersonal: false,
      typeisofficial: false,

      official: 1,
      currentTab: 0,
      //切换
      tabs: ['动态', '活动'],
      //卡片列表
      CardsList: [],
      //请求体
      pageQuery: {
        pageNo: 1,
        pageSize: 3,
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
    }
  },
  onLoad(options) {
    this.pageQuery.isAsc = options.isAsc || '';
    this.pageQuery.sortBy = options.sortBy || '';
    uni.$on('header-click', this.handleHeaderClick);
    uni.$on('body-click', this.handleBodyClick);
    uni.$on('card-swipe', this.handleCardSwipe);

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
    handleFabClick() {
      // 处理悬浮按钮点击事件
      let url;
      if (this.currentTab === 1) {
        url = '/subpkg/CreateActivity/CreateActivity';
      } else if (this.currentTab === 0) {
        url = '/subpkg/CreateMoment/CreateMoment';
      }
      uni.navigateTo({
        url: url
      });
      console.log('Floating Action Button clicked');
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
    handleHeaderClick(id) {
      let url;
      url = '/subpkg/UserHome/UserHome?id=' + id;
      console.log(url);
      uni.navigateTo({
        url: url
      });
    },
    handleBodyClick(id) {
      let url;
      if (this.currentTab === 1) {
        url = '/subpkg/ActivityDetail/ActivityDetail?id=' + id;
      } else if (this.currentTab === 0) {
        url = '/subpkg/MomentDetail/MomentDetail?id=' + id;
      }
      console.log(url);
      uni.navigateTo({
        url: url
      });
    },
    handleCardSwipe(direction) {
      //TODO:根据滑动方向切换tab
      // console.log('Card swiped',direction);
      // if(direction === 'left'){
      //   this.pageQuery.pageNo = 1;
      //   this.total = 0;
      //   this.CardsList = [];
      //   this.currentTab = 1;
      //   this.loadData();
      // }else if(direction === 'right'){
      //   if(this.currentTab === 1){
      //     this.pageQuery.pageNo = 1;
      //     this.total = 0;
      //     this.CardsList = [];
      //     this.currentTab = 0;
      //     this.loadData();
      //   }
      // }
      // Handle card swipe if needed
    },
    swiperChange(e) {
      this.currentTab = e.detail.current;
      this.loadData();
    },
    // 点击搜索按钮的事件
    search() {
      // 在这里添加搜索的逻辑
      console.log('搜索功能尚未实现');
    },
    // 输入框获取焦点时显示模态框
    showModalOnInput() {
      this.showModal = true;
    },
    // 关闭模态框
    hideModal() {
      this.showModal = false;
    },
    decreaseMinPeople1() {
      if (this.minpeople > 0) {
        this.minpeople -= 1;
      }
    },
    decreaseMinPeople5() {
      if (this.minpeople > 4) {
        this.minpeople -= 5;
      }
    },
    increaseMinPeople1() {
      this.minpeople += 1;
      this.maxpeople += 1;
    },
    increaseMinPeople5() {
      this.minpeople += 5;
      this.maxpeople += 5;
    },
    decreaseMaxPeople1() {
      if (this.maxpeople > this.minpeople) {
        this.maxpeople -= 1;
      }
    },
    decreaseMaxPeople5() {
      if (this.maxpeople > this.minpeople + 4) {
        this.maxpeople -= 5;
      }
    },
    increaseMaxPeople1() {
      this.maxpeople += 1;
    },
    increaseMaxPeople5() {
      this.maxpeople += 5;
    },
    decreaseMincost50() {
      if (this.mincost > 49) {
        this.mincost -= 50;
      }
    },
    decreaseMincost100() {
      if (this.mincost > 99) {
        this.mincost -= 100;
      }
    },
    increaseMincost50() {
      this.mincost += 50;
      this.maxcost += 50;
    },
    increaseMincost100() {
      this.mincost += 100;
      this.maxcost += 100;
    },
    decreaseMaxcost50() {
      if (this.maxcost > this.mincost + 49) {
        this.maxcost -= 50;
      }
    },
    decreaseMaxcost100() {
      if (this.maxcost > this.mincost + 99) {
        this.maxcost -= 100;
      }
    },
    increaseMaxcost50() {
      this.maxcost += 50;
    },
    increaseMaxcost100() {
      this.maxcost += 100;
    },
    typeplaning() {
      this.type1 = !this.type1;
    },
    typerecruit() {
      this.type2 = !this.type2;
    },
    typeconduct() {
      this.type3 = !this.type3;
    },
    typeend() {
      this.type4 = !this.type4;
    },
    typepersonal() {
      this.typeispersonal = !this.typeispersonal;
    },
    typeofficial() {
      this.typeisofficial = !this.typeisofficial;
    },
  },
  onReachBottom() {
    console.log('buttom');
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
  overflow-y: scroll;
  padding-left: 60.12rpx;
  padding-right: 60.12rpx;
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


.tabBox {
  position: sticky;
  top: 0;
  z-index: 999;
}


.search-bar {
  margin-top: 0px;
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center; /* 垂直居中 */
  background-color: #e0e0e0; /* 设置搜索栏的背景颜色 */
  padding: 0px; /* 添加一些内边距 */
  border-radius: 30px; /* 设置圆角 */
  width: 90%;
}

.search-bar input {
  flex: 1; /* 让输入框占据剩余空间 */
  padding: 8px;
  margin-right: 8px;
  border: none; /* 去掉输入框的边框 */
}

.search-bar button {
  padding: 2px 16px; /* 减少按钮的上下 padding，适应较小的高度 */
  cursor: pointer;
  border-radius: 30px;
  background-color: #fff; /* 设置背景颜色为白色 */
  color: #000; /* 设置文字颜色为黑色 */
  font-size: 14px; /* 调整按钮文字大小 */
}

.search-content {
  display: flex;
  align-items: center; /* 居中垂直对齐 */
}

.search-bar-image {
  width: 18px;
  height: 18px;
  margin-left: 8px;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

.min-people-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.min-people-buttons {
  display: flex;
  gap: 0px; /* 设置按钮之间的间距 */
}

.change-button {
  width: 45px; /* 设置宽度为100px */
  height: 30px; /* 设置高度为40px */
  background-color: #3498db; /* 设置背景颜色 */
  color: #ffffff; /* 设置文字颜色 */
  border: none; /* 去掉边框 */
  border-radius: 5px; /* 设置圆角 */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
}

.close-button {
  width: 100px; /* 设置宽度为100px */
  height: 40px; /* 设置高度为40px */
  margin-top: 10px;
}

.type-button {
  width: 60px; /* 设置宽度为100px */
  height: 30px; /* 设置高度为40px */
  background-color: #3498db; /* 设置背景颜色 */
  color: #ffffff; /* 设置文字颜色 */
  border: none; /* 去掉边框 */
  border-radius: 5px; /* 设置圆角 */
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px; /* 调整内边距 */
  font-size: 12px; /* 调整字号 */
}

.custom-style {
  width: 60px; /* 设置宽度为100px */
  height: 30px; /* 设置高度为40px */
  background-color: #ffffff; /* 设置背景颜色 */
  color: #000000; /* 设置文字颜色 */
  border: none; /* 去掉边框 */
  border-radius: 5px; /* 设置圆角 */
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px; /* 调整内边距 */
  font-size: 12px; /* 调整字号 */
}

</style>