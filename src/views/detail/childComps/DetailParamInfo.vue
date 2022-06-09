<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">
    <table class="param-info-sizes"
      v-for="(table, index) in paramInfo.sizes" :key="index" >
      <tr v-for="(tr, indey) in table" :key="indey"
          >
        <td v-for="(td, indez) in tr" :key="indez"
            :class="{'param-info-tr1': indez === 0}">
          {{td}}
        </td>
      </tr>
    </table>
    <table class="param-info-infos">
      <tr v-for="(tr, index) in paramInfo.infos">
        <td class="info-param-key">
          {{tr.key}}
        </td>
        <td class="param-value">
          {{tr.value}}
        </td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .param-info{
    position: relative;
    padding: 10px 20px 10px;
    background-color: white;
  }

  .param-info-sizes{
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .param-info-sizes tr{
    height: 42px;
  }

  .param-info-tr1{
    width: 38%;
  }

  .param-info-sizes tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);
  }


  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .param-info-infos {
    border-top: 1px solid rgba(0,0,0,.1);
    width: 100%;
    padding: 10px 0px 10px;
    background-color: white;
    border-bottom: 5px solid #f2f5f8;
    font-size: 14px;
  }

  .param-info-infos tr{
    height: 42px;
  }

  .param-value {
    border-bottom: 1px solid rgba(100,100,100,.1);
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }

</style>
