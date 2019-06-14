<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import user  from '../vue.mixins/user'
  export default {
    name: "SubUserClassVip",
    components: {},
    mixins: [],
    data() {
      return {
        params:{
          classId:''
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
        this.params.classId = this.$route.query['classId'];
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
  <div class="vc-padding__lg">
    <div class="vc-text--bold  vc-margin__lg--bm vc-text--lg vc-text--center">开通认证将享受以下特权</div>
    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-border--bm vc-padding--bm vc-margin--bm">公开展示</div>
      <p class="vc-text--baseline">班级将会展示在资源板块，获得更多的流量</p>
    </div>
    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-border--bm vc-padding--bm vc-margin--bm">搜索查询</div>
      <p class="vc-text--baseline">班级可被用户搜索查询到，更快获得班级信息</p>
    </div>
    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-border--bm vc-padding--bm vc-margin--bm">更大容量</div>
      <p class="vc-text--baseline">相册发布数量增加到200张</p>
    </div>
    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-border--bm vc-padding--bm vc-margin--bm">优先推送</div>
      <p class="vc-text--baseline">认证班级，发布的收费资源，将会被平台优先推送</p>
    </div>
  </div>
  <div class="vp-footer vp-footer--shadow">
    <div class="vc-flex vp-row">

      <router-link tag="div" :to="{name :'SubUserClassVipMaterial',query:{ classId : params.classId }}" class="vc-flex--aut   vp-btn__simple vp-btn--theme  ">开启认证</router-link>

    </div>
  </div>

</div>
</template>
<style scoped></style>
