<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import interaction  from './mixin/interaction'
  import { VaCheck }  from './component'
  export default {
    name: "",
    components: { VaCheck },
    mixins: [ interaction ],
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
      this._init_page()
    },
    activated() {

    },
    props: [],
    data() {
      return {
        params:{
          pkId:'',
          title:'',
          options:[{optionName:''}],
          endTime:'',
          type:''
        },
        label:{
          options:[ { text:'单选'},{ text:'多选'} ],
          value:[0]
        },
        date:{
          min:new Date()
        }

      }
    },
    methods: {
      async _init_page() {
        this.params.type = this.$route.query['type'] || 'insert';

        if( this.params.type == 'update'){
          let detail = sessionStorage.getItem('pk-detail') ?  JSON.parse( sessionStorage.getItem('pk-detail') ) : {};

          this.params.pkId = detail['pkId'];
          this.params.endTime = Dates.format(new Date(detail['endTime']),'yyyy-MM-dd');
          this.params.title = detail['title'];
          let list = [];
          detail['optionList'].forEach((item,i)=>{
            list.push({ optionName : item['optionName']})
          });
          this.params.options = list ;
        }

      },
      _add_pk(){
        this.params.options.push({optionName:''})
      },
      _del_pk(index){
        this.params.options.splice(index,1)
      },
      _save_pk(){
        let message = this._validate_params(this.params);
        if(message == 'yes'){
            if(this.params.type == 'insert'){
              this.$create_interaction_pk(this.params).then(()=>{
                this.$createToast({message:'添加PK成功!',duration:2000}).show();
                setTimeout(()=>{
                  this.$router.go(-1);
                  this.$destroy()
                },800)
              })
            }else if(this.params.type == 'update'){
              this.$update_interaction_pk(this.params).then(()=>{
                this.$createToast({message:'修改PK成功!',duration:2000}).show();
                setTimeout(()=>{
                  this.$router.go(-2);
                  this.$destroy()
                },800)
              })
            }

        }else{
          this.$createToast({message:message,duration:2000}).show();
        }

      },
      _validate_params(params){
        if(params.title == ''){
          return 'PK主题不能为空！'
        }
        let newArr = Arrays.filter(params.options,(item)=>{ return item['optionName'] == ''});

        if(newArr.length > 0){
          return '选项不能为空！'
        }
        if(params.endTime == ''){
          return '截止时间不能为空！'
        }
        return 'yes'

      },

      _picker_confirm(val){
        this.popup.show = false;
        this.params.endTime = Dates.format(val,'yyyy-MM-dd')
      },

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */
      ['label.value'](val){
        console.log(val)
      }
      },
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-padding__xl-x--bm vc-bg">

    <van-popup v-model="popup.show" position="bottom">
      <van-datetime-picker
        type="date"
        @cancel="popup.show = false"
        @confirm="_picker_confirm"
        :min-date="date.min"
        :formatter="_picker_formatter"
      />
    </van-popup>

    <div class="vc-padding__lg">
      <div class="vc-margin__lg--bm">
        <div class="vc-text--bold vc-margin--bm">主题</div>
        <div class="vp-input">
          <span class="vp-input__count vc-text--gray">{{ params.title.length  }}/20</span>
          <input type="text" class="vp-input__inner" v-model="params.title" maxlength="20" placeholder="请输入主题">

        </div>
      </div>

      <div class="vc-margin__lg--bm">

        <div class="vc-text--bold vc-margin--bm">选项</div>

        <div class="" v-for="(item,index) in params.options">

          <div class=" vc-margin--bm vc-flex vc-items--center">

            <div class="vp-input vc-flex--fit"  >
              <span class="vp-input__count vc-text--gray">{{ item['optionName'] ? item['optionName'].length : 0  }}/20</span>
              <input type="text" class="vp-input__inner" v-model="item['optionName']" maxlength="20" placeholder="请输入选项">
            </div>
            <div class="vp-icon__cancel vc-margin--lt" v-if="params.options.length > 1" @click="_del_pk(index)"></div>

          </div>

        </div>

        <div class="vp-btn__submit  vp-btn--theme vc-margin--tp"    @click="_add_pk"> 添加选项</div>
      </div>

      <!--<div class="vc-margin&#45;&#45;bm">
        <div class="vc-text&#45;&#45;bold vc-margin&#45;&#45;bm">选择模式</div>
        <div class="">
          <VaCheck :options="label.options" v-model="label.value" :is-single="true" :custom-style="{ 'min-width':'90px'}"></VaCheck>
        </div>
      </div>
-->
      <div class="vc-margin__lg--bm">
        <div class="vc-text--bold vc-margin--bm">截止日期</div>
        <div class="vp-input  " @click="popup.show = true ">
          <input type="text"  placeholder="请选择日期" class="vp-input__inner" readonly v-model="params.endTime">
        </div>
      </div>

    </div>



    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div class="vp-btn__simple vp-btn--white " @click="_save_pk" v-if="params.type == 'insert'">发布</div>
        <div class="vp-btn__simple vp-btn--white " @click="_save_pk" v-if="params.type == 'update'">保存</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
