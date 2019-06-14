<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import task  from './mixin/task'
  export default {
    name: "SubTaskDetail",
    components: {},
    mixins: [task],
    data() {
      return {
        task:{
          detail:{}
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
        this.task.detail = JSON.parse( sessionStorage.getItem('taskDetailInfo') );
        this.$get_task_statics_detail({ jobId:this.task.detail['jobId']})
      }

    },
  }
</script>
<template>
<div>
  <template v-if="task_statics.list.length > 0">
    <div class="vc-fluid--h-min vc-padding__xl-x--tp vc-bg">
      <!--<div class="vc-row">
        <div class="vc-col&#45;&#45;24 vc-padding__lg vc-border&#45;&#45;bm">
          <div class="vc-text&#45;&#45;bold">{{ task.detail['title']}}</div>
        </div>
      </div>-->

      <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row" >
        <span class="vc-text--white vc-text--bold vc-text--lg">{{ task.detail['title']}}</span>
      </div>

      <div class="vc-row vc-flex">
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <div class="vc-text--bold vc-text--light">姓名</div>
        </div>
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <div class="vc-text--bold vc-text--light">完成</div>
        </div>
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <div class="vc-text--bold vc-text--light">耗时</div>
        </div>
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <div class="vc-text--bold vc-text--light">成绩</div>
        </div>
      </div>

      <div class="vc-row vc-flex" v-for="(item,index) in task_statics.list">
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <div class="vc-text--light">{{ item['stuName']}}</div>
        </div>
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <i class="vp-icon__good" v-if="item['complete'] == 1"></i>
          <i class="vp-icon__bad" v-else></i>
        </div>
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <div class="vc-text--light">{{ item['time']}}</div>
        </div>
        <div class="vc-col--06 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
          <div class="vc-text--light">{{item['cj']}}</div>
        </div>
      </div>

    </div>
  </template>
  <template v-else>
    <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
      <div class="" >
        <div class="vc-text--light vc-text--center">暂无作业统计信息～～</div>
      </div>
    </div>
  </template>
</div>

</template>
<style scoped></style>
