<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import basic  from './mixin/basic'
  import classes  from './mixin/class'
  export default {
    name: "SubUserClassTeacherTypeEdit",
    components: {},
    mixins: [ basic ,classes ],
    data() {
      return {
        params:{
          teacherType:'',
          classId:''
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
        this.params.teacherType =  this.$route.query['teacherType'];
        this.params.classId =  this.$route.query['classId'];
         await this.$get_teacher_type_list();
      },
      _update_teacher_type(){
        this.popups[0] = false ;
        if(Valids.isEmptyString(this.params.teacherType)){
          this.$createToast({message: '请添加您所交的科目!',duration:2000}).show();
        }else{
          this.$update_teacher_type(this.params)
        }

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
<div class="vc-bg">

  <van-popup position="bottom" v-model="popups[0]">
    <div class="">

      <div class="vp-header vp-header--shadow vc-padding__lg--ad vc-padding--ud vc-bg">
        <div class="vp-input">
          <input type="text" v-model="params.teacherType" placeholder="请输入科目类型或选择科目类型" class="vp-input__inner" maxlength="20">
        </div>
      </div>

      <div class="vc-fluid vc-padding__xl-x--bm vc-padding__xl-xx--tp  vc-bg vc-flow" >
        <div class="">
          <div class="vp-row vc-flex--center vc-text--light  vc-border--bm" v-for="(item,index) in teacherTypeList" @click="params.teacherType = item.text">{{ item.text }}</div>
        </div>
      </div>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <div  class=" vp-btn__simple vp-btn--white " @click="_update_teacher_type">确认</div>
        </div>
      </div>

    </div>
  </van-popup>


  <div   class="vp-row    vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[0] = true">
    <div class="vc-text--bold "><span class="vc-text--danger">*</span>所教科目类型</div>
    <div class="vp-icon__outer">
      <span class=" vc-text vc-text--light " v-if="!!params.teacherType">{{ params.teacherType }}</span>
      <span class=" vc-text vc-text--gray "  v-if="!params.teacherType">请添加科目类型</span>
      <i class=" vc-text iconfont icon-iconfontjiantou2  vc-text--gray vc-margin__sm--lt"></i>
    </div>
  </div>

</div>
</template>
<style scoped></style>
