<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show:{
    //   type:Boolean,
    //   default: true
    // }
  },
  data(){
    return {
      message: '',
      show:false
    }
  },
  methods: {
    isShow(message, duration = 1500) {
      this.show = true;
      this.message = message

      setTimeout(() => {
        this.show = false
        this.message = ''
      }, duration)
    }
  }

}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    /*根据自己宽度和高度，相对位移*/
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0, .75);
    padding: 8px 10px;
    color: #ffffff;
    z-index: 1;
    /*圆角设置*/
    border-radius: 10px;
  }
</style>
