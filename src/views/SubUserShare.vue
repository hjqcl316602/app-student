<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  import { VaShare }  from './component'
  import QRCode from 'qrcodejs2'
  import { set_wx_share } from '../js/vue.wx';
  import classes  from './mixin/class'
  import user  from './mixin/user'
  export default {
    name: "",
    components: { QRCode,VaShare },
    mixins: [ classes,user ],
    beforeRouteEnter(to, from, next){
      next(vm => {})
    },
    beforeRouteLeave(to, from, next){
      next();
    },
    beforeRouteUpdate(to, from, next){
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
        classes:{
          name:''
        }
      }
    },
    methods: {
      async _init_page() {
        let fromUser = this.userMessage['fromUser'];
        let fromClass = this.$route.query['classId'] || this.userMessage['classId'] ;  // 看是否是从列表中分享出来的
        let fromStu =  this.userMessage['stuId'] ;

        let webMemId = this.userMessage['webMemId'] ;
        let classJoinUrl = `${this.$configs['HTTP_WEB'] }#/SubClassJoin?params=${ fromUser },${webMemId},${ fromClass }`;
        this._set_code(classJoinUrl);

        //得到班级的名称
        await  this.$get_class_name( { classId : fromClass }) ;
        //await  this.$get_student_info( { stuId : fromStu }) ;
        await  this.$get_user_info() ;
        let fromName = this['userInfo']['trueName'] || this['userInfo']['memName'] ;

        let title = '';
        if(this.userMessage['memType'] == 1){
          title = `【${ fromName }老师邀请您的孩子加入${ this.classes.type }·${ this.classes.name }】`
        }
        else if(this.userMessage['memType'] == 2){
          title = `【${this.student.name}同学的家长${ fromName }邀请您的孩子加入${ this.classes.type }·${ this.classes.name }】`
        }


        let shareObj = {
          title:title,
          desc: `学校正式启用98同班，点击马上加入班级，关注孩子成长~`,
          imgUrl:'',
          link:`${this.$configs['HTTP_WEB'] }?/SubClassJoin?params=${fromUser},${webMemId},${fromClass}`
        };
        setTimeout(()=>{
          this.popups[0] = true;
          set_wx_share(shareObj)
        },300)

        console.log(shareObj)

      },
      _share(){
        this.popups[0] = true;
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
  <div>
    <VaShare v-model="popups[0]"> </VaShare>

    <!--<div class="vp-header vp-header&#45;&#45;shadow">
      <div class="vp-row vc-bg&#45;&#45;theme vc-flex&#45;&#45;center vc-text&#45;&#45;lg vc-text&#45;&#45;white ">班级二维码</div>
    </div>-->

    <div class="vc-fluid--h vc-padding__xl-x--ud vc-bg vc-flex--center">


      <div class="vp-ratio" style="width: 50%">
        <div class="vc-text--bold vc-text--center vc-text--theme vc-margin__lg--bm  ">
          班级( {{ classes.name }})的二维码
        </div>

        <div class="vp-ratio__outer" data-ratio="100%">
          <div class="vp-ratio__inner">
            <div class="vp-img__inner" id="qrcode">
              <!--<img src="../img/code.png" alt="" class="vp-img&#45;&#45;max">-->
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div class="vc-flex--aut   vp-btn__simple vp-btn--theme" @click="_share">分享给家长或老师</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
