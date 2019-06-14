<script type="text/ecmascript-6">
  import { VaBtnGroup }  from './component'
  import vip  from './mixin/vip'
  import basic  from './mixin/basic'
  import { show_picture } from '../js/vue.wx';
  import wx from 'weixin-js-sdk'
  export default {
    name: "SubUserClassVipMaterial",
    components: { VaBtnGroup },
    mixins: [ vip ,basic  ],
    data() {
      return {
        tab: {
          options: [
            { text: "个人用户", value: "1" },
            { text: "企业用户", value: "2" },
          ],
          active: 0,
        },
        params:{
          fromPage:'',
          name:'',
          mobile:'',
          type:'',
          zhengMian:'',
          fanMian:'',
          yyzz:''
        }
      }
    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page() {

        // 本地测试
        if(this.$configs['HTTP_LOCATION'] === 'localhost'){
          this.params.zhengMian = 'http://hbimg.b0.upaiyun.com/8cfc7e18df605139b376e55cb903c6dd52e0cb3c23beb-NvBYCT_fw658';
          this.params.fanMian = 'http://cdn.duitang.com/uploads/item/201509/13/20150913203846_eXBcz.jpeg';
          this.params.yyzz = 'http://cdn.duitang.com/uploads/item/201509/13/20150913203846_eXBcz.jpeg';
        }

        this.params.classId = this.$route.query['classId'];
        this.params.fromPage = this.$route.query['fromPage'];
      },
      _save_material(){
        //this.$router.push({ name : 'SubUserClassVipPay'})
        //return
        let message = this._validate_params();
        if(message === 'yes'){
          this.params.type = this.tab.active ;
          this.$upload_resource(this.params).then((res)=>{
            this.$createToast({message: '资料上传成功！' ,duration:2000}).show();
            if(this.params.fromPage === 'SubUserClass'){
              this.$router.go(-1);
            }else{
              this.$router.push({ name : 'SubUserClassVipPay' , query :{ vipRecordId : res['data']['vipRecordId'] , fromPage :'vipMaterial'}})
            }

          })
        }else{
          this.$createToast({message: message ,duration:2000}).show();
        }
        console.log(message)
        //
      },

      _validate_params(){

        if(this.tab.active == 0 ){
          //this.params.yyzz = '';
          if(Valids.isEmptyString(this.params.zhengMian)){
            return '请上传身份证人面像...'
          }
          if(Valids.isEmptyString(this.params.fanMian)){
            return '请上传身份证国徽面...'
          }
        }else if( this.tab.active == 1 ){
          this.params.zhengMian = '';
          this.params.fanMian = '';
          if(Valids.isEmptyString(this.params.yyzz)){
            return '请上传企业营业执照...'
          }
        }

        if(Valids.isEmptyString(this.params.name)){
          return '请输入姓名...'
        }
        if(Valids.isEmptyString(this.params.mobile)){
          return '请输入手机号码...'
        }else{
          if(!Valids.isMobile(this.params.mobile)){
            return '手机号码格式错误...'
          }
        }

        return 'yes'

      },
      _show_picture(picture){
        show_picture([picture],picture)
      },
      _select_pic(type) {
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
                  this.params[type] = res['data'];
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
  <div>
    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row">
      <VaBtnGroup :options="tab.options" v-model="tab.active"></VaBtnGroup>
    </div>

    <template v-if="tab.active == 0">
      <div class="vc-fluid--h-min vc-padding__xl-x--ud vc-bg--white">
        <div class="vc-padding__lg ">

          <div class="vc-flex--center vc-margin--bm">

            <div class="vc-padding__lg" v-if="params.zhengMian" @click="params.zhengMian = ''">
              <i class="iconfont icon-lajitong vc-text--xl-x"></i>
            </div>


            <div class="vp-ratio" style="width: 45%">
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner ">
                  <div class="vp-img__inner vc-border vc-flex--center">
                    <template v-if="!params.zhengMian">
                      <div class="vc-text--center" @click="_select_pic('zhengMian')">
                        <i class="iconfont icon-zhaoxiangji vc-text--xl-x"></i>
                        <div>上传身份证人像面</div>
                      </div>
                    </template>
                    <template v-else>
                      <img :src="params.zhengMian" alt="" class="vp-img--max">
                    </template>

                  </div>
                </div>
              </div>
            </div>

            <div class="vc-padding__lg" v-if="params.zhengMian" @click="_show_picture(params.zhengMian)">
              <i class="iconfont icon-fangdajing vc-text--xl-x"></i>
            </div>

          </div>

          <div class="vc-flex--center vc-margin--bm ">

            <div class="vc-padding__lg" @click="params.fanMian = ''" v-if="!!params.fanMian">
              <i class="iconfont icon-lajitong vc-text--xl-x" ></i>
            </div>

            <div class="vp-ratio" style="width: 45%">
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner ">
                  <div class="vp-img__inner vc-border vc-flex--center">
                    <template v-if="!params.fanMian">
                      <div class="vc-text--center" @click="_select_pic('fanMian')">
                        <i class="iconfont icon-zhaoxiangji vc-text--xl-x"></i>
                        <div>上传身份证国徽面</div>
                      </div>
                    </template>
                    <template v-else>
                      <img :src="params.fanMian" alt="" class="vp-img--max">
                    </template>
                  </div>

                </div>
              </div>
            </div>

            <div class="vc-padding__lg" v-if="!!params.fanMian" @click="_show_picture(params.fanMian)">
              <i class="iconfont icon-fangdajing vc-text--xl-x" ></i>
            </div>

          </div>


          <div class="vp-input vc-margin--bm">
            <input type="text" v-model="params.name" placeholder="请输入姓名..." class="vp-input__inner vp-input__text--left vp-input__bg--white" >
          </div>

          <div class="vp-input vc-margin--bm">
            <input type="tel" v-model="params.mobile" placeholder="请输入手机号..." class="vp-input__inner vp-input__text--left vp-input__bg--white" >
          </div>

        </div>

      </div>
    </template>
    <template v-if="tab.active == 1">
      <div class="vc-fluid--h-min vc-padding__xl-x--ud vc-bg--white">
        <div class="vc-padding__lg ">

          <div class="vc-flex--center vc-margin--bm">

            <div class="vc-padding__lg" v-if="params.yyzz" @click="params.yyzz = ''">
              <i class="iconfont icon-lajitong vc-text--xl-x"></i>
            </div>


            <div class="vp-ratio" style="width: 45%">
              <div class="vp-ratio__outer" data-ratio="200%">
                <div class="vp-ratio__inner ">
                  <div class="vp-img__inner vc-border vc-flex--center">
                    <template v-if="!params.yyzz">
                      <div class="vc-text--center" @click="_select_pic('yyzz')">
                        <i class="iconfont icon-zhaoxiangji vc-text--xl-x"></i>
                        <div>上传企业营业执照</div>
                      </div>
                    </template>
                    <template v-else>
                      <img :src="params.yyzz" alt="" class="vp-img--max">
                    </template>

                  </div>
                </div>
              </div>
            </div>

            <div class="vc-padding__lg" v-if="params.yyzz" @click="_show_picture(params.yyzz)">
              <i class="iconfont icon-fangdajing vc-text--xl-x"></i>
            </div>

          </div>

          <div class="vp-input vc-margin--bm">
            <input type="text" v-model="params.name" placeholder="请输入姓名..." class="vp-input__inner vp-input__text--left vp-input__bg--white" >
          </div>

          <div class="vp-input vc-margin--bm">
            <input type="tel" v-model="params.mobile" placeholder="请输入手机号..." class="vp-input__inner vp-input__text--left vp-input__bg--white" >
          </div>

        </div>

      </div>
    </template>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row">
        <div class=" vp-btn__simple vp-btn--white " @click="_save_material">提交</div>
      </div>
    </div>


  </div>

</template>
<style scoped></style>
