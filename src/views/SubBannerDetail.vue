<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "SubBannerDetail",
    components: {},
    mixins: [],
    data() {
      return {
        params:{
          detail:{}
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
          this.params.detail = sessionStorage.getItem('selectBanner') ? JSON.parse( sessionStorage.getItem('selectBanner') ) : { } ;
          console.log(this.params.detail)
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
<div class="vc-fluid--h-min vc-bg vc-padding__lg">
  <div class="vc-margin__lg--bm">
    <div class="vc-margin--bm"><span class="vc-text--bold">主图</span></div>
    <div class="">
      <div class="vp-ratio">
        <div class="vp-ratio__outer" data-ratio="16:9">
          <div class="vp-ratio__inner" >
            <div class="vp-img__inner">
              <img :src="params.detail['pic']" @load="_pub_img_load"  >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="vc-margin__lg--bm">
    <div class="vc-margin--bm"><span class="vc-text--bold">标题</span></div>
    <div class="vc-padding--lt">{{ params.detail['title'] }}</div>
  </div>
  <div class="vc-margin__lg--bm">
    <div class="vc-margin--bm"><span class="vc-text--bold">详情</span></div>
    <div class="vc-padding--lt">{{ params.detail['content'] }}</div>
  </div>
</div>
</template>
<style scoped></style>
