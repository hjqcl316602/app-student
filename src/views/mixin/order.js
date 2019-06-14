
export default {
  methods:{
    // 创建订单
    $create_order(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/order/pay.do',
          loading:loading,
          isFirstLoading:false,
          data:{
            vipRecordId :params.vipRecordId  ,
            vipFeeId :params.vipFeeId
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '创建订单失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
  }
}
