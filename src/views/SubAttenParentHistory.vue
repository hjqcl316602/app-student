<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import atten  from './mixin/atten'
  export default {
    name: "SubAttenParentHistory",
    components: {},
    mixins: [ atten ],
    data() {
      return {}
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.$get_qinjia_list()
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
  <div>
    <template v-if="qinjia.list.length > 0">
      <div class="vc-fluid--h-min ">
        <div class="vc-margin--bm  vc-padding__lg--ad vc-bg" v-for="(item,index) in qinjia.list">
          <div class=" vc-border--bm vc-padding--tp">
            <div class="vc-text--bold vc-text--baseline--lg">{{ item['qjType']}}</div>
            <div class="vc-text--baseline--lg"  >{{ item['detail'] }}</div>
          </div>
          <div class="vc-padding--ud vc-text--sm">{{ item['startTime']}} 至 {{ item['endTime']}}</div>

        </div>
      </div>
    </template>

    <template v-else>
      <div class="vc-bg vc-fluid vc-flex--center" >
        <div class="" >
          <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无请假历史记录~~</div>
        </div>
      </div>
    </template>
  </div>

</template>
<style scoped></style>
