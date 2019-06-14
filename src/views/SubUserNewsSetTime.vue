<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "SubUserNewsSetTime",
    components: {},
    mixins: [],
    data() {
      return {
        params:{
          open:true
        }
      }
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {

      },
      _update_news_set_time(){

      }

    },
    watch: {
      '': {
        handler(val, olval) {

        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
<div class="vc-fluid--h-min vc-bg">
  <div class="vc-flex--between-center vc-border--bm vp-row--min vc-padding__lg--ad">
    <span class="vc-text--bold">开始时间</span>
    <span class="vc-text--light">11:00</span>
  </div>
  <div class="vc-flex--between-center  vp-row--min vc-padding__lg--ad">
    <span class="vc-text--bold">结束时间</span>
    <span class="vc-text--light">11:00</span>
  </div>
</div>
</template>
<style scoped></style>
