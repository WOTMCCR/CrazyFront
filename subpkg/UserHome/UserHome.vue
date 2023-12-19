<template>
  <view class="group" style="position: relative z-index: 1">
    <image class="image_7" src="../static/back.png"/>
    <view class="header" style="position: relative; z-index: 2;">
      <image class="avatar" :src="user.avatar" />
      <view class="NameAndDescription">
        <text class="name" v-if="user">{{user.name}}</text>
        <text class="description">{{user.introduction}}</text>
      </view>
    </view>
  </view>

  <view class="navigation-options">
    <navigator :style="{ color: currentTab === 0 ? '#ff0000' : '#333333' }" @click="changeTab(0)">
      <text class="nav-option">Activity</text>
    </navigator>
    <navigator :style="{ color: currentTab === 1 ? '#ff0000' : '#333333' }" @click="changeTab(1)">
      <text class="nav-option">Moment</text>
    </navigator>
  </view>

  <!-- Activity List -->
  <view class="my">
    <view v-if="CardsList.length > 0" v-for="(item, index) in CardsList" :key="index" @click="gotoDetail(item)">
      <new-card :detail="item">
      </new-card>
    </view>
    <view v-else>
      <text>No activity data available.</text>
    </view>
  </view>

</template>

<script>
export default {
  data() {
    return {
      official: 1,
      currentTab: 0,
      //切换
      tabs: ['动态', '活动'],
      //卡片列表
      CardsList: [],
      user:{},
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
      // code: '',
      pages: '',
      total: '',
      isloading: false,
      userId: '',
    };
  },
  onLoad(options) {
    this.pageQuery.isAsc = options.isAsc || '';
    this.pageQuery.sortBy = options.sortBy || '';
    this.userId = options.id || 1;
    this.loadData();
  },
  methods: {
    async loadData(cb) {
      try {
        //"/activity/findByUser/{userId}" :
        // const endpoint = this.currentTab === 0 ? "/activity/userId/1" :
        //     "/moment/userId/1";
        let endpoint = this.currentTab === 0 ? "/activity/userId/" : "/moment/userId/";
        endpoint += this.userId;

        console.log(endpoint);
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
        if (res.code == "200") {
          this.CardsList = [...this.CardsList, ...res.data.list];
          this.total = res.data.total;
          this.pages = res.data.pages;
          this.user = res.data.list[0].user;
          console.log(this.CardsList.user);
          console.log(this.pages);
          uni.$showMsg("Data loaded successfully");
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
    changeTab(tabIndex) {
      this.pageQuery.pageNo = 1;
      this.total = 0;
      this.CardsList = [];
      this.currentTab = tabIndex;
      this.loadData();
    },
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

<style scoped lang="scss">
.my {
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

.group {

  .image_7 {
    width: 100vw;
    height: 60vw;
  }

  .ml-7 {
    margin-left: 12.21rpx;
  }

  .mt-9 {
    margin-top: 15.7rpx;
  }

  .page {
    background-color: #e9e9e9;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }

  .group {
    overflow-y: auto;
  }

  .image_7 {
    width: 100vw;
    height: 69.7674vw;
  }

  .group_2 {
    margin: -66.28rpx 0 -13.95rpx;
  }

  .section_3 {
    padding: 0 48.84rpx 22.67rpx;
    background-color: #ffffff;
    border-radius: 55.81rpx;
    box-shadow: 0rpx 6.98rpx 6.98rpx #00000040;
    height: 139.53rpx;
  }

  .image_8 {
    margin-top: -57.56rpx;
    border-radius: 83.72rpx;
    width: 174.42rpx;
    height: 174.42rpx;
  }

  .text_2 {
    color: #000000;
    font-size: 34.88rpx;
    font-family: Inter;
    line-height: 32.48rpx;
  }

  .list {
    padding: 33.14rpx 34.88rpx 0 40.12rpx;
  }

  .list-item:first-child {
    margin-top: 0;
  }

  .font {
    font-size: 27.91rpx;
    font-family: Inter;
    line-height: 41.86rpx;
    color: #000000;
  }

  .font_2 {
    font-size: 22.67rpx;
    font-family: Inter;
    line-height: 16.71rpx;
    color: #536471;
  }

  .text_3 {
    color: #a9a9a9;
    font-size: 24.42rpx;
    line-height: 22.73rpx;
  }

  .tab-bar {
    padding: 20.93rpx 104.65rpx 10.47rpx;
    background-color: #ffffff;
  }

  .pos_3 {
    position: absolute;
    left: 103.83rpx;
    top: 50%;
    transform: translateY(-50%);
  }


  .pos_4 {
    position: absolute;
    right: 117.42rpx;
    top: 50%;
    transform: translateY(-50%);
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    padding: 0 48.84rpx 22.67rpx;
    background-color: #ffffff;
    border-radius: 55.81rpx;
    box-shadow: 0rpx 6.98rpx 6.98rpx #00000040;
    height: 160rpx;

    margin: -66.28rpx 0 -13.95rpx;

    .avatar {
      margin-top: -30.56rpx;
      border-radius: 83.72rpx;
      width: 174.42rpx;
      height: 174.42rpx;
    }

    .NameAndDescription {
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;
      margin-top: 20rpx;

      .name {
        font-size: 27.91rpx;
        //字体
        font-family: open;
        line-height: 21.59rpx;
        font-weight: 600;
        color: #000000;
        margin-bottom: 15rpx;
      }

      .description {
        font-size: 27.91rpx;
        font-family: Inter;
        line-height: 25.85rpx;
        color: #536471;
      }

    }
  }
}

</style>