<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  export default {
    name: "SubClassChange",
    components: {},
    mixins: [ user ],
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
      this._init_page();
    },
    computed:{

      classListTeacherChange(){
        let classId = this.userMessage['classId'];
        let newClassList =  [];
        this.classList.forEach((item,i)=>{
          let obj = item;
          if(item['classId'] == classId ){
            obj.active = true ;
            newClassList.unshift(obj);
          }else{
            obj.active = false ;
            newClassList.push(obj);
          }
        });
        return newClassList
      }
    },
    data() {
      return {}
    },
    methods: {
      async _init_page() {

        await this.$get_teacher_class()

      },
      _change_class(item){

        let params = {
          classId:item['classId']
        };
        this.$change_teacher_class( params ).then(()=>{

          // 更换用户当前信息
          let userMessage = Object.assign({},this.userMessage ) ;
          userMessage['classId'] = params['classId'];
          this.$store.commit('get_user_message',userMessage);

          this.$get_teacher_class();

          setTimeout(()=>{
            this.$router.go(-1)
          },500)
        })

      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg">

    <div class="vc-padding__lg vc-border--bm" v-for="(item,index) in classListTeacherChange" @click="_change_class(item,'teacher')">
      <div class="vc-flex vc-items--center">
        <div class="vc-margin__lg--rt" :class="{'vp-icon__select':!item['active'] , 'vp-icon__select--active':item['active'] }"></div>
        <div class="vp-img__inner vp-img__head vc-margin__lg--rt" data-square="80" >
          <img :src="item.classPic" alt="" @load="_pub_img_load">
          <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--cover">
        </div>
        <div class="">
          <div class="vc-margin--bm ">
            <span  class="vc-text--bold" v-if="item['classType']">
              {{ item['classType'] }} ·
            </span>
            <span class="vc-text--bold">{{ item['className'] }}</span>
          </div>
          <div class="vc-margin--bm "> {{ item['stuNum'] }} 人</div>
          <div class="vc-margin--bm vc-text--light" v-if="item['schoolName']">{{ item['schoolName'] }}</div>
          <div class="vc-margin--bm vc-text--gray">{{ item['areaName']}} </div>

        </div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
