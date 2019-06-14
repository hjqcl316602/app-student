<script type="text/ecmascript-6">
  import user  from './mixin/user'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: {},
    mixins: [ user,classes ],
    beforeRouteEnter(to, from, next) {
      next(vm => {
      })
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {

    },
    mounted() {

    },
    activated() {
      this._init_page();
    },
    props: [],
    data() {
      return {
        classes:{
          classId:'',
          detail:{}
        }
      }
    },
    methods: {
      async _init_page() {
        this.classes.classId = this.$route.query['classId'];
        this.classes.detail = sessionStorage.getItem('detail-class-teacher') ? JSON.parse( sessionStorage.getItem('detail-class-teacher') ) : {} ;
        await  this.$get_student_list({ classId:this.classes.classId });
        //await  this.$get_student_teachers({ classId : this.classes.classId });
      },
      _delete_student(item){
        this.$dialog.confirm({
          title:'确认信息',
          message:'是否确认删除学生【'+item['stuName']+ '】?'
        }).then(()=>{
          this.$delete_teacher_student({ stuId:item['stuId']}).then(()=>{

            this.$get_student_list({ classId:this.classes.classId })
          })
        })
      },
      // 删除老师 - 需要判断是否是班长任 - 并判断是否是自己
      _delete_teacher(item){

        if(item['deleteFlag'] == 0){
          this.$dialog.alert({
            title:'错误提示',
            message: '不是班主任或当前身份不能进行删除！'
          })
        }else{
          this.$dialog.confirm({
            title:'确认信息',
            message:'是否确认删除老师【'+item['teacherName']+ '】?'
          }).then(()=>{
            this.$delete_teacher({ classId: this.classes.classId ,teacherId: item['teacherId'] }).then(()=>{
              this.$get_student_list({ classId:this.classes.classId })
            })
          });
        }
      }
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
            <img :src="classes.detail.classPic" alt="" @load="_pub_img_load">
            <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--cover">
          </div>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>班级名称：</span>
          <span class="vc-text--light">{{ classes.detail['classType']}}·{{ classes.detail['className']}}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>班级人数：</span>
          <span class="vc-text--light">{{ classes.detail['stuNum']  }}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>任教科目：</span>
          <span class="vc-text--light">{{ classes.detail['teacherType'] }}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>学校名称：</span>
          <span class="vc-text--light">{{ classes.detail['schoolName'] }}</span>
        </div>
        <div class="vc-padding__md-lg--ud vc-border--bm">
          <span>学校地址：</span>
          <span class="vc-text--light"> {{ classes.detail['areaName'] }}</span>
        </div>
      </div>
    </div>

    <div class="vc-padding__lg--ud vc-bg vc-margin--bm" v-if="studentList.length > 0">
      <div class="vc-padding__lg--ad vc-text--bold vc-margin--bm">学生列表</div>
      <van-cell-swipe :right-width="100" v-for="(item,index) in studentList"  :key="index">
        <router-link tag="div" :to="{ name : 'SubUserClassMemberParents',query:{ stuId:item['stuId']}}"  :key="index">
          <div class="vc-padding__lg--ad  " >
            <div class="vc-border--bm vc-flex--between-center vc-padding__md-lg--ud">
              <div class="">{{ item['stuName']}}</div>
              <div>{{ item['stuSex'] | str_sex}}</div>
            </div>
          </div>
        </router-link>
        <div slot="right" style="width: 100px" class="vp-btn__simple vp-btn--danger" @click="_delete_student(item)">删除</div>
      </van-cell-swipe>
    </div>

    <div class="vc-padding__lg--ud vc-bg vc-margin--bm" v-if="teachers.list.length > 0">
      <div class="vc-padding__lg--ad vc-text--bold vc-margin--bm">老师列表</div>
      <van-cell-swipe :right-width="100" v-for="(item,index) in teachers.list"  :key="index">
        <div class="vc-padding__lg--ad  " >
          <div class="vc-border--bm vc-flex--between-center vc-padding__md-lg--ud">
            <div class="">{{ item['teacherName']}}</div>
            <div class="">{{ item['teacherType']}}</div>
          </div>
        </div>
        <div slot="right" style="width: 100px" class="vp-btn__simple vp-btn--danger" @click="_delete_teacher(item)">删除</div>
      </van-cell-swipe>
    </div>



  </div>
</template>
<style scoped></style>
