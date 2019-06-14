import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'


Vue.mixin( {
  methods:{

    $request({ url ,type = 'POST' ,isFirstLoading = false,data ,responseType = 'json' ,headerContentType='application/x-www-form-urlencoded' , loading = false,interval=0 }){

      //用于判断接口是否是第一次加载，第一次加载才出现加载动画，之后不出现在加载动画

      let isFirst = true ;
      //debugger
      if(isFirstLoading){
        let urls = sessionStorage.getItem('urls') ? JSON.parse( sessionStorage.getItem('urls') ) : [];

        if( urls.indexOf(url) == -1 ){
          urls.push(url);
          isFirst = true ;
        }else{
          isFirst = false
        }
        sessionStorage.setItem('urls',JSON.stringify(urls))
      }

      let toast = null;
      if(loading && isFirst){
        toast = this.$toast.loading({
          mask: true,
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'circular',
          message: '加载中...'
        });
        interval = 300; // 如果需要加载动画，则延长返回时间，否则接口过快，出现页面闪烁
      }
      return new Promise((resolve,reject)=>{
        axios({
          url:url,
          baseURL:this.$configs['HTTP_REQUEST_ST'],
          data:data,
          transformRequest: [function (request) {
            request = qs.stringify(request);
            return request
          }],
          method:type,
          headers: {'Content-Type': headerContentType },
          timeout:10000
        }).then((reponse)=>{

          setTimeout(()=>{

            setTimeout(()=>{
              toast && toast.clear()
            },100);

            let data = reponse.data;
            if(data['code'] == '000'){
              resolve(data)
            }else if(data['code'] == '004'){
              //this.$toast(data['msg']);
              sessionStorage.setItem('redirect',window.location.href.split('#')[1]);
              sessionStorage.setItem('isLogin','');
              this.$router.push({ name: 'Login' });

            }else{
              //this.$toast('数据请求异常！');
              reject(data);
            }
          },interval)

        },(data)=>{
          this.$createToast({ message: '请求失败，请检查网络!',duration:2000}).show();
          setTimeout(()=>{
            toast && toast.clear()
          },100);

        }).catch( (error)=> {
          setTimeout(()=>{
            toast && toast.clear()
          },100);
          this.$createToast({ message: '请求失败，请检查网络!',duration:2000}).show();
        })
      })
    },
    //设置时间格式化
    _picker_formatter(type,value){
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }else if (type === 'day') {
        return `${value}日`
      }else if (type === 'hour') {
        return `${value}时`
      }else if (type === 'minute') {
        return `${value}分`
      }
      return `${value}秒`;
    },

    // 设置图片的高宽，通过图片的最小边占满盒子
    _pub_img_load(e){
      let  parentNode = e.target.parentNode || e.target.parentElement ;
      let imgBoxWidth = parentNode.offsetWidth;
      let imgBoxHeight = parentNode.offsetHeight;
      let imgHeight = e.target.height;
      let imgWidth = e.target.width;
      let imgBoxProp = imgBoxWidth / imgBoxHeight;
      let imgProp = imgWidth / imgHeight;
      if(imgProp >= imgBoxProp ){
        e.target.style.height = imgBoxHeight + 'px';
      }else{
        e.target.style.width = imgBoxWidth + 'px';
      }
    },
    // 设置页面滚动
    _pub_scroll_container(container,scrollbar){
      let box = container || '.swiper-container';
      this.$nextTick(() => {
        let that = this;
        // 使用swiper进行页面滑动时，一定注意要给 swiper-container  设置一个高度
        let swipe = new Swiper( box , {
          direction: 'vertical',
          slidesPerView: 'auto',//不定宽 或 高
          freeMode: true,
          centeredSlides: false,
          autoHeight:'auto',
          scrollbar: {
            el: scrollbar ,
          },
          mousewheel: true,
          on:{
            'slideChange':function(e){
              //alert(this.activeIndex)
              //that.swiper.index = this.activeIndex + 1
            }
          }
        } );
      });
    },
  }
});

