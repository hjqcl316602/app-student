import Vue from 'vue'
import Router from 'vue-router'
import Routes from './vue.router.routes'
import store from '../views/store'
import { set_wx_sign , hide_all_menus } from './vue.wx';
import { PORT_TYPE } from './vue.config';
Vue.use(Router);



const router = new Router({

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: Routes
})

router.beforeEach( ( to, from, next ) => {

  //将历史访问页面记录下来
  let historyUrls = sessionStorage.getItem('historyUrls') ? JSON.parse(sessionStorage.getItem('historyUrls')) : [];
  historyUrls.push(from.name || '');
  sessionStorage.setItem('historyUrls',JSON.stringify(historyUrls));


  setTimeout(()=>{
    document.title = to.meta.title;
    let isLogin = to.meta.isLogin;
    let href = window.location.href;

    let fromIndex = href.indexOf('&from=');       //先判断是否是微信分享过来的 - 需要进行路径的组装
    let fromIndex2 = href.indexOf('?from=');

    if (fromIndex > -1 || fromIndex2 > -1) {
      let index2 = href.indexOf('?');
      let newHref = '';

      if(fromIndex > -1){
        newHref = href.substring(0,fromIndex);
      }
      if(fromIndex2 > -1){
        newHref = href.substring(0,fromIndex2);
      }
      location.replace( newHref.substring(0,index2) + '#'+ newHref.substring(index2+1) ) ;

    } else {
      if( isLogin && !sessionStorage.getItem('isLogin') ){   // 只能存store，不然刷新session存在，则不能获取到用户类型等数据

        sessionStorage.setItem('redirect',to.fullPath);
        if(to.query['memType']){
          sessionStorage.setItem('memType',to.query['memType'] );  // 确定进入端口 1 - 教师端 2 - 家长端
        }else{
          sessionStorage.setItem('memType',PORT_TYPE); // 默认进入家长端
        }
        next({ path: '/Login' });
      }else{
        next();
      }
    }
  },20)

});

router.afterEach((to)=>{
  // 判断是否已经隐藏了 - 不需要重复拉取验签信息
  let browser = Utils.browserType();
  //alert(browser)
  let web = window.location.href;
  let href = '';
  if(browser == 'ios'){
    href = web.split('#')[0];         // 专门用于ios的js验签
  }
  if(browser =='android'){
    web = web.split('#')[0]+ '#' + to.fullPath;
    href = encodeURIComponent(web)
  }

  set_wx_sign(href).then(()=>{
    hide_all_menus()
  });


});

export default router
