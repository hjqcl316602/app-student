

export default {
  data(){
    return {
      album:{
         list:[]
      },

    }
  },
  methods:{
    //获得相册列表
    $get_album_list(loading=true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/photo/list.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          this.album.list = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({ message:error['msg']||'获取相册列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //创建相册
    $create_album(params,loading=true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/photo/create.do',
          loading:loading,
          data:{
            photoName:params.photoName,
            photoType:params.photoType,
            memIds:params.memIds
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'创建相册失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //创建相册
    $update_album(params,loading=true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/photo/changeType.do',
          loading:loading,
          data:{
            photoId:params.photoId,
            photoName:params.photoName,
            photoType:params.photoType,
            memIds:params.memIds
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'修改相册失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //创建相册
    $delete_album(params,loading=true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/photo/delete.do',
          loading:loading,
          data:{
            photoId:params.photoId,
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'删除相册失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //相册详情
    $get_album_detail(params,loading=true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/photo/detailList.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            photoId:params.photoId,
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取相册详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 相册权限人员的选择
    $get_album_student(params,loading = true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/photo/getClassMem.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取班级成员失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 保存相册下的图片
    $update_album_pics(params,loading = true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/photo/changePic.do',
          loading:loading,
          data:{
            photoId:params.photoId,
            pics:params.pics
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'图片上传失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

  }

}
