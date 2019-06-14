<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import interaction  from './mixin/interaction'
  export default {
    name: "SubInteractionPKInsert",
    components: {},
    mixins:[ interaction ],
    data() {
      return {
        params:{ pkId:'',optionName :""}
      }
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.params.pkId = this.$route.query['pkId'];
      },
      _add_pk_option(){
        if(this.params.optionName == ''){
          this.$createToast({message:'请输入您的观点!',duration:2000}).show();
        }else{
          this.$add_pk_options(this.params).then(()=>{
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            },800)
          })
        }
      }

    },
  }
</script>
<template>
  <div class="vc-fluid vc-bg vc-padding__xl-x--bm">

    <div class="vc-padding__lg">
      <div class="vp-input vc-flex--fit"  >
        <span class="vp-input__count vc-text--gray">{{ params.optionName ? params.optionName.length : 0  }}/20</span>
        <input type="text" class="vp-input__inner" v-model="params.optionName" maxlength="20" placeholder="请输入观点">
      </div>
    </div>


    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div class="vc-flex--aut   vp-btn__simple vp-btn--white  " @click="_add_pk_option">
          提交
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
