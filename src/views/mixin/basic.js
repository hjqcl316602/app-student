
import axios from 'axios'

export default {
  data(){
    return {
      options:{
        sex:[ { text :'男',value:'1'},{ text:'女' ,value:'2'}],
      },

      areaList:[],
      schoolList:[],
      classTypeList:[],
      parentTypeList:[],
      teacherTypeList:[],
      lessonTypeList:[]
    }
  },
  methods:{
    $upload_picture_wx(params,loading = true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/res/wxUploadImage.do',
          loading:loading,
          data:{
            mediaId:params.mediaId
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({ message:'上传图片失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    $upload_picture(param,loading=true){
      return new Promise((resovle,reject)=>{
        let config = { headers:{'Content-Type': 'multipart/form-data'} } ;

        /*/res/upload/image.do
        * /res/upload/movie.do
        * /res/upload/voice.do
        * */
        let toast = this.$toast.loading({
          mask: true,
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'circular',
          message: '加载中...'
        });
        axios.post(this.$configs['HTTP_REQUEST_ST']+'/res/upload/image.do',param,config).then((response)=>{
          toast.clear();
          if(response['data']['code'] == '000'){
            this.$createToast({message:'图片上传成功!',duration:2000}).show();
            resovle(response['data']['data'])
          }else{
            this.$createToast({message:'图片上传失败!',duration:2000}).show();
            reject()
          }

        },(error)=>{
          this.$createToast({message:'上传图片失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    //  获取二维码 ，关注公总号
    $get_qr_code(params,loading=false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/qrcode/get.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            fromUser:params.fromUser
          }
        }).then((response)=>{
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取二维码信息失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 课程类型
    $get_teacher_type_list(loading=false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/constant/teacherType.do',
          loading:loading,
        }).then((response)=>{
          let data = response['data'];
          this.teacherTypeList = [];
          data.forEach((item,i)=>{
            let obj = {
              text:item['codeName'],
              value:item['codeValue']
            };
            this.teacherTypeList.push(obj)
          });
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取老师类型数据失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 得到地区信息 省市县
    $get_area_list(loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/co/getAreaList.do',
          loading:loading,
        }).then((response)=>{
          this.areaList = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取省市县数据失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 根据地区得到学校
    $get_school_list(area,loading=false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/school/list.do',
          loading:loading,
          data:{ area:area }
        }).then((response)=>{
          this.schoolList = response['data'];
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取学校数据失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 得到年级类型
    $get_class_type_list(area,loading=false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/constant/classType.do',
          loading:loading,
        }).then((response)=>{
          let data = response['data'];
          this.classTypeList = [];
          data.forEach((item,i)=>{
            let obj = {
              text:item['codeName'],
              value:item['codeValue']
            };
            this.classTypeList.push(obj)
          });
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取年级类型数据失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 得到关系类别
    $get_parent_type_list(area,loading=false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/constant/parentType.do',
          loading:loading,
        }).then((response)=>{
          let data = response['data'];
          this.parentTypeList = [];
          data.forEach((item,i)=>{
            let obj = {
              text:item['codeName'],
              value:item['codeValue']
            };
            this.parentTypeList.push(obj)
          });
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取称呼类型数据失败!',duration:2000}).show();
          reject(error)
        })
      })
    },

    // 获得课程类型
    $get_lesson_type_list(loading=false){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:'/constant/courseType.do',
          loading:loading,
        }).then((response)=>{
          let data = response['data'];
          this.lessonTypeList = [];
          data.forEach((item,i)=>{
            let obj = {
              text:item['codeName'],
              value:item['codeValue']
            };
            this.lessonTypeList.push(obj)
          });
          resovle(response)
        },(error)=>{
          this.$createToast({message:error['msg']||'获取课程类型数据失败!',duration:2000}).show();
          reject(error)
        })
      })

    },

  }
}
