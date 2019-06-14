<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
   import { VaPopupRadio }  from './component'
  import basic  from './mixin/basic'
  import score  from './mixin/score'
  export default {
    name: "",
    components:  { VaPopupRadio },
    mixins: [ basic,score ],
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

    },
    activated(){
      this._init_page()
    },
    props: [],
    data(){
      return {
        params:{
          kaoShiName:'',
          content:[
            { courseName :'',startTime:''}
          ],
        },
        modelTime:new Date(),
        select:{
          index:0,
          type:''
        }
      }
    },
    methods: {
      async _init_page(){
        this.$get_lesson_type_list()
      },
      _show_popup(index,type){
        this.select.index  = index;
        this.select.type = type;
        if(type == 'name'){
          this.popups[0] = true
        }else{
          this.popups[1] = true
        }

      },

      _validate_params(params){
        if(params.kaoShiName == ''){
          return '考试名称不能为空！'
        }

        for(let n = 0 ; n < params.content.length;n++){
          let name = '科目'+ Utils.SectionToChinese(n+1) ;
          if( params.content[n]['courseName'] ==""  ){
            return  name + '的名称不能为空！'
          }
          if( params.content[n]['startTime'] ==""  ){
            return name + '的时间不能为空'
          }

          /*if( params.content[n]['endTime'] ==""  ){
            return name + '的结束时间不能为空'
          }*/
        }

        return 'yes'

      },
      _add_test(){
        this.params.content.push( { courseName :'',startTime:''} )
      },

      _save_test(){
        let message = this._validate_params(this.params);
        if( message == 'yes'){
          this.$save_test(this.params).then(()=>{
            this.$toast('添加考试成功！');
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            },500)
          })

        }else{
          this.$toast(message)
        }


      },
      _del_lesson(index){
        if(this.params.content.length > 1){
          this.params.content.splice(index,1)
        }
      },
      _picker_confirm(val){
        this.popups[1] = false ;

        this.params.content[this.select.index]['startTime'] = Dates.format(val,'yyyy-MM-dd');

        /*if(+new Date(this.params.content[this.select.index]['startTime'] ) > +new Date(this.params.content[this.select.index]['endTime'] )){
          this.$toast('开始时间不能大于结束时间！');
          if(this.select.type == 'startTime'){
            this.params.content[this.select.index]['startTime'] = ''
          }else if(this.select.type == 'endTime'){
            this.params.content[this.select.index]['endTime'] = ''
          }
        }*/
      },


    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg vc-padding__xl-x--bm">

   <!-- <VaPopupRadio :options=" lessonTypeList" v-model="popups[0]" @select="_select_class"></VaPopupRadio>-->

    <van-popup position="bottom" v-model="popups[0]">
      <div class="">

        <div class="vp-header vp-header--shadow vc-padding__lg--ad vc-padding--ud vc-bg">
          <div class="vp-input">
            <input type="text" v-model="params.content[select.index]['courseName']" placeholder="请输入课程类型或选择课程类型" class="vp-input__inner" maxlength="20">
          </div>
        </div>

        <div class="vc-fluid vc-padding__xl-x--bm vc-padding__xl-xx--tp  vc-bg vc-flow" >
          <div class="">
            <div class="vp-row vc-flex--center vc-text--light vc-text--lg vc-border--bm" v-for="(item,index) in lessonTypeList" @click="params.content[select.index]['courseName'] = item.text">{{ item.text }}</div>
          </div>
        </div>

        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row" >
            <div  class=" vp-btn__simple vp-btn--white " @click="popups[0] = false">返回</div>
          </div>
        </div>

      </div>
    </van-popup>


    <van-popup v-model="popups[1]" position="bottom">
      <van-datetime-picker
        type="date"
        @cancel="popup.show = false"
        @confirm="_picker_confirm"
        v-model='modelTime'
      />
    </van-popup>


    <div class="vc-padding__lg ">
      <div class="vc-margin__lg--bm">
        <div class="vc-text--bold vc-text--light">考试信息</div>
        <div class="vp-input vc-margin--tp">
          <input type="text" class="vp-input__inner" placeholder="请输入考试名称" v-model="params.kaoShiName" maxlength="20">
        </div>
      </div>

      <div class="vc-margin--bm" v-for="(item ,index ) in params.content">
        <div class="vc-text--bold vc-text--light">科目{{ index+1 | num_str }}</div>

        <div class=" vc-flex vc-items--center">
          <div class="vc-flex--fit">
            <div class="vp-input vc-margin--tp">
              <input type="text" class="vp-input__inner" placeholder="请选择科目" readonly v-model="item['courseName']" @click="_show_popup(index,'name')">
            </div>
            <div class="vp-input  vc-margin--tp" @click="_show_popup(index,'time')">
              <input type="text"  placeholder="请选择时间" class="vp-input__inner" readonly v-model="item['startTime']">
            </div>
            <!--<div class="vc-margin&#45;&#45;tp vc-row" data-gutter="10">
              <div class="vc-col&#45;&#45;12">
                <div class="vp-input  " @click="_show_popup(index,'startTime')">
                  <input type="text"  placeholder="请选择开始时间" class="vp-input__inner" readonly v-model="item['startTime']">
                </div>
              </div>
              <div class="vc-col&#45;&#45;12">
                <div class="vp-input  " @click="_show_popup(index,'endTime')">
                  <input type="text"  placeholder="请选择结束时间" class="vp-input__inner" readonly v-model="item['endTime']">
                </div>
              </div>
            </div>-->
          </div>
          <div>
            <div class="vp-icon__cancel vc-margin--lt" v-if="params.content.length > 1" @click="_del_lesson(index)"></div>
          </div>
        </div>
      </div>

      <div class="vp-btn__submit vp-btn--theme" @click="_add_test">添加科目</div>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white " @click="_save_test">保存</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
