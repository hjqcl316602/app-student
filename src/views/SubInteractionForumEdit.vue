<script type="text/ecmascript-6">
//import Header  from './components/header.vue'
//import basic  from '../Mixin/basic'\
//import { VaPopupRadio }  from './component'
import wx from "weixin-js-sdk";
import basic from "./mixin/basic";
import interaction from "./mixin/interaction";
import bbs from "./mixin/bbs";
export default {
  name: "",
  components: {},
  mixins: [basic, interaction, bbs],
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
      params: {
        type: "insert",
        title:'',
        bbsId: "",
        content: "",
        linkUrl:'',
        pics: "",
        images: [ ],
        imagesMaxLen: 9
      }
    };
  },
  methods: {
    async _init_page() {
      this.params.type = this.$route.query["type"] || "insert";
      if (this.params.type == "update") {
        this.params.bbsId = this.$route.query["bbsId"];
        this.$get_bbs_detail(this.params).then(response => {
          let detail = response["data"];
          this.params.content = detail["content"];
          this.params.title = detail["title"];
          this.params.linkUrl = detail["linkUrl"];
          this.params.images = detail["pics"] ? detail["pics"].split(",") : [];
        });
      }
    },
    _save_timetable() {},
    _del_pic(index) {
      this.params.images.splice(index, 1);
    },

    _select_file() {
      let _this = this;
      wx.chooseImage({
        count: this.params.imagesMaxLen - this.params.images.length, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          this._upload_file(localIds);
        },
        fail: res => {
          this.$createToast({
            message: "选择图片失败!",
            duration: 2000
          }).show();
        }
      });
    },
    _upload_file(localIds) {
      let localId = localIds.pop(); // 得到数组的最后一条
      let toast = this.$toast.loading({
        mask: true,
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "circular",
        message: "上传中..."
      });
      wx.uploadImage({
        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: res => {
          let serverId = res.serverId; // 返回图片的服务器端ID
          this.$upload_picture_wx({ mediaId: serverId }, false).then(res => {
            this.params.images.unshift(res["data"]);
            if (localIds.length > 0) {
              this._upload_file(localIds);
            } else {
              toast.clear();
            }
          });
        },
        fail: () => {
          this.$createToast({
            message: "图片上传失败!",
            duration: 2000
          }).show();
        }
      });
    },

    _save_comment() {
      let obj = {};
      obj["title"] = this.params.title;
      obj["content"] = this.params.content;
      obj["bbsId"] = this.params.bbsId;
      obj["linkUrl"] = this.params.linkUrl;
      obj["pics"] = this.params.images.join(",");

      if (obj["content"] == "") {
        this.$createToast({
          message: "请输入您的新鲜事!",
          duration: 2000
        }).show();
      } else {
        this.$dialog
          .confirm({
            title: "确认信息",
            message: "是否确定保存黑板信息？"
          })
          .then(() => {
            if (this.params.type == "insert") {
              this.$save_comment(obj).then(() => {
                this.$createToast({
                  message: "黑板保存成功!",
                  duration: 2000
                }).show();
                setTimeout(() => {
                  this.$router.go(-1);
                  this.$destroy();
                }, 800);
              });
            } else {
              this.$update_bbs(obj).then(() => {
                this.$createToast({
                  message: "黑板保存成功!",
                  duration: 2000
                }).show();
                setTimeout(() => {
                  this.$router.go(-1);
                  this.$destroy();
                }, 800);
              });
            }
          });
      }
    }
  },
  watch: {
    /*'': {handler(val, olval){}, deep: true ,immediate:true}  */
  },
  destroy() {}
};
</script>
<template>
  <div class="vc-fluid--h-min vc-padding__xl-x--bm vc-bg">
    <div class="vc-padding__lg">

      <div class="vc-margin--bm">
        <div class="vp-textarea">

          <div class="vp-textarea__clear">
            <i class="iconfont icon-delete vc-text--light" v-if="!!params.title" @click="params.title=''"></i>
          </div>
          <textarea type="text" placeholder="请输入标题..." class=" vp-textarea__inner vp-textarea--theme" rows="3" v-model="params.title"></textarea>

        </div>
      </div>
      <div class="vc-margin--bm">
        <div class="vp-textarea">
          <div class="vp-textarea__clear">
            <i class="iconfont icon-delete vc-text--light" v-if="!!params.content" @click="params.content=''"></i>
          </div>
          <textarea type="text" placeholder="请输入内容..." class=" vp-textarea__inner vp-textarea--theme" rows="8" v-model="params.content"></textarea>
          <!--<span class="vp-textarea__count vc-text&#45;&#45;gray">{{ params.content ? params.content.length : 0  }}/200</span>-->
        </div>
      </div>

      <div class="vc-margin--bm">
        <div class="vp-input">
          <div class="vp-input__clear">
            <i class="iconfont icon-delete vc-text--light" v-if="!!params.linkUrl" @click="params.linkUrl=''"></i>
          </div>
          <input type="text" class="vp-input__inner vp-input__text--left" v-model="params.linkUrl" placeholder="请输入外链接...">

        </div>
      </div>

      <div class="vc-margin__lg--tp">
        <div class="vc-row" data-gutter="10">

          <div class="vc-col--06 vc-padding--bm" v-if="params.imagesMaxLen != params.images.length">
            <div class="vp-ratio">
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner vp-img__inner" @click="_select_file">
                  <img src="../img/icon-img-upload.png" alt="" class="vp-img--max">
                </div>
                <!--<div class="vp-ratio__inner" @click="_select_pic">
                  <div class="vp-img__inner  " >
                    <img src="../img/icon-img-upload.png" alt="" class="vp-img&#45;&#45;max">
                  </div>
                </div>-->
              </div>
            </div>
          </div>

          <div class="vc-col--06 vc-padding--bm" v-for="(item,index) in  params.images">
            <div class="vp-ratio">
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner">

                  <div class="vp-img__inner  ">
                    <img :src="item " alt="" @load="_pub_img_load">
                  </div>

                  <div class="vp-img__close" @click="_del_pic(index)"></div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row">
        <div class=" vp-btn__simple vp-btn--white " @click="_save_comment">保存</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
