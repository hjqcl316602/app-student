export default {
  data(){
    return {
      openClass:{
        list:[],
        loading:false,
        pageSize:20,
        pageNum:1,
        push:{
          finished:false,
          loading:false,
        }
      },
      bbs:{
        list:[]
      },
      pk:{
        list:[]
      },
      act:{
        list:[]
      },
      photo:{
        list:[]
      },
      photoDetail:{
        list:[]
      }
    }
  },
  methods:{
    // 获取开放班级
    $get_open_class_list(params,more = false,loading = true){
      console.log('list')
      console.log(params.area)
      if(this.openClass.loading) return;
      this.openClass.loading = true;
      if (more) {
        this.openClass.pageNum++;
      } else {
        this.openClass.list = [];
        this.openClass.pageNum = 1;
        this.openClass.push.finished = true;
      }
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/open/openClass.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            search:params.search,
            area:params.area,
            pageNum:this.openClass.pageNum,
            pageSize:this.openClass.pageSize,
          }
        }).then((response)=>{

          this.openClass.loading = false;
          this.openClass.push.loading = false;
          let list = response['data'];
          if(more){
            this.openClass.list = this.openClass.list.concat(list);
          }else{
            this.openClass.list = list;
          }

          if(list.length < this.openClass.pageSize) {
            this.openClass.push.finished = true;
          } else {
            this.openClass.push.finished = false;
          }

          resovle(response)

        },(error)=>{
          this.openClass.pageNum --;
          this.openClass.loading = false;
          this.openClass.push.loading = false;

          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取开放班级失败!';
          this.$createToast({message: msg ,duration:2000}).show();

          reject(error)
        })
      })
    },

    // 获取黑板
    $get_bbs_list(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/open/bbsList.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            classId:params.classId,
          }
        }).then((response) => {
          this.bbs.list = response['data']
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取黑板列表失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取pk
    $get_pk_list(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/open/pkList.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            classId:params.classId,
          }
        }).then((response) => {
          this.pk.list = response['data'];
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取pk列表失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取通知
    $get_act_list(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/open/actList.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            classId:params.classId,
          }
        }).then((response) => {
          this.act.list = response['data']
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取通知列表失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取相册
    $get_photo_list(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/open/photoList.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            classId:params.classId,
          }
        }).then((response) => {
          this.photo.list = response['data']
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取相册列表失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取相册详情
    $get_photo_detail(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/open/photoDetail.do',
          loading: loading,
          data:{
            photoId:params.photoId,
          }
        }).then((response) => {
          this.photoDetail.list = response['data']
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取相册相册图片列表失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },

    // 查看是否加入过该班级
    $get_join_class_status(params,loading = false ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/open/inClass.do',
          loading: loading,
          data:{
            classId:params.classId,
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '判断是否加入班级失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
    // 加入班级
    $join_class(params,loading = true ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/open/joinClass.do',
          loading: loading,
          data:{
            classId:params.classId,
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '加入班级失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },

  }
}
