


export default {
  data(){
    return {
       banner: {
         list: []
       },
      mem:{
         total:0
      }
    }
  },
  methods:{
    /**************************************************   ****************************************************/
    //平台用户数
    $get_mem_num(loading=false){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/mem/totalNum.do',
          loading:loading,
        }).then((response)=>{
          this.mem.total = response['data']['totalNum']
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取平台用户数失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //获得首页banner
    $get_banner_list(loading=false){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/ad/getPSD.do',
          loading:loading,
        }).then((response)=>{

          this.banner.list  = response['data'] ;
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取海报栏数据失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //获得首页可读状态
    $get_news_msg(loading=false){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/co/getNewMsg.do',
          loading:loading,
        }).then((response)=>{
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取状态失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
//更新首页可读状态
    $update_news_msg(params,loading=false){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:'/co/updateNewMsg.do',
          loading:loading,
          data:{
            msgType:params.msgType
          }
        }).then((response)=>{
          resolve(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'更新状态失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
  }

}
