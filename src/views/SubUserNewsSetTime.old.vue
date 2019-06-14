<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  export default {
    name: "SubUserNewsSetTime",
    components: {},
    mixins: [ user ],
    data() {
      return {
        params:{
          startTime:'00:00',
          endTime:'23:59',
          timeType:''
        }
      }
    },
    mounted() {
    },
    activated() {
      if (!this.$route.meta.noLoading) {
        this._init_page();
      }
    },
    methods: {
      async _init_page() {
        await this.$get_user_message_sets_time().then((response)=>{
          this.params.startTime = response['data']['startTime'] || '00:00';
          this.params.endTime = response['data']['endTime'] || '23:59';
        })
      },
      _picker_confirm(value){
        this.popup.show = false
        this.params[this.params.timeType] = value
      },
      _select_time(type){
        this.params.timeType = type;
        this.popup.show = true
      },
      _save_time(){
        let message = this._validate_params(this.params);
        if(message == 'yes'){
          this.$update_user_message_sets_time(this.params).then(()=>{
            this.$createToast({ message: '免打扰时间修改成功！' ,duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);

            },800)
          })
        }else{
          this.$createToast({ message: message ,duration:2000}).show();
        }
        console.log( message )
      },
      _validate_params(params){
        if(Valids.isEmptyString( params.startTime) ){
          return '请选择开始时间！'
        }
        if(Valids.isEmptyString( params.endTime) ){
          return '请选择结束时间！'
        }

        let time = Dates.format(new Date(),'yyyy-MM-dd');
        let startTime = time + ' ' + params.startTime + ':00' ;
        let endTime = time + ' ' + params.endTime + ':00' ;

        if( +new Date(startTime) >= +new Date(endTime) ){
            return '开始时间应小于结束时间！'
        }

        return 'yes'

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
<div class="vc-fluid--h-min vc-bg">

  <van-popup v-model="popup.show" position="bottom">
    <van-datetime-picker
      type="time"
      @cancel="popup.show = false"
      @confirm="_picker_confirm"
    />
  </van-popup>

  <div class="vc-fluid vc-padding__lg vc-flex--center">
    <div class="vc-fluid--w">
      <div>
        <div class="vc-padding--ud vc-text--bold" >开始时间</div>
        <div class="vp-input" @click="_select_time('startTime')">
          <input type="text" placeholder="请选择开始时间" class="vp-input__inner" readonly v-model="params.startTime" >
        </div>
      </div>
      <div>
        <div class="vc-padding--ud vc-text--bold" >结束时间</div>
        <div class="vp-input" @click="_select_time('endTime')">
          <input type="text" placeholder="请选择结束时间" class="vp-input__inner" readonly v-model="params.endTime" >
        </div>
      </div>

    </div>
  </div>

  <div class="vp-footer vp-footer--shadow">
    <div class="vc-flex vp-row" >
      <div  class=" vp-btn__simple vp-btn--white " @click="_save_time">保存</div>
    </div>
  </div>

</div>
</template>
<style scoped></style>
