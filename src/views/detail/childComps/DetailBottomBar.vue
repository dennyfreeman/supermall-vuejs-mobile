<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buyIt">购买</div>
    </div>
<!--    <sport-ball ref="ball" class sport-ball></sport-ball>-->
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      //将事件传回去父组件中
      this.$emit('add-cart')
    },
    buyIt() {
      console.log('buy')
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 58px;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text{
    font-size: 13px;
  }

  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png");
    background-size: 22px;

  }

  .bar-left .service{
    background-position: 0 -52px;
  }

  .bar-left .shop{
    background-position: 0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #ffffff;
    line-height: 58px;
  }

  .bar-right .cart{
    background-color: #ffe817;
    color: #333333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

  .sport-ball{
    position: absolute;
    left: 225px;
    bottom: 20px;
  }

</style>
