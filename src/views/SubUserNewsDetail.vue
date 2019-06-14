<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "sub-user-news-detail",
    components: {},
    mixins: [],
    data() {
      return {
        params:{}
      }
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.params = JSON.parse(sessionStorage.getItem('selectNews'));
      }

    },
    watch: {
      /*'': {
handler(val, olval){
}, deep: true ,
immediate:true
}  */
    },

  }
</script>
<template>

  <div class="vc-fluid--h-min vc-bg vc-padding__lg">
    <div class="vc-flex">

      <div class="vp-img__inner vp-img__head" data-round="30">
        <img src="" alt="" class="vp-img--max">
        <img src="../img/icon-notice.png" alt="" class="vp-img--error">
      </div>

      <div class="vc-margin--lt vc-flex--fit">
        <div class="vc-flex--between-center vc-padding--tp">
          <span class="vc-text--bold">系统消息</span>
          <span class="vc-text--gray vc-text--sm">{{ params['time'] }}</span>
        </div>
        <div class=" vc-padding--tp">
          <p class="vc-text--light vc-text--baseline--md">{{ params['message']}}</p>
        </div>

      </div>

    </div>
  </div>

</template>
<style scoped></style>


