<template>
  <div>
    <!-- Tab选择栏 -->
    <div class="tab-container">
      <!-- 个人标签 -->
      <div
        class="tab-item"
        :class="{ 'active': currentTab === 'personal' }"
        @click="changeTab('personal')"
      >
        个人
      </div>

      <!-- 组织标签 -->
      <div
        class="tab-item"
        :class="{ 'active': currentTab === 'activity' }"
        @click="changeTab('activity')"
      >
        组织
      </div>
    </div>
    <div class="search-bar">
      <img class="search-bar-image" src="../../static/search.png" alt="搜索图标" />
      <input type="text" placeholder="请输入搜索内容" @click="showModalOnInput" />
      <button @click="search">搜索</button>
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
		<button class="close-button" @click="hideModal">关闭</button>
	</div>
		
	</div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 根据选中的标签显示内容 -->
      <div v-if="currentTab === 'personal'">
        <p>个人信息内容</p>
      </div>

      <div v-else-if="currentTab === 'activity'">
        <p>组织信息内容</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'personal',
      showModal: false, // 控制模态框显示与隐藏
	   minpeople: 0,
	   maxpeople: 0,
	   mincost: 0,
	   maxcost: 0,
    };
  },
  methods: {
    // 切换标签
    changeTab(tab) {
      this.currentTab = tab;
    },
    // 点击搜索按钮的事件
    search() {
      // 在这里添加搜索的逻辑
      console.log('搜索功能尚未实现');
      // 假设搜索完成后显示模态框
      this.showModal = true;
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
  },
};
</script>
<style scoped>
.tab-container {
  display: flex;
  justify-content: center; /* 水平方向居中 */
  background-color: aliceblue
}

.tab-item {
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
  font-weight: normal;
}

.tab-item.active {
  font-size: 18px;
  font-weight: bold;
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

.search-bar-image {
  width: 18px;
  height: 18px;
  margin-left: 8px;
}
.content {
  margin-top: 20px;
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
</style>