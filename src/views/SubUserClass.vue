<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  import basic  from './mixin/basic'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: {},
    mixins: [ user,basic ,classes ],
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
      return {
        class:{
          list:[]
        }
      }
    },
    methods: {
      async _init_page() {
        await this.$get_teacher_class()
      },
      _del_class(item){
        this.$dialog.confirm({
          title:'确认信息',
          message:'确认退出【' +item['className']+'】班级?'
        }).then(()=>{
          this.$del_class({ classId:item['classId'] }).then(()=>{
            this.$createToast({message:'班级退出成功！',duration:2000}).show();
            this.$get_teacher_class();
          })
        })
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

        })
      },
      _check_class_detail(item){
        this.$router.push({ name :'SubUserClassMember',query:{ classId:item['classId'] }});
        sessionStorage.setItem('detail-class-teacher',JSON.stringify(item))
      },
      _show_error_message(item,message){
        this.$dialog.alert({
          title: message,
          message: item['evaluate'] || '暂无原因！'
        }).then(() => {
        });
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="">



    <div class="vp-footer vp-footer--shadow">
      <router-link tag="div" :to="{ name:'SubClassTeacherEdit'}" class="vc-flex vp-row" >
        <div class="vc-flex--aut   vp-btn__simple vp-btn--theme " >新添班级</div>
      </router-link>
    </div>

    <div class="vc-fluid--h-min vc-padding__xl-x--bm " v-if="classListTeacherChange && classListTeacherChange.length > 0 ">
      <van-cell-swipe   :right-width="200" :left-width="100" v-for="(item,index) in classListTeacherChange"  :key="index">

        <div class="vc-padding__lg vc-margin--bm vc-bg "  >

          <div  class="vc-flex vc-border--bm vc-padding__lg--bm vc-margin__lg--bm" >

            <div class="vp-img__inner vp-img__head vc-margin__lg--rt" data-square="80" @click="_check_class_detail(item)">
              <img :src="item.classPic" alt="" @load="_pub_img_load">
              <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--cover">
            </div>

            <div class="vc-flex--fit">
              <div class="vc-margin--bm">
                <div class="vc-flex--between-center">
                <span class="vc-text--bold"  @click="_check_class_detail(item)"  >
                  <span :class="{'vc-text--danger':item.active}">
                    <span v-if="!!item['classType']" class="vc-text--bold" >{{ item['classType'] + ' · '}}</span>
                    <span class="vc-text--bold">{{ item['className'] }}</span>
                  </span>
                </span>
                  <div class="">
                    <span class="vc-text--theme" v-if="item['vip'] == 0 ">未开通认证</span>
                    <span class="vc-text--danger" v-if="item['vip'] == 1 ">未支付</span>
                    <span class="vc-text--danger" v-if="item['vip'] == 2 ">待审核</span>
                    <span class="vc-text--danger" v-if="item['vip'] == 3 " @click="_show_error_message(item,'审核不通过原因')" > <i class="iconfont icon-wenhao"></i> 审核不通过</span>

                    <span class="vc-text--light" v-if="item['vip'] == 4 ">已开通认证</span>
                    <span class="vc-text--danger" v-if="item['vip'] == 5 ">即将过期</span>
                    <span class="vc-text--danger" v-if="item['vip'] == 6 " @click="_show_error_message(item,'认证关闭原因')" > <i class="iconfont icon-wenhao"></i> 认证关闭</span>
                  </div>
                </div>

              </div>
              <div class="vc-margin--bm" @click="_check_class_detail(item)" >
                {{ item['stuNum'] }} 人
              </div>
              <div class="vc-margin--bm" @click="_check_class_detail(item)" >
                {{ item['teacherType'] }}
              </div>
            </div>


          </div>
          <div class=" vc-flex--between-center">
            <div class="vp-icon__select" @click="_change_class(item)" :class="{'vp-icon__select--active': item.active}" ></div>
            <div class="vc-flex">
              <router-link class="vp-btn vp-btn__oper--small vp-btn--cancel " tag="div" :to="{ name:'SubUserShare',query:{ classId: item['classId'] } }">邀请加入</router-link>
              <router-link class="vp-btn vp-btn__oper--small vp-btn--danger vc-margin--lt" :to="{ name : 'SubUserClassVip',query:{ classId : item['classId']  }}" tag="div" v-if="item['vip'] == 0">去开通</router-link>
              <router-link class="vp-btn vp-btn__oper--small vp-btn--danger vc-margin--lt" :to="{ name : 'SubUserClassVipPay',query:{ classId : item['classId'] , vipRecordId : item['vipRecordId'] ,fromPage:'SubUserClass' }}" tag="div" v-if="item['vip'] == 1">去支付</router-link>
              <router-link class="vp-btn vp-btn__oper--small vp-btn--danger vc-margin--lt" :to="{ name : 'SubUserClassVipMaterial',query:{ classId : item['classId'] ,fromPage :'SubUserClass' }}" tag="div" v-if="item['vip'] == 3">完善资料</router-link>
              <router-link class="vp-btn vp-btn__oper--small vp-btn--danger vc-margin--lt" :to="{ name : 'SubUserClassVipPay',query:{ classId : item['classId'] , vipRecordId : item['vipRecordId'] , fromPage :'SubUserClass' }}" tag="div" v-if="item['vip'] == 5">去续费</router-link>
            </div>
          </div>
        </div>

        <div slot="right" style="width: 200px;height:100%;" class="vc-flex">


          <router-link tag="div"   class="vp-btn__simple vp-btn--theme"  :to="{ name:'SubClassTeacherEdit',query:{ classId: item['classId'],type:'edit' } }">编辑班级</router-link>
          <div  class="vp-btn__simple  vp-btn--danger " @click="_del_class(item)" >退出班级</div>

        </div>
        <div slot="left" style="width: 100px;height:100%;" class="vc-flex">

          <router-link tag="div"   class="vp-btn__simple vp-btn--theme"  :to="{ name:'SubUserClassTeacherTypeEdit',query:{ classId: item['classId'],teacherType:item['teacherType'] } }">编辑科目</router-link>
        </div>

      </van-cell-swipe>
    </div>
  </div>
</template>
<style scoped></style>
