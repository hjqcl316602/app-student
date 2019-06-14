<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  export default {
    name: "",
    components: {},
    mixins: [ user ],
    activated() {
      this._init_page()
    },
    props: [],
    data() {
      return {
        checked:true,
        params:{
          startTime:'00:00',
          endTime:'23:59',
          type:'',
          mdrFlag:0
        }
      }
    },
    methods: {
      async _init_page() {
        //await this.$get_user_message_sets();
        await this.$get_user_message_sets().then((response)=>{
          this.params.startTime = response['data']['startTime'] || '00:00';
          this.params.endTime = response['data']['endTime'] || '23:59';
          this.params.mdrFlag = ( response['data']['mdrFlag'] == 0 ) ? false : true ;
        })
      },
      _update_news_set(){
        this.$update_user_message_sets(this.params).then(()=>{
          this._init_page()
        })
      },
      _picker_confirm(value){
        this.popup.show =  false;

        let params = {
          startTime:'',
          endTime:''
        };
        if(this.params.type == 'startTime'){
          params.startTime = value;
          params.endTime = this.params.endTime;
          params.mdrFlag = this.params.mdrFlag
        }
        if(this.params.type == 'endTime'){
          params.endTime = value;
          params.startTime = this.params.startTime;
          params.mdrFlag = this.params.mdrFlag
        }

        this.$update_user_message_sets(params).then(()=>{
          this._init_page()
        });
        return;
        let startTime = '',endTime = '';
        let time = Dates.format(new Date(),'yyyy-MM-dd');
        if(this.params.type == 'startTime'){

          startTime = time + ' ' + value + ':00' ;
          endTime = time + ' ' + this.params.endTime + ':00' ;
          params.startTime = value ;
          params.endTime = this.params.endTime;

          console.log(startTime,endTime)

        }else if(this.params.type == 'endTime'){

          startTime = time + ' ' + this.params.startTime + ':00' ;
          endTime = time + ' ' + value + ':00' ;
          params.startTime = this.params.startTime ;
          params.endTime = value
        }

        if( +new Date(startTime) >= +new Date(endTime) ){
          this.$createToast({ message: '开始时间应小于结束时间！' ,duration:2000}).show();
        }else{
          this.params = Object.assign(this.params,params);
          this._update_news_set()
        }
      },
      _open_time_popup(type){
        this.params.type = type;
        this.popup.show = true;
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div>
    <van-popup v-model="popup.show" position="bottom">
      <van-datetime-picker
        type="time"
        @cancel="popup.show = false"
        @confirm="_picker_confirm"
      />
    </van-popup>

    <div class="vc-fluid--h-min vc-bg">
      <div>
        <div class="vc-padding__lg ">
          <div class="vc-flex--between-center vc-margin--bm ">
            <span class="vc-text--bold">勿扰模式</span>
            <div class="">
              <van-switch v-model="params.mdrFlag" size="25px"  @input="_update_news_set"/>
            </div>
          </div>
          <div class="">开启后，在设定时间内将不会收到消息通知</div>
        </div>


        <transition name="vt-fade">
          <div class="vc-border--tp" v-show="params.mdrFlag">

            <div class="vc-flex--between-center vc-border--bm vp-row--min vc-padding__lg--ad" @click="_open_time_popup('startTime')">
              <span class="">开始时间</span>
              <div class="vp-icon__outer">
                <span class="vc-text--light">{{ this.params.startTime}}</span>
              </div>

            </div>

            <div class="vc-flex--between-center vc-border--bm vp-row--min vc-padding__lg--ad" @click="_open_time_popup('endTime')">
              <span class="">结束时间</span>
              <div class="vp-icon__outer">
                <span class="vc-text--light">{{ this.params.endTime}}</span>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </div>
  </div>

</template>
<style scoped></style>
