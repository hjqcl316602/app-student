<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  import { VaShare }  from './component'
  import QRCode from 'qrcodejs2'
  import { set_wx_share } from '../js/vue.wx';
  import classes  from './mixin/class'
  export default {
    name: "",
    components: { QRCode,VaShare },
    mixins: [ classes ],
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
        query:{
          stuName:"",
          classId:'',
          stuId:''
        }
      }
    },
    methods: {
      async _init_page() {
        this.query.stuName = this.$route.query['stuName'];
        this.query.classId = this.$route.query['classId'];
        this.query.stuId = this.$route.query['stuId'];
        this.query.chengHu = this.$route.query['chengHu'];

        let fromUser = this.userMessage['fromUser'];
        let webMemId = this.userMessage['webMemId'] ;


        let classJoinUrl = `${this.$configs['HTTP_WEB'] }#/SubClassJoinParent?params=${ fromUser },${webMemId},${ this.query.classId },${ this.query.stuId}`;
        this._set_code(classJoinUrl);

        //得到班级的名称
        await  this.$get_class_name( { classId :this.query.classId }) ;
        let title = `${this.query.stuName}的${ this.query.chengHu}邀请您加入孩子的亲友团`;

        let shareObj = {
          title:title,
          desc: `${ this.query.stuName}已加入98同班，点击马上加入班级，一起关注孩子成长~`,
          imgUrl:'',
          link:`${this.$configs['HTTP_WEB'] }?/SubClassJoinParent?params=${ fromUser },${webMemId},${ this.query.classId },${ this.query.stuId}`
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
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div>
    <VaShare v-model="popups[0]"> </VaShare>


    <div class="vc-fluid--h vc-padding__xl-x--ud vc-bg vc-flex--center">



      <div class="vp-ratio" style="width: 50%">

        <div class="vc-text--center vc-padding__lg--ud ">
          <span class="vc-text--theme vc-text--lg vc-text--baseline--md ">孩子( {{ query.stuName }} )的二维码</span>
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
        <div class="vc-flex--aut   vp-btn__simple vp-btn--theme" @click="_share">分享给其他家人</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
