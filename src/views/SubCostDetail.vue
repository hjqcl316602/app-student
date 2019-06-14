<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import { show_picture } from '../js/vue.wx';
  import cost  from './mixin/cost'
  export default {
    name: "",
    components: {},
    mixins: [ cost ],
    beforeRouteEnter(to, from, next) {
      next(vm => {
      })
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {

    },
    mounted() {

    },
    activated() {
      this._init_page()
    },
    props: [],
    data() {
      return {
        params:{
          feeId:''
        }
      }
    },
    methods: {
      async _init_page() {
        this.params.feeId = this.$route.query['feeId'];
        this.$get_cost_detail(this.params)
      },
      _show_picture(pic){
        show_picture([pic],pic)
      },

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg vc-padding__xl-x--bm vc-padding__lg--ad">

    <div class="vc-padding--ud vc-border--bm">
      <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">{{ cost['detail']['title'] }}（{{ cost['detail']['fee'] | str_money }}元）</div>
      <div class="vc-text--light vc-text--baseline--md">{{ cost['detail']['content'] }}</div>
    </div>

    <div class="vc-padding--ud vc-flex--between-center vc-border--bm">
      <div class="vp-icon__outer">
        <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
          <img :src="cost['detail']['createdPhoto']" alt="" class="vp-img--max">
          <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
        </div>
        <span class="vc-text--light">{{cost['detail']['createdName']}}</span>
      </div>
      <div class="vc-text--sm vc-text--light vc-text--baseline--md">发布于{{cost['detail']['time']}}</div>
    </div>

    <div class="vc-padding--ud vc-border--bm">
      <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">收款人</div>
      <div class="vc-text--light vc-text--baseline--md">{{ cost['detail']['teacherType']}}</div>
    </div>

    <div class="vc-padding--ud vc-padding__xl-x--bm ">
      <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">收款二维码</div>
      <div class="vc-text--bold vc-padding--ud vc-text--center">
        ￥{{ cost['detail']['fee'] | str_money }}
      </div>
      <div class="vc-padding__xl-x--ad">
        <div class="vp-ratio">
          <div class="vp-ratio__outer" data-ratio="100%">
            <div class="vp-ratio__inner vp-img__inner" @click="_show_picture(cost['detail']['pic'])">
              <img :src="cost['detail']['pic']" alt="" class="vp-img--cover">
            </div>
          </div>
        </div>
      </div>

    </div>


    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <template v-if="cost['detail']['mySelf']">
          <router-link tag="div" :to="{name :'SubCostEdit',query:{ feeId:this.params.feeId,type:'update' }}" class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border">编辑</router-link>
        </template>

        <router-link tag="div" :to="{name :'SubCostRoll',query:{ feeId:this.params.feeId }}" class="vc-flex--aut   vp-btn__simple vp-btn--theme ">查看缴费名单</router-link>
      </div>
    </div>
  </div>

</template>
<style scoped></style>
