<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import manager  from './mixin/manager'
  import { VaPopupRadio }  from './component'
  import basic from './mixin/basic'
  import classes from './mixin/class'
  import user from './mixin/user'
  import teacher from './mixin/teacher'
  import wx from 'weixin-js-sdk'
  export default {
    name: "",
    components: { VaPopupRadio },
    mixins: [ basic ,classes, user ,teacher ],
    beforeRouteEnter (to, from, next) {
      next(vm=> {
      })
    },
    beforeRouteLeave(to, from, next){
      next();
    },
    beforeRouteUpdate (to, from, next) {
      next();
    },
    beforeCreate(){
    },
    created(){
    },
    beforeMount(){

    },
    mounted(){
      this._init_page_config()
    },
    activated(){
      this._init_page()
    },
    props: [],
    data(){
      return {
        options:{
          sex:[ { text :'男',value:'1'},{ text:'女' ,value:'2'}],
        },
        params:{
          type:'',
          classId:'',

          area:'',
          schoolName:'',
          classType:'',
          className:'',
          childName:'',
          childSex:'',
          chengHu:'',
          teacherType:'',
          schoolId:'',

          areaName:'',
          classTypeName:"",
          sexName:'',

          classPic:''
        },
        columns:[]
      }
    },
    methods: {
      async _init_page_config(){

        await this.$get_area_list(true);
        this.init_address_list();
        await this.$get_teacher_type_list(true);

      },

      async _init_page(){
        this.params.classId = this.$route.query['classId'];
        this.params.type = this.$route.query['type'] || 'insert';
        if(this.params.type === 'edit'){
          this.$get_student_list(this.params).then((res)=>{
            let classInfo = res['data']['classInfo'];
            this.params.area = classInfo['area'];
            this.params.areaName = classInfo['areaName'];
            this.params.classType = classInfo['classsType'];
            this.params.className = classInfo['className'];
            this.params.schoolName = classInfo['schoolName'];
            this.params.schoolId = classInfo['schoolId'];
            this.params.classPic = classInfo['classPic'];
          })
        }

      },
      _select_sex(){

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
                  this.params.classPic = res['data'];
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
      _save_class(){

        let bool = this._validate_params(this.params);

        if(bool == 'yes'){
          this.$dialog.confirm({
            title:'确认提示',
            message:'请确认信息无误，是否提交？'
          }).then(()=>{

            if(this.params.type === 'insert'){
              this.$create_teacher_class(this.params).then((data)=>{

                //更换当前用户

                let userMessage = Object.assign({},this.userMessage ) ;
                userMessage['classId'] = data['data']['classId'];

                this.$store.commit('get_user_message',userMessage);

                setTimeout(()=>{
                  this.$router.go(-1);
                  this.$destroy()
                },800)
              })
            }else{
              this.$update_class(this.params).then((data)=>{

                setTimeout(()=>{
                  this.$router.go(-1);
                  this.$destroy()
                },800)

              })
            }

          }).catch(()=>{})
        }else {
          this.$toast(bool)
        }
      },

      _validate_params(params){

        if(params.area == ''){
          return '请选择地区!'
        }

        if( !Valids.isEmptyString(params.schoolName) && !Valids.isCodeNoSpecial(params.schoolName)){
          return '学校名称不能包含特殊字符!'
        }
        /*if(params.schoolName == ''){
          return '请输入和选择学校!'
        }else{

        }*/

        /*if(params.classType == ''){
          return '请选择年级!'
        }*/

        if(params.className == ''){
          return '请输入班级名称!'
        }else{
          if(!Valids.isCodeNoSpecial(params.className)){
            return '班级名称不能包含特殊字符!'
          }
        }

        if(params.teacherType == '' && params.type === 'insert'){
          return '请选择您的所教科目类型!'
        }

        return 'yes'

      },

      _select_radio(value,type){
        if( type == 'class'){
          this.params.classTypeName = value.text;
          this.params.classType = value.value;
        }else if( type == 'sex'){
          this.params.sexName = value.text;
          this.params.childSex = value.value;
        }else if( type == 'parent'){
          this.params.chengHu = value.text;
        }else if(type=='teacher'){
          this.params.teacherType = value.text;
        }
      },

      // 地区相关
      object_format(obj){
        let arr = [];
        Object.keys(obj).forEach(key => {
          let newObj = {
            value:key,
            text:obj[key]
          };
          arr.push(newObj)
        });
        return arr;
      },
      select_confirm(value){
        this.popups[0] = false;
        this.params.areaName = value[0]['text'] + value[1]['text'] + value[2]['text'];
        this.params.area = value[2]['value']  ;
        this.$get_school_list(this.params.area)
      },
      init_address_list(){
        let province =this.areaList['0'];
        let new_province = this.object_format(province) ;
        let new_city = this.object_format(this.areaList['0,'+new_province[0]['value']]) ;
        let new_county  = this.object_format(this.areaList['0,'+new_province[0]['value']+','+  new_city[0]['value']]) ;

        this.columns['0'] = {
          values:new_province,
          className: 'column1'
        };
        this.columns['1'] = {
          values:new_city,
          className: 'column2'
        };
        this.columns['2'] = {
          values:new_county,
          className: 'column3'
        };
      },
      change_select_address(pick,values,index,ii){

        if(index == 0){
          let provinceValue= values[0]['value'];
          let city = this.object_format(this.areaList['0,'+ provinceValue] );
          let county = this.object_format(this.areaList['0,'+ provinceValue+','+city[0]['value']] );
          pick.setColumnValues(1, city );
          pick.setColumnValues(2, county );
        }else if(index == 1 ){
          let provinceValue= values[0]['value'];
          let cityValue = values[1]['value'];
          let county = this.object_format(this.areaList['0,'+ provinceValue + ','+ cityValue ] );
          pick.setColumnValues(2, county );
        }
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div>



    <van-popup  position="bottom" v-model="popups[0]">
      <!--<div class="com-flex com-content&#45;&#45;between com-padding com-border&#45;&#45;bm">
        <div class="com-text com-text&#45;&#45;lg com-text&#45;&#45;gray" @click="show = false">取消</div>
        <div class="com-text com-text&#45;&#45;lg com-text&#45;&#45;theme" @click="popup_ok">完成</div>
      </div>-->
      <van-picker  show-toolbar title="所在地选择"  @cancel="popups[0] = false" @confirm="select_confirm" :columns="columns" @change="change_select_address"  ref="pick" text/>
    </van-popup>

    <van-popup position="bottom" v-model="popups[1]">
      <div class="">

        <div class="vp-header vp-header--shadow vc-padding__lg--ad vc-padding--ud vc-bg">
          <div class="vp-input">
            <input type="text" v-model="params.schoolName" placeholder="请输入学校名称或选择以下学校" class="vp-input__inner" maxlength="20">
          </div>
        </div>

        <div class="vc-fluid vc-padding__xl-x--bm vc-padding__xl-xx--tp  vc-bg vc-flow" >
          <div class="">
            <div class="vp-row vc-flex--center vc-text--light  vc-border--bm" v-for="(item,index) in schoolList" @click="params.schoolName = item.name">{{ item.name }}</div>
          </div>
        </div>

        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row" >
            <div  class=" vp-btn__simple vp-btn--white " @click="popups[1] = false">确认</div>
          </div>
        </div>

      </div>
    </van-popup>

    <van-popup position="bottom" v-model="popups[2]">
      <div class="vc-fluid vc-bg vc-flex vc-items--center">
        <div class="vc-fluid--w vc-padding__lg--ad">
          <div class="vp-input vc-margin--bm">
            <input type="text" v-model="params.classType" placeholder="请输入年级" class="vp-input__inner" maxlength="20">
          </div>
          <div class="vp-btn__submit vp-btn--theme" @click="popups[2] = false">确认</div>
        </div>
      </div>
    </van-popup>

    <!--<VaPopupRadio :options="classTypeList" position="right" v-model="popups[2]" @select="_select_radio($event,'class')"></VaPopupRadio>-->

    <van-popup position="bottom" v-model="popups[3]">
      <div class="vc-fluid vc-bg vc-flex vc-items--center">
        <div class="vc-fluid--w vc-padding__lg--ad">
          <div class="vp-input vc-margin--bm">
            <input type="text" v-model="params.className" placeholder="请输入班级" class="vp-input__inner" maxlength="20">
          </div>
          <div class="vp-btn__submit vp-btn--theme" @click="popups[3] = false">确认</div>
        </div>
      </div>
    </van-popup>


 <!--   <VaPopupRadio :options="teacherTypeList" position="right" v-model="popups[6]" @select="_select_radio($event,'teacher')"></VaPopupRadio>
-->
    <van-popup position="bottom" v-model="popups[6]">
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
            <div  class=" vp-btn__simple vp-btn--white " @click="popups[6] = false">确认</div>
          </div>
        </div>

      </div>
    </van-popup>

    <div class="vc-bg">

      <div class=" vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg" >
        <div class="vc-text--bold ">班级logo</div>
        <template v-if="!params.classPic">
          <div class="vp-img__inner vp-img__head" data-square="80" @click="_select_pic" >
            <svg viewBox="0 0 1024 1024" version="1.1" p-id="1903" height="100%" width="100%" >
              <path xmlns="http://www.w3.org/2000/svg" d="M610.133333 912.213333h70.4v28.586667H610.133333zM224 83.626667H294.4v28.586666H224zM736.426667 83.626667h70.4v28.586666h-70.4zM911.786667 736.853333h28.586666v70.4h-28.586666zM911.786667 905.386667a6.826667 6.826667 0 0 1-6.826667 6.826666h-42.666667V938.666667h56.32a21.333333 21.333333 0 0 0 21.333334-21.333334v-54.186666h-28.586667zM350.293333 912.213333h77.653334v28.586667H350.293333zM483.84 912.213333h70.4v28.586667h-70.4zM610.133333 83.626667h70.4v28.586666H610.133333zM919.04 85.333333h-56.32v28.586667h42.666667a6.4 6.4 0 0 1 4.693333 0 6.4 6.4 0 0 1 0 4.693333v49.92H938.666667V104.96a21.333333 21.333333 0 0 0-19.626667-19.626667zM911.786667 224.426667h28.586666v70.4h-28.586666zM911.786667 350.72h28.586666v77.653333h-28.586666zM911.786667 610.133333h28.586666v70.4h-28.586666zM911.786667 483.84h28.586666v70.4h-28.586666zM736.426667 912.213333h70.4v28.586667h-70.4zM83.626667 350.72h28.586666v77.653333h-28.586666zM83.626667 224.426667h28.586666v70.4h-28.586666zM83.626667 483.84h28.586666v70.4h-28.586666zM350.293333 83.626667h77.653334v28.586666H350.293333zM483.84 83.626667h70.4v28.586666h-70.4zM224 912.213333H294.4v28.586667H224zM83.626667 610.133333h28.586666v70.4h-28.586666zM83.626667 736.853333h28.586666v70.4h-28.586666zM111.786667 905.386667v-42.666667H85.333333v56.32a21.333333 21.333333 0 0 0 21.333334 21.333333h61.44v-28.586666H118.613333a6.826667 6.826667 0 0 1-6.826666-6.4zM85.333333 104.96v63.573333h28.586667V119.04a6.826667 6.826667 0 0 1 6.826667-6.826667h47.36V85.333333H104.96a21.333333 21.333333 0 0 0-19.626667 19.626667zM682.666667 499.2h-157.44V341.333333a13.226667 13.226667 0 1 0-26.026667 0v157.866667H341.333333a13.226667 13.226667 0 1 0 0 26.026667h157.44V682.666667a13.226667 13.226667 0 1 0 26.026667 0v-157.44H682.666667a13.226667 13.226667 0 0 0 0-26.026667z" fill="#707070" p-id="6095"/>
            </svg>
          </div>
        </template>
        <template v-else>
          <div class="vp-img__inner vp-img__head" data-square="80" @click="_select_pic" >
            <img :src="params.classPic" alt="" @load="_pub_img_load">
            <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--half">
          </div>
        </template>

      </div>

      <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[0] = true">
        <div class="vc-text--bold "><span class="vc-text--danger">*</span>省市区</div>
        <div class="vp-icon__outer">
          <span class=" vc-text vc-text--gray " v-if="!params.areaName">请选择省市区</span>
          <span class=" vc-text vc-text--light " v-if="!!params.areaName">{{ params.areaName }}</span>
          <i class=" vc-text iconfont icon-iconfontjiantou2  vc-text--gray vc-margin__sm--lt"></i>
        </div>
      </div>

      <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[1] = true">
        <div class="vc-text--bold ">学校名称</div>
        <div class="vp-icon__outer">
          <span class=" vc-text vc-text--gray " v-if="!params.schoolName">请输入或选择学校名称</span>
          <span class=" vc-text vc-text--light " v-if="!!params.schoolName">{{ params.schoolName }}</span>
          <i class=" vc-text iconfont icon-iconfontjiantou2  vc-text--gray vc-margin__sm--lt"></i>
        </div>
      </div>

      <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[2] = true ">
        <div class="vc-text--bold ">年级</div>
        <div class="vp-icon__outer">
          <span class=" vc-text vc-text--gray " v-if="!params.classType">请选择年级</span>
          <span class=" vc-text vc-text--light " v-if="!!params.classType">{{ params.classType }}</span>
          <i class=" vc-text iconfont icon-iconfontjiantou2  vc-text--gray vc-margin__sm--lt"></i>
        </div>
      </div>

      <div class="vp-row  vc-border--bm  vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[3] = true ">
        <div class="vc-text--bold "><span class="vc-text--danger">*</span>班级</div>
        <div class="vp-icon__outer">
          <span class=" vc-text vc-text--gray " v-if="!params.className">请输入班级</span>
          <span class=" vc-text vc-text--light " v-if="!!params.className">{{ params.className }}</span>
          <i class=" vc-text iconfont icon-iconfontjiantou2  vc-text--gray vc-margin__sm--lt"></i>
        </div>
      </div>

      <template v-if="params.type === 'insert'">
        <div   class="vp-row    vc-flex vc-items--center vc-content--between vc-padding__lg--ad" @click="popups[6] = true">
          <div class="vc-text--bold "><span class="vc-text--danger">*</span>所教科目类型</div>
          <div class="vp-icon__outer">
            <span class=" vc-text vc-text--light " v-if="!!params.teacherType">{{ params.teacherType }}</span>
            <span class=" vc-text vc-text--gray "  v-if="!params.teacherType">请添加科目类型</span>
            <i class=" vc-text iconfont icon-iconfontjiantou2  vc-text--gray vc-margin__sm--lt"></i>
          </div>
        </div>
      </template>


      <!--
            <div class="vp-row  vc-border&#45;&#45;bm  vc-flex vc-items&#45;&#45;center vc-content&#45;&#45;between vc-padding__lg&#45;&#45;ad" @click="popups[4] = true ">
              <div class="vc-text&#45;&#45;bold vc-text&#45;&#45;lg">孩子姓名</div>
              <div class="vp-icon__outer">
                <span class=" vc-text vc-text&#45;&#45;gray " v-if="!params.childName">请输入孩子的姓名</span>
                <span class=" vc-text vc-text&#45;&#45;light vc-text&#45;&#45;lg" v-if="!!params.childName">{{ params.childName }}</span>
                <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text&#45;&#45;lg vc-text&#45;&#45;gray vc-margin__sm&#45;&#45;lt"></i>
              </div>
            </div>

            <div class="vp-row  vc-border&#45;&#45;bm  vc-flex vc-items&#45;&#45;center vc-content&#45;&#45;between vc-padding__lg&#45;&#45;ad" @click="popups[5] = true ">
              <div class="vc-text&#45;&#45;bold vc-text&#45;&#45;lg">孩子性别</div>
              <div class="vp-icon__outer">
                <span class=" vc-text vc-text&#45;&#45;gray " v-if="!params.sexName">请选择孩子性别</span>
                <span class=" vc-text vc-text&#45;&#45;light vc-text&#45;&#45;lg" v-if="!!params.sexName">{{ params.sexName }}</span>
                <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text&#45;&#45;lg vc-text&#45;&#45;gray vc-margin__sm&#45;&#45;lt"></i>
              </div>
            </div>

            <div   class="vp-row    vc-flex vc-items&#45;&#45;center vc-content&#45;&#45;between vc-padding__lg&#45;&#45;ad" @click="popups[6] = true">
              <div class="vc-text&#45;&#45;bold vc-text&#45;&#45;lg">孩子对您的称呼</div>
              <div class="vp-icon__outer">
                <span class=" vc-text vc-text&#45;&#45;light vc-text&#45;&#45;lg" v-if="!!params.chengHu">{{ params.chengHu }}</span>
                <span class=" vc-text vc-text&#45;&#45;gray "  v-if="!params.chengHu">请选择孩子对您的称呼</span>
                <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text&#45;&#45;lg vc-text&#45;&#45;gray vc-margin__sm&#45;&#45;lt"></i>
              </div>
            </div>
      -->

    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white " @click="_save_class">保存</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
