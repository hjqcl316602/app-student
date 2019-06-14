<script type="text/ecmascript-6">
  import { VaBtnGroup }  from './component'
  //import user  from '../vue.mixins/user'
  import open from "./mixin/open";
  import user from "./mixin/user";
  export default {
    name: "SubResourceDetail",
    components: { VaBtnGroup },
    mixins: [ open ,user ],
    data() {
      return {
        tab: {
          options: [
            { text: "黑板", value: "1" },
            { text: "PK", value: "2" },
            { text: "通知", value: "3" },
            { text: "相册", value: "4" },
          ],
          active: 3,

        },
        params:{
          classId:'',
          className:'',
          isInClass:false

        }
      }
    },
    mounted() {

    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.params.classId = this.$route.query['classId'];
        this.params.className = this.$route.query['className'];
        this.$get_join_class_status(this.params).then((res)=>{
          this.params.isInClass = res['data']
        });

        if(this.tab.active == 0 ){
          this.$get_bbs_list(this.params);
        }
        else if( this.tab.active == 1 ){
          this.$get_pk_list(this.params);
        }
        else if( this.tab.active == 2 ){
          this.$get_act_list(this.params);
        }
        else if( this.tab.active == 3 ){
          this.$get_photo_list(this.params);
        }
      },
      // 加入班级
      _add_class(){

        this.$dialog.confirm({
          title:'确认信息',
          message:`是否确定加入班级【${this.params.className}】?`
        }).then(()=>{
          this.$join_class(this.params).then((res)=>{
            this.$createToast({message: `您已成功加入班级【${this.params.className}】` ,duration:2000}).show();

            let  params = { classId : this.params.classId , stuId : this.userMessage['stuId'] } ;
            this.$change_parent_class( params ).then(()=>{
              // 更换用户当前信息
              let userMessage = Object.assign({},this.userMessage ) ;
              Object.keys(params).forEach((item,i)=>{
                userMessage[item] = params[item]
              });
              this.$store.commit('get_user_message',userMessage);

              setTimeout(()=>{
                this.$router.push({ name :'MainIndex'})
              },800)
            })

          })
        }).catch(()=>{
          this.$createToast({message: `您已取消加入班级【${this.params.className}】` ,duration:2000}).show();
        })
      }
    },
    watch: {
      ['tab.active']: {
        handler(val, olval) {
          this._init_page();
        },
        deep: true,
        immediate: true
      }
    },
  }
</script>
<template>
  <div>

    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row">
      <VaBtnGroup :options="tab.options" v-model="tab.active"></VaBtnGroup>
    </div>

    <div class="vp-footer vp-footer--shadow" v-if="userMessage['memType'] == 2">
      <div class="vp-row">
        <div class="vp-btn__simple vp-btn--disabled" v-if="params.isInClass">
          已加入此班级
        </div>
        <div class="vp-btn__simple vp-btn--white" v-else @click="_add_class">
          加入班级
        </div>
       <!-- <router-link :to="{ name : 'SubJoinClass' ,query:{ type : 'join' ,classId : params.classId }}" tag="div" class="vp-btn__simple vp-btn&#45;&#45;white" v-else>

        </router-link>-->
      </div>
    </div>

    <template v-if="tab.active == 0 ">

      <template v-if="bbs.list.length > 0">

        <div class="vc-padding__xl-x--tp" :class="{ 'vc-padding__xl-x--bm' : userMessage['memType'] == 2 }">
          <div class="vc-padding__lg vc-bg vc-margin--bm" v-for="(item,index) in bbs.list" :key='index'>

            <router-link tag="div" :to="{ name : 'SubInteractionForumDetail' ,query:{ bbsId : item['bbsId'],fromPage:'SubResourceDetail' } }">
              <div class="vc-padding--bm vc-margin--bm vc-border--bm" v-if="item['title']">
                <p class="vc-text--bold vc-text--baseline--md vc-text--clamp">{{ item['title']}}</p>
              </div>

              <div class="vc-flex--between-center">
                <div class="vp-icon__outer">
                  <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
                    <img :src="item['photo']" alt="" class="vp-img--max">
                    <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
                  </div>
                  <span class=" vc-text--bold">{{ item['name']}}</span>
                </div>
                <div>
                  <p class="vc-text--right vc-text--sm vc-text--light vc-text--baseline--md">发布于{{ item['time'] }}</p>
                </div>
              </div>
            </router-link>

          </div>
        </div>
      </template>
      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
          <div class="">
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">该班级暂无黑板信息~~</div>
          </div>
        </div>
      </template>

    </template>
    <template v-if="tab.active == 1 ">

      <template v-if="pk.list.length > 0">
        <div   class=" vc-fluid--h-min vc-padding__xl-x--tp" :class="{ 'vc-padding__xl-x--bm' : userMessage['memType'] == 2 }">

          <div class="vc-padding__lg vc-margin--bm vc-bg" v-for="(item,index) in pk.list" :key="index">
            <div class="vc-flex vc-items--center">
              <span class="vc-text--bold vc-text--ellipsis">话题{{ index + 1 | num_str }}：{{ item['title']}}？ </span>
              <div class="vp-btn__status vp-btn--ing vc-margin__sm--lt" v-if="item['status'] == 0">进行中</div>
              <div class="vp-btn__status vp-btn--disabled vc-margin__sm--lt" v-if="item['status'] == 1">已结束</div>
            </div >

            <div class="vc-padding--tp vc-border--bm">

              <div class=" vc-padding--bm" v-for="(option,op) in item['optionList']">
                <div class="vc-flex vc-items--center">

                  <div class="vc-flex--fit">
                    <div class="vc-flex--between-center vc-padding__sm--bm">
                      <span class="vc-text--theme vc-text--sm">{{ op+ 1 | str_zero }}.{{option['optionName']}}</span>
                      <span class="vc-text--theme vc-text--sm">（ {{ option['num'] }} / {{ item['totalNum'] }} ） {{ ( ( item['totalNum'] ? option['num'] / item['totalNum'] : 0 ) * 100 ).toFixed(2) }}% </span>
                    </div>
                    <van-progress :show-pivot="false" color="#4A90E2" :percentage="(( item['totalNum'] ? option['num'] / item['totalNum'] : 0 ) * 100).toFixed(2)" />
                  </div>

                </div>
              </div>

            </div>

            <div class="vc-padding--tp vc-flex--between-center">
              <div class="vp-icon__outer">
                <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="30">
                  <img :src="item['photo']" alt="" class="vp-img--max">
                  <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
                </div>
                <span class="vc-text--light">{{ item['name']}}</span>
              </div>
              <div>
                <p class="vc-text--sm vc-text--light vc-text--baseline--md">发布于{{ item['time']}}</p>
                <p class="vc-text--sm vc-text--light vc-text--baseline--md">截止于{{ item['endTime'] }}</p>
              </div>
            </div>
          </div>

        </div>
      </template>

      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
          <div class="">
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">该班级暂无PK信息~~</div>
          </div>
        </div>
      </template>

    </template>
    <template v-if="tab.active == 2 ">

      <template v-if="act.list.length > 0 ">
        <div  class=" vc-fluid--h-min vc-padding__xl-x--tp" :class="{ 'vc-padding__xl-x--bm' : userMessage['memType'] == 2 }">

          <div class="vc-bg vc-margin__lg--bm " v-for="(item,index) in act.list" :key=index>
            <router-link tag="div" :to="{name:'SubInteractionActivityDetail' ,query :{ actId:item['actId'] ,fromPage:'SubResourceDetail'} }">

              <div class="" v-if="!!item['pics']">
                <div class="vp-img__outer" >
                  <img :src="item['pics'].split(';')[0]" alt="">
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
      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
          <div class="">
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">该班级暂无通知信息~~</div>
          </div>
        </div>
      </template>

    </template>
    <template v-if="tab.active == 3 ">

      <template v-if=" photo.list.length > 0 ">

        <div  class=" vc-fluid--h-min vc-padding__xl-x--tp vc-bg" :class="{ 'vc-padding__xl-x--bm' : userMessage['memType'] == 2 }" >

          <div class="vc-padding__lg">
            <div class="vc-row" data-gutter="20">
              <router-link  tag='div' :to="{ name :'SubResourcePhotoDetail' ,query :{ photoId:item['photoId']}}"  class="vc-col--08 vc-margin--bm"  v-for="(item,k) in photo.list" :key="k" >
                <div class="vp-ratio">
                  <div class="vp-ratio__outer" data-ratio="100%">
                    <div class="vp-ratio__inner">
                      <div class="vp-img__inner vc-radius--lg vp-img--border" >
                        <img  :src="item['pic']" alt=""  @load="_pub_img_load">
                        <img src="../img/img-error.png" alt="" class="vp-img--error vp-img--half">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vc-text--center vc-text--ellipsis vc-padding--ud">
                  {{ item['photoName']}}
                </div>
              </router-link>
            </div>
          </div>

        </div>
      </template>
      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
          <div class="">
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">该班级暂无相册信息~~</div>
          </div>
        </div>
      </template>

    </template>

  </div>


</template>
<style scoped></style>
