<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
name: "GoodsList",
  components: {
   GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods{
    display: flex;
    /*wrap可以让元素保持原来的宽度，且平均分布在一行中，不够则向下*/
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
    background-color: #ffffff;
  }

</style>
