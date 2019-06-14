

// 通讯录模块

export default {
  data(){
    return{
      parent:{
        list:[]
      },
      teacher:{
        list:[]
      }
    }
  },
  methods:{

    // 通讯录 - 按学生得到家长列表
    $get_student_parents(params,loading = true){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/liuYan/parentAddress.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            stuId:params.stuId,
          }
        }).then((response)=>{
          this.parent.list = response['data'];
          resolve(response);
        },(error)=>{
          this.$createToast({message:error['msg']||'获取通讯录失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 通讯录 - 得到当前班级的老师
    $get_class_teacher(params,loading = true){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/liuYan/teacherAddress.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          this.teacher.list = response['data'];
          resolve(response);
        },(error)=>{
          this.$createToast({message:error['msg']||'获取通讯录失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

  }
}
