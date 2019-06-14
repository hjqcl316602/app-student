export default {
  data() {
    return {
      bbs:{
        detail:{}
      },　
    }

  },
  methods: {
    /****************************************************************** 老师端 ******************************************************************/

    /****************************************************************** 评论 ************ **********************************/
    // 黑板详情
    $get_bbs_detail(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/bbs/detail.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            bbsId:params.bbsId,
          }
        }).then((response) => {
          this.bbs.detail = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取黑板详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 删除黑板
    $delete_bbs(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/bbs/delete.do',
          loading: loading,
          data:{
            bbsId:params.bbsId,
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取黑板详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    $update_bbs(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/bbs/update.do',
          loading: loading,
          data:{
            bbsId:params.bbsId,
            content:params.content,
            title:params.title,
            linkUrl:params.linkUrl,
            pics: params.pics
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'修改黑板失败!',duration:2000}).show();
          reject(error)
        })
      })
    },


  }
}
