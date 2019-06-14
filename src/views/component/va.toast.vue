<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'
  export default {
    name: "toast",
    components: {},
    mixins: [],
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
      this._init_page()
    },
    mounted(){

    },
    activated(){
    },
    props: {
      message:{
        type:String,
      },
      duration:{
        type:Number,
        default:2000
      }
    },
    data(){
      return {
        isShow:false
      }
    },
    methods: {
      async _init_page(){

      },
      hide(){
        this.isShow = false;
      },
      show(){
        this.isShow = true;
        setTimeout(()=>{
          this.isShow = false;
        },this.duration)
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
<div   class="va-toast" :class="{'va-toast--show':isShow}">
  {{ message }}
</div>
</template>
<style scoped>
</style>
