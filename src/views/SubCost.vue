
<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import cost  from './mixin/cost'
  export default {
    name: "SubCost",
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
      return {}
    },
    methods: {
      async _init_page() {
        if(this.userMessage['memType'] == 1){
          this.$get_cost_teacher_list()
        }else if(this.userMessage['memType'] == 2){
          this.$get_cost_parent_list()
        }

      },
      _check_detail(memType,item,index){
        if( memType == 1){
          this.$router.push({ name : 'SubCostDetail',query:{ feeId:item['feeId']} })
        }else{
          this.$router.push({ name : 'SubCostDetailParent' ,query:{ feeId:item['feeId'],status :item['payStatus'] }})
        }
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div>
    <template v-if="userMessage['memType'] == 1 ">
      <template v-if="cost_teacher.list.length > 0">
        <div class="vc-padding__xl-x--bm">

          <div class="vc-bg vc-padding__lg--ad vc-margin--bm" v-for="(item,index) in cost_teacher.list" @click="_check_detail(userMessage['memType'],item,index)">
            <div class="vc-padding--ud vc-border--bm">
              <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">{{ item['title'] }}（{{ item['fee']  | str_money }}元）</div>
              <div class="vc-text--light vc-text--baseline--md">
                {{ item['content']}}
              </div>
            </div>
            <div class="vc-padding--ud vc-flex--between-center">
              <div class="vp-icon__outer">
                <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
                  <img :src="item['createdPhoto']" alt="" class="vp-img--max">
                  <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
                </div>
                <span class="vc-text--light">{{ item['createdName'] }}</span>
              </div>

              <div class="vc-text--sm vc-text--light vc-text--baseline--md">发布于{{ item['time'] }}</div>

            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无收费清单，去添加吧~~</div>
          </div>
        </div>
      </template>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <router-link tag="div" :to="{name :'SubCostEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme ">添加收费</router-link>
        </div>
      </div>
    </template>
    <template v-if="userMessage['memType'] == 2 ">
      <template v-if="cost_parent.list.length > 0">
        <div class="">

          <div class="vc-bg vc-padding__lg--ad vc-margin--bm" v-for="(item,index) in cost_parent.list" @click="_check_detail(userMessage['memType'],item,index)">
            <div class="vc-padding--ud vc-border--bm vc-flex">
              <div class="vc-flex--fit">
                <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">
                  {{ item['title'] }}（{{ item['fee']  | str_money }}元）
                  <span class="vp-btn__status vp-btn--ing"  v-if="item['payStatus'] == 0"  >未缴纳</span>
                  <span class="vp-btn__status vp-btn--disabled"  v-if="item['payStatus'] == 1"  >已缴纳</span>

                </div>
                <div class="vc-text--light vc-text--baseline--md">
                  {{ item['content'] }}
                </div>

              </div>
              <div class="vp-icon__outer vc-padding--lt" v-if="item['payStatus'] == 0">
                <div class="vc-text--theme">去缴费</div>
                <i class="iconfont icon-iconfontjiantou2 vc-text--theme"></i>
              </div>
            </div>
            <div class="vc-padding--ud vc-flex--between-center">
              <div class="vp-icon__outer">
                <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
                  <img :src="item['createdPhoto']" alt="" class="vp-img--max">
                  <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
                </div>
                <span class="vc-text--light">{{ item['createdName'] }}</span>
              </div>

              <div class="vc-text--sm vc-text--light vc-text--baseline--md">发布于{{ item['time'] }}</div>

            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无缴费清单~~</div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<style scoped></style>
