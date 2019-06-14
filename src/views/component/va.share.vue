<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  export default {
    name: "",
    components: {},
    beforeRouteEnter (to, from, next) {
      next(vm=> {
      })
    },
    beforeRouteLeave(to, from, next){
      next();
    },
    beforeRouteUpdate (to, from, next) {
      next();
    },
    beforeCreate(){
    },
    created(){
    },
    beforeMount(){
    },
    mounted(){

    },
    activated(){
    },
    props: {
      value:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        currentValue:false
      }
    },
    methods: {},
    watch: {
      'value': {
        handler(val, olval){
          this.currentValue = val
        },
        deep: true ,
        immediate:true
      },
      currentValue(val){
        this.$emit('input',val)
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <van-popup v-model="currentValue"  position="top">
    <div class="vi-popup-share">
      <div class="share">
        <div class="share--inner vp-icon__share"></div>
      </div>
    </div>
    <div class="vi-popup-close">
      <div class="vp-icon__share-close" @click="currentValue = false"></div>
    </div>
  </van-popup>
</template>
<style scoped>
  .van-popup{ background-color: transparent; }
  .vi-popup-share{ display: flex;justify-content: flex-end; margin-right: 40px;margin-top: 10px;}
  .share{ width: 45vw; }
  .share--inner{  padding-top: 106.6%; }
  .vi-popup-close{ display: flex; height:50vh;justify-content:center;align-items: center }
</style>
