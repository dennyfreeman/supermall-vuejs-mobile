<template>
  <div v-if="Object.keys(shops).length != 0" class="shops-info">
    <div class="shops-logo">
      <img :src="shops.logo" alt="">
      <span>{{shops.name}}</span>
    </div>
    <div class="shops-boxflex">
      <div class="shops-boxleft">
        <div class="sl">
          <span>{{shops.sells|sellCountFilter}}万</span>
          <p>总销量</p>
        </div>
        <div class="sl">
          <span>{{shops.goodsCount}}</span>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shops-boxright">
        <table>
          <tr v-for="(item, index) in shops.score" :key="index" class="shops-boxright-tr">
            <td class="shops-sname">{{item.name}}</td>
            <td class="shops-score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="shops-better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>

      </div>
    </div>
    <div class="shops-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>


  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shops:{
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter: function (value){
      if(value < 10000) return value;
      return (value/10000).toFixed(1)
    }
  }
}
</script>

<style scoped>

.shops-info{
  padding: 12px 5px 0px;
  background-color: white;
}

.shops-logo{
  margin: 5px 0px 10px;
  display: flex;
}

.shops-logo img{
  width: 68px;
  height: 68px;
  margin: 0px 5px 0px;
}

.shops-logo span{
  margin: auto auto auto 20px;
  font-size: 20px;
}

.shops-boxflex{
  display: flex;
  padding: 10px 10px 10px;
}

.shops-boxflex div{
  flex:auto;
  padding-top: 10px;
}

.shops-boxleft{
  display: flex;
  margin: auto;
}

.shops-boxleft div{
  flex: 1;
}

.sl{
  text-align: center;
}

.sl span{
  font-size: 21px;
  font-weight: bold;
}

.sl p{
  margin-top: 10px;
  margin-left: 0px;
  margin-bottom: 10px;
}

.shops-boxright{
  padding-left: 10px;
  margin: 10px 0px 10px;
  border-left: #c0c0c0 solid 1px;
  text-align: right;
}

.shops-boxright table{
  width:100%;
}

.shops-sname{
  padding: 5px 0 5px;
}

.shops-score{
  color: #3fc028;
  padding-right: 10px;
  font-weight: bold;
}

.score-better{
  color: #f44737;
  padding-right: 10px;
}

.shops-better span{
  color:white;
  background-color: #3fc028;
  text-align: center;
  width: 15px;
  font-size: 13px;
}

.better-more span{
  color:white;
  background-color: #f44737;
  text-align: center;
  width: 15px;
  font-size: 13px;
}

.shops-bottom{
  text-align: center;
  margin-top: 10px;
}

.enter-shop{
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}

</style>
