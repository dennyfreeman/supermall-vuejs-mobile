<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      //判断是来自商品详情还是来自商品推荐的图片
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      //这里利用事件总线
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      //跳转详情页
      this.$router.push('/detail/' + this.goodsItem.iid)
    }

  }
}
</script>

<style scoped>
.goods-item{
  position: relative;
  width: 48%;
  padding-bottom: 40px;
}

.goods-item img {
  width: 100%;
  border-radius: 14px;
}

.goods-info{
  font-size: 12px;
  overflow: hidden;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}

.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;

}

.goods-info .price{
  color: var(--color-high-text);
  font-size: 14px;
  margin-right: 20px;
}

.goods-info .collect{
  font-size: 14px;
  /*产生对应位置*/
  position: relative;
}

.goods-info .collect::before{
  content: '';
  left: -14px;
  top: 1px;
  /*上一层的.collect必须要相对位置才能让before元素产生对应位置*/
  position: absolute;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>
