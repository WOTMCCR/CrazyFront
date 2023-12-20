<template>
  <view class="MomentDetail">
    <new-card v-if="MomentList.length > 0" :detail="MomentList[currentMoment]"/>
  </view>

</template>

<script>
export default {
  data() {
    return {
      MomentList: [],
      UserList: [],
      userId: '',
      currentMoment: 0,
      currentUser: 0,
      startX: 0, // 触摸开始时的x坐标
      flag: 0,
      UserpageQuery: {
        pageNo: 1,
        pageSize: 6,
        isAsc: '',
        sortBy: '',
      },
      MomentpageQuery: {
        pageNo: 1,
        pageSize: 6,
        isAsc: '',
        sortBy: '',
      },
      Momentpages: '',
      Userpages: '',
      Momenttotal: '',
      Usertotal: '',
      isloading: false,
    };
  },
  onLoad(options) {
    console.log(options);
    const Moment_id = BigInt(options.id);
    console.log(Moment_id);
    this.loadData(Moment_id);
    uni.$on('header-swipe', this.handleHeaderSwipe);
    uni.$on('body-swipe', this.handleBodySwipe);
    uni.$on('header-click', this.handleHeaderClick);
  },
  methods: {
    async loadData(Moment_id) {
      try {
        const endpoint = "/moment/" + Moment_id;
        const {
          statusCode,
          data: res
        } = await uni.$http.get(endpoint);
        console.log(res);
        if (statusCode === 200) {
          // Update the corresponding list based on the current tab


          this.MomentList[0] = res;
          this.UserList[0] = res.user;
          this.userId = res.user.id;
          console.log(this.userId);
          this.flag = 0;
          uni.$showMsg("Data loaded successfully");
        } else {
          console.error("Failed to load data. Server returned status code:", statusCode);
        }
        await this.loadMomentList();
        await this.loadUser();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        uni.hideLoading();
      }
    },
    async loadMomentList() {
      try {
        const endpoint = "/moment/userId/" + this.userId;
        this.loading = true;
        const {
          statusCode,
          data: res
        } = await uni.$http.post(endpoint, this.MomentpageQuery)
        if (statusCode === 200) {
          // Update the corresponding list based on the current tab
          this.MomentList = [...this.MomentList, ...res.data.list];

          this.Momenttotal = res.data.total;
          this.Momentpages = res.data.pages;
          this.currentMoment = 0;
          uni.$showMsg("Data loaded successfully");
        } else {
          console.error("Failed to load data. Server returned status code:", statusCode);
        }
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        uni.hideLoading();
      }
    },
    async loadUser() {
      try {
        const endpoint = "/user/userList";
        this.loading = true;
        const {
          statusCode,
          data: res
        } = await uni.$http.post(endpoint, this.UserpageQuery)
        if (statusCode === 200) {
          // Update the corresponding list based on the current tab
          this.UserList = [...this.UserList, ...res.list];
          this.Usertotal = res.total;
          this.Userpages = res.pages;
          uni.$showMsg("Data loaded successfully");
        } else {
          console.error("Failed to load data. Server returned status code:", statusCode);
        }
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        uni.hideLoading();
      }
    },
    clickCard() {
      // Handle card click if needed
    },
    async handleHeaderSwipe(direction) {
      const incrementUser = async () => {
        this.currentUser = (this.currentUser + 1) % this.UserList.length;
        if (this.currentUser === 0) {
          if (this.UserpageQuery.pageNo < this.Userpages) {
            this.UserpageQuery.pageNo++;
          } else {
            this.UserpageQuery.pageNo = 1;
          }
          if(this.loading === false)
            await this.loadUser(); // Wait for the user data to be loaded
        }
      };
      const decrementUser = async () => {
        this.currentUser = (this.currentUser - 1 + this.UserList.length) % this.UserList.length;
        if (this.currentUser === this.UserList.length - 1) {
          if (this.UserpageQuery.pageNo > 1) {
            this.UserpageQuery.pageNo--;
          } else {
            this.UserpageQuery.pageNo = this.Userpages;
          }
          if(this.loading === false)
            await this.loadUser(); // Wait for the user data to be loaded
        }
      };
      console.log(`Header swiped ${direction}`);
      if (direction === 'left') {
        await incrementUser();
      } else if (direction === 'right') {
        await decrementUser();
      }
      // console.log(this.UserList);
      this.userId = this.UserList[this.currentUser].id;
      this.MomentList = [];
      this.MomentpageQuery.pageNo = 1;
      this.Momentpages = '';
      this.Momenttotal = '';
      this.currentMoment = 0;
      await this.loadMomentList();
      if (this.MomentList.length === 0) {
        await this.handleHeaderSwipe(direction);
      }
    },

    async handleBodySwipe(direction) {
      const incrementMoment = async () => {
        this.currentMoment = (this.currentMoment + 1) % this.MomentList.length;
        if (this.currentMoment === 0) {
          if (this.MomentpageQuery.pageNo < this.Momentpages) {
            this.MomentpageQuery.pageNo++;
          } else {
            this.MomentpageQuery.pageNo = 1;
            this.handleHeaderSwipe('left');
          }
          this.MomentList = [];
          await this.loadMomentList();
        }
      };
      const decrementMoment = async () => {
        this.currentMoment = (this.currentMoment - 1 + this.MomentList.length) % this.MomentList.length;
        if (this.currentMoment === this.MomentList.length - 1) {
          if (this.MomentpageQuery.pageNo > 1) {
            this.MomentpageQuery.pageNo--;
          } else {
            this.MomentpageQuery.pageNo = this.Momentpages;
          }
          this.MomentList = [];
          await this.loadMomentList();
          await decrementMoment();
        }
      };
      console.log(`Body swiped ${direction}`);
      if (direction === 'left') {
        await incrementMoment();
        console.log(this.currentMoment);
      } else if (direction === 'right') {
        await decrementMoment();
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
  },
};

</script>

<style scoped>
.MomentDetail >>>
.new-card {
  min-height: calc(75vh);
}

.MomentDetail {
  padding-top: 20rpx;
  padding-left: 32.12rpx;
  padding-right: 32.12rpx;
}

</style>