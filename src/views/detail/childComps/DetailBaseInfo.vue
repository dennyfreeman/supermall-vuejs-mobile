<template>
  <div v-if="Object.keys(goods).length != 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info{
    margin: 12px 8px 8px;
    padding-bottom: 8px;
    border-bottom: 5px solid #f2f5f8;
    background-color: #ffffff;
  }

  .info-title{
    font-size: 20px;
    font-weight: 580;
  }

  .info-price{
    padding: 8px 0px 16px;
  }

  .n-price{
    color: var(--color-high-text);
    font-size: 24px;
    font-weight: normal;
    padding-right: 5px;
  }

  .o-price{
    text-decoration: line-through;
  }

  .discount{

  }

  .info-other{
    margin: 0px 0px 5px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    display: flex;
    line-height: 30px;
    justify-content: space-between;
    color: #9d9d9d;
  }

  .info-service{
    margin: 10px 0px 10px;
    display: flex;
    line-height: 60px;
    justify-content: space-between;
  }

  .info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }

</style>
