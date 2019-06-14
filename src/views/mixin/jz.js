export default {
  data(){
    return {
      jz:{
        list:[]
      },
      province:{
        list:[]
      }
    }
  },
  methods:{
    // 矩阵
    $get_jz_list(params,loading=true){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/jz/jzList.do',
          loading:loading,
          isFirstLoading:true,
          data:{
            typeId:params.typeId,
            areaId:params.areaId
          }
        }).then((response)=>{
          this.jz.list = response['data']['list'];
          resovle(response)
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取矩阵失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
    // 获取省份
    $get_province_list(params,loading=false){
      return new Promise((resovle,reject)=>{

        this.$request({
          url:'/jz/province.do',
          loading:loading,
          isFirstLoading:true,
        }).then((response)=>{
          let provinceList = [];
          response['data'].forEach((item,i)=>{
            let obj = {
              text:item['areaName'],
              value:item['areaId']
            };
            provinceList.push(obj)
          });
          this.province.list = provinceList;
          resovle(response)
        },(error)=>{
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取省份失败!';
          this.$createToast({message: msg ,duration:2000}).show();
          reject(error)
        })
      })
    },
  }
}
