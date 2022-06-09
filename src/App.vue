<template>
  <div id="app">
    <keep-alive exclude="Detail">
<!--  让所有标签都保持活跃状态，不需要每次切换重新加载-->
<!--  排除商品详情页面，因为每次都要新的数据-->
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from "@/components/content/mainTabBar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/*引用base样表*/
@import "assets/css/base.css";
</style>
