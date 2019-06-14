<script type="text/ecmascript-6">
  import user  from './mixin/user'
  export default {
    name: "SubUserClassParentTeachers",
    mixins: [ user ],
    mounted() {

    },

    props: {},
    data() {
      return {
        params:{ classId:'',detail:{}}
      }
    },
    activated() {
      this._init_page();
    },
    methods: {
      _init_page() {
        this.params.classId = this.$route.query['classId'];
        this.params.detail = sessionStorage.getItem('detail-class-parent') ? JSON.parse( sessionStorage.getItem('detail-class-parent') ) : {} ;
        this.$get_student_teachers(this.params)
      },
      _to_phone(mobile){
        window.location.href = `tel://${mobile}`;
      },


    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div>
    <div class="vc-padding__lg vc-bg vc-margin--bm">
      <div class="vc-text--bold vc-margin--bm">班级信息</div>
      <div class="">
        <div class="vc-padding__md-lg--ud vc-border--bm vc-flex vc-items--center">
          <span>班级logo：</span>
          <div class="vp-img__inner vp-img__head vc-margin--rt" data-square="80" >
            <img :src="params.detail.classPic" alt="" @load="_pub_img_load">
            <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--cover">
          </div>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>班级名称：</span>
          <span class="vc-text--light">{{ params.detail['classType']}}·{{ params.detail['className']}}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>孩子性别：</span>
          <span class="vc-text--light">{{ params.detail['stuSex'] | str_sex }}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>与孩子关系：</span>
          <span class="vc-text--light">{{ params.detail['chengHu'] }}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>学校名称：</span>
          <span class="vc-text--light">{{ params.detail['schoolName'] }}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>学校地址：</span>
          <span class="vc-text--light"> {{ params.detail['areaName'] }}</span>
        </div>
      </div>
    </div>

    <div class="vc-padding__lg vc-bg" v-if="teachers.list.length > 0">
      <div class="vc-text--bold vc-margin--bm">老师信息</div>
      <div class="vc-padding__md-lg--ud vc-bg vc-border--bm vc-flex--between-center" v-for="(item,index) in teachers.list">
        <span class="">{{ item['name'] }}</span>
        <span class="vc-text--theme" @click="_to_phone(item['mobile'])">{{ item['mobile'] }}</span>
      </div>
    </div>


    <!--<template v-if="teachers.list.length > 0">
      <div class="">
        <div class="vc-padding__lg vc-bg vc-margin&#45;&#45;bm vc-flex&#45;&#45;between-center" v-for="(item,index) in teachers.list">
          <span class="vc-text&#45;&#45;bold">{{ item['name'] }}</span>
          <span class="vc-text&#45;&#45;theme" @click="_to_phone(item['mobile'])">{{ item['mobile'] }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class=" vc-padding__lg&#45;&#45;ad vc-padding__xl-x&#45;&#45;ud vc-bg vc-fluid vc-flex&#45;&#45;center" >
        <div class="" >
          <div class="vc-text&#45;&#45;light vc-text&#45;&#45;center">该班级还未有老师加入哦～～</div>
        </div>
      </div>
    </template>-->
  </div>
</template>
<style scoped></style>
