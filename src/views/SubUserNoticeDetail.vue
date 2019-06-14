<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "SubUserNoticeDetail",
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
  }
</script>
<template>
<div class="vc-fluid--h-min vc-bg vc-padding__lg">
  <div class=""  >
    <div class="  vc-flex--between-center">
      <div class="vc-text--bold">{{ params['title']}}</div>
      <div class="vc-text--sm vc-text--gray">{{ params['time']}}</div>
    </div>
    <div class=" vc-padding--ud"> <p class=" vc-text--baseline--md" v-html="params['message']"> </p></div>
  </div>
</div>
</template>
<style scoped></style>
