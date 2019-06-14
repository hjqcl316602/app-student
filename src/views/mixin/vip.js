export default {
  data(){
    return {
      fee: {
        list: []
      }
    }
  },

  methods:{
    // 上传资料
    $upload_resource(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/vip/uploadData.do',
          loading:loading,
          isFirstLoading:false,
          data:{
            classId:params.classId,
            name:params.name,
            mobile:params.mobile,
            type:params.type, // 0 - 个人 1 - 企业
            zhengMian:params.zhengMian,
            fanMian:params.fanMian,
            yyzz:params.yyzz,
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '上传资料失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取支付类型 - 费用设置
    $get_fee_list(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/vip/vipFeeList.do',
          loading:loading,
          isFirstLoading:false,
        }).then((response)=>{
          this.fee.list = response['data'];
          resovle(response)
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '上传资料失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
  }
}
