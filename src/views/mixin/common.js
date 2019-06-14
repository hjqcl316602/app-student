export default {

  methods:{
    // 绑定用户关系
    $referer(params,loading = false ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/co/referer.do',
          loading: loading,
          data:{
            fromUser:params.fromUser,
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '绑定用户关系失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
  }
}
