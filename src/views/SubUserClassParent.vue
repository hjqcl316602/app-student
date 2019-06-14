<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: {},
    mixins: [ user,classes ],
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
      return {}
    },
    computed:{
      classListChange(){
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
        console.log(newClassList)
        return newClassList
      },
    },
    methods: {
      async _init_page() {

        await this.$get_parent_class()
      },
      _del_class(item){
        this.$dialog.confirm({
          title:'确认信息',
          message:'确认退出【' +item['className']+'】班级?'
        }).then(()=>{
          this.$del_class({ classId:item['classId'] , stuId : item['stuId'] }).then(()=>{
            this.$createToast({message:'班级退出成功！',duration:2000}).show();
            this.$get_parent_class();
          })
        })
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

        })
      },
      _check_class_detail(item){

        this.$router.push( { name : 'SubUserClassParentTeachers',query:{ classId:item['classId'] , stuId:item['stuId']}});
        sessionStorage.setItem('detail-class-parent',JSON.stringify(item))
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min  vc-padding__xl-x--bm">

    <van-cell-swipe  :right-width="100" v-for="(item,index) in classListChange"  :key="index">

      <div class="vc-bg vc-padding__lg vc-margin--bm">

        <div  @click="_check_class_detail(item)" class="vc-flex  vc-border--bm vc-padding__lg--bm vc-margin__lg--bm">

          <div class="vp-img__inner vp-img__head vc-margin__lg--rt" data-square="80" >
            <img :src="item.classPic" alt="" @load="_pub_img_load">
            <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--cover">
          </div>

          <div >
            <div class="vc-margin--bm">
              <span class="vc-text--bold" :class="{'vc-text--danger':item.active}">
                 {{ item['stuName']}}
              </span>
            </div>

            <div class="vc-margin--bm">
              <span v-if="item['classType']">{{ item['classType']}} · </span>{{ item['className']}}
            </div>
          </div>
        </div>


        <div class="vc-flex--between-center">
          <div class="vp-icon__select" :class="{ 'vp-icon__select--active' :item.active}" @click="_change_class(item)"></div>
          <router-link class="vp-btn vp-btn__oper--small vp-btn--cancel " tag="div" :to="{ name:'SubUserShareParent',query:{stuName: item['stuName'] , classId: item['classId'],stuId:item['stuId'] ,chengHu:item['chengHu']} }">
            邀请其他家人关注
          </router-link>

        </div>

      </div>

      <div tag="div"  slot="right" style="width: 100px" class="vp-btn__simple  vp-btn--danger " @click="_del_class(item)" >退出班级</div>
    </van-cell-swipe>



    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <router-link tag="div" :to="{ name :'SubClassEdit'}" class="vc-flex--aut vp-btn__simple vp-btn--theme " >添加孩子</router-link>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
