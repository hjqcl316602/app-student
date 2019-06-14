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
    name: "SubClassJoin",
    components: { QRCode,VaPopupRadio },
    mixins: [ basic,user,classes ,common ],
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
        radioValue:'1',
        params:{
          fromName:"",
          className:"",
          classType:"",
          webMemId:'',
          fromUser:'',

          classId:'',
          childName:'',
          stuId:'',
          sexName:'',
          childSex:'',
          chengHu:'',
          teacherType:''
        },
      }
    },
    methods: {
      async _init_page(){

        let params = this.$route.query['params'] ? this.$route.query['params'].split(",") :[];

        if(this.$configs['HTTP_LOCATION'] === 'localhost'){
          this.params.fromUser = params[0] || this.$configs['fromUser']  ;
          this.params.webMemId = params[1] || this.$configs['webMemId'] ;
          this.params.classId = params[2] ||this.$configs['TEACHER']['CLASSID'];
          this.$referer({ fromUser : this.params.fromUser })
        }else{
          this.params.fromUser = params[0] || ''  ;
          this.params.webMemId = params[1] || '' ;
          this.params.classId = params[2] || '';
        }

        // 得到分享过来的人的中文名
        await  this.$get_user_active({ webMemId:this.params.webMemId,fromUser:this.params.fromUser }).then((data)=>{
          this.params.fromName =data['data']['trueName'] || data['data']['memName']
        });
        // 得到分享过来的班级的中文名
        await this.$get_class_name({classId:this.params.classId}).then((data)=>{
          this.params.className =data['data']['className'];
          this.params.classType =data['data']['classsType'];
        });

        await this.$get_parent_child_list(true);
        await this.$get_parent_type_list(true);
        await this.$get_teacher_type_list(true);

      },
      _select_radio(value,type){
        if( type == 'sex'){
          this.params.sexName = value.text;
          this.params.childSex = value.value;
        }else if( type == 'parent'){
          this.params.chengHu = value.text;
        }else if( type == 'teacher'){
          this.params.teacherType = value.text;
        }
      },
      _validate_params(params){
        if(params.childName == ''){
          return '请输入孩子的姓名!'
        }else{
          if(!Valids.isCodeNoSpecial(params.childName)){
            return '孩子的姓名不能包含特殊字符!'
          }
        }

        if(params.childSex == ''){
          return '请选择孩子的性别!'
        }

        if(params.chengHu == ''){
          return '请选择孩子对您的称呼!'
        }
        return 'yes'
      },
      _validate_params_teacher(params){
        if(params.teacherType == ''){
          return '请选择您的老师类型!'
        }
        return 'yes'
      },

      // 废弃，直接使用固定二维码
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
      _save_class(type){

        if(type == 'parent'){
          let message = this._validate_params(this.params);
          if(message == 'yes'){

             this.$join_class(this.params).then(()=>{
               this.popups[5] = true
               let formUserShare =  this.params.fromUser ;
               this.$referer({ fromUser : formUserShare })
             })
          }else{
            this.$toast({  message:message})
          }
        }
        else if( type == 'teacher'){
          let message = this._validate_params_teacher(this.params);
          if(message == 'yes'){

            this.$join_teacher_class(this.params).then(()=>{
              this.popups[5] = true
              let formUserShare =  this.params.fromUser ;
              this.$referer({ fromUser : formUserShare })
            })
          }else{
            this.$toast({  message:message})
          }
        }
      },
      _select_child(item){
          this.params.stuId = item['stuId'];
          this.params.childName = item['stuName'];
          this.params.childSex = item['stuSex'];
          this.params.sexName = ( item['stuSex'] == 1 )  ? '男' : '女';
          this.params.chengHu = item['chengHu'];
      }
    },
    watch: {
      radioValue:{
        handler(val){
          console.log(val)
        },
        immediate:true

      },
      ['params.childName']:{
        handler(val){
          let bool = Arrays.exit( this.childParentList,function (item) {
            return item['stuName'] == val ;
          });
          if(!bool){
            this.params.stuId = '';
            this.params.childSex = '';
            this.params.sexName = '';
            this.params.chengHu = '';
          }
        },
        immediate:true
      }
    },
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min ">

    <!--    <van-popup position="right" v-model="popups[1]">
          <div class="vc-fluid vc-bg vc-flex vc-items&#45;&#45;center">
            <div class="vc-fluid&#45;&#45;w vc-padding__lg&#45;&#45;ad">
              <div class="vp-input vc-margin&#45;&#45;bm">
                <input type="text" v-model="params.childName" placeholder="请输入孩子的姓名" class="vp-input__inner" maxlength="20">
              </div>
              <div class="vp-btn__submit vp-btn&#45;&#45;theme" @click="popups[1] = false">返回</div>
            </div>
          </div>
        </van-popup>-->

    <van-popup position="bottom" v-model="popups[1]">
      <div class="">

        <div class="vp-header vp-header--shadow vc-padding__lg--ad vc-padding--ud vc-bg">
          <div class="vp-input">
            <input type="text" v-model="params.childName" placeholder="请输入或选择孩子" class="vp-input__inner" maxlength="20">
          </div>
        </div>

        <div class="vc-fluid vc-padding__xl-x--bm vc-padding__xl-xx--tp  vc-bg vc-flow" >
          <div class="">
            <div class="vp-row vc-flex--center vc-text--light vc-text--lg vc-border--bm" v-for="(item,index) in childParentList" @click="_select_child(item)">{{ item['stuName'] }} ({{ item['stuSex'] | str_sex }})</div>
          </div>
        </div>

        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row" >
            <div  class=" vp-btn__simple vp-btn--white " @click="popups[1] = false">确认</div>
          </div>
        </div>

      </div>
    </van-popup>

    <VaPopupRadio :options="options.sex" position="right" v-model="popups[2]" @select="_select_radio($event,'sex')"></VaPopupRadio>

    <VaPopupRadio :options="parentTypeList" position="right" v-model="popups[3]" @select="_select_radio($event,'parent')"></VaPopupRadio>

<!--
    <VaPopupRadio :options="teacherTypeList" position="right" v-model="popups[4]" @select="_select_radio($event,'teacher')"></VaPopupRadio>
-->

    <van-popup position="bottom" v-model="popups[4]">
      <div class="">

        <div class="vp-header vp-header--shadow vc-padding__lg--ad vc-padding--ud vc-bg">
          <div class="vp-input">
            <input type="text" v-model="params.teacherType" placeholder="请输入老师类型或选择老师类型" class="vp-input__inner" maxlength="20">
          </div>
        </div>

        <div class="vc-fluid vc-padding__xl-x--bm vc-padding__xl-xx--tp  vc-bg vc-flow" >
          <div class="">
            <div class="vp-row vc-flex--center vc-text--light vc-text--lg vc-border--bm" v-for="(item,index) in teacherTypeList" @click="params.teacherType = item.text">{{ item.text }}</div>
          </div>
        </div>

        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row" >
            <div  class=" vp-btn__simple vp-btn--white " @click="popups[4] = false">确认</div>
          </div>
        </div>

      </div>
    </van-popup>


    <van-popup position="right" v-model="popups[5]">
      <div class="vc-fluid vc-bg vc-flex--center">
        <div class="vp-ratio" style="width: 70%">
          <div class="vp-ratio__outer" data-ratio="100%">
            <div class="vp-ratio__inner">
              <div class="vp-img__inner" id="qrcode">
                <img src="../img/img-code.jpg" alt="" class="vp-img--max">
              </div>
            </div>
          </div>
          <div class="vc-text--center vc-text--theme vc-text--bold vc-padding__lg">长按识别关注公众号<br>即可查看孩子的在校情况</div>
        </div>
      </div>
    </van-popup>

    <div class="vc-padding__lg vc-bg vc-flex--center" >
      <span class="vc-text--bold vc-text--lg">{{ params.fromName }}邀请您的孩子加入[{{ params.classType }}·{{ params.className }}]</span>
    </div>

    <div class="vc-padding__lg ">
      <span class="vc-text--bold vc-text--gray">请选择您的身份</span>
    </div>

    <div class="vc-padding__lg vc-bg">

      <div class="vi-radio vi-radio--warning"><input type='radio' value="1"  v-model="radioValue" name="user" id="radio-01"><label for="radio-01"><span>我是家长</span></label></div>

      <div class="vi-radio vi-radio--info vc-margin--tp"><input type='radio' value="2"  v-model="radioValue" name="user" id="radio-02"><label for="radio-02"><span>我是老师</span></label></div>

    </div>

    <template v-if="radioValue==1">
      <div class="vc-padding__lg">
        <span class="vc-text--bold vc-text--gray">孩子的信息</span>
      </div>

      <div class="vc-bg">

        <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[1] = true ">
          <div class="vc-text--bold vc-text--lg">孩子姓名</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--gray " v-if="!params.childName">请输入孩子的姓名</span>
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.childName">{{ params.childName }}</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>

        <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[2] = true ">
          <div class="vc-text--bold vc-text--lg">孩子性别</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--gray " v-if="!params.sexName">请选择孩子性别</span>
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.sexName">{{ params.sexName }}</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>

        <div   class="vp-row    vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[3] = true">
          <div class="vc-text--bold vc-text--lg">孩子对您的称呼</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.chengHu">{{ params.chengHu }}</span>
            <span class=" vc-text vc-text--gray "  v-if="!params.chengHu">请选择孩子对您的称呼</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>

        <div class="vc-padding__lg">
          <div class="vp-btn__submit vp-btn--theme" @click="_save_class('parent')">提交</div>
        </div>
      </div>
    </template>

    <template v-if="radioValue==2">
      <div class="vc-padding__lg ">
        <span class="vc-text--bold vc-text--gray">老师的信息</span>
      </div>

      <div class="vc-bg">
        <div   class="vp-row vc-border--bm vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[4] = true">
          <div class="vc-text--bold vc-text--lg">类型</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.teacherType">{{ params.teacherType }}</span>
            <span class=" vc-text vc-text--gray "  v-if="!params.teacherType">请添加老师类型</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>

        <div class="vc-padding__lg">
          <div class="vp-btn__submit vp-btn--theme" @click="_save_class('teacher')">提交</div>
        </div>

      </div>
    </template>

  </div>
</template>
<style scoped>


</style>
