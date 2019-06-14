<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import classes  from './mixin/class'
  import VaBtnGroup  from './component/va.btn.group.vue'
  export default {
    name: "",
    components: { VaBtnGroup },
    mixins: [ classes ],
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
        tab:{
          options:[
            { text:'时间' ,value:'0'},
            { text:'周一' ,value:'1'},
            { text:'周二' ,value:'2'},
            { text:'周三' ,value:'3'},
            { text:'周四' ,value:'4'},
            { text:'周五' ,value:'5'},
          ],
          active:0
        },
        timeTable:[],
        initTimeTable:[ [ [],[],[] ],[ [],[],[] ],[ [],[],[] ],[ [],[],[] ],[ [],[],[] ],[ [],[],[] ] ]
      }
    },
    methods: {
      async _init_page(){
        this.$get_timetable_list().then((response)=>{
          let course = response['data']['course'];
          this.timeTable = course ? JSON.parse(course) : this.initTimeTable
          //this.timeTable = this.initTimeTable
        });

      },
      _add_timetable(index){
        this.timeTable[this.tab.active][index].push( { name :''})
      },
      _del_timetable(index,i){
        this.timeTable[this.tab.active][index].splice(i,1)
      },
      _save_timetable(){
        console.log(JSON.stringify(this.timeTable))
        //return
        this.$update_timetable({ course:this.timeTable }).then(()=>{
          this.$createToast({message:'保存课表成功!',duration:2000}).show();
          setTimeout(()=>{
            this.$router.go(-1);
            this.$destroy()
          })
        })
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="">

    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row" >
      <VaBtnGroup :options="tab.options" v-model="tab.active" padding="0px 6px"></VaBtnGroup>
    </div>

    <van-popup v-model="popup.show" position="bottom">
      <van-datetime-picker
        type="time"
        @cancel="popup.show = false"
        @confirm="_picker_confirm"
      />
    </van-popup>

    <div class="vc-bg vc-padding__xl-x--ud vc-padding__lg--ad vc-fluid--h-min">

      <div class="vc-margin--bm" v-for="(item,index) in timeTable[tab.active]">
        <template v-if="tab.active == 0">
          <div class="vc-padding--ud " v-if="index==0">
            <span class="vc-text--light vc-text--bold" >上午课程时间</span>
          </div>
          <div class="vc-padding--ud  " v-if="index==1">
            <span class="vc-text--light vc-text--bold" >下午课程时间</span>
          </div>
          <div class="vc-padding--ud  " v-if="index==2">
            <span class="vc-text--light vc-text--bold" >晚上课程时间</span>
          </div>
          <div class="vc-flex vc-items--center vc-margin--bm" v-for="(course ,i) in item">
            <div class="  vp-input vc-flex--fit" >
              <input type="text"  v-model="course['name']" placeholder="请输入时间范围" class="vp-input__inner">
            </div>
            <div class="vp-icon__cancel vc-margin--lt"   @click="_del_timetable(index,i)"></div>
          </div>

          <div class="vp-btn__submit vp-btn--theme" @click="_add_timetable(index)">添加</div>
        </template>
        <template v-else>
          <div class="vc-padding--ud " v-if="index==0">
            <span class="vc-text--light vc-text--bold" >上午课程</span>
          </div>
          <div class="vc-padding--ud  " v-if="index==1">
            <span class="vc-text--light vc-text--bold" >下午课程</span>
          </div>
          <div class="vc-padding--ud  " v-if="index==2">
            <span class="vc-text--light vc-text--bold" >晚上课程</span>
          </div>
          <div class="vc-flex vc-items--center vc-margin--bm" v-for="(course ,i) in item">
            <div class="  vp-input vc-flex--fit" >
              <input type="text"  v-model="course['name']" placeholder="请输入课程名称" class="vp-input__inner">
            </div>
            <div class="vp-icon__cancel vc-margin--lt"   @click="_del_timetable(index,i)"></div>
          </div>

          <div class="vp-btn__submit vp-btn--theme" @click="_add_timetable(index)">添加</div>
        </template>

      </div>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white " @click="_save_timetable">保存</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
