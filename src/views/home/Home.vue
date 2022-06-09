<template>
  <div id="home">
<!--  1  标题组件-->
    <nav-bar class="home-nav">
<!-- 这里三个插槽-->
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    ></tab-control>

<!--   7 添加流畅滚动组件-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
           >
      <!--  2  轮播图组件-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>

      <!--  3  推荐框组件-->
      <home-recommend-view :recommends="recommends"></home-recommend-view>

      <!--  4 推荐图组件-->
      <feature-view></feature-view>

      <!--  5 小标题控制组件-->
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
      ></tab-control>

      <!--  6 小标题控制下的橱柜组件-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

<!--   8 回到顶部组件-->
<!--    .native可以让组件的v-on监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

//一、子组件
//1 轮播图组件
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
//2 推荐框组件
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
//3 导入推荐图组件
import FeatureView from "@/views/home/childComps/FeatureView";

//二、公共组件
//1 标题组件
import NavBar from "@/components/common/navbar/NavBar";
//2 导入小标题跳转功能组件
import TabControl from "@/components/content/tabControl/TabControl";
//3 导入商品展示小组件
import GoodsList from "@/components/content/goods/GoodsList";
//4 导入流畅滚动组件
import Scroll from "@/components/common/scroll/Scroll";

//工具箱导入
import {debounce} from "@/components/common/utils";
//导入混入函数（图片刷新）
import {itemListenerMixin, backTopMixin} from "@/common/mixin";
//网络请求数据导入
//因为在network/home请求文件中，此函数不是用默认函数导出，所以要使用大括号圈住
import {
  getHomeMultidata,
  getHomeGoods
} from "@/network/home";



export default {
  name: "Home",
  //组件注册位置
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  data(){
    return {
      // 数据保存位置
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: [] },
        'new': {page: 0, list: [] },
        'sell': {page: 0, list: [] },
      },
      //默认先展示pop
      currentType: 'pop',
      tabOffsetTop:0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    //更换小标题下的橱柜
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  //首页组件创建时（生命周期）
  created() {
    //开始发送网络请求
    //1、请求多个数据
    this.getHomeMultidata() //将保存数据的方法放到了methods里

    //2、请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  //组件创建完成时（生命周期）
  mounted() {
  },
  destroyed() {
    //在App那里加上keep-alive标签后，所有页面均不会被销毁
    console.log('home destroy')
  },
  activated() {
    //从其他标签回来时期
    //当返回当前的时候，调用scrollTo去到原来位置
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    console.log(this.saveY)
  },
  deactivated() {
    //1、保存Y值
    //切到其他标签时期
    //当页面离开时，记下当前位置
    this.saveY = this.$refs.scroll.getScrollY()

    //2、取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },

  methods: {
    /*
      网络请求相关的方法
     */
    //1、保存多个数据（来自1网络请求）
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        //在promise中，this可以往上找到我们的result
        //对结果做一个保存
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //2、保存商品数据（来自2网络请求）
    getHomeGoods(type){
      //获取页码
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // //当完成一次上拉加载后，刷新一次
        setTimeout(() => {
          this.$refs.scroll.finishPullUp()
        }, 2000)
      })
    },

    /*
    事件监听的方法
     */
    tabClick(index){
      //判断语句，判断传入index对应哪一个
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    //滚动区域显示回到顶部判断函数
    contentScroll(position){
      //1、判断BackTop是否显示
      //当页面滚到1000以上就将按钮隐藏起来
      //是否显示回到顶部(来自mixin的backtop)
      this.listenShowBackTop(position)

      //2、决定tabControl是否吸顶(position: fixed)
     if ((-position.y) > this.tabOffsetTop) {
       this.isTabFixed = true
     }
     else {
       this.isTabFixed = false
     }

    },
    // //上拉加载更多方法
    // loadMore() {
    //   //再次去除当前类型，然后再回到getHomeGoods函数里，往里自动加一页
    //   this.getHomeGoods(this.currentType)
    // }

    //滚动到底部加载更多方法
    loadMore(){
      //获取当前类型的
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad() {
      //3、获取tabControl的offsetTop
      // 所有组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop)
    }
  }
}
</script>

<style scoped>
  #home {
    /*这里是给标题提供空白位置*/
    /*padding-top: 44px;*/
    /*vh -> viewport height 视口长度*/
    height: 100vh;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /*固定导航栏位置*/
    /*position: fixed;*/
    /*left: 0px;*/
    /*right: 0px;*/
    /*top:0;*/
    z-index: 9;
  }

  /*better-scroll把原生的吸顶效果给去除了*/
  .tab-control {
    /*小标题粘滞定位*/
    position: relative;
    z-index: 9;
    top: -1px;
  }

  /*.content{*/
  /*  !*通过计算属性确定wrapper的高度*!*/
  /*  height: calc(100% - 49px);*/
  /*  overflow: hidden;*/
  /*}*/



  /*出现bug无法使用小标题*/
  /*更好的方法设置wrapper，利用定位的方法*/
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
