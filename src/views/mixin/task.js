export default {
  data() {
    return {
      task:{
        loading:false,
        pageNum:1,
        pageSize:10,
        list:[],
        push:{
          loading:false,
          finished:true
        },
      },
      task_statics:{
        list:[]
      }
    }
  },
  methods: {
    /****************************************************************** 老师端 ******************************************************************/
    // 保存作业
    $save_task(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/job/save.do',
          loading: loading,
          data:{
            jsonDetail:JSON.stringify(params.jsonDetail)
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'保存作业失败!',duration:2000}).show();
          reject(error)
        })
      })
    },



    /****************************************************************** 家长端 ******************************************************************/
    // 保存作业评定
    $save_task_eval(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/job/writeJob.do',
          loading: loading,
          data:{
            jobId:params['jobId'],
            time:params['time'],
            quality:params['quality'],
            complete: params['complete'],
            scoreType:params['scoreType'],
            abcd:params['abcd'],
            score:params['score']
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'评定作业失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //获取作业详情
    $get_task_detail(params,loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/job/detail.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            jobId:params['jobId'],
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取作业详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },


    /****************************************************************** 通用端 ******************************************************************/
    //获得作业列表
    $get_task_list(more=false,loading=true,parent=false){
      if(this.task.loading) return;
      this.task.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.task.pageNum++ ;
        }else{
          this.task.pageNum = 1 ;
          this.task.push.finished = true;
        }
        let url =  ( parent ) ? '/job/parentQueryJob.do':'/job/queryJob.do';

        this.$request({
          url:url,
          data:{
            pageSize:this.task.pageSize,
            pageNum:this.task.pageNum,
          },
          isFirstLoading:true,
          loading:loading
        }).then((res)=>{
          let list = res.data;
          this.task.loading = false;
          this.task.push.loading = false;

          if(more){
            this.task.list =  this.task.list.concat(list)
          }else{
            this.task.list = list
          }

          if( list.length < this.task.pageSize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.task.push.finished = true;
          }else{
            this.task.push.finished = false;
          }
          resovle()
        },(error)=>{
          this.task.pageNum--;
          this.task.loading = false;
          this.task.push.loading = false;
          this.$createToast({message:error['msg']||'获取作业列表失败!',duration:2000}).show();
          reject('fail')
        })
      })
    },
    //获取作业详情
    $get_task_statics_detail(params,loading=true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/job/statistics.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            jobId:params['jobId'],
          }
        }).then((response) => {
          this.task_statics.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取作业统计详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
  }
}
