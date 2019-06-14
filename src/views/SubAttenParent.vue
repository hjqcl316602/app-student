<script type="text/ecmascript-6">
  import { VaBtnGroup,VaCheck,VaPopupRadio }  from './component'
  import atten  from './mixin/atten'
  export default {
    name: "SubAtten",
    components: { VaBtnGroup, VaPopupRadio,VaCheck },
    mixins: [ atten ],
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
      this._init_page();
    },
    computed:{
      attenList(){
        return  this.$store.state.manager['attenList']
      }
    },
    data(){
      return {
        tab:{
          options:[
            { text:'申请请假' ,value:'1'},
            { text:'考勤报表' ,value:'2'},
          ],
          active:0
        },
        options:{

          student:[
            { text:'hjq',value:'2'}
          ]
        },
        params:{
          type:'0',
          detail:'',
          startTime:'',
          endTime:'',
          timeType:''
        },
        popup:{
          show:false
        },
        time:'after',
        show:true,
        stepper:{
          value:''
        }
      }
    },
    methods: {
      async _init_page(){

      },
      _select_time_popup(type){
        this.params.timeType = type ;
        this.popup.show = true
      },
      _save_leave(){
        if(this.params.startTime ==''){
          this.$toast('开始时间不能为空！');
          return
        }
        if(this.params.endTime ==''){
          this.$toast('结束时间不能为空！');
          return
        }
        this.$add_qinjia(this.params).then(()=>{
          this.params.detail = '';
          this.params.startTime = '';
          this.params.endTime = '';
        })
      },
      _picker_confirm(data){
        if(this.params.timeType == 'startTime'){
          this.params.startTime = Dates.format(data,'yyyy-MM-dd HH:mm');
        }else{
          this.params.endTime = Dates.format(data,'yyyy-MM-dd HH:mm');
        }


        if( +new Date(this.params.startTime ) > +new Date(this.params.endTime )){
          this.$toast('开始时间不能大于结束时间！');
          if(this.params.timeType == 'startTime'){
            this.params.startTime = '';
          }else{
            this.params.endTime = '';
          }

        }else{
          this.popup.show = false;
        }


      }
    },
    watch: {
      'tab.active': {
        handler(val, olval){
          if(val==1){
            this.$get_kaoqin_report_list()
          }
        },
        deep: true ,
        immediate:true
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-atten " >


    <!--    <VaConfirm v-model="popup.show">
          <div slot="title" class="vc-text&#45;&#45;lg vc-text&#45;&#45;bold vc-padding vc-border&#45;&#45;bm">
            状态列表
          </div>
          <div slot="content" class="vc-padding">
            湖广会馆韩国货股份分割分割更丰富广泛广泛广泛给法国发过复古风格
          </div>
        </VaConfirm>-->

    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row" >
      <VaBtnGroup :options="tab.options" v-model="tab.active"></VaBtnGroup>
    </div>

    <template v-if="tab.active == 0 ">


      <van-popup v-model="popup.show" position="bottom">
        <van-datetime-picker
          type="datetime"
          @cancel="popup.show = false"
          @confirm="_picker_confirm"
          :min-date="new Date()"
        />
      </van-popup>

      <div class="vc-bg vc-padding__xl-x--ud vc-fluid--h-min vc-padding__lg--ad">

        <div class="vc-padding__lg--tp">
          <van-radio-group v-model="params.type" style="display:  flex " >
            <van-radio name="0">病假</van-radio>
            <van-radio name="1">事假</van-radio>
          </van-radio-group>

          <div class="vp-textarea vc-margin--tp">
            <textarea name="" rows="4"  class="vp-textarea__inner vp-textarea--theme" v-model="params.detail" maxlength="200" placeholder="填写请假描述"></textarea>
            <div class="vp-textarea__count vc-text--gray">{{  params.detail.length }}/200</div>
          </div>
        </div>
        <div class="vc-row vc-margin--tp" data-gutter="10">
          <div class="vc-col--12">
            <div class="vp-input  " @click="_select_time_popup('startTime')">
              <input type="text"  placeholder="请选择开始时间" class="vp-input__inner" readonly v-model="params.startTime">
            </div>
          </div>
          <div class="vc-col--12">
            <div class="vp-input  " @click="_select_time_popup('endTime')">
              <input type="text"  placeholder="请选择结束时间" class="vp-input__inner" readonly v-model="params.endTime ">
            </div>
          </div>
        </div>
        <div class="vc-padding__lg--ud">
          <div class="vp-btn__submit vp-btn--theme" @click="_save_leave">提交</div>
        </div>
      </div>




      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <router-link :to="{ name : 'SubAttenParentHistory'}" tag="div" class=" vp-btn__simple vp-btn--theme ">
            请假记录
          </router-link>
        </div>
      </div>
    </template>

    <template v-if="tab.active == 1 ">
      <template v-if="kaoqin_report.list.length > 0">
        <div class="vc-bg vc-padding__xl-x--tp vc-fluid--h-min">

          <div class="vc-margin--bm" v-for="(item,index) in kaoqin_report.list">
            <div class="vc-padding__lg vc-border--bm">
              <span class="  vc-text--bold ">{{ item['day'] }}</span>
            </div>

            <div class="vc-row vc-flex">
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">姓名</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">出勤</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">迟到</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">请假</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">值日</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">留校</div>
              </div>
            </div>

            <div class="vc-row vc-flex" v-for="(stu,student) in item['detail']">
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['stuName']}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['出勤' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['迟到' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['请假' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['值日' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['留校' ]}}</div>
              </div>
            </div>
          </div>

        </div>
      </template>
      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center">暂无考勤报表～～</div>
          </div>
        </div>
      </template>
    </template>

  </div>
</template>
<style scoped></style>
