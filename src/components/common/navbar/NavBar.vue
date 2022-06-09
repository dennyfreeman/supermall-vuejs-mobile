<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    /*导航高度*/
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  }
  .left, .right{
    width: 60px;
    /*background-color: orange;*/
  }
  .center {
    /*会将中间剩余部分全部占据*/
    flex: 1;
    /*background-color: yellow;*/
  }
</style>
