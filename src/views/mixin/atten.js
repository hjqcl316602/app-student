export default {
  data() {
    return {
      kaoqin:{
        detail:{
          day:'',
          timeType:''
        },
        list:[]
      },
      kaoqin_report:{
        list:[]
      },
      qinjia:{
        list:[]
      }
    }
  },
  methods: {
    /****************************************************************** 老师端 ******************************************************************/
    // 获得考勤列表
    $get_kaoqin_list(loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/kaoqin/getKaoQin.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.kaoqin.detail['day'] = response['data']['day'];
          this.kaoqin.detail['timeType'] = response['data']['timeType'];
          let list = response['data']['list'];
          list.forEach((item,i)=>{
            item['active'] = false
          });
          this.kaoqin.list = list;
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取考勤列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 推送考勤信息
    $send_kaoqin(loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/kaoqin/send.do',
          loading: loading,
        }).then((response) => {
          this.$createToast({message:'推送考勤成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'推送考勤失败!',duration:2000}).show();
          reject(error)
        })

      })
    },


    // 考勤
    $save_kaoqin(status = 1,init = false,loading=false){

      let list =  this.kaoqin.list.slice(0);

      let newList = [];

      if(init){

        list.forEach((item,i)=>{
          if(item['status'] == 0){
            newList.push({ stuId:item['stuId'] , status:status})
          }else{
            newList.push({ stuId:item['stuId'] , status:item['status']})
          }

        });
      }else{
        list.forEach((item,i)=>{
          if(item['active']){
            newList.push({ stuId:item['stuId'] , status:status})
          }else{
            newList.push({ stuId:item['stuId'] , status:item['status']})
          }
        });
      }

      let obj = {
        day:this.kaoqin.detail.day,
        timeType:this.kaoqin.detail.timeType,
        list:newList
      };
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/kaoqin/kaoQin.do',
          loading: loading,
          data:{ kaoQinJson : JSON.stringify(obj) }
        }).then((response) => {
          this.$get_kaoqin_list(false);
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'考勤失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /****************************************************************** 家长端 ******************************************************************/
    // 请假
    $add_qinjia(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/kaoqin/qingJia.do',
          loading: loading,
          data: {
            type: params.type,
            detail:params.detail,
            startTime:params.startTime,
            endTime:params.endTime
          }
        }).then((response) => {
          this.$createToast({message:'请假成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'请假失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 请假
    $get_qinjia_list(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/parent/qingJiaList.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.qinjia.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取请假列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    /****************************************************************** 通用端 ******************************************************************/

    // 获得考勤报表
    $get_kaoqin_report_list(params, loading = true) {
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/kaoqin/report.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.kaoqin_report.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获得考勤报表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
  }
}
