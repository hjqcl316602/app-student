<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  export default {
    name: "SubUserFeedback",
    components: {},
    mixins: [ user ],
    data() {
      return {
        params:{
          feedBack:'',
          mobile:'',
          type:'1'
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

      },
      _save_feed_back(){
        let message = this._validate_params(this.params);
        if(message == 'yes'){
          this.$create_feed_back(this.params).then(()=>{
            this.$createToast({message:'保存意见反馈成功！',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            },800)
          })
        }else{
          this.$createToast({message:message,duration:2000}).show();
        }
      },
      _validate_params(params){
        if(Valids.isEmptyString(params.feedBack)){
          return '请输入您的宝贵意见!'
        }else{
          if(params.feedBack.length < 5  ){
            return '请输入不少于5个字的意见!'
          }
        }
        if( !Valids.isEmptyString(params.mobile) && !Valids.isMobile(params.mobile) ){
          return '请输入正确格式的手机号码！'
        }

        return 'yes'
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

    <div class="vc-margin--bm">
      <van-radio-group v-model="params.type" style="display:  flex " >
        <van-radio name="1">咨询</van-radio>
        <van-radio name="2">合作</van-radio>
        <van-radio name="3">软件</van-radio>
      </van-radio-group>

    </div>

    <div class="vp-textarea vc-margin--bm" >
      <textarea type="text"  placeholder="请留下您的宝贵意见，我们将努力改进（不少于5个字）" class=" vp-textarea__inner vp-textarea--theme" rows="6"   v-model="params['feedBack']" ></textarea>

    </div>
    <div class="vp-input vc-margin--bm">
      <input type="tel" class="vp-input__inner" v-model="params.mobile" placeholder="请留下手机号码，以便我们回复您（非必填）">
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div class="vp-btn__simple vp-btn--white " @click="_save_feed_back">提交</div>
      </div>
    </div>
    <!--<div class="vc-padding__lg&#45;&#45;ud">
      <div class="vp-btn__submit vp-btn&#45;&#45;theme" @click="_save_feed_back">提交</div>
    </div>-->
  </div>
</template>
<style scoped></style>
