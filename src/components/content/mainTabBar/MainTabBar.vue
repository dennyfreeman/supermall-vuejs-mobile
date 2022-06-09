<template>
  <tab-bar>
    <!--tabbar插槽数据插入在此-->
    <!--   这里的activeColor就可以改变活跃状态的颜色，这个activeColor在标签里没有实际的实现作用，只是为了传递改变数据的变量-->
    <tab-bar-item path="/home">
      <!--  tabbar的按钮插槽数据插入在此-->
      <!--    活跃-->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <!--    非活跃-->
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>

</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";

export default {
  // name: "MainTabBar",   这个是一样的效果的起名
  name: "main-tab-bar",
  components: {
    TabBar,
    TabBarItem,
  }
}
</script>

<style scoped>

</style>
