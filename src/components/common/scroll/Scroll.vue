<template>
<!--  ref可以避免组件外的重名冲突-->
<!--
  ref如果是绑定在组建中，
  那么通过“this.$refs.refname”
  获取到的是一个组件对象
-->
<!--
  ref如果是绑定在普通的元素中，
  那么通过"this.$refs.refname"
  获取到的是一个元素对象
-->
<!--
  所以一般在组件中要引用元素的话
  最好不要用原生的
  document.querySelector()
  很容易与组件外面的元素冲突
-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot>
<!--        滚动内容-->
      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  //将监听的属性传到父组件
  props: {
    //将监听位置的属性的默认值设置
    probeType: {
      type: Number,
      default: 0
    },
    //上拉加载更多
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll: null,
      message: '这里来自scroll哦',
    }
  },
  mounted() {
    //1、创建BScroll对象
    //利用ref引用
    this.scroll = new BScroll(this.$refs.wrapper, {
      //关闭原生滚动属性（一定要加！）
      observeDOM: true,
      click: true,
      //设置监听购房时
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    //2、监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      //向外传输
      this.$emit('scroll', position)
    })

    // 3、监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        //将事件传出去
        this.$emit('pullingUp')
      })
    }


  },
  methods: {
    scrollTo(x, y, time=300) {
      // &&即是判断符号‘与’，当前面的未执行，那后面的就不会被执行
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      //这里判断表达式是，当this.scroll有值的时候返回this.scroll.y的值，没有就返回0
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
  .content{
  }
</style>
