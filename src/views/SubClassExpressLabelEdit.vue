<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: {},
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
        labels:[],
        params:{
          type:0
        }
      }
    },
    methods: {
      async _init_page(){
        this.params.type = this.$route.query['type'];
        this.$get_disc_labels()
      },
      _add_label(){
        if(this.params.type == 0 ){
          this.disc.labels.critic.push({ text:'',value:''})
        }
        else if(this.params.type == 1 ){
          this.disc.labels.praise.push({ text:'',value:''})
        }
      },
      _del_label(index){
        if(this.params.type == 0 ){
          this.disc.labels.critic.splice(index,1)
        }
        else if(this.params.type == 1 ){
          this.disc.labels.praise.splice(index,1)
        }
      },
      _save_label(){

        if(this.params.type == 0){
          let newArrays = Arrays.filter(this.disc.labels.critic,(item)=>{ return Valids.isEmptyString( item.text ) });
          if(newArrays.length > 0 ){
            this.$createToast({message:'请输入批评标签!',duration:2000}).show();
          }else{
            this.$dialog.confirm({
              title:'信息确认',
              message:'是否保存批评标签?'
            }).then(()=>{
              let arr = [];
              this.disc.labels.critic.forEach((item)=>{
                arr.push({ content:item['text']})
              });
              this.$update_disc_labels_critic({ badList:arr}).then(()=>{
                this.$createToast({message:'保存批评标签成功!',duration:2000}).show();
                setTimeout(()=>{
                  this.$router.go(-1);
                  this.$destroy()
                },1000) ;
              })

            }).catch(()=>{
            })
          }
        }else if(this.params.type == 1){
          let newArrays = Arrays.filter(this.disc.labels.praise,(item)=>{ return Valids.isEmptyString( item.text ) });
          if(newArrays.length > 0 ){
            this.$createToast({message:'请输入表扬标签!',duration:2000}).show();
          }else{
            this.$dialog.confirm({
              title:'信息确认',
              message:'是否保存表扬标签?'
            }).then(()=>{
              let arr = [];
              this.disc.labels.praise.forEach((item)=>{
                arr.push({ content:item['text']})
              });
              this.$update_disc_labels_praise({ goodList:arr}).then(()=>{
                this.$createToast({message:'保存表扬标签成功!',duration:2000}).show();
                setTimeout(()=>{
                  this.$router.go(-1);
                  this.$destroy()
                },1000) ;
              })

            }).catch(()=>{
            })
          }
        }


      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vc-fluid vc-bg">

    <template v-if="params.type == 0">
      <div class="vc-padding__lg" >
        <div class=" vc-margin--bm  vc-flex vc-items--center vc-content--between" v-for="(label,index) in disc.labels.critic">
          <div class="vp-input vc-flex--fit ">
            <input type="text"  placeholder="请输入标签" class="vp-input__inner" v-model="label['text']">
          </div>
          <div class="vp-icon__cancel vc-margin--lt"   @click="_del_label(index)"></div>
        </div>
        <div class="vp-btn__submit vp-btn--theme" @click="_add_label " >添加批评标签</div>
      </div>
    </template>
    <template v-if="params.type == 1">
      <div class="vc-padding__lg" >
        <div class=" vc-margin--bm  vc-flex vc-items--center vc-content--between" v-for="(label,index) in disc.labels.praise  ">
          <div class="vp-input vc-flex--fit ">
            <input type="text"  placeholder="请输入标签" class="vp-input__inner" v-model="label['text']">
          </div>
          <div class="vp-icon__cancel vc-margin--lt"   @click="_del_label(index)"></div>
        </div>
        <div class="vp-btn__submit vp-btn--theme" @click="_add_label " >添加表扬标签</div>
      </div>
    </template>



    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white " @click="_save_label">保存</div>
      </div>
    </div>

  </div>

</template>
<style scoped></style>
