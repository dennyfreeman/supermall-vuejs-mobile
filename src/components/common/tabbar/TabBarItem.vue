<template>
  <div class="tab-bar-item">
<!-- tabbar中的按钮插槽-->
    <div v-if="!isActive" @click="itemClick">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle" >
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,  //MainTabBar标签传来的path
    activeColor: {
      type: String,
      //默认活跃状态为红色
      default: 'red'
    }
  },
  data(){
    return{
      // isActive: false
    }
  },
  computed:{
    //用于判断哪个路由处于活跃状态
    isActive(){
      //哪一个路由处于活跃$route就获取那个路由
      //indexOf就是看现在获取到的活跃路径是否存在this.path，如果找到一个就等于1，其他的都为false
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      //如果是活跃状态就传递activeColor，若不是就传递一个空对象{}
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      //路由跳转触发，在props的父组件传来
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
/*定义tabbar的活动样式和按钮样式*/

.tab-bar-item{
  flex: 1;
  text-align: center;
  /*移动端常用高度*/
  height: 49px;
  font-size: 12px;
}

.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /*去除图片底部空白*/
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>
