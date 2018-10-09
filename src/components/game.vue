<!-- 游戏页的逻辑 -->
<template>
  <div class="game">
    <div class="content">
        <div class="row" v-for="(row,index) in arr" :key="index">
            <div class="item" v-for="(item,index) in row" :key="index">{{item}}</div>
        </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      arr: []
    };
  },
  created() {
    let num = "10101010101011111";
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
    background #eee
    .content
        .row
            display flex
        .item
            width 100px
            height 100px
            border-radius 20px
            background #aaa
            margin 10px
            line-height 100px
            font-size 30px
            font-weight 600
            color #fff
</style>
