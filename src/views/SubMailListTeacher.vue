<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  export default {
    name: "SubMailListTeacher",
    components: {},
    mixins: [ user ],
    data() {
      return {}
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        await  this.$get_student_list({ classId:this.userMessage.classId });
        console.log(this.studentList)
      }

    },
    watch: {
      '': {
        handler(val, olval) {

        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg ">



    <template v-if="studentList.length > 0">

      <router-link tag="div" :to="{ name : 'SubMailListTeacherParents' ,query :{ stuId :item['stuId'] }}" :key="index" v-for="(item,index) in studentList">
        <div class="vc-border--bm vc-padding__lg" >
          <div class="vc-flex vc-flex--between-center" >
            <span>{{ item['stuName']}}</span>
            <span>{{ item['stuSex'] | str_sex }}</span>
          </div>
        </div>
      </router-link>


    </template>

    <template v-else>
      <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
        <div class="">
          <div class="vc-text--light vc-text--center">当前班级还未有学生，去邀请吧～～</div>
        </div>
      </div>
    </template>

  </div>

</template>
<style scoped></style>
