<template>
  <div id="cart">
<!--   1 导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!--   2 商品的列表-->
    <scroll class="scrollcontent" ref="scroll">
      <cart-list :cartlist="cartlistshow" @scroll-refresh="scrollRefresh"></cart-list>
    </scroll>

<!--   3 底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
  import Scroll from "@/components/common/scroll/Scroll";
  //导入vuex里的计算属性，来自vuex那边的计算数据
  import { mapGetters } from 'vuex';

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    data() {
      return {
      }
    },
    computed: {
      //两种语法
      //使用vuex的方法，将所有的计算属性转到getters里，直接调用数据过来
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength',
        cartlistshow: 'cartList'
      })
    },
    methods: {
      scrollRefresh() {
        this.$refs.scroll.refresh()
        // console.log('刷！')
      }
    }
  }
</script>

<style scoped>
  #cart{
  }

  .nav-bar{
    background-color: var(--color-tint);
    color: #f2f5f8;
    /*font-weight: 700;*/
    z-index: 1;
    position: absolute;
    right: 0;
    left: 0;

  }

  .scrollcontent{
    overflow: hidden;
    top: 44px;
    left: 0;
    right: 0;
    height: calc(100% - 49px - 44px - 40px);
    position: absolute;
  }

</style>
