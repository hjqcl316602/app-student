<script type="text/ecmascript-6">
  import Cookies from 'cookies'
  export default {
    name: "",
    components: {   },
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
      this.login();
    },
    activated(){
    },
    props: [],
    data(){
      return {}
    },
    methods: {
      login(){
        if( this.$configs['HTTP_LOCATION'] == 'localhost' ){
          //this.$store.commit('set_login',true);
          sessionStorage.setItem('isLogin',true);

          if(this.$configs['PORT_TYPE'] == 1){
            if(this.$configs['TEACHER_TEST_INSERT']){
              Cookies.remove('classId');
            }else{
              Cookies.set('classId',this.$configs['TEACHER']['CLASSID']);
            }

          }else{
            if(this.$configs['PARENT_TEST_INSERT']){
              Cookies.remove('classId');
              Cookies.remove('stuId');

            }else{
              Cookies.set('classId',this.$configs['PARENT']['CLASSID']);
              Cookies.set('stuId',this.$configs['PARENT']['STUID']);
            }

          }

          Cookies.set('webMemId',this.$configs['webMemId']);
          Cookies.set('fromUser',this.$configs['fromUser']);

        }

        if( sessionStorage.getItem('isLogin') ){

          let obj = {
            memType:sessionStorage.getItem('memType'),
            webOpenId:Cookies.get('webOpenId'),
            webMemId:Cookies.get('webMemId'),
            webNickname:Cookies.get('webNickname'),
            webHeadimgurl: Cookies.get('webHeadimgurl'),
            webMemType:Cookies.get('webMemType'),
            parentFlag:Cookies.get('parentFlag'),
            teacherFlag:Cookies.get('teacherFlag'),
            schoolFlag:Cookies.get('schoolFlag'),
            studentFlag:Cookies.get('studentFlag'),
            classId:Cookies.get('classId'),
            stuId:Cookies.get('stuId'),
            chengHu:Cookies.get('chengHu'),
            fromUser:Cookies.get('fromUser')
          };
          //alert(JSON.stringify(obj));

          let userMessage = Object.assign({},this.userMessage ) ;

          Object.keys(obj).forEach((item,i)=>{
            userMessage[item] = obj[item]
          });

          this.$store.commit('get_user_message',userMessage);

          let jumpPath = sessionStorage.getItem('redirect') || '/MainIndex';

          this.$router.replace({ path:jumpPath })

        }else{
          sessionStorage.setItem('isLogin',true);

          let href = `${ this.$configs['HTTP_REQUEST_WX']}/wxAuth/redirect.do?returnUrl=/Login&memType=${sessionStorage.getItem('memType')}`;
          //alert(href)
          window.location.href = href;
        }
      },
    },
  }
</script>
<template>

  <div class="vc-fluid vc-bg vc-flex--center">
    <span class="vc-text--light vc-text--xl-xx">登录中...</span>
  </div>


</template>
<style scoped>

</style>
