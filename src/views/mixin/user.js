

export default {
  data(){
    return {
      userInfo:{},
      childParentList:[],
      studentList:[],
      classInfo:{},
      classList:[],
      classParentList:[],

      message:{
        list:[],
        loading:false,
        pageSize:10,
        pageNum:1,
        push:{
          finished:false,
          loading:false,
        }
      },
      notice:{
        list:[],
        loading:false,
        pageSize:10,
        pageNum:1,
        push:{
          finished:false,
          loading:false,
        }
      },
      cmc:{
        list:[],
        isCmcNum:0
      },
      message_sets:{
        jlFlag: 0,
        kqFlag: 0,
        zyFlag:0
      },
      parents:{
        list:[]
      },
      teachers:{
        list:[]
      },
    }
  },
  methods:{
    /****************************************************************** 老师端 ******************************************************************/

    // 得到老师的班级成员列表
    $get_student_list(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/teacher/myClassMember.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            classId:params.classId
          }
        }).then((response)=>{
          this.studentList = response['data']['list'];
          this.classInfo = response['data']['classInfo'];
          this.teachers.list = response['data']['teacherList'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取我的班级详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 得到老师的班级列表
    $get_teacher_class(loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/teacher/myClass.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          this.classList = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取我的班级信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //切换老师端的班级
    $change_teacher_class(params,loading = true ){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/teacher/changeClass.do',
          loading:loading,

          data:{
            classId:params.classId,
          }
        }).then((response)=>{

          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'切换班级失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //获得家长列表
    $get_student_parents(params,loading = true ){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/teacher/parent.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            stuId:params.stuId,
          }
        }).then((response)=>{
          this.parents.list = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获得家长列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //获得教师列表
    $get_student_teachers(params,loading = true ){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/parent/teacher.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            classId:params.classId,
          }
        }).then((response)=>{
          this.teachers.list = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获得教师列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },


    //管委会 - 得到家长的列表
    $get_cmc_list(loading = true){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/cmc/list.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          let list = response['data'];
          /*list = [
            {name:'hjq',checked:false},{name:'hjq2',checked:false},{name:'hjq3',checked:false},{name:'hjq4',checked:false},
          ]*/
          let newList = [],isCmcNum=0;
          list.forEach((item,i)=>{
            let obj = { name : item['name'],cmcId:item['cmcId']};
            if( item['type'] == 1 ){
              obj['checked'] = true;
              isCmcNum += 1
            }else{
              obj['checked'] = false;
            }
            newList.push(obj)
          });

          this.cmc.list = newList;
          this.cmc.isCmcNum = isCmcNum
          resolve(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取家长列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //管委会 - 添加
    $add_cmc(params,loading = true){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/cmc/add.do',
          loading:loading,
          data:{
            cmcId:params.cmcId
          }
        }).then((response)=>{
          resolve(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'添加管委会失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //管委会 - 删除
    $delete_cmc(params,loading = true){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/cmc/delete.do',
          loading:loading,
          data:{
            cmcId:params.cmcId
          }
        }).then((response)=>{
          resolve(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'删除管委会失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    /****************************************************************** 家长端 ******************************************************************/

    // 得到孩子列表 -  用于分享选择
    $get_parent_child_list(loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/parent/myChild.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{

          this.childParentList = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取我的孩子信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 得到孩子列表 - 按班级
    $get_parent_class(loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/parent/myClass.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{

          this.classParentList = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取我的班级信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 切换家长端孩子的班级
    $change_parent_class(params,loading = true ){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/parent/changeClass.do',
          loading:loading,
          data:{
            stuId:params.stuId,
            classId:params.classId,
          }
        }).then((response)=>{

          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'切换班级失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /****************************************************************** 通用端 ******************************************************************/
    // 获得消息设置的时间
    $get_user_message_sets(loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/co/getMsgTime.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取免打扰设置失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 修改消息设置的时间
    $update_user_message_sets(params,loading = false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/co/updateMsgTime.do ',
          loading:loading,
          data:{
            startTime:params.startTime,
            endTime:params.endTime,
            mdrFlag:params.mdrFlag ? 1 : 0
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'消息免打扰修改失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取用户信息
    $get_user_info(loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/mem/getUserInfo.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          this.userInfo = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取用户信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //修改用户信息
    $update_user_info(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/mem/updateUserDetail.do',
          loading:loading,
          data:{
            name:params.name,
            sex:params.sex,
            mobile:params.mobile
          }
        }).then((response)=>{
          this.$get_user_info();
          resovle(response);
        },(error)=>{
          reject(error)
        })
      })
    },

    //分享出去的页面的用户信息获取
    $get_user_active(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/mem/active.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            webMemId:params.webMemId,
            fromUser:params.fromUser,
          }
        }).then((response)=>{
          resovle(response);
        },(error)=>{
          reject(error)
        })
      })
    },

    //阅读消息
    $read_message(params,loading = false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/msg/readMsg.do',
          loading:loading,
          data:{
            msgId:params.msgId
          }
        }).then((response)=>{
          resovle(response);
        },(error)=>{

          reject(error)
        })
      })
    },
    //阅读消息
    $delete_message(params,loading = true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/msg/deleteMsg.do',
          loading:loading,
          data:{
            msgId:params.msgId
          }
        }).then((response)=>{
          resovle(response);
        },(error)=>{
          this.$createToast({message:error['msg']||'删除系统消息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //获得消息
    $get_user_news(more = false,loading = true){
      if(this.message.loading) return;
      this.message.loading = true;
      if (more) {
        this.message.pageNum++;
      } else {
        this.message.list = [];
        this.message.pageNum = 1;
        this.message.push.finished = true;
      }
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/msg/myList.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            msgId:this.message.list[ this.message.list.length - 1 ] && this.message.list[ this.message.list.length - 1 ]['id'],
            pageNum:this.message.pageNum,
            pageSize:this.message.pageSize,
          }
        }).then((response)=>{

          this.message.loading = false;
          this.message.push.loading = false;
          let list = response['data'];
          if(more){
            this.message.list = this.message.list.concat(list);
          }else{
            this.message.list = list;
          }

          if(list.length < this.message.pageSize) {
            this.message.push.finished = true;
          } else {
            this.message.push.finished = false;
          }

          resovle(response)

        },(error)=>{
          this.message.pageNum --;
          this.message.loading = false;
          this.message.push.loading = false;
          this.$createToast({message:error['msg']||'获取消息列表失败!',duration:2000}).show();
          reject(error)
        })
      })

    },




    //获得通知
    $get_user_notice(more = false,loading = true){
      if(this.notice.loading) return;
      this.notice.loading = true;
      if (more) {
        this.notice.pageNum++;
      } else {
        this.notice.list = [];
        this.notice.pageNum = 1;
        this.notice.push.finished = true;
      }
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/msg/list.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            msgId:this.notice.list[ this.notice.list.length - 1 ] && this.notice.list[ this.notice.list.length - 1 ]['id'],
            pageNum:this.notice.pageNum,
            pageSize:this.notice.pageSize,
          }
        }).then((response)=>{

          this.notice.loading = false;
          this.notice.push.loading = false;
          let list = response['data'];

          /*list.forEach((item)=>{
            item['message'] = 'dshjdhjshdj<br>的士速递计算机第三季度上课'
          })*/

          if(more){
            this.notice.list = this.notice.list.concat(list);
          }else{
            this.notice.list = list;
          }

          if(list.length < this.notice.pageSize) {
            this.notice.push.finished = true;
          } else {
            this.notice.push.finished = false;
          }

          resovle(response)

        },(error)=>{
          this.notice.pageNum --;
          this.notice.loading = false;
          this.notice.push.loading = false;
          this.$createToast({message:error['msg']||'获取通知列表失败!',duration:2000}).show();
          reject(error)
        })
      })

    },

    //意见反馈
    $create_feed_back(params,loading = true){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/co/feedBack.do',
          loading:loading,
          data:{
            feedBack:params.feedBack,
            mobile:params.mobile
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          this.$createToast({message:error['msg']||'保存意见反馈失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
  }
}
