<script type="text/ecmascript-6">
//import Header  from './components/header.vue'
//import basic  from '../Mixin/basic'\
import { VaBtnGroup } from "./component";
import interaction from "./mixin/interaction";
import { show_picture } from "../js/vue.wx";
export default {
  name: "",
  components: { VaBtnGroup },
  mixins: [interaction],
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  activated() {
    this._init_page();
  },
  props: [],
  data() {
    return {
      tab: {
        options: [
          { text: "黑板", value: "1" },
          { text: "PK", value: "2" },
          { text: "通知", value: "3" },
          { text: "留言", value: "4" }
        ],
        active: 0
      },
      params: { msg: "" }
    };
  },
  methods: {
    async _init_page() {
      if (this.tab.active == 0) {
        await this.$get_comment_list();
      } else if (this.tab.active == 1) {
        await this.$get_pk_list();
      } else if (this.tab.active == 2) {
        await this.$get_act_list();
      } else if (this.tab.active == 3) {
        await this.$get_news_list();
        /*await this.$request_check_teacher();

          if(this.userMessage['memType'] == 1){
            //await this.$request_get_news_list();
            if(this.isBanZhuRen){

             }
          }else if(this.userMessage['memType'] == 2){
            await this.$request_get_news_detail_list({liuYanId:'0'}).then(()=>{
              Scrolls.setScrollToBottom()
            })
          }*/
      }
    },

    _operate_pk(type, item, option) {
      if (type == "tp") {
        let obj = {
          pkId: item.pkId,
          viewPointId: option.optionId
        };
        this.$save_pk_vote(obj);
      }
    },
    _send_msg() {
      if (this.params.msg == "") {
        this.$createToast({
          message: "请输入留言信息!",
          duration: 2000
        }).show();
      } else {
        this.$create_news_parent(this.params).then(() => {
          this.params.msg = "";
          this.$request_get_news_detail_list({ liuYanId: "0" }, false).then(
            () => {
              Scrolls.setScrollToBottom();
            }
          );
        });
      }
    },
    _deal_all_new(item) {
      this.$dialog
        .confirm({
          title: "温馨提醒",
          message: "注意阅读信息，会不会有信息遗漏，确认全部处理？"
        })
        .then(() => {
          this.$request_deal_all_news({ liuYanId: item["liuYanId"] }).then(
            () => {
              this.$createToast({
                message: "留言信息已全部处理!",
                duration: 2000
              }).show();
              this.$request_get_news_list(false);
            }
          );
        })
        .catch(() => {});
    },

    _show_picture(pics, pic) {
      let picsArr = pics.split(",");
      show_picture(picsArr, pic);
    },
    _jump_page(item) {
      sessionStorage.setItem("liuYan-chengHu", item["chengHu"]);
      sessionStorage.setItem("liuYan-liuYanId", item["liuYanId"]);
      sessionStorage.setItem("liuYan-recId", item["memId"]);
      this.$router.push({ name: "SubInteractionWordsEdit" });
    }
  },
  watch: {
    ["tab.active"]: {
      handler(val, olval) {
        this._init_page();
      },
      deep: true
    }
  },
  destroy() {}
};
</script>
<template>
  <div class="  ">

    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row">
      <VaBtnGroup :options="tab.options" v-model="tab.active"></VaBtnGroup>
    </div>

    <template v-if=" tab.active == 0 ">
      <template v-if="userMessage['memType'] == 1">

        <template v-if="comment.list.length > 0 ">
          <div class="vc-fluid--h-min vc-padding__xl-x--ud">
            <div>
              <div class="vc-padding__lg vc-bg vc-margin--bm" v-for="(item,index) in comment.list" :key='index'>

                <router-link tag="div" :to="{ name : 'SubInteractionForumDetail' ,query:{ bbsId : item['bbsId'] } }">
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
          </div>
        </template>
        <template v-else>
          <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
            <div class="">
              <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无黑板信息，去发布吧~~</div>
            </div>
          </div>
        </template>

        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row">

            <router-link tag="div" :to="{name :'SubInteractionForumEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme  ">发布</router-link>

          </div>
        </div>
      </template>
      <template v-if="userMessage['memType'] == 2">

        <template v-if="comment.list.length > 0 ">
          <div class="vc-fluid--h-min vc-padding__xl-x--tp">
            <div>
              <div class="vc-padding__lg vc-bg vc-margin--bm" v-for="(item,index) in comment.list" :key='index'>

                <router-link tag="div" :to="{ name : 'SubInteractionForumDetail' ,query:{ bbsId : item['bbsId'] } }">
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
          </div>
        </template>
        <template v-else>

          <template v-if="userMessage['memType'] == 1">
            <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
              <div class="">
                <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无黑板信息，去发布吧~~</div>
              </div>
            </div>
          </template>
          <template v-if="userMessage['memType'] == 2">
            <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
              <div class="">
                <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无黑板信息，等待老师发布吧~~</div>
              </div>
            </div>
          </template>

        </template>
      </template>
    </template>

    <template v-if=" tab.active == 1 ">

      <template v-if="pk.list.length > 0">
        <div class="vc-fluid--h-min vc-padding__xl-x--ud">

          <router-link tag="div" :to="{ name : 'SubInteractionPKDetail',query:{ pkId:item['pkId']}}" class="vc-padding__lg vc-margin--bm vc-bg" v-for="(item,index) in pk.list" :key="index">
            <div class="vc-flex vc-items--center">
              <span class="vc-text--bold vc-text--ellipsis">话题{{ index + 1 | num_str }}：{{ item['title']}}？ </span>
              <div class="vp-btn__status vp-btn--ing vc-margin__sm--lt" v-if="item['status'] == 0">进行中</div>
              <div class="vp-btn__status vp-btn--disabled vc-margin__sm--lt" v-if="item['status'] == 1">已结束</div>
            </div>

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
                  <div class="vp-btn__oper  vp-btn--disabled vc-margin__lg--lt " v-if="item['voteSatus'] == 1 || item['status'] == 1">投票</div>
                  <div class="vp-btn__oper  vp-btn--ing vc-margin__lg--lt " v-else @click.stop="_operate_pk('tp',item,option)">投票</div>

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
          </router-link>

        </div>
      </template>

      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
          <div class="">
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无PK，去发布吧~~</div>
          </div>
        </div>
      </template>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row">
          <router-link tag="div" :to="{name :'SubInteractionPKEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme  ">发起PK</router-link>
        </div>
      </div>

    </template>

    <template v-if=" tab.active == 2 ">

      <template v-if="act.list.length > 0 ">
        <div class="vc-fluid--h-min vc-padding__xl-x--tp" :class="{'vc-padding__xl-x--bm':userMessage['memType'] == 1}">

          <div class="vc-bg vc-margin__lg--bm " v-for="(item,index) in act.list" :key=index>
            <router-link tag="div" :to="{name:'SubInteractionActivityDetail' ,query :{ actId:item['actId']} }">

              <div class="" v-if="!!item['pics'] && item['pics'].split(';')[0]">
                <div class="vp-img__outer">
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
        <template v-if="userMessage['memType'] == 1">
          <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
            <div class="">
              <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无通知，去发布吧~~</div>
            </div>
          </div>
        </template>
        <template v-if="userMessage['memType'] == 2">
          <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center">
            <div class="">
              <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无通知，等待老师发布吧~~</div>
            </div>
          </div>
        </template>

      </template>

      <template v-if="userMessage['memType'] == 1">
        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row">

            <router-link tag="div" :to="{name :'SubInteractionActivityEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme  ">发起通知</router-link>

          </div>
        </div>
      </template>

    </template>

    <template v-if=" tab.active == 3 ">
      <template v-if="news.list.length > 0 ">
        <div class="vc-fluid--h-min vc-padding__xl-x--ud">
          <div class="">
            <div class="vc-bg vc-margin--bm" v-for="(item,index) in news.list" :key='index'>
              <div class="vc-padding__lg vc-flex " @click="_jump_page(item)">
                <div class="vp-badge vc-margin--rt">
                  <div class="vp-img__inner vp-img__head  " data-round="35">
                    <img :src="item['photo']" alt="" class="vp-img--max">
                    <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
                  </div>
                  <div class="vp-badge__spot" v-if="item['cnt'] > 0 "></div>
                </div>

                <div class="vc-flex--fit vc-padding--tp">
                  <div class="vc-flex--between-center">
                    <span class="vc-text--bold">{{ item['chengHu']}}</span>
                    <span class="vc-text--gray">{{ item['time']}}</span>
                  </div>
                  <div class="vc-text--light vc-text--baseline--md vc-padding--tp">
                    {{ item['lastMsg']}}
                  </div>
                </div>
              </div>

              <!--<div class="vc-padding&#45;&#45;ud vc-padding__lg&#45;&#45;ad">
              <div class="vc-flex vc-content&#45;&#45;end">
                <div class="vp-btn__oper vp-btn&#45;&#45;ing vc-margin&#45;&#45;lt" v-if="item['cnt'] >  0" @click="_deal_all_new(item)">全部处理</div>
                <div class="vp-btn__oper vp-btn&#45;&#45;disabled vc-margin&#45;&#45;lt" v-else>全部已处理</div>
              </div>
            </div>-->

            </div>

          </div>
        </div>
      </template>

      <template v-else>
        <div class=" vc-padding__lg--ad   vc-bg vc-fluid vc-flex--center">
          <div class="">
            <div class="vc-text--light vc-text--center">还没有留言信息，去留言吧~~</div>
          </div>
        </div>
      </template>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row">

          <router-link tag="div" :to="{name :'SubMailListTeacher'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme  " v-if="userMessage['memType'] == 1">通讯录</router-link>
          <router-link tag="div" :to="{name :'SubMailList'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme" v-if="userMessage['memType'] == 2">通讯录</router-link>

        </div>
      </div>
    </template>
  </div>
</template>
<style scoped></style>
