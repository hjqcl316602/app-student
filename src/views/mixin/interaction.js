export default {
  data() {
    return {
      comment:{
        list:[]
      },
      pk:{
        list:[],
        detail:{
          detail:{},
          list:[],
          mySelf:false
        }
      },
      act:{
        list:[],
        detail:{}
      },
      news:{
        list:[],
      },
      newsDetail:{
        list:[]
      },
      isBanZhuRen:false
    }

  },
  methods: {
    /****************************************************************** 老师端 ******************************************************************/

    /****************************************************************** 评论 ************ **********************************/
    // 添加评论
    $save_comment(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/bbs/create.do',
          loading: loading,
          data:{
            title:params.title,
            content:params.content,
            pics: params.pics,
            linkUrl:params.linkUrl
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'添加黑板失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取评论列表
    $get_comment_list(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/bbs/list.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.comment.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取评论列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 点赞
    $save_comment_dianzan(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/bbs/dianZan.do',
          loading: loading,
          data:{ bbsId:params.bbsId }
        }).then((response) => {
          this.$createToast({message:'点赞成功!',duration:2000}).show();
          this.$get_comment_list();

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'点赞失败!',duration:2000}).show();

          reject(error)
        })
      })
    },
    // 送红花
    $save_comment_folower(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/bbs/redFolower.do',
          loading: loading,
          data:{ bbsId:params.bbsId }
        }).then((response) => {
          this.$createToast({message:'送小红花成功!',duration:2000}).show();
          this.$get_comment_list();

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'送小红花失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /****************************************************************** pk ************ **********************************/
    //创建PK
    $create_interaction_pk(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/create.do',
          loading: loading,
          data:{
            title:params.title,
            optionsJson:JSON.stringify(params.options) ,
            endTime:params.endTime
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'添加PK失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //创建PK
    $update_interaction_pk(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/update.do',
          loading: loading,
          data:{
            pkId:params.pkId,
            title:params.title,
            optionsJson:JSON.stringify(params.options) ,
            endTime:params.endTime
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'更新PK失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取pk列表
    $get_pk_list(loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/list.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.pk.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取PK列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取pk列表
    $save_pk_vote(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/vote.do',
          loading: loading,
          data:{
            pkId:params.pkId,
            viewPointId:params.viewPointId
          }
        }).then((response) => {
          this.$get_pk_list();
          this.$createToast({message:'PK投票成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'PK投票失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取pk详情
    $get_pk_detail(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/detail.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            pkId:params.pkId,
          }
        }).then((response) => {
          this.pk.detail.detail = response['data']['detail'];
          this.pk.detail.list = response['data']['list'];
          this.pk.detail.mySelf = response['data']['mySelf'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取PK详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    // 删除pk
    $delete_pk(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/delete.do',
          loading: loading,
          data:{
            pkId:params.pkId,
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'删除PK失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //新增观点
    $add_pk_options(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/addViewPoint.do',
          loading: loading,
          data:{
            pkId:params.pkId,
            optionName:params.optionName
          }
        }).then((response) => {
          this.$createToast({message:'新增PK观点成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'新增PK观点失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //审核观点
    $check_pk_options(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/pk/checkViewPoint.do',
          loading: loading,
          data:{
            viewPointId:params.viewPointId,
            checkStatus:params.checkStatus
          }
        }).then((response) => {
          this.$createToast({message:'审核PK观点成功!',duration:2000}).show();

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'审核PK观点失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /****************************************************************** 活动 ************ **********************************/
    //活动列表
    $get_act_list(loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/act/list.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.act.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取通知列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //活动详情
    $get_act_detail(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/act/detail.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            actId:params.actId,
          }
        }).then((response) => {
          this.act.detail = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获取通知详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //新增活动
    $add_act(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/act/create.do',
          loading: loading,
          data:{
            title:params.title,
            content:params.content,
            pics:params.pics,
            startTime:params.startTime,
            endTime:params.endTime,
          }
        }).then((response) => {
          this.$createToast({message:'通知创建成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'通知保存失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //更新活动 - 通知
    $update_act(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/act/update.do',
          loading: loading,
          data:{
            actId:params.actId,
            title:params.title,
            content:params.content,
            pic:params.pic,
            startTime:params.startTime,
            endTime:params.endTime,
          }
        }).then((response) => {
          this.$createToast({message:'通知修改成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'通知修改失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //删除活动 - 通知
    $delete_act(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/act/delete.do',
          loading: loading,
          data:{
            actId:params.actId,
          }
        }).then((response) => {
          this.$createToast({message:'通知删除成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'通知删除失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    /****************************************************************** 留言 ************ **********************************/
    /****************************************************************** 家长端 ***********************/
    //创建留言 - 家长
    $create_news_parent(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/parentCreate.do',
          loading: loading,
          data:{
            msg:params.msg,
            recId:params.recId
          }
        }).then((response) => {
          this.$createToast({message:'留言成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'留言失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    /****************************************************************** 老师端 *************************/
    //创建留言 - 老师
    $create_news_teacher(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/teacherCreate.do',
          loading: loading,
          data:{
            msg:params.msg,
            recId:params.recId
          }
        }).then((response) => {
          this.$createToast({message:'留言成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'留言失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    $get_news_list(loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/list.do',
          loading: loading,
          isFirstLoading:true,
        }).then((response) => {
          this.news.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获得联系人列表失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //获得留言详情
    $request_get_news_detail_list(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/detail.do',
          loading: loading,
          isFirstLoading:true,
          data:{
            liuYanId:params.liuYanId
          }
        }).then((response) => {
          this.newsDetail.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'获得留言详情失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 班主任信息处理
    $request_deal_news(param,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/deal.do',
          loading: loading,
          data:{ liuYanMsgId : param.liuYanMsgId }
        }).then((response) => {


          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'处理留言信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 班主任信息处理 - 全部
    $request_deal_all_news(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/dealAll.do',
          loading: loading,
          data:{ liuYanId : params.liuYanId }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']|| '处理全部留言信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 家长送小红花
    $request_send_flower(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/redFlower.do',
          loading: loading,
          data:{ liuYanId : params.liuYanId }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$createToast({ message:error['msg'] || '送小红花失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //清空留言信息
    $delete_news(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/clearMsg.do',
          loading: loading,
          data:{
             liuYanId:params.liuYanId
          }
        }).then((response) => {
          this.$createToast({message:'留言清空成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'留言清空失败!',duration:2000}).show();
          reject(error)
        })
      })
    },
    //删除留言信息
    $delete_new(params,loading = true){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/revokeMsg.do',
          loading: loading,
          data:{
            liuYanMsgId:params.liuYanMsgId
          }
        }).then((response) => {
          this.$createToast({message:'留言撤回成功!',duration:2000}).show();
          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'留言撤回失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //留言信息检验 - 是否可以删除
    $delete_new_flag(params,loading = false){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/liuYan/revokeMsgFlag.do',
          loading: loading,
          data:{
            liuYanMsgId:params.liuYanMsgId
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$createToast({message:error['msg']||'留言撤回失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //通讯录过来需要重新获取liuYanId
    $get_new_id(params,loading = false){
      return new Promise((resolve,reject)=>{

        this.$request({
          url:'/liuYan/getLiuYanId.do ',
          loading:loading,
          data:{
            memId:params.memId
          }
        }).then((response)=>{
          resolve(response);
        },(error)=>{
          this.$createToast({message:error['msg']||'获取信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },


    /****************************************************************** 家长端 ******************************************************************/

    /****************************************************************** 通用端 ******************************************************************/

  }
}
