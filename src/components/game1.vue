<!-- 游戏页的逻辑 -->
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
<template>
  <div class="game" @touchstart="dropStart"  @touchend="dropEnd" @keyup="moveBlock('top')">
    <div class="nav">
      <!-- <div class="item" @click="refresh()">o</div> -->
    </div>
    <div class="content">
        <div class="row" v-for="(row,j) in arr" :key="j">
            <div  v-for="(item,i) in row" :key="i">
              <!-- <div v-if="(i==pNow[0] && j==pNow[1]) || (i==pNow[0] && j-1==pNow[1])" class="item active">{{item}}</div> -->
              <!-- <div v-if="i==pNow[0] && j==pNow[1]" class="item active">{{item}}</div> -->
              <div v-if="i==pNow[0] && j==pNow[1]" class="item active"></div>
              <div v-else class="item">{{item}}</div>
            </div>
        </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      arr: [],
      row: 3,
      col: 3,
      pNow: [0, 0], //当前的元素坐标

      eStartPositon: [] //开始滑动时位置坐标
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
      console.log("chongzhi");
      let num = "0001001100101111101010101010011";
      this.arr = [];
      for (let i = 0; i < this.col; i++) {
        this.arr[i] = [];
        for (let j = 0; j < this.row; j++) {
          this.arr[i][j] = num.slice(i * this.row + j, i * this.row + j + 1);
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
      console.log(this.pNow);
      let j = this.pNow[0],
        i = this.pNow[1];
      // console.log(this.arr)
      console.log(this.arr[i][j]);
      // this.arr[i][j] = this.arr[i][j] == "1" ? "0" : "1";
      // this.arr[i+1][j] = this.arr[i+1][j] == "1" ? "0" : "1";
      this.arr[a][b] = this.arr[i][j] == "1" ? "0" : "1";
      console.log(this.arr[i][j]);
      // this.arr[1][0] = "1";
      // 为了视图更新
      let temp = this.arr;
      this.arr = [];
      this.arr = temp;
    }
  }
};
</script>

<style lang="stylus" scoped>
.item
  width 150px
  height 150px
  border-radius 50%
  border 5px solid #999
  background #aaa
  margin 10px
  line-height 150px
  font-size 60px
  font-weight 600
  color #fff
  transition all 0.5s
  animation blockEnter 1s
  animation rotateBlock 10s infinite
  animation-direction reverse
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
    animation rotateBlock 10s infinite
    .row
      display flex
    .active
      background black
      transition all 0.5s
      // animation blockActiveEnter 0.3s
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
    transform scale(1.05) rotateY(180deg)
  100%
    transform scale(1)

@keyframes rotateBlock
  25%
    transform rotate(90deg)
  50%
    transform rotate(180deg)
  75%
    transform rotate(270deg)
  100%
    transform rotate(360deg)
</style>
