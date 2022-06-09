<template>
  <div class="cart-list" ref="cartlist">
    <cart-list-item v-for="(item, index) in cartlist"
                    :key="index" :product="item">

    </cart-list-item>
  </div>
</template>

<script>
import CartListItem from "@/views/cart/childComps/CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  data() {
    return{
      // listwatcher: 0
    }
  },
  props: {
    cartlist:{
      type: Array,
      default: []
    }
  },
  methods: {
  },
  mounted() {
  },
  activated() {
    // 每次回到此页面必须刷新一次
    this.$emit('scroll-refresh')

  },
  watch: {
    // cartlist() {
    //   if(this.listwatcher !== this.cartlist.length)
    //   {
    //     console.log('来自watcher')
    //     console.log(this.listwatcher)
    //     this.listwatcher++
    //     this.listRefresh()
    //   }
    // }

  }
}
</script>

<style scoped>
  .cart-list{
    /*这里列表的高度必须高于scrollcontent的高度，高出一点即可*/
    height: 100%;
    /*background-color: yellow;*/
  }

</style>
