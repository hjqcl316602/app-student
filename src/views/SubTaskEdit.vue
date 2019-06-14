<script type="text/ecmascript-6">
//import Header  from './components/header.vue'
import basic from "./mixin/basic";
import task from "./mixin/task";
import { VaPopupRadio } from "./component";
export default {
  name: "",
  components: { VaPopupRadio },
  mixins: [basic, task],
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
      task: {
        params: [],
        active: 0
      }
    };
  },
  methods: {
    async _init_page() {
      let taskDoneInfoToday = sessionStorage.getItem("taskDoneInfoToday");

      let task = JSON.parse(taskDoneInfoToday);
      this.task.params = task.detail
        ? JSON.parse(task.detail)
        : [{ title: "", content: "" }];

      this.$get_lesson_type_list();
    },
    _add_task() {
      this.task.params.push({ title: "", content: "" });
    },
    _del_task(index) {
      this.task.params.splice(index, 1);

      if (this.task.params.length > 1) {
      }
    },
    _save_task() {
      let empty = this._validate_params();
      if (empty.length == 0) {
        this.$dialog
          .confirm({
            message: "是否确认创建作业？"
          })
          .then(() => {
            this.$save_task({ jsonDetail: this.task.params }).then(() => {
              this.$createToast({
                message: "保存作业成功!",
                duration: 2000
              }).show();
              setTimeout(() => {
                this.$destroy();
                this.$router.go(-1);
              }, 800);
            });
          })
          .catch(() => {});
      } else {
        this.$createToast({
          message: "请选择课程或作业信息!",
          duration: 2000
        }).show();
      }
    },

    _validate_params() {
      return Arrays.filter(this.task.params, function(item) {
        return (
          Valids.isEmptyString(item.title) || Valids.isEmptyString(item.content)
        );
      });
    },

    _select_class_open(index) {
      this.task.active = index;
      this.popup.show = true;
    },
    _select_class(item) {
      this.task.params[this.task.active]["title"] = item["text"];
    }
  },
  watch: {
    /*'': {handler(val, olval){}, deep: true ,immediate:true}  */
  },
  destroy() {}
};
</script>
<template>
  <div class="vc-padding__xl-x--bm vc-fluid--h-min">

    <van-popup position="bottom" v-model="popup.show">
      <div class="">

        <div class="vp-header vp-header--shadow vc-padding__lg--ad vc-padding--ud vc-bg">
          <div class="vp-input">
            <input type="text" v-model="task.params[task.active]['title']" placeholder="请输入课程类型或选择课程类型" class="vp-input__inner" maxlength="20">
          </div>
        </div>

        <div class="vc-fluid vc-padding__xl-x--bm vc-padding__xl-xx--tp  vc-bg vc-flow">
          <div class="">
            <div class="vp-row vc-flex--center vc-text--light vc-text--lg vc-border--bm" v-for="(item,index) in lessonTypeList" @click="task.params[task.active]['title'] = item.text">{{ item.text }}</div>
          </div>
        </div>

        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row">
            <div class=" vp-btn__simple vp-btn--white " @click="popup.show = false">返回</div>
          </div>
        </div>

      </div>
    </van-popup>

    <!--<VaPopupRadio :options="lessonTypeList" v-model="popup.show" @select="_select_class"></VaPopupRadio>-->

    <div class="vc-bg vc-padding__lg ">
      <div class="vc-flex vc-content--between vc-items--center vc-margin__lg--bm" v-for="(item,index) in task.params">
        <div class="vc-flex--fit">
          <div class="vc-margin--bm">
            <div class="vp-row--sm vc-bor--theme-light vc-bg--theme--gray vc-radius ">
              <div class="vc-cover vc-padding--ad vc-flex vc-items--center vc-content--between" @click="_select_class_open(index)">
                <span class="vc-text--bold vc-text--gray" v-if="!item.title">请添加课程</span>
                <span class="vc-text--bold " v-if="!!item.title">{{ item.title }}</span>
                <i class="iconfont icon-iconfontjiantou2 vc-text--bold vc-text--gray"></i>
              </div>
            </div>
          </div>
          <div class="vp-textarea">
            <div class="vp-textarea__clear">
              <i class="iconfont icon-delete vc-text--light" v-if="!!item.content" @click="item.content=''"></i>
            </div>
            <textarea type="text" placeholder="请输入您的作业信息" class=" vp-textarea__inner vp-textarea--theme" rows="6" v-model="item['content']"></textarea>
            <!-- <span class="vp-textarea__count vc-text--gray">{{ item['content'] ? item['content'].length : 0  }}/200</span> -->
          </div>

        </div>
        <div class="vp-icon__cancel vc-margin--lt" v-if="task.params.length > 1" @click="_del_task(index)"></div>
      </div>

      <!--<div class="vp-btn__submit  vp-btn&#45;&#45;danger " @click="_del_task(index)"> 删除此条</div>-->
      <!--v-if="index == ( task.params.length - 1 )"-->
      <div class="vp-btn__submit  vp-btn--theme vc-margin--tp" @click="_add_task"> 添加新作业</div>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row">
        <div class=" vp-btn__simple vp-btn--white " @click="_save_task">保存</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
