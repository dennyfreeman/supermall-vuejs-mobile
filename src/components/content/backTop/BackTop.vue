<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
name: "BackTop"
}

</script>

<style scoped>
  .back-top {
    /*fixed是固定在浏览器窗口固定位置*/
    position: fixed;
    right: 10px;
    bottom: 53px;
    z-index: 5;
  }

  .back-top img{
    height: 43px;
    width: 43px;
  }
</style>
