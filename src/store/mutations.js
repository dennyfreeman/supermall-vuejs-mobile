//导入增强语法
import{
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutations-type";

export default {
  [ADD_COUNTER](state, payload) {
    //给oldProduct的count加数
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    //给商品添加选中属性
    //默认为选中状态
    payload.checked = true
    //将新的商品添加购物车中
    state.cartList.push(payload)
  }
}
