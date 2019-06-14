<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import interaction  from './mixin/interaction'
  export default {
    name: "",
    components: {},
    mixins: [ interaction ],
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
          pkId:'',
          viewPointId:'',
          checkStatus:''
        }
      }
    },
    methods: {
      async _init_page() {
        this.params.pkId = this.$route.query['pkId'];
        this.$get_pk_detail(this.params)
      },
      _operate(type,item,status){
        this.params.viewPointId = item['viewPointId'];
        this.params.checkStatus = status;
        this.$check_pk_options(this.params).then(()=>{
          this.$get_pk_detail(this.params)
        })
      },
      _operate_pk(type,item,option){
        if(type == 'tp'){
          let obj = {
            pkId:item.pkId,
            viewPointId:option.optionId
          };
          this.$save_pk_vote(obj).then(()=>{
            this.$get_pk_detail(this.params)
          })
        }
      },
      _del_pk(){
        this.$dialog.confirm({
          title:'确认信息',
          message:'是否确认删除PK？'
        }).then(()=>{
          this.$delete_pk(this.params).then(()=>{
            this.$createToast({message: '删除PK成功!',duration:2000}).show();
            this.$router.go(-1)
          })
        }).catch(()=>{})
      },
      _edit_pk(){
        sessionStorage.setItem('pk-detail',JSON.stringify(this.pk.detail.detail));
        this.$router.push({ name :'SubInteractionPKEdit',query:{ type:'update'}})
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-padding__xl-x--bm" :class="{'vc-padding__xl-x--bm': !pk.detail.mySelf}">

    <div class="vc-padding__lg vc-margin--bm vc-bg " >
      <div class="vc-flex vc-items--center">
        <span class="vc-text--bold vc-text--ellipsis">话题：{{ pk.detail.detail.title}}？</span>
        <div class="vp-btn__status vp-btn--ing vc-margin__sm--lt"  v-if="pk.detail.detail['status'] == 0">进行中</div>
        <div class="vp-btn__status vp-btn--disabled vc-margin__sm--lt" v-if="pk.detail.detail['status'] == 1">已结束</div>
      </div>

      <div class="vc-padding--tp vc-border--bm" >

        <div class=" vc-padding--bm" v-for="(option,op) in pk.detail.detail['optionList']" >
          <div class="vc-flex vc-items--center">

            <div class="vc-flex--fit">
              <div class="vc-flex--between-center vc-padding__sm--bm">
                <span class="vc-text--theme vc-text--sm">{{ op+ 1 | str_zero }}.{{option['optionName']}}</span>
                <span class="vc-text--theme vc-text--sm">（ {{ option['num']  }} / {{ pk.detail.detail['totalNum'] }}  ）{{ ( pk.detail.detail['totalNum'] ? option['num'] / pk.detail.detail['totalNum'] : 0 ) * 100 }}%</span>
              </div>
              <van-progress
                :show-pivot="false"
                color="#4A90E2"
                :percentage="(( pk.detail.detail['totalNum'] ? option['num'] / pk.detail.detail['totalNum'] : 0 ) * 100).toFixed(2)"
              />
            </div>
            <div class="vp-btn__oper  vp-btn--disabled vc-margin__lg--lt "  v-if="pk.detail.detail['voteSatus'] == 1 || pk.detail.detail['status'] == 1" >投票</div>
            <div class="vp-btn__oper  vp-btn--ing vc-margin__lg--lt "  v-else @click.stop="_operate_pk('tp',pk.detail.detail,option)">投票</div>
          </div>
        </div>
      </div>

      <div class="vc-padding--tp vc-flex--between-center">
        <div class="vp-icon__outer">
          <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
            <img :src="pk.detail.detail['photo']" alt="" class="vp-img--max">
            <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
          </div>
          <span class="vc-text--light">{{ pk.detail.detail['name']}}</span>
        </div>
        <div>
          <p class="vc-text--sm vc-text--light vc-text--baseline--md">发布于{{ pk.detail.detail['time']}}</p>
          <p class="vc-text--sm vc-text--light vc-text--baseline--md">截止于{{ pk.detail.detail['endTime']}}</p>
        </div>
      </div>
    </div>

    <template v-if=" pk.detail.list.length > 0 && pk.detail.mySelf">
      <div class="vc-text--bold vc-padding__lg--lt vc-padding--bm">
        新增观点
      </div>
      <div class="vc-padding__lg--ad  vc-bg vc-border--bm" v-for="item in pk.detail.list">
        <div class="vc-flex--between-center vc-padding--tp">
          <div class="vp-icon__outer">
            <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
              <img :src="item['photo']" alt="" class="vp-img--max">
              <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
            </div>
            <span class="vc-text--light">{{ item['name']}}</span>
          </div>

          <span class="vc-text--sm vc-text--gray vc-text--baseline--md">发布于{{ item['time']}}</span>
        </div>

        <div class="vc-padding--ud vc-border--bm">
          <p class="vc-text--bold vc-text--baseline--md">
            {{ item['optionName']}}
          </p>
        </div>

        <div class="vc-padding--ud">
          <div class="vc-flex vc-content--end ">
            <template v-if="item['status'] == 0">
              <div class="vp-btn__oper--small vp-btn--cancel vc-margin--lt" @click="_operate('check',item,'2')">审核不通过</div>
              <div class="vp-btn__oper--small vp-btn--ok vc-margin--lt" @click="_operate('check',item,'1')">审核通过</div>
            </template>
            <template v-else>
              <div class="vp-btn__oper--small vp-btn--disabled vc-margin--lt" >已审核</div>
            </template>
          </div>
        </div>

      </div>
    </template>



    <template v-if="!pk.detail.mySelf && pk.detail.detail.status == 0 ">
      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <router-link tag="div" :to="{name:'SubInteractionPKInsert',query:{ pkId:this.params.pkId }}" class="vc-flex--aut   vp-btn__simple vp-btn--theme  " >
            +添加新观点( <span class="vc-text--sm">如果新的观点被采纳，奖励10朵小红花</span> )
          </router-link>
        </div>
      </div>
    </template>

    <template v-if="pk.detail.mySelf">
      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >

          <div class="vc-flex--aut   vp-btn__simple vp-btn--danger" @click="_del_pk">
            删除
          </div>
          <div class="vc-flex--aut   vp-btn__simple vp-btn--theme" @click="_edit_pk">
            编辑
          </div>

        </div>
      </div>
    </template>

  </div>
</template>
<style scoped></style>
