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
        this.$get_pay_list( this.params)
      },
      _show_picture(pic){
        if(!!pic){
          show_picture([pic],pic)
        }

      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="">
    <div class="vc-bg  vc-fluid--h-min">

      <div class="vc-row ">
        <div class="">
          <div class="vc-col--05 vc-border--rt vc-flex--center vc-border--bm vp-row"  >
            <div class="vc-text vc-text--bold  ">学生姓名</div>
          </div>
          <div class="vc-col--07 vc-border--rt vc-flex--center vc-border--bm vp-row" >
            <div class="vc-text vc-text--bold  ">缴费人</div>
          </div>
          <div class="vc-col--06 vc-flex--center vc-border--bm vp-row" >
            <div class="vc-text vc-text--bold  ">缴费凭证</div>
          </div>
          <div class="vc-col--06 vc-flex--center vc-border--bm vp-row" >
            <div class="vc-text vc-text--bold  ">缴费状态</div>
          </div>
        </div>
      </div>

      <div class="vc-flex" v-for="(item,index) in pay.list">
        <div class="vc-col--05 vc-border--rt vc-flex vc-items--center vc-border--bm  vc-padding--ad"  >
          <div class="vc-flex--fit vc-text--light vc-padding--lt vc-text--ellipsis">{{ item['stuName']}}</div>
        </div>

        <div class="vc-col--07 vc-border--rt vc-flex--center vc-border--bm  vc-padding__sm--ad"  >
          <div class="vp-icon__outer">
            <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
              <img :src="item['payPhoto']" alt="" class="vp-img--max">
              <img src="../img/icon-head-error-male.png" alt="" class="vp-img--error">
            </div>
            <span class="vc-text--light" v-if="!!item['payType'] ">{{ item['stuName']}}的{{ item['payType']}}</span>
            <span class="vc-text--light" v-else>还未缴费</span>
          </div>
        </div>

        <div class="vc-col--06 vc-border--rt  vc-border--bm  vc-padding__sm--ad"  >
          <div class="vc-padding">
            <div class="vp-ratio">
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner vp-img__inner" @click="_show_picture(item['pic'])">
                  <img :src="item['pic']" alt="" class="vp-img--cover">
                  <img src="../img/img-error.png" alt="" class="vp-img--error vp-img--half">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="vc-col--06 vc-border--rt vc-flex--center vc-border--bm  vc-padding__sm--ad"   >
          <div class="vp-icon__outer" v-if="item['payStatus'] == 0">
            <div class="vc-text--light vc-margin--rt" >未缴</div>
            <div class="vp-icon vp-icon__spot danger"  ></div>
          </div>
          <div class="vp-icon__outer" v-else>
            <div class="vc-text--light vc-margin--rt" >已缴</div>
            <div class="vp-icon vp-icon__spot success" ></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped></style>
