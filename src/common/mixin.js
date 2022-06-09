//混入函数

//导入防抖函数
import {debounce} from "@/components/common/utils";
import BackTop from "@/components/content/backTop/BackTop";


//1、图片加载监听
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //使用防抖函数延迟scroll的刷新频率，提高性能
    //第一个传入函数不能添加括号，加了括号就是返回了一个值而不是函数
    const newRefresh = debounce(this.$refs.scroll.refresh, 100)
    //当加载详情页的时候，继续监听商品图片的刷新
    this.itemImgListener = () => {
      newRefresh()
    }
    //3、监听item中图片加载完成（来自事件总线bus）
    //对监听的事件进行保存
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('这里是mixin')
  }
}

//2、回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick(){
      // console.log('回到顶部')
      // 这里通过refs标注直接访问到了scroll组件里的this.scroll
      console.log(this.$refs.scroll.message)
      //这里等于调用了this.scroll.scrollTo(x, y, time)跳转功能
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)

      //这个利用回调方法
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    //混入是否显示回到顶部函数
    listenShowBackTop(position) {
      if ((-position.y) > 1000){
        this.isShowBackTop = true
      }
      else {
        this.isShowBackTop = false
      }
    }
  }
}
