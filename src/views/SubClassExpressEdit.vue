<script type="text/ecmascript-6">
  import { VaCheck  }  from './component'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: { VaCheck  },
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
    computed:{

    },
    data(){
      return {
        label:{
          options:[],
          value:[]
        },
        params:{
          type:'',
          message:"",
          students:[]
        }

      }
    },
    methods: {
      async _init_page(){
        this.params.type = this.$route.query['type'];
        this.label.value = [];
        this.params.message = ""  ;
        document.title = ( this.params.type == 0 ) ? '批评': '表扬';
        this.params.students = sessionStorage.getItem('expressStudents') ? JSON.parse(sessionStorage.getItem('expressStudents')) : [];
        this.$get_disc_labels();
      },
      _select_label(value){
      },
      _sure_express(){


        if(this.params.type == 0){
          let labels = [];
          this.disc.labels.critic.forEach((item,i)=>{
            if(this.label.value.indexOf(i) > -1){
              labels.push( item['text'] )
            }
          });
          let stuIds = [],stuNames = [];

          this.params.students.forEach((item,i)=>{
            stuIds.push(item['stuId']);
            stuNames.push(item['stuName']);
          });

          let badObject = {
            stuIds:stuIds.join(','),
            stuNames:stuNames.join(','),
            bad:labels.join(','),
            remark:this.params.message
          };
          this.$update_express_critic(badObject).then(()=>{
            this.$createToast({message:'批评成功!',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            })
          })
        }
        else if(this.params.type == 1){
          let labels = [];
          this.disc.labels.praise.forEach((item,i)=>{
            if(this.label.value.indexOf(i) > -1){
              labels.push( item['text'] )
            }
          });
          let stuIds = [],stuNames = [];

          this.params.students.forEach((item,i)=>{
            stuIds.push(item['stuId']);
            stuNames.push(item['stuName']);
          });

          let goodObject = {
            stuIds:stuIds.join(','),
            stuNames:stuNames.join(','),
            good: labels.join(','),
            remark:this.params.message
          };
          this.$update_express_praise(goodObject).then(()=>{
            this.$createToast({message:'表扬成功!',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            })
          })
        }

      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vc-bg vc-fluid--h-min vc-padding__lg--bm">
    <div class="vc-padding__lg--ad vc-border--bm">
      <div class="vc-text--bold vc-padding__lg--ud vc-border--bm">学生：</div>
      <div class="vc-padding__lg">
        <p class="vc-text--light vc-text--baseline--md" v-for="(item,index) in params.students">
           {{ item['stuName']}}
        </p>
      </div>
    </div>

    <template v-if=" params.type == 1">
      <div class="vc-padding__lg--ad vc-border--bm">
        <div class="vc-text--bold vc-padding__lg--ud vc-border--bm">表扬内容：</div>
        <div class="vc-padding__lg">
          <VaCheck :options="disc.labels.praise" v-model="label.value" :is-single="false"></VaCheck>
          <router-link tag="div" :to="{ name:'SubClassExpressLabelEdit',query:{ type:params.type}}" class="vc-text--bold vc-text--theme">+标签管理</router-link>
        </div>
      </div>
    </template>

    <template v-if="params.type == 0 ">
      <div class="vc-padding__lg--ad vc-border--bm">
        <div class="vc-text--bold vc-padding__lg--ud vc-border--bm">批评内容：</div>
        <div class="vc-padding__lg">
          <VaCheck :options="disc.labels.critic" v-model="label.value" :is-single="false"></VaCheck>
          <router-link tag="div" :to="{ name:'SubClassExpressLabelEdit',query:{ type:params.type}}" class="vc-text--bold vc-text--theme">+标签管理</router-link>
        </div>
      </div>
    </template>

    <div class="vc-padding__lg--ad ">
      <div class="vc-text--bold vc-padding__lg--ud ">备注信息：</div>
      <div class="vc-margin--bm">
        <div class="vp-textarea" >
          <textarea type="text"  placeholder="请输入您的备注信息" class=" vp-textarea__inner vp-textarea--theme" rows="4"   v-model="params.message" maxlength="200"></textarea>
          <span class="vp-textarea__count vc-text--gray">{{ params.message ? params.message.length : 0  }}/200</span>
        </div>
      </div>

      <div class="vp-btn__submit vp-btn--theme" @click="_sure_express">确定</div>
    </div>

  </div>
</template>
<style scoped></style>
