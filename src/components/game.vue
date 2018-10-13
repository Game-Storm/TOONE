<!-- 游戏页的逻辑 -->
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
<template>
  <div class="game" @touchstart="dropStart"  @touchend="dropEnd" @keyup="moveBlock('top')">
    <div class="nav">
      <div class="item" @click="refresh()">◎</div>
    </div>
    <div class="content">
        <div class="row" v-for="(row,j) in arr" :key="j">
            <div  v-for="(item,i) in row" :key="i">
              <!-- <div v-if="(i==pNow[0] && j==pNow[1]) || (i==pNow[0] && j-1==pNow[1])" class="item active">{{item}}</div> -->
              <!-- <div v-if="i==pNow[0] && j==pNow[1]" class="item active">{{item}}</div> -->
              <div 
                class="item" 
                :class="{
                  'active':i==pNow[0] && j==pNow[1],
                  'item-used':item.isUsed,
                  'item-sucess':!(i==pNow[0] && j==pNow[1]) && win
                  }">{{item.num}}</div>
              <!-- <div v-else class="item">{{item}}</div> -->
            </div>
        </div> 
    </div>
  </div>
</template>

<script>
// 引入数字逻辑
import { num } from "../utils/num.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      arr: [],
      row: 4,
      col: 4,
      pNow: [0, 0], //当前的元素坐标
      eStartPositon: [], //开始滑动时位置坐标
      win: false
    };
  },
  created() {
    this.refresh();
    // PC端监听键盘的上下左右
    document.onkeydown = this.keybordMove;
    // 阻止微信默认的橡皮筋效果
    document.body.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
      },
      { passive: false }
    ); //passive 参数不能省略，用来兼容ios和android
  },
  methods: {
    // 初始化棋局
    refresh: function() {
      console.log(num);
      let nums = JSON.parse(JSON.stringify(num));
      this.win = false;
      this.pNow = [0, 0];
      this.arr = [];
      for (let i = 0; i < this.col; i++) {
        this.arr[i] = [];
        for (let j = 0; j < this.row; j++) {
          // this.arr[i][j] = num.slice(i * this.row + j, i * this.row + j + 1);
          this.arr[i][j] = nums[i * this.row + j];
          // console.log(this.arr[i][j]);
        }
      }
    },
    // 触摸事件开始
    dropStart: function(e) {
      // console.log(e)
      this.eStartPositon = [e.touches[0].clientX, e.touches[0].clientY];
    },
    // 触摸事件结束
    dropEnd: function(e) {
      let direction = ""; // left top right bottom
      let xDistance = e.changedTouches[0].clientX - this.eStartPositon[0];
      let yDistance = e.changedTouches[0].clientY - this.eStartPositon[1];
      // 方向滑动需要大于 50 算滑动，否则视为误触碰
      if (Math.abs(xDistance) > 50 || Math.abs(yDistance) > 50) {
        if (Math.abs(xDistance) > Math.abs(yDistance)) {
          direction = xDistance > 0 ? "right" : "left";
        } else {
          direction = yDistance > 0 ? "bottom" : "top";
        }
        this.moveBlock(direction);
      }
    },
    // 键盘上的移动事件
    keybordMove: function(e) {
      console.log(e);
      switch (e.key) {
        case "ArrowUp":
          this.moveBlock("top");
          break;
        case "ArrowDown":
          this.moveBlock("bottom");
          break;
        case "ArrowRight":
          this.moveBlock("right");
          break;
        case "ArrowLeft":
          this.moveBlock("left");
          break;
      }
    },
    // 根据已知方向移动小块并更改棋局
    moveBlock: function(direction) {
      console.log("移动");
      let b = this.pNow[0],
        a = this.pNow[1];
      // this.arr[a][b] = this.arr[a][b] == "1" ? "0" : "1";
      if (direction == "bottom") {
        if (this.pNow[1] >= this.col - 1) {
          return;
        }
        this.pNow[1]++;
      } else if (direction == "top") {
        if (this.pNow[1] <= 0) {
          return;
        }
        this.pNow[1]--;
      } else if (direction == "right") {
        if (this.pNow[0] >= this.row - 1) {
          return;
        }
        this.pNow[0]++;
      } else if (direction == "left") {
        if (this.pNow[0] <= 0) {
          return;
        }
        this.pNow[0]--;
      }
      let j = this.pNow[0],
        i = this.pNow[1];
      // console.log(this.arr)
      if (this.arr[i][j].isUsed) {
        this.pNow[0] = b;
        this.pNow[1] = a;
        return;
      }
      this.arr[i][j].num = this.arr[i][j].num == "1" ? "0" : "1";
      this.arr[i][j].isUsed = this.arr[i][j].num == "1" ? true : false;
      // this.arr[i+1][j] = this.arr[i+1][j] == "1" ? "0" : "1";
      console.log(this.arr[i][j]);
      // this.arr[1][0] = "1";
      // 为了视图更新
      let temp = this.arr;
      this.arr = [];
      this.arr = temp;
      this.judgeSuccess();
    },
    //判断是否胜利逻辑
    judgeSuccess: function() {
      let isWin = true;
      for (let i = 0; i < this.col; i++) {
        for (let j = 0; j < this.row; j++) {
          if (this.arr[i][j].num == 0) {
            isWin = false;
            break;
          }
        }
        if (!isWin) break;
      }
      this.win = isWin;
    }
  }
};
</script>

<style lang="stylus" scoped>
.item
  width 150px
  height 150px
  border-radius 20px
  background #aaa
  margin 10px
  line-height 150px
  font-size 60px
  font-weight 600
  color #fff
  transition all 0.5s
  animation blockEnter 1s
.item-used
  background #777
  color #999
.item-sucess
  transform scale(0)
  opacity 0
.game
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content center
  align-items center
  background #eee
  .content
    background rgba(1, 1, 1, 0.1)
    overflow hidden
    border-radius 20px
    padding 10px
    display flex
    flex-direction column
    .row
      display flex
    .active
      background orange
      transition all 0.5s
      animation blockActiveEnter 0.3s
@keyframes blockEnter
  0%
    transform scale(1.05)
    // transform translateY(-1000px)
  // 80%
  // transform translateY(-0px)
  // 90%
  // transform translateY(-20px)
  100%
    transform scale(1)
@keyframes blockActiveEnter
  50%
    transform rotateY(35deg)
  75%
    transform scale(1.05) rotateX(35deg)
  100%
    transform scale(1)
</style>
