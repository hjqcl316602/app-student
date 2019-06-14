export default {
  data() {
    return {
      test:{
        detail:{},
        list:[]
      }
    }
  },
  methods: {
    /****************************************************************** 老师端 ******************************************************************/
    // 添加考试
    $save_test(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/grade/create.do',
          loading: loading,
          data:{
            kaoShiName:params.kaoShiName,
            content:JSON.stringify(params.content)
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'添加考试失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 考试列表
    $get_test_list( loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/grade/list.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.test.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取考试列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 考试详情
    $get_test_detail(params, loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/grade/detail.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            kaoShiId:params.id
          }
        }).then((response) => {
          this.test.detail = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取考试详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 更新考试成绩
    $save_test_update(params, loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/grade/update.do',
          loading: loading,
          data:{
            kaoShiId:params.kaoShiId,
            gradeDetail:JSON.stringify( params.gradeDetail )
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'考试成绩更新失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 删除考试
    $del_test(params, loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/grade/delete.do',
          loading: loading,
          data:{
            kaoShiId:params.kaoShiId,
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'删除考试失败!',duration:2000}).show();
          reject(error)
        })
      })
    },


    /****************************************************************** 家长端 ******************************************************************/
    // 成绩列表
    $get_grade_parent_list(params, loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/grade/parentList.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取成绩详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /****************************************************************** 通用端 ******************************************************************/
    $get_grade_chart(params,loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/grade/chart.do',
          loading: loading,
          data:{
            kaoShiId:params.kaoShiId
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取成绩统计信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    }
  }
}
