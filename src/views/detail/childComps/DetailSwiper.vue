<template>
<!--    <swiper class="detail-swiper">-->
<!--      <swiper-item v-for="item in topImages" class="swiper-item">-->
<!--        <img :src="item" alt="">-->
<!--      </swiper-item>-->
<!--    </swiper>-->
  <div class="block">
    <el-carousel :height="elheight" arrow="always">
      <el-carousel-item v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>


</template>

<script>
// 导入轮播图组件
import {Swiper, SwiperItem} from '@/components/common/swiper/index';

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem,
  },
  data(){
    return {
      elheight: '450px',
    }
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

  .el-carousel__item img {
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
