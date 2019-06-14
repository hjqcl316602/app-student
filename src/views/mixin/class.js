export default {
  data() {
    return {
      classes: {
        name: '',
        type: ''
      },
      student: {
        name: ''
      },
      rules:{
        detail:[]
      },
      disc:{
        list:[],
        reportList:[],
        labels:{
          praise:[],
          critic:[]
        }
      },

    }
  },
  methods: {
    /****************************************************************** 老师端 ******************************************************************/
    // 老师进行学生的删除
    $delete_teacher_student(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/teacher/deleteStudent.do',
          loading: loading,
          data: {
            stuId:params.stuId,
          }
        }).then((response) => {
          this.$createToast({message:'删除学生成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'删除学生失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 老师进行老师的删除
    $delete_teacher(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/class/deleteTeacher.do',
          loading: loading,
          data: {
            classId:params.classId,
            teacherId:params.teacherId
          }
        }).then((response) => {
          this.$createToast({message:'删除老师成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'删除老师失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 修改老师的科目类型
    $update_teacher_type(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/teacher/editTeacherType.do',
          loading: loading,
          data: {
            classId:params.classId,
            teacherType:params.teacherType
          }
        }).then((response) => {
          this.$createToast({message:'修改老师的科目类型成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'修改老师的科目类型失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 创建班级
    $create_teacher_class(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/teacher/createClass.do',
          loading: loading,
          data: {
            area: params.area,
            schoolName: params.schoolName,
            classType: params.classType,
            className: params.className,
            teacherType: params.teacherType,
            classPic:params.classPic
          }
        }).then((response) => {
          this.$createToast({message:'创建班级成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'创建班级失败!',duration:2000}).show();
          reject(error)
        })
      })
    },



    // 加入班级
    $join_teacher_class(params, loading = true) {

      return new Promise((resovle, reject) => {

        this.$request({
          url: '/teacher/joinClass.do',
          loading: loading,
          data: {
            classId: params.classId,
            teacherType: params.teacherType,
          }
        }).then((response) => {
          this.$createToast({message:'加入班级成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'加入班级失败!',duration:2000}).show();
          reject(error)
        })
      })
    },



    //获取纪律 - 学生列表
    $get_disc_student_list(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jl/list.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          let list = response['data'];
          list.forEach((item)=>{ item['active'] = false });
          this.disc.list = list
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取纪律列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //表扬学生
    $update_express_praise(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jl/updateGood.do',
          loading: loading,
          data:{
            stuIds:params.stuIds,
            stuNames:params.stuNames,
            good:params.good,
            remark:params.remark,
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'表扬学生失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //批评学生
    $update_express_critic(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jl/updateBad.do',
          loading: loading,
          data:{
            stuIds:params.stuIds,
            stuNames:params.stuNames,
            bad:params.bad,
            remark:params.remark,
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'批评学生失败!',duration:2000}).show();
          reject(error)
        })
      })
    },


    /****************************************************************** 家长端 ******************************************************************/
    // 创建班级
    $add_class(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/parent/createClass.do',
          loading: loading,
          data: {
            area: params.area,
            schoolName: params.schoolName,
            classType: params.classType,
            className: params.className,
            childName: params.childName,
            childSex: params.childSex,
            chengHu: params.chengHu,
            classPic:params.classPic
          }
        }).then((response) => {
          this.$createToast({message:'班级创建成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'班级创建失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 加入班级
    $join_class(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/parent/joinClass.do',
          loading: loading,
          data: {
            classId: params.classId,
            stuId: params.stuId,
            childName: params.childName,
            childSex: params.childSex,
            chengHu: params.chengHu,
          }
        }).then((response) => {
          this.$createToast({message:'加入班级成功!',duration:2000 }).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'加入班级失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //  家人加入关注孩子
    $join_class_family(params, loading = true) {
      console.log(params)
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/parent/focusStu.do',
          loading: loading,
          data: {
            classId: params.classId,
            stuId: params.stuId,
            chengHu: params.chengHu,
          }
        }).then((response) => {
          this.$createToast({message:'恭喜您，关注孩子成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'关注孩子失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /****************************************************************** 通用端 ******************************************************************/
// 删除班级
    $del_class(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/class/delete.do',
          loading: loading,
          data: {
            classId: params.classId,
            stuId:params.stuId
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'班级删除失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //获得班级信息
    $get_class_name(params, loading = false) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/class/className.do',
          loading: loading,
          data: {
            classId: ( params && params.classId ) || this.userMessage['classId']
          }
        }).then((response) => {
          this.classes.name = response['data']['className'];
          this.classes.type = response['data']['type'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取班级名称失败!',duration:2000}).show();
          /*this.$dialog.alert({
            message: '获取班级名称失败'
          }).then(() => {});*/
          //this.$toast({duration:3000,message:'获取班级名称失败！'})
          reject(error)
        })
      })
    },

    // 获取学生的详情
    $get_student_info(params, loading = true) {
      return new Promise((resovle, reject) => {
        this.$request({
          url: '/student/info.do',
          loading: loading,
          isFirstLoading:true,
          data: {
            stuId: params.stuId
          }
        }).then((response) => {
          this.student.name = response['data']['stuName'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取孩子的信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //作息时间表创建
    $save_rules(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/zuoXi/update.do',
          loading: loading,
          data:{
            detail:JSON.stringify(params.detail)
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'保存作息时间表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //作息时间表的获取
    $get_rules(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/zuoXi/query.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          let detail = response['data']['detail'];
          this.rules.detail = detail ? JSON.parse(detail) :  [] ;
          console.log(this.rules.detail)
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取作息时间表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },



    //获取纪律标签
    $get_disc_labels(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jl/query.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          let goodList = response['data']['goodList'];
          let goodLabels = [];
          goodList.forEach((item,i)=>{
            goodLabels.push({ text:item['content'],value:item['content'] })
          });

          this.disc.labels.praise =  goodLabels;

          let badList = response['data']['badList'];
          let badLabels = [];
          badList.forEach((item,i)=>{
            badLabels.push({ text:item['content'],value:item['content'] })
          });

          this.disc.labels.critic =  badLabels;

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取纪律标签失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //更新表扬标签
    $update_disc_labels_praise(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jl/updateGoodList.do',
          loading: loading,
          data:{
            goodList:JSON.stringify( params.goodList )
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'保存表扬标签失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //更新批评标签
    $update_disc_labels_critic(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jl/updateBadList.do',
          loading: loading,
          data:{
            badList:JSON.stringify( params.badList )
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'保存批评标签失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 获得纪律报表
    $get_disc_report_list(loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jl/daily.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.disc.reportList = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获得纪律报表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 查询课表
    $get_timetable_list(loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/course/queryClassCourse.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {


          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获得课表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 查询自定义课表
    $get_timetable_custom_list(loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/course/queryMyCourse.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获得课表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 添加课表
    $update_timetable(params,loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/course/updateClassCourse.do',
          loading: loading,
          data:{
            course:JSON.stringify(params.course)
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'添加课表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 添加课表
    $update_timetable_custom(params,loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/course/updateMyCourse.do',
          loading: loading,
          data:{
            course:JSON.stringify(params.course)
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'添加自定义课表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },



  }
}
