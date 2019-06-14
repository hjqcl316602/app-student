<script type="text/ecmascript-6">
  import Navbar  from './component/page.navbar.vue'

  import classes  from './mixin/class'
  import user  from './mixin/user'
  import interaction  from './mixin/interaction'
  import index  from './mixin/index'
  import Swiper from 'swiper'
  export default {
    name: "MainIndex",
    components: { Navbar },
    mixins: [ classes,user,interaction,index ],
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
      this._init_page();
    },
    activated(){
      this.$get_mem_num();

      this.$get_news_msg().then((response)=>{
        this.msg = response['data'];
      });
      this.$get_act_list(true)
    },
    props: [],
    data(){
      return {
        msg:{},
        classes:{
          name:'',type:''
        }
      }
    },
    methods: {
      async _init_page(){
        //this.$get_user_notice();
        await  this.$get_banner_list();
        this._swiper_slider()

      },
      _swiper_slider(){
        setTimeout(()=>{
          let swipe = new Swiper('.vv-siwpe--banner', {
            slidesPerView: 1,
            spaceBetween: 0,
            freeMode: false,
            centeredSlides: false,
            pagination: {
              clickable: true,
              el: '.swiper-pagination',
              dynamicBullets: true,
            },
            on:{
              slideChange:function(){
              }
            },
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
          });
        },100)
      },
      _read_message(item,index){
        sessionStorage.setItem('selectNews',JSON.stringify(item));

        if(item['rd'] == 0){
          this.$read_message({ msgId:item['id']}).then(()=>{
            this.notice.list[index]['rd'] = 1 ;
          });
        }
        this.$router.push({ name :'SubUserNoticeDetail' })
      },
      _jump_page(newType,routerType,routerType2){

        let newTypes = ['cj','hd','sf','kj','zy','kq'];

        if(newTypes.indexOf(newType) > -1){
          this.$update_news_msg({ msgType : newType })
        }

        if(routerType == 'SubAtten'){
          if(this.userMessage['memType'] == 1){
            this.$router.push({ name :routerType })
          }else if(this.userMessage['memType'] == 2){
            this.$router.push({ name :routerType2 })
          }
        }else{
          this.$router.push({ name :routerType  } )
        }
      },
      _check_banner_detail(item){
        sessionStorage.setItem('selectBanner',JSON.stringify(item))
        this.$router.push({ name :'SubBannerDetail'})
      }

    },
    watch: {
      'userMessage': {
        handler(val, olval){
          if(!!val['classId']){
            this.$get_class_name({ classId:val['classId']}).then((data)=>{
              this.classes['name'] = data['data']['className'];
              this.classes['type'] = data['data']['classsType'];
            })
          }
        },
        deep: true ,
        immediate:true
      }

    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-index vc-padding__xl-x--bm">
    <div class="vc-bg--theme vc-padding vc-flex--between-center">
      <template v-if="!userMessage['classId'] || userMessage['classId'] == 0 ">
        <span class="vc-text--bold vc-text--white vc-text--baseline--lg">总人数：{{ mem.total }}</span>
        <span class="vc-text--bold vc-text--white">您当前尚未加入班级</span>
      </template>
      <template v-else>
        <span class="vc-text--bold vc-text--white vc-text--baseline--lg">总人数：{{ mem.total }}</span>

        <template v-if="userMessage['memType'] == 1">
          <router-link tag="div" :to="{ name:'SubClassChangeTeacher'}" class="vp-icon__outer">
            <span class="vc-text--bold vc-text--white">{{ classes['name'] }}</span>
            <i class="iconfont icon-iconfontjiantou2 vc-text--white"></i>
          </router-link>
        </template>

        <template v-if="userMessage['memType'] == 2">
          <router-link tag="div" :to="{ name:'SubClassChange'}" class="vp-icon__outer">
            <span class="vc-text--bold vc-text--white">{{ classes['name'] }}</span>
            <i class="iconfont icon-iconfontjiantou2 vc-text--white"></i>
          </router-link>
        </template>

      </template>

    </div>
    <div class="">
      <template>



        <div class="vv-siwpe--banner swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide"  v-for="(item,index) in banner.list" :key=index>
              <div class="vp-ratio">
                <div class="vp-ratio__outer" data-ratio="16:9">
                  <div class="vp-ratio__inner" @click="_check_banner_detail(item)">
                    <div class="vp-img__inner">
                      <img :src="item['pic']" @load="_pub_img_load"  >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>


      </template>
      <template >
        <div class="vc-bg vc-padding__lg vc-margin__lg--bm">
          <div class="vc-flex vc-content--between vc-padding--ud">
            <div  @click="_jump_page('cj','SubScore')" >
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-cj.png" alt="" class="vp-img--max"  >
                  <div class="vp-badge__spot" v-if=" msg['cj'] > 0 "></div>
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">成绩</div>
            </div>
            <div  @click="_jump_page('xc','SubAlbum')" >
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-xc.png" alt="" class="vp-img--max"  >
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">相册</div>
            </div>
            <div @click="_jump_page('hd','SubInteraction')">
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-hd.png" alt="" class="vp-img--max"  >
                  <div class="vp-badge__spot" v-if=" msg['hd'] > 0 "></div>
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">互动</div>
            </div>
            <div @click="_jump_page('zy','SubResource')">
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-zy.png" alt="" class="vp-img--max"  >
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">资源</div>
            </div>

          </div>



          <div class="vc-flex vc-content--between vc-padding--ud">

            <div @click="_jump_page('sf','SubCost')">
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-sf.png" alt="" class="vp-img--max"  >
                  <div class="vp-badge__spot" v-if=" msg['sf'] > 0 "></div>
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">收费</div>
            </div>
            <div @click="_jump_page('kj','SubClass')">
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-kj.png" alt="" class="vp-img--max"  >
                  <div class="vp-badge__spot" v-if=" msg['kj'] > 0 "></div>
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">课纪</div>
            </div>
            <div @click="_jump_page('zy','SubTask')">
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-zyy.png" alt="" class="vp-img--max"  >
                  <div class="vp-badge__spot" v-if=" msg['zy'] > 0 "></div>
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">作业</div>
            </div>
            <div @click="_jump_page('kq','SubAtten','SubAttenParent')">
              <div class="vp-box">
                <div class="vp-img__inner">
                  <img src="../img/icon-modal-kq.png" alt="" class="vp-img--max"  >
                  <div class="vp-badge__spot" v-if=" msg['kq'] > 0 "></div>
                </div>
              </div>
              <div class="vc-text--light vc-text--center vc-padding__sm--tp">考勤</div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="act.list.length > 0 ">
        <div >
          <div class="vc-bg vc-padding__lg vc-border--bm" >
            <div class="vc-text--bold vc-text--center">最新通知</div>
          </div>

          <div class="vc-bg vc-margin--bm " v-for="(item,index) in act.list" :key=index>
            <router-link tag="div" :to="{name:'SubInteractionActivityDetail' ,query :{ actId:item['actId']} }">


              <div class="" v-if="!!item['pics'] && item['pics'].split(';')[0]">
                <div class="vp-img__outer">
                  <img :src="  item['pics'].split(';')[0]" alt="">
                  <div class="vc-img--mask vc-flex vc-items--center">
                    <div class=" vc-padding__lg">
                      <span class="vc-text--white vc-text--bold vc-text--lg vc-text--baseline--lg ">{{ item['title']}}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else>
                <div class=" vc-padding__lg">
                  <span class="vc-text--bold vc-text--lg vc-text--baseline--lg ">{{ item['title']}}</span>
                </div>
              </div>

              <div class="vc-padding__lg vc-flex--between-center">
                <div class="vp-icon__outer">
                  <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
                    <img :src="item['photo']" alt="" class="vp-img--max">
                    <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
                  </div>
                  <span class=" vc-text--bold">{{ item['name']}}</span>
                </div>
                <div>
                  <p class="vc-text--right vc-text--sm vc-text--light vc-text--baseline--md">发布于{{ item['time'] }}</p>
                  <p class="vc-text--right vc-text--sm vc-text--light vc-text--baseline--md">阅读次数：{{ item['num'] }}次</p>
                </div>
              </div>
            </router-link>
          </div>

        </div>
      </template>
      <!--
      <template v-if="notice.list.length > 0 ">
        <div class="vc-margin&#45;&#45;bm">
          <div class="vc-bg vc-padding__lg&#45;&#45;ad ">
            <div class=" vc-padding__lg&#45;&#45;ud">
              <div class="vc-text&#45;&#45;bold vc-text&#45;&#45;lg vc-text&#45;&#45;center">最新通知</div>
            </div>

            <div>
              <div class=" vc-padding__lg&#45;&#45;ud " :class="{'vc-border&#45;&#45;bm':index != ( notice.list.length - 1 )  }" v-for="(item,index) in notice.list" @click="_read_message(item,index)">

                <div class="vc-flex">
                  <div class="vc-margin&#45;&#45;rt" v-if="item['rd'] == 0">
                    <div  class="vp-icon__spot danger " ></div>
                  </div>
                  <div class="vc-flex&#45;&#45;fit">
                    <div><span class="vc-text&#45;&#45;bold">{{ item['title']}}</span></div>
                    <div class="vc-padding&#45;&#45;ud vc-text&#45;&#45;baseline&#45;&#45;md" v-html="item['message']">

                    </div>
                    <div class="vc-text&#45;&#45;gray vc-text&#45;&#45;right vc-text&#45;&#45;sm">{{item['time']}}</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <va-load-more v-if="notice.list.length >= notice.pageSize"  :finished="notice.push.finished" :loading="notice.push.loading" msg="暂无更多通知~~" @load="$get_user_notice(true,false)"></va-load-more>
        </div>


      </template>-->
    </div>

    <Navbar active="index"></Navbar>
  </div>

</template>
<style scoped></style>
