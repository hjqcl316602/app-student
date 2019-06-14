
export default {
  data(){
    return {}
  },
  methods:{
    // 修改班级 - 老师端
    $update_class(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/teacher/editClass.do',
          loading:loading,
          isFirstLoading:false,
          data:{
            classId:params.classId,
            area:params.area,
            schoolName:params.schoolName,
            classType:params.classType,
            className:params.className,
            schoolId:params.schoolId,
            classPic:params.classPic
          }
        }).then((response)=>{
          this.$createToast({message: '班级修改成功！' ,duration:2000}).show();
          resovle(response)
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改班级失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
  }

}
