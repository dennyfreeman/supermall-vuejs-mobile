<template>
  <div id="tab-bar">
<!-- App页面中的tabbar插槽-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
/*定义tabar的总体样式*/

  #tab-bar {
    display: flex;
    background-color: #f6f6f6;

    /*将tab-bar放到下面*/
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*盒子阴影: x平移值 y平移值 模糊度 颜色*/
    box-shadow: 0px -1.3px 1px rgba(100, 100, 100, 0.1);
  }
</style>
