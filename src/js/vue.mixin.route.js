/**
 * Created by 41587 on 2018/9/9.
 */

import Vue from 'vue'

Vue.mixin( {
  data(){
    return {

      popup:{
        show:false
      },
      popups:{['0']:false,['1']:false,['2']:false,['3']:false,['4']:false,['5']:false,['6']:false,['7']:false,['8']:false, }
      // 此处不能为数组，页面中修改之后不能起到效果
    }
  },
  beforeRouteEnter(to, from, next) {
    let keepAliveRoutes = to.meta['keepAliveRoutes'] || []; // 先设置一个数组，该页面的来自的页面后需要缓存的页面记录下来
    let fromName = from.name ;
    if(  keepAliveRoutes.indexOf(fromName) > -1 && Object.getOwnPropertyNames(to.meta).indexOf('noLoading') > -1){
       to.meta.noLoading = true
    }else{
      to.meta.noLoading  = false
    }
    next()
  },
  beforeRouteLeave(to,from,next){
    let that = this;
    this.$dialog.close();
    // 判断是否有弹框，有弹框则将弹框关闭
    let bool = function(){
      let arr = Object.keys(that.popups) ;
      for(let n = 0 ; n < arr.length;n++){
        if(that.popups[arr[n]]){
          return true
        }
      }
      return false ;
    }();
    //alert(bool)
    if( bool || ( this.popup && this.popup.show ) ){    // 由于子页面的该事件会后执行，所以目前只能通过在这里执行弹出框的显示和隐藏
      if(bool){
        let arr = Object.keys(that.popups) ;
        for(let n = 0 ; n < arr.length;n++){
          that.popups[arr[n]] = false
        }
      }

      if(this.popup && this.popup.show ){
        this.popup.show = false ;
      }

      next(false)
    }{

      //next()
      //return


      let userMessage = this.$store.state.basic['userMessage'];
      let bool  = function () {

        let classId = userMessage['classId'];

        if( classId == 0 || classId == '' || classId == undefined){
          return false
        }
        return true;
      }();
      //to.meta['isBind'] && to.meta['isNoClassJoin']  暂时时选几个页面跳转时需要加入班级，跳转到班级加入页
      if(  to.meta['isBind']  &&　sessionStorage.getItem('isLogin') && !bool){    //需要判断当前用户是否与班级进行过绑定
        this.$dialog.confirm({
          title:'提示信息',
          message:'当前功能需要加入班级'
        }).then(()=>{

            if(userMessage['memType'] == 2){
              this.$router.push({ name : 'SubClassEdit' })
            }else{
              this.$router.push({ name : 'SubClassTeacherEdit' })
            }

        }).catch(()=>{})
        next(false)
      }else{
        next()
      }

    }
  },

});


