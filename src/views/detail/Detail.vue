<script src="../../store/index.js"></script>
<template>
  <div id="detail">
<!--  1  导航栏-->
    <detail-nav-bar class="detail-nav" @title-click="titleClick" ref="nav"></detail-nav-bar>

<!--    插入BS组件-->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
  <!--  2  轮播图-->
      <detail-swiper :topImages="topImages"></detail-swiper>
  <!--  3  基本信息-->
      <detail-base-info :goods="goods"></detail-base-info>
<!--    4  商品店铺信息-->
      <detail-shop-info :shops="shops"></detail-shop-info>
      <!--    5 商品图片信息-->
      <detail-goods-info :detailimages="detailimages" @image-load="imageLoad"></detail-goods-info>
<!--    6 商品属性信息-->
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
<!--    7 商品评论信息-->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>

      <goods-list :goods="recommends" ref="recommend" class="good-list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <!--    8 底部工具栏-->
    <detail-bottom-bar @add-cart="addToCart"></detail-bottom-bar>

  </div>
</template>

<script>
//导入导航栏
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
//导入轮播图
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
//导入商品描述
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
//导入商品店铺信息
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
//导入商品图片信息
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
//导入商品数据信息
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
//导入商品评论信息
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
//导入底部工具栏
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

//导入推荐商品的展示组件
import GoodsList from "@/components/content/goods/GoodsList";

//导入商品的后端数据
import {getDetail, getRecommend, Goods, Shop, detailInfo, GoodsPara} from "@/network/detail";
//导入BS
import Scroll from "@/components/common/scroll/Scroll";
//导入防抖函数
import {debounce} from "@/components/common/utils";
//导入vuex的actions映射
import { mapActions } from "vuex"
//导入toast组件
import Toast from "@/components/common/toast/Toast";

//导入混入函数（商品刷新）
import {itemListenerMixin, backTopMixin} from "@/common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  data() {
    return{
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailimages: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      //获取特殊标签的顶部位置
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    //1、保存传入的id
    this.iid = this.$route.params.iid

    //2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1、获取顶部的图片轮播数据
      console.log(res)
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages)

      //2、获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3、创建店铺信息的对象
      this.shops = new Shop(data.shopInfo)

      //4、创建图片信息的对象
      this.detailimages = new detailInfo(data.detailInfo)

      //5、创建商品属性的对象
      this.paramInfo = new GoodsPara(data.itemParams.info, data.itemParams.rule)

      //6、取出评论数据
      if(data.rate.cRate !== 0)
      {
        this.commentInfo = data.rate.list[0]
      }
    })

    //3、请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
      // console.log(this.recommends)
    })

    //4、给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      //逐个将每个标签的位置向数组里push
      //获取每个标签的顶部高度$el.offsetTop
      this.themeTopY = []
      //根据最新的数据，对应的DOM是已经被渲染出来
      //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片），
      //offsetTop值不对的时候，都是因为图片的问题
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopY)
    }, 100)

  },
  mounted() {

  },
  updated() {
    // //逐个将每个标签的位置向数组里push
    // //获取每个标签的顶部高度$el.offsetTop
    // this.themeTopY = []
    // //根据最新的数据，对应的DOM是已经被渲染出来
    // //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片），
    // //offsetTop值不对的时候，都是因为图片的问题
    // this.themeTopY.push(0);
    // this.themeTopY.push(this.$refs.params.$el.offsetTop)
    // this.themeTopY.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopY)
  },
  destroyed() {
    //因为详情页不能keepalive，所以使用destroyed
    //当离开详情页时，关掉监听商品图片的刷新
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    //导入vuex映射方法
    ...mapActions(['addCart']),

    // 另一种可改名的方法
    // ...mapActions({
    //   addCart: 'addCart'
    // }),

    imageLoad() {
      this.$refs.scroll.refresh()

      //启用头部跳转位置的获取
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
    },
    contentScroll(position) {
      // console.log(position);
      //1、获取y值
      const positionY = -position.y

      //2、positionY和主题中的值进行对比

      for (let i in this.themeTopY) {
        //让i类型转换为整数类型
        const iy = parseInt(i)

        //判断位置
        if (positionY > this.themeTopY[iy] && positionY < this.themeTopY[iy+1] && iy <= this.themeTopY.length - 1 && iy !== this.currentIndex){
          this.currentIndex = iy
          // console.log(iy)
          //直接使用refs修改标题中的currentIndex
          this.$refs.nav.currentIndex = this.currentIndex
        }
        else if (positionY >= this.themeTopY[this.themeTopY.length - 1] && iy === this.themeTopY.length - 1 && iy !== this.currentIndex)
        {
          this.currentIndex = iy
          // console.log(iy)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //3.是否显示回到顶部(来自mixin的backtop)
      this.listenShowBackTop(position)
    },
    addToCart() {
      //1、获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product)

      //2、将商品添加到购物车
      // dispatch可以调用promise函数
      // console.log(this.$store.state.cartList)

      // 此为非映射方法(直接调用store)使用：
      // this.$store.dispatch('addCart', product).then(res => {
      //   // promise的resolve已传输了反馈
      //   console.log(res)
      // })

      // 此为map映射方法使用（更加好看）
      this.addCart(product).then(res => {
        //当点击添加购物车的时候，展示添加成功
        //使用全局挂载的toast组件（安装难度极其大）,直接传入展示信息和时间即可
        this.$toast.isShow(res, 3000)
        // console.log(this.$toast.isShow)
      })


    }
  }

}
</script>

<style scoped>
  .detail-nav{
    /*在定义层级的时候最好要让定位相对*/
    position: relative;
    z-index: 1;
    background-color: #ffffff;
  }

  #detail{
    z-index: 2;
    background-color: #ffffff;
    /*必须先给父页面固定高度，不然BS没法计算*/
    height: 100vh;
  }

  .content{
    /*计算高度 全高度减去导航栏高度*/
    height: calc(100% - 51px);
    overflow: hidden;
    position: absolute;
    z-index: 1;
    background-color: #ffffff;
  }

  .good-list{
    padding-bottom: 52px;
  }
</style>
