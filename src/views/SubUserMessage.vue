<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  import { VaPopupRadio }  from './component'
  export default {
    name: "",
    components: { VaPopupRadio },
    mixins: [ user ],
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
          name:'',
          tel:''
        },
        options:{
          sex:[ { text :'男',value:'1'},{ text:'女' ,value:'2'}],
        },
      }
    },
    methods: {
      async _init_page() {
        await  this.$get_user_info();
      },
      _save_params(type){
        if(type == 'name'){

          let message = this._validate_params_name(this.params.name);
          if(message == 'yes'){
            if(this.params.name == this.userInfo['trueName']){
              this.popups[0] = false;
              this.params.name = ''
            }else{
              this.$update_user_info({ name:this.params.name }).then(()=>{
                this.$toast({duration:3000,message:'用户姓名修改成功！'});
                this.popups[0] = false;
                this.params.name = ''
              },()=>{
                this.$toast({duration:3000,message:'用户姓名修改失败！'})
              });
            }

          }else{
            this.$toast({duration:3000,message: message })
          }

        }else if( type == 'tel'){

          let message = this._validate_params_tel(this.params.tel);

          if(message == 'yes'){

            if( this.params.tel == this.userInfo['mobile']){
              this.popups[2] = false;
              this.params.tel = '';
            }else{
              this.$update_user_info({ mobile:this.params.tel }).then(()=>{
                this.$toast({duration:3000,message:'用户电话号码修改成功！'});
                this.popups[2] = false;
                this.params.tel = '';
              },()=>{
                this.$toast({duration:3000,message:'用户电话号码修改失败！'})
              });
            }



          }else{
            this.$toast({duration:3000,message: message })
          }

        }
      },
      _validate_params_name(val){
        if(val == ''){
          return '请填写您的姓名！'
        }else{
          if(!Valids.isCodeNoSpecial(val)){
            return '姓名不能包含特殊字符!'
          }
        }
        return 'yes'
      },
      _validate_params_tel(val){
        if(val == ''){
          return '请填写您的电话号码！'
        }else{
          if(!Valids.isMobile(val)){
            return '电话号码格式错误!'
          }
        }
        return 'yes'
      },
      _select_sex(val){
        if(val['value'] == this.userInfo['sex']){
          this.popups[1] = false
        }else{
          this.$update_user_info({ sex:val['value'] }).then(()=>{
            this.$toast({duration:3000,message:'用户性别修改成功！'});
            this.popups[1] = false
          },()=>{
            this.$toast({duration:3000,message:'用户性别修改失败！'})
          });
        }

      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg">

    <van-popup position="right" v-model="popups[0]">
      <div class="vc-fluid vc-bg vc-flex vc-items--center">
        <div class="vc-fluid--w vc-padding__lg--ad">
          <div class="vp-input vc-margin--bm">
            <input type="text" v-model="params.name" placeholder="请输入您的姓名" class="vp-input__inner" maxlength="20">
          </div>
          <div class="vp-btn__submit vp-btn--theme vc-margin--bm" @click="_save_params('name')">确认</div>
          <div class="vp-btn__submit vp-btn--normal" @click="popups[0] = false">取消</div>
        </div>
      </div>
    </van-popup>

    <VaPopupRadio :options="options.sex" position="bottom" v-model="popups[1]" @select="_select_sex"></VaPopupRadio>

    <van-popup position="right" v-model="popups[2]">
      <div class="vc-fluid vc-bg vc-flex vc-items--center">
        <div class="vc-fluid--w vc-padding__lg--ad">
          <div class="vp-input vc-margin--bm">
            <input type="tel" v-model="params.tel" placeholder="请输入您的电话号码" class="vp-input__inner" maxlength="11">
          </div>
          <div class="vp-btn__submit vp-btn--theme vc-margin--bm" @click="_save_params('tel')">确认</div>
          <div class="vp-btn__submit vp-btn--normal" @click="popups[2] = false">取消</div>
        </div>
      </div>
    </van-popup>

    <div class="vc-bg">
      <div class=" vc-padding--ud vc-padding__lg--ad vc-border--bm ">

        <div class="vp-row--min vc-flex--between-center">
          <div class="vc-text--lg vc-text--bold">头像</div>
          <div class="vp-img__inner vp-img__head" data-round="60">
            <img :src="userInfo['memPhoto']" alt="" class="vp-img--max">
            <img src="../img/icon-head-error-male.png" alt="" class="vp-img--error">
          </div>
        </div>

      </div>

      <div class="  vc-padding__lg--ad vc-border--bm ">

        <div class="vp-row--min vc-flex--between-center">
          <div class="vc-text--lg vc-text--bold">昵称</div>
          <div class="vc-text--lg vc-text--light ">{{userInfo['memName']}}</div>
        </div>

      </div>

      <div class=" vc-padding__lg--ad vc-border--bm " @click="popups[0] = true ">

        <div class="vp-row--min vc-flex--between-center">
          <div class="vc-text--lg vc-text--bold">姓名</div>
          <div class="vp-icon__outer">
            <div class=" vc-text--theme" v-if="!userInfo['trueName']">去添加</div>
            <div class="vc-text--lg vc-text--light" v-else>{{ userInfo['trueName'] }}</div>
            <i class="iconfont icon-iconfontjiantou2 vc-text--light vc-margin__sm--lt" ></i>
          </div>
        </div>

      </div>

      <div class=" vc-padding__lg--ad vc-border--bm " @click="popups[1] = true">

        <div class="vp-row--min vc-flex--between-center">
          <div class="vc-text--lg vc-text--bold">性别</div>
          <div class="vp-icon__outer">
            <div class=" vc-text--theme" v-if="!userInfo['sex']">去添加</div>
            <div class="vc-text--lg vc-text--light" v-else >{{ userInfo['sex'] | str_sex }}</div>
            <i class="iconfont icon-iconfontjiantou2 vc-text--light vc-margin__sm--lt" ></i>
          </div>
        </div>

      </div>

      <div class=" vc-padding__lg--ad  vc-border--bm"  @click="popups[2] = true" >

        <div class="vp-row--min vc-flex--between-center">
          <div class="vc-text--lg vc-text--bold">手机号</div>
          <div class="vp-icon__outer">
            <div class=" vc-text--theme" v-if="!userInfo['mobile']">去添加</div>
            <div class="vc-text--lg vc-text--light" v-else >{{ userInfo['mobile']}}</div>
            <i class="iconfont icon-iconfontjiantou2 vc-text--light vc-margin__sm--lt" ></i>
          </div>
        </div>

      </div>



    </div>
  </div>
</template>
<style scoped></style>
