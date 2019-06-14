<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "SubInteractionWordsSend",
    components: {},
    mixins: [],
    data() {
      return {
        params:{
          content:""
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
<div class="vc-fluid--h-min vc-bg vc-padding__xl-x--bm">
  <div class="vc-padding__lg">
    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-margin--bm">指定人</div>
      <div class="vp-input">
        <input type="text" class="vp-input__inner" placeholder="请选择指定人" readonly>
      </div>
    </div>
    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-margin--bm">留言内容</div>
      <div class="vp-textarea" >
        <textarea type="text"  placeholder="请输入留言内容..." class=" vp-textarea__inner vp-textarea--theme" rows="4"   v-model="params.content" maxlength="100"></textarea>
        <span class="vp-textarea__count vc-text--gray">{{ params['content'] ? params['content'].length : 0  }}/100</span>
      </div>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white "  @click="_save_pic">发送</div>
      </div>
    </div>

  </div>
</div>
</template>
<style scoped></style>
