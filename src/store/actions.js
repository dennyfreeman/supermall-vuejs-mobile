//导入增强语法
import{
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutations-type";

export default {
  addCart(context, payload) {

    //使用Promise方法来判断以下方法是否已完全执行
    return new Promise((resolve, reject) => {
      //payload新添加的商品
      //数组常用方法：
      //pop()push() unshift() shift() reverse() sort() concat() slice() splice()indexOf()lastIndexOf()map()filter()reduce()join()

      // let oldProduct = null
      // for (let item of state.cartList){
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      //1、查找之前数组中是否有该商品
      // 此处oldProduct就是cartList数组中的一个，只要修改oldProduct就能修改其中的值
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2、判断oldProduct
      if (oldProduct) { //旧商品+1
        // 判断出购物车中已有该商品，直接修改它的count
        //commit直接将数据提交到mutations中处理
        context.commit(ADD_COUNTER, oldProduct)

        //当旧商品加一成功后
        resolve('再次添加成功') //向前面传输res

      } else { //新商品添加
        //判断出该为新的商品，将他添加到cartList中
        payload.count = 1
        context.commit(ADD_TO_CART, payload)

        //当新商品添加成功时
        resolve('新商品添加成功') //向前面传输res
      }
    })
  }
}
