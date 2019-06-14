<script type="text/ecmascript-6">
//import Header  from './components/header.vue'
//import basic  from '../Mixin/basic'\
//import { VaPopupRadio }  from './component'
import wx from "weixin-js-sdk";
import basic from "./mixin/basic";
import interaction from "./mixin/interaction";
export default {
  name: "",
  components: {},
  mixins: [basic, interaction],
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
  mounted() {
    this._init_page();
  },
  activated() {},
  props: [],
  data() {
    return {
      params: {
        actId: "",
        type: "insert",
        title: "",
        content: "",
        images: [],
        pics: "",
        showPic: "",
        startTime: "",
        endTime: "",
        timeType: "",
        imagesMaxLen: 9
      }
    };
  },
  methods: {
    async _init_page() {
      this.params.actId = this.$route.query["actId"];
      this.params.type = this.$route.query["type"] || "insert";
      if (this.params.type == "update") {
        this.$get_act_detail(this.params).then(response => {
          let detail = response["data"];
          this.params["title"] = detail["title"];
          this.params["content"] = detail["content"];
          this.params["images"] = detail["pics"] && detail["pics"].split(";");
          this.params["startTime"] = detail["startTime"]
            ? detail["startTime"].split(" ")[0]
            : "";
          this.params["endTime"] = detail["endTime"]
            ? detail["endTime"].split(" ")[0]
            : "";
        });
      }
    },
    _save_activity() {
      let message = this._validate_params(this.params);
      this.params.pics = this.params.images.join(';');
      if (message == "yes") {
        if (this.params.type == "insert") {
          this.$add_act(this.params).then(() => {
            setTimeout(() => {
              this.$router.go(-1);
              this.$destroy();
            }, 800);
          });
        } else if (this.params.type == "update") {
          this.$update_act(this.params).then(() => {
            setTimeout(() => {
              this.$router.go(-1);
              this.$destroy();
            }, 800);
          });
        }
      } else {
        this.$createToast({ message: message, duration: 2000 }).show();
      }
    },

    _validate_params(params) {
      if (params.title == "") {
        return "请输入通知名称!";
      }
      if (params.content == "") {
        return "请输入通知内容!";
      }

      if (params.startTime == "") {
        return "请选择开始日期!";
      }

      if (params.endTime == "") {
        return "请选择结束日期!";
      }

      /* if(params.pic == ''){
          return '请选择通知主图!' //不限制图片是必填项的
        }*/
      return "yes";
    },

    _select_time_popup(type) {
      this.popup.show = true;
      this.params.timeType = type;
    },

    // 选择图片
    _select_pic2() {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

          wx.uploadImage({
            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: res => {
              let serverId = res.serverId; // 返回图片的服务器端ID
              this.$upload_picture_wx({ mediaId: serverId }).then(res => {
                this.params.pic = res["data"];
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
        fail: res => {
          this.$createToast({
            message: "选择图片失败!",
            duration: 2000
          }).show();
        }
      });
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

    _del_pic(index) {
      this.params.images.splice(index, 1);
    },

    _picker_confirm(val) {
      this.params[this.params.timeType] = Dates.format(val, "yyyy-MM-dd");
      if (
        +new Date(this.params["startTime"]) > +new Date(this.params["endTime"])
      ) {
        this.$toast("开始日期不能大于结束日期！");
        if (this.params.timeType == "startTime") {
          this.params["startTime"] = "";
        } else if (this.params.timeType == "endTime") {
          this.params["endTime"] = "";
        }
      } else {
        this.popup.show = false;
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
  <div class="vc-padding__xl-x--bm vc-fluid--h-min vc-bg">

    <van-popup v-model="popup.show" position="bottom">
      <van-datetime-picker type="date" @cancel="popup.show = false" @confirm="_picker_confirm" :min-date="new Date()" :formatter="_picker_formatter" />
    </van-popup>

    <div class="vc-padding__lg">
      <div class="">
        <div class="vc-text--bold">通知主题</div>
        <div class="vp-textarea vc-margin--tp">
          <div class="vp-textarea__clear">
            <i class="iconfont icon-delete vc-text--light" v-if="!!params.title" @click="params.title=''"></i>
          </div>
          <textarea type="text" placeholder="请输入通知主题" class=" vp-textarea__inner vp-textarea--theme" rows="2" v-model="params.title"></textarea>
          <!-- <span class="vp-textarea__count vc-text--gray">{{ params['title'] ? params['title'].length : 0  }}/40</span> -->

        </div>
      </div>

      <div class="vc-margin__lg--tp">
        <div class="vc-text--bold">通知内容</div>
        <div class="vp-textarea vc-margin--tp">
          <div class="vp-textarea__clear">
            <i class="iconfont icon-delete vc-text--light" v-if="!!params.content" @click="params.content=''"></i>
          </div>
          <textarea type="text" placeholder="请输入通知内容" class=" vp-textarea__inner vp-textarea--theme" rows="6" v-model="params.content"></textarea>
          <!-- <span class="vp-textarea__count vc-text--gray">{{ params['content'] ? params['content'].length : 0  }}/200</span> -->
        </div>
      </div>

      <div class="vc-margin__lg--tp">
        <div class="vc-text--bold">有效日期</div>
        <div class="vc-row vc-margin--tp" data-gutter="10">
          <div class="vc-col--12">
            <div class="vp-input  " @click="_select_time_popup('startTime')">
              <input type="text" placeholder="请选择开始时间" class="vp-input__inner" readonly v-model="params['startTime']">
            </div>
          </div>
          <div class="vc-col--12">
            <div class="vp-input  " @click="_select_time_popup('endTime')">
              <input type="text" placeholder="请选择结束时间" class="vp-input__inner" readonly v-model="params['endTime']">
            </div>
          </div>
        </div>
      </div>

      <div class="vc-margin__lg--tp">
        <div class="vc-text--bold">图片</div>
        <div class="vc-margin--tp">
          <div class="vc-row" data-gutter="10">

            <template v-if="params.imagesMaxLen != params.images.length">
              <div class="vc-col--06 vc-padding--bm">
                <div class="vp-ratio">
                  <div class="vp-ratio__outer" data-ratio="100%">
                    <div class="vp-ratio__inner vp-img__inner" @click="_select_file">
                      <img src="../img/icon-img-upload.png" alt="" class="vp-img--max">
                    </div>
                    <!--<div class="vp-ratio__inner vp-input&#45;&#45;file">
                      <input type="file" id="file" @change="_select_file" accept="image/*" multiple>
                      <label for="file"></label>
                    </div>-->

                  </div>
                </div>
              </div>
            </template>

            <template>
              <div class="vc-col--06 vc-padding--bm" v-for='(image,index) in params.images' :key='index'>
                <div class="vp-ratio">
                  <div class="vp-ratio__outer" data-ratio="100%">
                    <div class="vp-ratio__inner">

                      <div class="vp-img__inner  ">
                        <img :src="image" alt="" class="vp-img--max">
                      </div>
                      <div class="vp-img__close" @click="_del_pic(index)"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row">
        <div class=" vp-btn__simple vp-btn--white " @click="_save_activity">保存</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>

