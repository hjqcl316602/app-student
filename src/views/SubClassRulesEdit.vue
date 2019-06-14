<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: {},
    mixins: [ classes ] ,

    activated(){
      this._init_page()
    },
    data(){
      return {
        workrests:{
          items:[],
          active:0,
          timeType:'startTime'
        },
        currentDate:''
      }
    },
    methods: {
      async _init_page(){
        this.$get_rules().then(()=>{
          this.workrests.items = this.rules.detail
        })
      },
      _add_workrest(){
        this.workrests.items.push( { title:'',startTime:'', endTime:''} )
      },
      _del_workrest(index){
        this.workrests.items.splice(index,1)
      },
      _save_workrest(){
        let message = this._validate_params();
        if(message == 'yes'){
          this.$save_rules({ detail:this.workrests.items }).then(()=>{
            this.$createToast({message:'保存作息时间表成功!',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            })
          })
        }else{
          this.$createToast({message:message,duration:2000}).show();
        }

      },
      _validate_params(){
        let items = this.workrests.items;
         for(let n = 0 ; n <  items.length ; n++){
           if(Valids.isEmptyString( items[n]['title'] )){
             return '请输入任务'+Utils.SectionToChinese(n+1)+'的标签'
           }
           if(Valids.isEmptyString( items[n]['startTime'] )){
             return '请输入任务'+Utils.SectionToChinese(n+1)+'的开始时间'
           }
           if(Valids.isEmptyString( items[n]['endTime'] )){
             return '请输入任务'+Utils.SectionToChinese(n+1)+'的结束时间'
           }
         }
         return 'yes'
      },
      _select_time_popup(index,timeType){
        this.popup.show = true ;
        this.workrests.active = index;
        this.workrests.timeType = timeType;
      },
      _picker_confirm(value){
        this.popup.show = false ;
        this.workrests.items[this.workrests.active][this.workrests.timeType] = value
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-padding__xl-x--bm vc-bg">
    <van-popup v-model="popup.show" position="bottom">
      <van-datetime-picker
        type="time"
        @cancel="popup.show = false"
        @confirm="_picker_confirm"
      />
    </van-popup>


    <div class="vc-padding__lg " >
      <div class=" vc-margin--bm  vc-flex vc-items--center vc-content--between" v-for="(workrest,index) in workrests.items">
        <div class="vc-flex--fit">
          <div class="vc-padding--ud">任务{{ index + 1 | num_str}}</div>
          <div class="vp-input vc-margin--bm ">
            <input type="text"  placeholder="请输入任务名称" class="vp-input__inner" v-model="workrest['title']">
          </div>
          <div class="vc-row" data-gutter="10">
             <div class="vc-col--12">
               <div class="vp-input  " @click="_select_time_popup(index,'startTime')">
                 <input type="text"  placeholder="请选择开始时间" class="vp-input__inner" readonly v-model="workrest['startTime']">
               </div>
             </div>
            <div class="vc-col--12">
              <div class="vp-input  " @click="_select_time_popup(index,'endTime')">
                <input type="text"  placeholder="请选择结束时间" class="vp-input__inner" readonly v-model="workrest['endTime']">
              </div>
            </div>
          </div>
        </div>
        <div class="vp-icon__cancel vc-margin--lt"   @click="_del_workrest(index)"></div>
      </div>
      <div class="vp-btn__submit vp-btn--theme" @click="_add_workrest ">添加标签</div>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white " @click="_save_workrest">保存</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
