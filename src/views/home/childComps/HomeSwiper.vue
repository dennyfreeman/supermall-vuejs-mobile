<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图组件
import {Swiper, SwiperItem} from '@/components/common/swiper/index';

export default {
  name: "HomeSwiper",
  data() {
    return{
      isLoad: false
    }
  },
  //获取home里的数据
  props:{
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper, SwiperItem
  },
  methods: {
    //轮播图加载监控

    imageLoad() {
      if (!this.isLoad) {
        //向Home传递加载完成事件汇报
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
