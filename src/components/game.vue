<!-- 游戏页的逻辑 -->
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
<template>
  <div class="game" @touchstart="dropStart"  @touchend="dropEnd" @keyup="moveBlock('top')">
    <div class="content">
        <div class="row" v-for="(row,j) in arr" :key="j">
            <div  v-for="(item,i) in row" :key="i">
              <div v-if="i==pNow[0] && j==pNow[1]" class="item active">{{item}}</div>
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
      pNow: [0, 1], //当前的元素坐标
      eStartPositon: [] //开始滑动时位置坐标
    };
  },
  created() {
    let num = "00101010101011111";
    for (let i = 0; i < this.col; i++) {
      this.arr[i] = [];
      for (let j = 0; j < this.row; j++) {
        // console.log(i,j,i * this.row+j)
        this.arr[i][j] = num.slice(i * this.row + j, i * this.row + j + 1);
        // this.arr[i][j] = 1;
      }
    }
    console.log(this.arr);
    // PC端监听键盘的上下左右
    document.onkeydown = this.keybordMove;
  },
  methods: {
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
      switch (e.key){
        case 'ArrowUp' : this.moveBlock('top');break;
        case 'ArrowDown' : this.moveBlock('bottom');break;
        case 'ArrowRight' : this.moveBlock('right');break;
        case 'ArrowLeft' : this.moveBlock('left');break;
      }
    },
    // 根据已知方向移动小块
    moveBlock: function(direction) {
      console.log('移动')
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
      this.arr[i][j] = this.arr[i][j] == "1" ? "0" : "1";
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
.game
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  background #eee
  .content
    background rgba(1, 1, 1, 0.1)
    overflow hidden
    border-radius 20px
    padding 10px
    height 510px
    .row
      display flex
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
      animation blockEnter 0.3s
    .active
      background orange
      transition all 0.5s
      animation blockActiveEnter 0.3s

@keyframes blockEnter {
  50% {
    transform scale(1.05)
  }
  100%{
    transform scale(1)
  }
}

@keyframes blockActiveEnter {
  50% {
    transform scale(1.05)
  }
  100%{
    transform scale(1)
  }
}


</style>
