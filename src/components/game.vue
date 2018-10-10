<!-- 游戏页的逻辑 -->
<template>
  <div class="game">
    <div class="content">
        <div class="row" v-for="(row,i) in arr" :key="i">
            <div  v-for="(item,j) in row" :key="j">
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
      pNow:[0,1]
    };
  },
  created() {
    let num = "00101010101011111";
    let row = 3;
    let col = 3;
    for (let i = 0; i < col; i++) {
      this.arr[i] = num.slice(i * row, i * row + row);
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
        background rgba(1,1,1,.1)
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
        .active 
            background orange
</style>
