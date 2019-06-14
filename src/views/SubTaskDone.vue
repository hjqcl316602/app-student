<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  import { VaPopupRadio }  from './component'
  import task  from './mixin/task'
  export default {
    name: "",
    components: { VaPopupRadio },
    mixins: [ task ],
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
      this._init_page()
    },
    props: [],
    data() {
      return {
        options:{
          time:[{ text:'1',value:'1' },{ text:'1.5',value:'1.5' },{ text:'2',value:'2' },{ text:'2.5',value:'2.5' },{ text:'3',value:'3' },{ text:'3.5',value:'3.5' }],
          quality:[{ text:'A',value:'A' },{ text:'B',value:'B' },{ text:'C',value:'C' },{ text:'D',value:'D' }]
        },
        params:{
          jobId:'',
          time:"2",
          quality:'A',
          complete:'1',
          scoreType:'0',
          abcd:'A',
          score:''
        },
        detail:{},
        radio:''
      }
    },
    methods: {
      async _init_page() {
        this.detail = JSON.parse( sessionStorage.getItem('taskDoneInfo') );
        this.detail['task'] = JSON.parse( this.detail['detail']);
        this.params.jobId = this.detail['jobId'];
        this.$get_task_detail(this.params).then((response)=>{
          this.params = Objects.copy(this.params,response['data']);
          this.params['complete'] = this.params['complete'].toString();
          this.params['scoreType'] = this.params['scoreType'].toString();
          let detail = response['data']['detail'];
          this.detail['task'] = detail ? JSON.parse(detail):[];
        })
      },
      _save_task(){
        let message = this._validate_params();
        if(message == 'yes'){
          this.$save_task_eval(this.params).then(()=>{
            this.$createToast({message:'评定作业成功！',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            },800)
          })
        }
        else{
          this.$createToast({message:message,duration:2000}).show();
        }
      },
      _check_radio(e,type){
        this.params[type] = e.value;
      },
      _validate_params(){
        if(Valids.isEmptyString(this.params.time)){
          return '请选择耗时！'
        }
        if(Valids.isEmptyString(this.params.quality)){
          return '请选择完成质量！'
        }
        return 'yes'
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div>
    <VaPopupRadio :options="options.time" v-model="popups[0]" @select="_check_radio($event,'time')"></VaPopupRadio>
    <VaPopupRadio :options="options.quality" v-model="popups[1]" @select="_check_radio($event,'quality')"></VaPopupRadio>
    <VaPopupRadio :options="options.quality" v-model="popups[2]" @select="_check_radio($event,'abcd')"></VaPopupRadio>

    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row" >
      <span class="vc-text--white vc-text--bold vc-text--lg">{{ detail['title']}}</span>
    </div>

    <div class="vc-padding__xl-x--ud vc-fluid--h-min vc-bg ">
      <div class="vc-padding__lg">

        <div class="vc-margin--bm">
          <div v-for="(item,index) in detail.task" >
            <div class="vc-text--bold vc-text--lg vc-padding--ud">{{ item['title']}}</div>
            <div class="vc-padding__lg--lt vc-text--baseline--md">{{ item['content']}}</div>
          </div>
        </div>

        <div class="vc-margin--bm">
          <div class="vc-text--bold vc-text--lg vc-padding--ud">是否完成</div>
          <div class="vc-padding__lg--lt">
            <van-radio-group v-model="params.complete" style="display:  flex " >
              <van-radio name="1">完成</van-radio>
              <van-radio name="0">未完成</van-radio>
            </van-radio-group>
          </div>
        </div>

        <div class="vc-margin--bm">
          <div class="vc-text--bold vc-text--lg vc-padding--ud">耗时(小时)</div>
          <div class="vp-row--sm vc-bor--theme-light vc-bg--theme--gray vc-radius ">
            <div class="vc-cover vc-padding--ad vc-flex vc-items--center vc-content--between" @click="popups[0] = true">
              <span class="vc-text--bold vc-text--gray" v-if="!params.time">请选择耗时</span>
              <span class="vc-text--bold " v-if="!!params.time">{{ params.time }}</span>
              <i class="iconfont icon-iconfontjiantou2 vc-text--bold vc-text--gray"></i>
            </div>
          </div>
        </div>

        <div class="vc-margin--bm">
          <div class="vc-text--bold vc-text--lg vc-padding--ud">完成质量</div>
          <div class="vp-row--sm vc-bor--theme-light vc-bg--theme--gray vc-radius ">
            <div class="vc-cover vc-padding--ad vc-flex vc-items--center vc-content--between" @click="popups[1] = true">
              <span class="vc-text--bold vc-text--gray" v-if="!params.quality">请选择完成质量</span>
              <span class="vc-text--bold " v-if="!!params.quality">{{ params.quality }}</span>
              <i class="iconfont icon-iconfontjiantou2 vc-text--bold vc-text--gray"></i>
            </div>
          </div>
        </div>

        <div class="vc-margin--bm">
          <div class="vc-text--bold vc-text--lg vc-padding--ud">老师评分</div>
          <div class="vc-padding__lg--lt vc-margin--bm">
            <van-radio-group v-model="params.scoreType" style="display:  flex " >
              <van-radio name="0">按ABCD评定</van-radio>
              <van-radio name="1">按分数评定</van-radio>
            </van-radio-group>
          </div>
          <div class="vp-input" v-if="params.scoreType == 1 ">
            <input type="number"  placeholder="请输入老师评分" class="vp-input__inner" v-model="params.score">
          </div>
          <div class="vp-row--sm vc-bor--theme-light vc-bg--theme--gray vc-radius " v-if="params.scoreType == 0 ">
            <div class="vc-cover vc-padding--ad vc-flex vc-items--center vc-content--between" @click="popups[2] = true">
              <span class="vc-text--bold vc-text--gray" v-if="!params.abcd">请选择等级</span>
              <span class="vc-text--bold " v-if="!!params.abcd">{{ params.abcd }}</span>
              <i class="iconfont icon-iconfontjiantou2 vc-text--bold vc-text--gray"></i>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white " @click="_save_task">保存</div>
      </div>
    </div>

  </div>

</template>
<style scoped></style>
