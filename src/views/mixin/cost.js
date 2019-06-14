

export default {
  data(){
    return {
      cost_teacher:{
        list:[]
      },
      cost_parent:{
        list:[]
      },
      cost:{
        detail:{}
      },
      pay:{
        list:[]
      }

    }
  },
  methods:{
    /************************************************** 老师端 ****************************************************/
    //获得缴费清单列表
    $get_cost_teacher_list(loading=true){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/fee/feeListTeacher.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          this.cost_teacher.list = response['data'];
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取收费列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //获得缴费名单列表
    $get_pay_list(params,loading=true){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/fee/feeList.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            feeId:params.feeId
          }
        }).then((response)=>{
          this.pay.list = response['data'];
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取缴费名单失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //创建缴费清单
    $create_cost(params,loading=true){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/fee/createFee.do',
          loading:loading,
          data:{
            title:params.title,content:params.content,fee:params.fee * 100 ,pic:params.pic,stuIds:params.stuIds,
          }
        }).then((response)=>{
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'添加收费失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //修改缴费清单
    $update_cost(params,loading=true){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/fee/updateFee.do',
          loading:loading,
          data:{
            feeId:params['feeId'],
            title:params.title,content:params.content,fee:params.fee * 100 ,pic:params.pic,stuIds:params.stuIds,
          }
        }).then((response)=>{
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'添加收费失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    /************************************************** 家长端 ****************************************************/

    //获得缴费清单列表
    $get_cost_parent_list(loading=true){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/fee/feeListParent.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          this.cost_parent.list = response['data'];
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取收费列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //缴费
    $pay_cost(params,loading=true){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/fee/payFee.do',
          loading:loading,
          data:{
            feeId:params.feeId,
            pic:params.pic
          }
        }).then((response)=>{
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'缴费失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /************************************************** 通用端 ****************************************************/

    //获得缴费清单列表
    $get_cost_detail(params,loading=true){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/fee/feeDetail.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            feeId:params.feeId
          }
        }).then((response)=>{
          this.cost.detail = response['data'];
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取收费详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
  }

}
