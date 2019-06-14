<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import vip  from './mixin/vip'
  import order  from './mixin/order'
  import wx from 'weixin-js-sdk'
  export default {
    name: "SubUserClassVipStatus",
    components: {},
    mixins: [ vip,order ],
    data() {
      return {
        params:{
          fromPage:'',
          vipRecordId:'',
          active:0,
          timer:null,
          timerNum:0
        },
        fee:{
          timer:[]
        }
      }
    },
    mounted() {

    },
    computed:{
      feeList(){
        let feeList = [];
        this.fee.list.forEach((item,i)=>{
          let obj = Object.assign(item,this.fee.timer[i],{ active : i == this.params.active })
          feeList.push(obj)
        })
        return feeList ;
      },
      nowTime(){
        let nowTimeIndex = this.fee.list.findIndex((item)=>{ return !!item['nowTime'] && Valids.isDate( new Date( item['nowTime'])) })
        if(nowTimeIndex > -1){
          return +new Date( this.fee.list[nowTimeIndex]['nowTime'] )
        }else {
          return +new Date()
        }
      }
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.params.vipRecordId = this.$route.query['vipRecordId'];
        this.params.fromPage = this.$route.query['fromPage'];
        await  this.$get_fee_list();
        this._set_timer()
        //this._set_interval()
      },

      _set_timer(){
        this._set_interval()
        this.params.timer = setInterval(()=>{
          this._set_interval()
        },1000)
      },
      _clear_timer(){
        clearInterval(this.params.timer);
        this.params.timer = null ;
        this.params.timerNum = 0 ;
      },
      _set_interval(){
        let now =  this.nowTime - this.params.timerNum * 1000 ;
        this.params.timerNum ++ ;

        let feeTimer = [];
        let times = [ 1000,60* 1000,60*60*1000,24*60*60*1000];
        this.fee.list.forEach((item,i)=>{

          //let now = +new Date(item['nowTime']);
          //console.log(now)
          let promotionEndTime = +new Date(item['promotionEndTime']);
          let timeShort = promotionEndTime - now ; // 时间差

          if(item['promotionStatus'] == 1 && !!item['promotionEndTime'] && timeShort > 0){

            // 剩余天数
            let days = Math.floor( timeShort/times[3] );
            // 剩余小时
            let hours = Math.floor( timeShort/times[2] );
            let hours_days = hours - days * 24;
            // 剩余分钟
            let minutes = Math.floor( timeShort/times[1] );
            let minutes_hours = minutes  - hours * 60;
            // 剩余秒数
            let seconds = Math.floor( timeShort/times[0] );
            let seconds_minutes = seconds  - minutes * 60;

            // console.log(days)
            // console.log(hours)
            // console.log(minutes)
            // console.log(seconds)
            //
            // console.log(hours_days)
            // console.log(minutes_hours)
            // console.log(seconds_minutes)

            let str = `${days}天${hours_days}时${minutes_hours}分${seconds_minutes}秒`;

            feeTimer.push({
              remainTime:str,
              remainType:1
            })
          }else{
            feeTimer.push({
              remainTime:'暂无',
              remainType:0
            })
          }
        })
        this.fee.timer = feeTimer ;

      },

      _pay_success(){
        this.$createToast({message: '开启成功!' ,duration:2000}).show();
        setTimeout(()=>{
          if(this.params.fromPage === 'vipMaterial'){
            this.$router.go(-3)
          }else if( this.params.fromPage === 'SubUserClass' ){
            this.$router.go(-1)
          }
        },800)
      },
      _save_pay(){

        this.$create_order({ vipRecordId : this.params.vipRecordId ,vipFeeId :this.feeList[this.params.active]['vipFeeId']}).then((res)=>{

          let data = res['data'];
          let needPayFlag = data['needPayFlag'] ;
          let sn = data['sn'] ;

          if(needPayFlag){
            wx.chooseWXPay({
              appId:data.appId,
              timestamp: data.timeStamp,          // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr,            // 支付签名随机串，不长于 32 位
              package: data.package,              // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: data.signType,            // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign,              // 支付签名
              success:  (res)=> {                   // 支付成功后的回调函数
                this._pay_success()
              }
            });
          }else{
            this._pay_success()
          }
        })
      },
    },
    beforeDestroy(){
      this._clear_timer();
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
  <div class="vc-fluid--h-min vc-bg vc-flex--center">
    <div class="vc-fluid--w vc-padding__lg vc-padding__xl-x--bm">
      <!--<div class="vc-padding__xl&#45;&#45;ud vc-text&#45;&#45;center">
        <span class="vc-text&#45;&#45;xl-x vc-text&#45;&#45;bold">
          信息提交成功
        </span>
      </div>-->

      <div class="">

        <div class="vc-margin__lg--bm vc-text--bold vc-text--center vc-text--lg">选择认证类型</div>


        <div class="vc-margin--bm vc-border  vc-padding__lg"
             :class="{ 'vc-border--dark':!item['active'] ,'vc-border--theme':item['active']}"
             v-for="(item,index) in feeList"
             @click="params.active = index "
        >

          <div class="vc-text--baseline"><span>{{ item['name']}}</span><span class="vc-text--theme vc-margin--lt">{{ item['remark']}}</span></div>

          <template  v-if="item['promotionStatus'] == 1">
            <div class="vc-text--baseline">
              <span class="vc-text--xl vc-text--bold vc-margin--rt">￥{{item['price'] | str_money }}</span>
              <span class="vc-text--line">￥{{ item['originPrice'] | str_money }}</span>
            </div>

            <div class="vc-text--baseline" v-if="item['remainType'] == 1"><span>优惠倒计时：{{ item['remainTime']}}</span></div>

          </template>

          <template  v-if="item['promotionStatus'] == 0">
            <div class="vc-text--baseline">
              <span class="vc-text--xl vc-text--bold vc-margin--rt">￥{{item['originPrice'] | str_money }}</span>
            </div>
          </template>



        </div>

      </div>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row">
          <div class=" vp-btn__simple vp-btn--white " @click="_save_pay">立即开启</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
