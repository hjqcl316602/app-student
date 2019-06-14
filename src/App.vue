<template>
  <div id="app">

    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
<!--    <transition name="fade">

    </transition>-->

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'app',
    mounted(){

    },

    data(){
      return {

      }
    },
    methods:{

    }
    ,
    watch:{

    }
  }
</script>
<style>
  .fade-enter-active,.fade-leave-active{ transition: all .4s }
  .fade-enter,.fade-leave-active{ opacity:  0 ;  }
</style>
