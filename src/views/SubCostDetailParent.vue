<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import wx from 'weixin-js-sdk'
  import cost  from './mixin/cost'
  import basic  from './mixin/basic'
  export default {
    name: "",
    components: {},
    mixins: [ cost,basic ],
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
          feeId:'',
          pic:'', //http://05imgmini.eastday.com/mobile/20180910/b6ed7171d2e937a9e82c46b29b2cfe7b_wmk.jpeg，
          status:0
        }
      }
    },
    methods: {
      async _init_page() {
        this.params.feeId = this.$route.query['feeId'];
        this.params.status = this.$route.query['status'] || 0;
        this.$get_cost_detail(this.params)
      },
      _save_cost(){
        let message = this._validate_params(this.params);
        if(message === 'yes'){

          this.$dialog.confirm({
            title:'缴费确认',
            message:'请确认你上传的凭证是否有误，是否确认缴费？'
          }).then(()=>{
            this.$pay_cost(this.params).then(()=>{
              this.$createToast({message:'缴费成功！',duration:2000}).show();
              setTimeout(()=>{
                this.$router.go(-1);
                this.$destroy()
              },800)
            })
          }).catch(()=>{})

        }else{
          this.$createToast({message:message,duration:2000}).show();
        }
      },
      _validate_params(params){
        if(Valids.isEmptyString( params.pic) ){
          return '请上传缴费凭证！'
        };
        return 'yes'
      },

      _del_pic(){
        this.params.pic = "";
      },
      _select_pic() {
        let _this = this;
        wx.chooseImage({
          count:  1, // 默认9
          sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],        // 可以指定来源是相册还是相机，默认二者都有
          success:  (res)=> {
            let localIds = res.localIds;            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

            wx.uploadImage({
              localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 0, // 默认为1，显示进度提示
              success:  (res) =>{
                let serverId = res.serverId; // 返回图片的服务器端ID
                this.$upload_picture_wx({ mediaId : serverId }).then((res)=>{
                  this.params.pic = res['data'];
                }) ;
              },
              fail:()=>{
                this.$createToast({message:'图片上传失败!',duration:2000}).show();
              }
            });

          },
          fail:(res)=>{
            this.$createToast({ message:'选择图片失败!',duration:2000 }).show();
          }
        });
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
      <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">{{ cost.detail['title'] }}（{{ cost.detail['fee'] | str_money }}元）</div>
      <div class="vc-text--light vc-text--baseline--md">{{ cost.detail['content'] }}</div>
    </div>

    <div class="vc-padding--ud vc-flex--between-center vc-border--bm">
      <div class="vp-icon__outer">
        <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
          <img :src="cost.detail['createdPhoto']" alt="" class="vp-img--max">
          <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
        </div>
        <span class="vc-text--light">{{cost.detail['createdName']}}</span>
      </div>
      <div class="vc-text--sm vc-text--light vc-text--baseline--md">发布于{{ cost.detail['time'] }}</div>
    </div>

    <div class="vc-padding--ud vc-border--bm">
      <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">收款人</div>
      <div class="vc-text--light vc-text--baseline--md">{{ cost.detail['teacherType'] }}</div>
    </div>

    <div class="vc-padding--ud vc-padding__xl-x--bm vc-border--bm">
      <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">收款二维码</div>
      <div class="vc-text--bold vc-padding--ud vc-text--center">
        ￥{{cost.detail['fee'] | str_money }}
      </div>
      <div class="vc-padding__xl-x--ad">
        <div class="vp-ratio">
          <div class="vp-ratio__outer" data-ratio="100%">
            <div class="vp-ratio__inner vp-img__inner">
              <img :src="cost.detail['pic']" alt="" class="vp-img--cover">
            </div>
          </div>
        </div>
      </div>
      <div class="vc-text--theme vc-padding--ud vc-text--bold vc-text--center">
        保存收费二维码，去微信或支付宝扫码支付
      </div>

    </div>

    <template v-if="params.status === 0 ">
      <div class="vc-padding--ud vc-margin__lg--bm">
        <div class="vc-text--bold">上传缴费凭证（截图）</div>
        <div class=" vc-padding--ud vc-text--center vc-padding__xl-x--ad">
          <!--<i class="iconfont icon-shangchuan" style="font-size: 150px" @click="_select_pic"></i>-->
          <div class="" @click="_select_pic" v-if="!params.pic">
            <svg viewBox="0 0 1024 1024" version="1.1" p-id="1903" height="100%" width="100%" >
              <path xmlns="http://www.w3.org/2000/svg" d="M610.133333 912.213333h70.4v28.586667H610.133333zM224 83.626667H294.4v28.586666H224zM736.426667 83.626667h70.4v28.586666h-70.4zM911.786667 736.853333h28.586666v70.4h-28.586666zM911.786667 905.386667a6.826667 6.826667 0 0 1-6.826667 6.826666h-42.666667V938.666667h56.32a21.333333 21.333333 0 0 0 21.333334-21.333334v-54.186666h-28.586667zM350.293333 912.213333h77.653334v28.586667H350.293333zM483.84 912.213333h70.4v28.586667h-70.4zM610.133333 83.626667h70.4v28.586666H610.133333zM919.04 85.333333h-56.32v28.586667h42.666667a6.4 6.4 0 0 1 4.693333 0 6.4 6.4 0 0 1 0 4.693333v49.92H938.666667V104.96a21.333333 21.333333 0 0 0-19.626667-19.626667zM911.786667 224.426667h28.586666v70.4h-28.586666zM911.786667 350.72h28.586666v77.653333h-28.586666zM911.786667 610.133333h28.586666v70.4h-28.586666zM911.786667 483.84h28.586666v70.4h-28.586666zM736.426667 912.213333h70.4v28.586667h-70.4zM83.626667 350.72h28.586666v77.653333h-28.586666zM83.626667 224.426667h28.586666v70.4h-28.586666zM83.626667 483.84h28.586666v70.4h-28.586666zM350.293333 83.626667h77.653334v28.586666H350.293333zM483.84 83.626667h70.4v28.586666h-70.4zM224 912.213333H294.4v28.586667H224zM83.626667 610.133333h28.586666v70.4h-28.586666zM83.626667 736.853333h28.586666v70.4h-28.586666zM111.786667 905.386667v-42.666667H85.333333v56.32a21.333333 21.333333 0 0 0 21.333334 21.333333h61.44v-28.586666H118.613333a6.826667 6.826667 0 0 1-6.826666-6.4zM85.333333 104.96v63.573333h28.586667V119.04a6.826667 6.826667 0 0 1 6.826667-6.826667h47.36V85.333333H104.96a21.333333 21.333333 0 0 0-19.626667 19.626667zM682.666667 499.2h-157.44V341.333333a13.226667 13.226667 0 1 0-26.026667 0v157.866667H341.333333a13.226667 13.226667 0 1 0 0 26.026667h157.44V682.666667a13.226667 13.226667 0 1 0 26.026667 0v-157.44H682.666667a13.226667 13.226667 0 0 0 0-26.026667z" fill="#707070" p-id="6095"/>
            </svg>
          </div>
          <div class="vc-padding__lg" v-else >
            <div class="vp-ratio" >
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner vp-img__inner">
                  <img :src="params.pic" alt="" class="vp-img--cover">
                </div>
                <div class="vp-img__close" @click="_del_pic"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <div  class="vc-flex--aut  vp-btn__simple vp-btn--white " @click="_save_cost">确认缴费</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="vc-padding--ud vc-border--bm">
        <div class="vc-text--bold vc-text--baseline--lg vc-text--lg">缴费状态</div>
        <div class="vc-text--light vc-text--baseline--md">已缴费</div>
      </div>
    </template>


  </div>

</template>
<style scoped></style>
