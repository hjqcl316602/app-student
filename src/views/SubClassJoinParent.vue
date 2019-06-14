<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  import { VaPopupRadio }  from './component'
  import basic  from './mixin/basic'
  import user  from './mixin/user'
  import classes  from './mixin/class'
  import common  from './mixin/common'
  import QRCode from 'qrcodejs2'
  export default {
    name: "",
    components: { QRCode,VaPopupRadio },
    mixins: [ basic,user,classes ,common],
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
      this._init_page();
    },
    props: [],
    data() {
      return {

        params:{
          fromName:"",
          webMemId:'',
          fromUser:'',
          className:"",
          classType:"",


          classId:'',
          stuId:'',
          chengHu:'',


        }
      }
    },
    methods: {
      async _init_page() {
        let params = this.$route.query['params'] ? this.$route.query['params'].split(",") :[];

        if(this.$configs['HTTP_LOCATION'] === 'localhost'){
          this.params.fromUser = params[0] || this.$configs['fromUser']  ;
          this.params.webMemId = params[1] || this.$configs['webMemId'] ;
          this.params.classId = params[2] ||this.$configs['PARENT']['CLASSID'];
          this.params.stuId = params[3] || this.$configs['PARENT']['STUID'];
          this.$referer({ fromUser : this.params.fromUser })
        }else{
          this.params.fromUser = params[0] || ''  ;
          this.params.webMemId = params[1] || '' ;
          this.params.classId = params[2] || '';
          this.params.stuId = params[3] || '';
        }



        await  this.$get_user_active({ webMemId:this.params.webMemId,fromUser:this.params.fromUser }).then((data)=>{
          this.params.fromName =data['data']['trueName'] || data['data']['memName']
        });

        await this.$get_student_info({ stuId:this.params.stuId });

        await this.$get_parent_type_list();

      },
      _select_radio(value,type){
        if( type == 'parent'){
          this.params.chengHu = value.text;

        }
        console.log(this.params)
      },
      _validate_params(params){

        if(params.chengHu == ''){
          return '请选择孩子对您的称呼!'
        }
        return 'yes'
      },
      _save_class(){
        let message = this._validate_params(this.params);
        if(message == 'yes'){

          this.$join_class_family(this.params).then(()=>{

            this.popups[5] = true
            let formUserShare =  this.params.fromUser ;

            this.$referer({ fromUser : formUserShare })
          })
        }else{
          this.$toast( message )
        }
      },
      _set_code(url){
        return new Promise((resolve,reject)=>{
          let offsetHeight = document.getElementById('qrcode').offsetHeight;
          let offsetWidth = document.getElementById('qrcode').offsetWidth;

          let qrcode = new QRCode('qrcode', {
            width: offsetWidth,     // 设置宽度
            height: offsetHeight,   // 设置高度
            text: url,
          });
          resolve()
        });
      },
    },
    watch: {

    },
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min ">


    <VaPopupRadio :options="parentTypeList" position="right" v-model="popups[3]" @select="_select_radio($event,'parent')"></VaPopupRadio>

    <van-popup position="right" v-model="popups[5]">
      <div class="vc-fluid vc-bg vc-flex--center">
        <div class="vp-ratio" style="width: 70%">
          <div class="vp-ratio__outer" data-ratio="100%">
            <div class="vp-ratio__inner">
              <div class="vp-img__inner" id="qrcode">
                <img src="../img/img-code.jpg" alt="" class="vp-img--max">
              </div>
            </div>
            <div class="vc-text--center vc-text--theme vc-text--bold vc-padding__lg">长按识别关注公众号<br>即可查看孩子的在校情况</div>
          </div>
        </div>
      </div>
    </van-popup>

    <div class="vc-padding__lg vc-bg vc-flex--center" >
      <span class="vc-text--bold vc-text--lg">{{ params.fromName }}邀请您关注{{ student.name }}同学 </span>
    </div>
    <div class="vc-padding__lg">
      <span class="vc-text--bold vc-text--gray">您和孩子的关系</span>
    </div>

    <div class="vc-bg">
      <div   class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[3] = true">
        <div class="vc-text--bold vc-text--lg">孩子对您的称呼</div>
        <div class="vp-icon__outer">
          <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.chengHu">{{ params.chengHu }}</span>
          <span class=" vc-text vc-text--gray "  v-if="!params.chengHu">请选择孩子对您的称呼</span>
          <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
        </div>
      </div>

      <div class="vc-padding__lg">
        <div class="vp-btn__submit vp-btn--theme" @click="_save_class">提交</div>
      </div>
    </div>

  </div>
</template>
<style scoped>


</style>
