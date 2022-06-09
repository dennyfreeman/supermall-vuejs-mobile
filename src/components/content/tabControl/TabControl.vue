<template>
<div class="tab-control">
  <div v-for="(item, index) in titles"
       class="tab-control-item"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
name: "TabControl",
  props:{
    titles: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return{
     //记录当前标题选中状态
     currentIndex: 0
   }
  },
  methods:{
  itemClick(index){
    this.currentIndex = index;
    //向外面传输事件(很重要)
    this.$emit('tabClick', index)
  }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: #ffffff;
  position: fixed;
  float: bottom;
  z-index: 2;
}

.tab-control-item{
  /*平分列表*/
  flex: 1;
  height: 40px;
  line-height: 40px;
}

.tab-control-item span{
  /*给文字添加一些空白位置*/
  padding: 5px;
}

.active{
  /*选中状态下的颜色*/
  color: var(--color-high-text);
}

.active span{
  /*选中状态下的颜色*/
  border-bottom: 3px solid var(--color-tint);
}
</style>
