<script type="text/ecmascript-6">
  import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  import basic  from './mixin/basic'
  export default {
    name: "SubJoinClassParent",
    components: { VaPopupRadio },
    mixins: [ user ,basic ],
    data() {
      return {
        options:{
          sex:[ { text :'男',value:'1'},{ text:'女' ,value:'2'}],
        },
        params:{

          classId:'',
          childName:'',
          sexName:'',
          childSex:'',
          chengHu:'',

          teacherType:''


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
        if(this.userMessage['memType']==2){
          await this.$get_parent_child_list(true);
          await this.$get_parent_type_list(true);
        }else if(this.userMessage['memType']==1){
          await this.$get_teacher_type_list(true);
        }

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
      _save_class(){

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
      '': {
        handler(val, olval) {

        },
        deep: true, immediate: true
      },
      ['params.childName']: {
        handler(val) {
          let bool = Arrays.exit(this.childParentList, function (item) {
            return item['stuName'] == val;
          });
          if (!bool) {
            this.params.stuId = '';
            this.params.childSex = '';
            this.params.sexName = '';
            this.params.chengHu = '';
          }
        },
        immediate: true
      }
    },
  }
</script>
<template>
<div>
  <div class="vc-fluid--h-min vc-padding__xl-x--bm vc-bg">

    <template v-if="userMessage['memType'] == 1">
      <template>
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
      </template>
      <template>
        <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[4] = true ">
          <div class="vc-text--bold ">类型</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--gray " v-if="!params.teacherType">请添加老师类型</span>
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.teacherType">{{ params.teacherType }}</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>


        <div class="vp-footer vp-footer--shadow">
          <div class="vp-row">
            <div class="vp-btn__simple vp-btn--white" @click="_save_class('teacher')">提交</div>
          </div>
        </div>
      </template>
    </template>

    <template v-if="userMessage['memType'] == 2">
      <template>
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
      </template>
      <template>
        <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[1] = true ">
          <div class="vc-text--bold ">孩子姓名</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--gray " v-if="!params.childName">请输入孩子的姓名</span>
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.childName">{{ params.childName }}</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>

        <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[2] = true ">
          <div class="vc-text--bold ">孩子性别</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--gray " v-if="!params.sexName">请选择孩子性别</span>
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.sexName">{{ params.sexName }}</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>

        <div   class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[3] = true">
          <div class="vc-text--bold ">孩子对您的称呼</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--light vc-text--lg" v-if="!!params.chengHu">{{ params.chengHu }}</span>
            <span class=" vc-text vc-text--gray "  v-if="!params.chengHu">请选择孩子对您的称呼</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>

        <div class="vp-footer vp-footer--shadow">
          <div class="vp-row">
            <div class="vp-btn__simple vp-btn--white" @click="_save_class('parent')">提交</div>
          </div>
        </div>
      </template>
    </template>


  </div>
</div>
</template>
<style scoped></style>
