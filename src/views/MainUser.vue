<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import user  from './mixin/user'
  import Navbar  from './component/page.navbar.vue'
  export default {
    name: "",
    components: { Navbar },
    mixins: [ user ],
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
      this._init_page();
    },
    props: [],
    data(){
      return {}
    },
    methods: {
      async _init_page(){
        await  this.$get_user_info();

      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vc-padding__xl-x--bm">

    <div class="vc-bg">

      <div class="vp-ratio">
        <div class="vp-ratio__outer" data-ratio="46.67%">
          <div class="vp-ratio__inner">
            <div class="vp-img__inner">
              <img src="../img/bg-user.png" alt="" class="vp-img--max">
              <div class="vp-img__content vc-padding__lg">
                <router-link tag="div"  :to="{ name:'SubUserMessage'}" class="vc-cover">
                  <div class="vc-flex--between-center vc-cover">
                    <div class="vc-flex vc-items--center">
                      <div class="vp-img__inner vp-img__head" data-round="80">
                        <img :src="userInfo['memPhoto']" alt="" class="vp-img--max">
                        <img src="../img/icon-head-error-male.png" alt="" class="vp-img--error">
                      </div>
                      <div class="vc-margin--lt">
                        <div class="vc-text--lg vc-text--bold vc-text--white">{{ userInfo['trueName'] ||  userInfo['memName'] }}</div>
                        <div class="vc-text--white vc-margin__sm--tp">{{ userInfo['mobile'] }}</div>
                      </div>
                    </div>
                    <div class="vc-margin--lt">
                      <span class="iconfont icon-iconfontjiantou2 vc-text--white"></span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <template v-if="userMessage['memType'] == 1">


      <div class=" vc-bg vc-margin--bm">
        <div class="vc-row">
          <div class="vc-col--24  ">
            <div class="vp-icon__outer vc-padding__lg--ud">
              <div class="iconfont icon-hua1 vc-text--xl-xxxx vc-text--danger"></div>
              <div class="vc-text--sm vc-text--danger">{{ userInfo['redFlower'] || 0}}朵</div>
            </div>
          </div>

          <!--<div class="vc-col&#45;&#45;12">
            <div class="vp-icon__outer vc-padding__lg&#45;&#45;ud">
              <div class="vp-icon__floor-class"></div>
              <div  style=" " class="vc-text&#45;&#45;lg vc-text&#45;&#45;bold vc-margin__sm&#45;&#45;lt">
                <div class="vc-text&#45;&#45;bold vc-margin__sm&#45;&#45;bm">班级花朵</div>
                <div class="vc-text&#45;&#45;sm">{{ userInfo['classRedFlower'] || 0 }}朵</div>
              </div>
            </div>
          </div>-->

        </div>
      </div>

      <div class=" vc-bg vc-margin--bm vc-padding__md-lg--ud">
        <router-link tag="div" :to="{ name:'SubUserNews'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud   ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-message.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">我的消息</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserClass'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud  ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-class.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">我的班级</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserClassLeader'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud  ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-manager.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">家委会管理</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserNewsSet'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-set.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">消息设置</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserShare'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud  ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-share.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">推广邀请</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserFeedback'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud  ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-about.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">意见反馈</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

      </div>

      <div class=" vc-bg  ">



        <!--<router-link tag="div" :to="{ name:'SubUserAbout'}">
          <div class="vc-flex&#45;&#45;between-center vc-padding__lg ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-about.png" alt="" class="vp-img&#45;&#45;max">
              </div>
              <div class="vc-text&#45;&#45;bold vc-margin&#45;&#45;lt">关于我们</div>
            </div>

            <div class="vc-margin&#45;&#45;lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text&#45;&#45;gray"></span>
            </div>
          </div>
        </router-link>-->

      </div>

    </template>

    <template v-if="userMessage['memType'] == 2">


      <div class=" vc-bg vc-margin--bm" >
        <div class="vc-row">
          <div class="vc-col--24">
            <div class="vp-icon__outer vc-padding__lg--ud">
              <div class="iconfont icon-hua1 vc-text--xl-xxxx vc-text--danger"></div>
              <div class="vc-text--sm vc-text--danger">{{ userInfo['redFlower'] || 0}}朵</div>
            </div>
          </div>
        </div>
      </div>

      <div class=" vc-bg vc-margin--bm vc-padding__md-lg--ud" >

        <router-link tag="div" :to="{ name:'SubUserNews'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-message.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">我的消息</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserClassParent'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-class.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">我的孩子</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserNewsSet'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-set.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">消息设置</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserShare'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-share.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">推广邀请</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <router-link tag="div" :to="{ name:'SubUserFeedback'}">
          <div class="vc-flex--between-center vc-padding__lg--ad vc-padding__md-lg--ud  ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-about.png" alt="" class="vp-img--max">
              </div>
              <div class="vc-text--bold vc-margin--lt">意见反馈</div>
            </div>

            <div class="vc-margin--lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text--gray"></span>
            </div>
          </div>
        </router-link>

        <!--<router-link tag="div" :to="{ name:'SubUserAbout'}">
          <div class="vc-flex&#45;&#45;between-center vc-padding__lg ">
            <div class="vp-icon__outer">
              <div class="vp-img__inner vp-img__cell" data-round="26">
                <img src="../img/icon-cell-about.png" alt="" class="vp-img&#45;&#45;max">
              </div>
              <div class="vc-text&#45;&#45;bold vc-margin&#45;&#45;lt">关于我们</div>
            </div>

            <div class="vc-margin&#45;&#45;lt">
              <span class="iconfont icon-iconfontjiantou2 vc-text&#45;&#45;gray"></span>
            </div>
          </div>
        </router-link>-->

      </div>

    </template>

    <Navbar active="user"></Navbar>
  </div>
</template>
<style scoped></style>
