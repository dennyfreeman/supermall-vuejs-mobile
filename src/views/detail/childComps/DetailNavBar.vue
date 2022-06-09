<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backclick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
             :class="{active: index === currentIndex}"
            @click="titleclick(index)">
          {{item}}
        </div>
      </div>
      <div slot="right"></div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods:{
    titleclick(index) {
      this.currentIndex = index
      this.$emit('title-click', index)
    },
    backclick() {
      //直接返回上一级路由
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    margin: 0px 10%;
    padding-top: 1%;
  }

  .title-item{
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img{
    height: 90%;
    margin-top: 20%;
    margin-bottom: 0;
  }

</style>
