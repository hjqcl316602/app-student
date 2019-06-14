<script type="text/ecmascript-6">
//import { VaPopupRadio }  from './component'
import interaction from "./mixin/interaction";
import { show_picture } from "../js/vue.wx";
export default {
  name: "SubInteractionActivityDetail",
  components: {},
  mixins: [interaction],
  data() {
    return {
      params: { actId: "",fromPage:'' }
    };
  },
  mounted() {},
  activated() {
    this._init_page();
  },
  methods: {
    async _init_page() {
      this.params.actId = this.$route.query["actId"];
      this.params.fromPage = this.$route.query["fromPage"]; // 判断页面从哪个页面过来
      await this.$get_act_detail(this.params);
    },
    _del_act() {
      this.$dialog
        .confirm({
          title: "确认信息",
          message: "是否确定删除通知【" + this.act.detail["title"] + "】？"
        })
        .then(() => {
          this.$delete_act(this.params).then(() => {
            this.$createToast({
              message: "通知删除成功!",
              duration: 2000
            }).show();
            setTimeout(() => {
              this.$router.go(-1);
              this.$destroy();
            }, 800);
          });
        });
    },
    _edit_act() {
      this.$router.push({
        name: "SubInteractionActivityEdit",
        query: { type: "update", actId: this.params.actId }
      });
    },
    _show_picture(pics, pic) {
      show_picture(pics, pic);
    },
  }
};
</script>
<template>

  <div>
    <template v-if="act.detail['editFlag'] == 1 && params.fromPage != 'SubResourceDetail' ">
      <div class="vc-fluid--h-min vc-padding__xl-x--bm vc-bg">
        <div class="vc-padding__lg  ">

          <div class="vc-margin__lg--bm" v-if="act.detail['title']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">主题</div>
            <div class="vc-text--baseline--md">{{ act.detail['title']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['content']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">内容</div>
            <div class="vc-text--baseline--md">{{ act.detail['content']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['startTime']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">有效日期</div>
            <div class="vc-text--baseline--md">{{ act.detail['startTime']}} 至 {{ act.detail['endTime']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['name']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">发起人</div>
            <div class="vc-text--baseline--md">{{ act.detail['name']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['pics']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">图片</div>
            <div class="vc-row" data-gutter='10'>
              <div class="vc-col--06 vc-margin--bm" v-for="(item,index) in act.detail['pics'].split(';')" :key=index>
                <div class="vp-ratio">
                  <div class="vp-ratio__outer" data-ratio=100%>
                    <div class='vp-ratio__inner vp-img__inner' @click="_show_picture(act.detail['pics'].split(';'),item)">
                      <img :src="item" alt="" class='vp-img--max'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="vp-footer vp-footer--shadow">
            <div class="vc-flex vp-row">

              <div class="vc-flex--aut   vp-btn__simple vp-btn--danger" @click="_del_act">删除</div>
              <div class="vc-flex--aut   vp-btn__simple vp-btn--theme" @click="_edit_act">编辑</div>

            </div>
          </div>

        </div>
      </div>

    </template>
    <template v-else>
      <div class="vc-fluid--h-min vc-bg">
        <div class="vc-padding__lg  ">

          <div class="vc-margin__lg--bm" v-if="act.detail['title']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">主题</div>
            <div class="vc-text--baseline--md">{{ act.detail['title']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['content']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">内容</div>
            <div class="vc-text--baseline--md">{{ act.detail['content']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['startTime']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">有效日期</div>
            <div class="vc-text--baseline--md">{{ act.detail['startTime']}} 至 {{ act.detail['endTime']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['name']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">发起人</div>
            <div class="vc-text--baseline--md">{{ act.detail['name']}}</div>
          </div>

          <div class="vc-margin__lg--bm" v-if="act.detail['pics']">
            <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">图片</div>
            <div class="vc-row" data-gutter='10'>
              <div class="vc-col--06 vc-margin--bm" v-for="(item,index) in act.detail['pics'].split(';')" :key=index>
                <div class="vp-ratio">
                  <div class="vp-ratio__outer" data-ratio=100%>
                    <div class='vp-ratio__inner vp-img__inner' @click="_show_picture(act.detail['pics'].split(';'),item)">
                      <img :src="item" alt="" class='vp-img--max'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </template>
  </div>

</template>
<style scoped></style>
