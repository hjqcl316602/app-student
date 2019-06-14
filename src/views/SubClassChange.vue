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
      classListChange(){
        //console.log('dshdjsh')
        let classId = this.userMessage['classId'];
        let stuId = this.userMessage['stuId'];
        let newClassList =  [];
        this.classParentList.forEach((item,i)=>{
          let obj = item;
          if(item['classId'] == classId && item['stuId'] == stuId){
            obj.active = true ;
            newClassList.unshift(obj);
          }else{
            obj.active = false ;
            newClassList.push(obj);
          }
        });
        return newClassList
      },
    },
    data() {
      return {}
    },
    methods: {
      async _init_page() {
        await this.$get_parent_class()
      },
      _change_class(item){

        let params = {
          classId:item['classId'],stuId:item['stuId']
        };
        this.$change_parent_class( params ).then(()=>{

          // 更换用户当前信息
          let userMessage = Object.assign({},this.userMessage ) ;
          Object.keys(params).forEach((item,i)=>{
            userMessage[item] = params[item]
          });
          this.$store.commit('get_user_message',userMessage);

          this.$get_parent_class();
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
  <div class="vc-padding__lg vc-border--bm vc-flex--between-center" v-for="(item,index) in classListChange " @click="_change_class(item)">
    <div class="vc-flex vc-items--center">
      <div class="vc-margin__lg--rt" :class="{'vp-icon__select':!item['active'] , 'vp-icon__select--active':item['active'] }"></div>
      <div class="vc-margin__lg--rt vp-img__inner vp-img__head " data-square="80" >
        <img :src="item.classPic" alt="" @load="_pub_img_load">
        <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--cover">
      </div>
      <div class="">
        <div class="vc-margin--bm vc-text--bold">{{ item['stuName']}}</div>
        <div class="vc-margin--bm ">
          <span v-if="item['classType']">{{ item['classType']}} · </span>
          <span>{{ item['className']}}</span>
        </div>
        <div class="vc-margin--bm vc-text--light" v-if="item['schoolName']" >{{ item['schoolName']}}</div>
        <div class="vc-margin--bm vc-text--gray">{{ item['areaName']}}</div>
      </div>
    </div>

  </div>

</div>
</template>
<style scoped></style>
