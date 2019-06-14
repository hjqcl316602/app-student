<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: {},
    mixins: [ classes ],

    activated(){
      this._init_page()
    },
    props: [],
    data(){
      return {}
    },
    methods: {
      async _init_page(){
        this.$get_disc_report_list()
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="">

    <template v-if=" disc.reportList.length > 0 ">
      <div class="">
        <div class="vc-bg vc-margin--bm" v-for="(item,index) in disc.reportList">
          <div class="vc-padding__lg vc-text--bold vc-border--bm">{{ item['title']}}</div>

          <div class="vc-padding__lg">
            <div class="vc-margin__lg--bm "v-for="(detail,detailId) in item['detail']">
              <p class="vc-text--baseline--md">【{{ detail['stuNames']}}】</p>
              <p class="vc-text--baseline--md"  >{{ detail['content'] }}</p>
              <p class="vc-text--baseline--md"  >{{ detail['remark'] }}</p>
            </div>
          </div>

        </div>
      </div>
    </template>
    <template v-else>
      <div class="vc-fluid vc-flex--center vc-bg">
        <div class="vc-text--light vc-text--center vc-padding__lg--ud">当前还没有纪律报表的哦～～</div>
      </div>
    </template>
  </div>
</template>
<style scoped></style>
