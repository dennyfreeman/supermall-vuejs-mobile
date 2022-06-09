<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed: {
    //计算选中的商品总值，（使用了高级的filter）
    totalPrice() {
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
        //返回checked的布尔类型给reduce（异步操作）
      }).reduce((preValue, item) => {
        //当checked为true是，就获取item，返回值为preValue的总计
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {

      //1、使用filter筛选器
      //使用filter筛选出为true的checked
      // return !(this.$store.state.cartList.filter(item => {
      //   //当购物车的商品类表中checked全部为选中的时候
      //   return item.checked !== true
      // }).length)

      //2、普通遍历
      // for (let item of this.$store.state.cartList) {
      //   if (!item.checked){
      //     return false
      //   }
      // }
      // return true

      //3、使用find
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      // console.log(!this.$store.state.cartList.filter(item => {
      //   return item.checked !== true
      // }).length)

      // 实现全选按钮的实现
      // 当全部选中的时候
      if (this.isSelectAll) {
        //让商品列表所有的checked属性改为false
        this.$store.state.cartList.forEach(item => item.checked = false)
      }
      else //当部分或者全部不选中时
      {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }

    }
  }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    width: 100%;
    background-color: #eeeeee;
    bottom: 49px;
    position: absolute;
    display: flex;
  }

  .check-content{
    display: flex;
    align-items: center;
    padding-top: 4px;
    margin-left: 10px;
    font-size: 14px;
    width: 60px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 20px;
    margin-top: 14px;
    font-size: 14px;
    /*flex为1的时候将此空余的位置全部填满*/
    flex: 1;
  }

  .calculate{
    width: 90px;
    background-color: red;
    color: #ffffff;
    text-align: center;
    padding-top: 12px;
    font-size: 14px;
  }
</style>
