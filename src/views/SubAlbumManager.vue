<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import basic  from './mixin/basic'
  import album  from './mixin/album'
  import wx from 'weixin-js-sdk'
  export default {
    name: "",
    components: {},
    mixins: [ basic,album ],
    beforeRouteEnter(to, from, next) {
      next(vm => {
      })
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {

    },
    mounted() {

    },
    activated() {
      this._init_page()
    },
    props: [],
    data() {
      return {
        isSelectAll:false,
        photo:{
          list:[],
        },
        params:{},

        testPics:[
          'http://p1.ifengimg.com/2018_42/C03628FF6F4ED06948E0A488AD90E26E780BA05E_w981_h658.jpg',
          'http://05imgmini.eastday.com/mobile/20180910/b6ed7171d2e937a9e82c46b29b2cfe7b_wmk.jpeg',
          'http://p0.ifengimg.com/pmop/2018/0920/20EC2954A6F7B7DA64733F937FA2A863B9AF1A45_size128_w640_h640.jpeg',
          'http://img.idol001.com/origin/2018/09/01/c2cfd7c897b1397648a65a9e2ca2cef51535800562.jpg',
          'http://www.qqcjw.com/UploadFiles/2018-9-20/b14131819058496871095ETX.jpg'
        ]
      }
    },
    methods: {
      async _init_page() {
        this.params = JSON.parse(sessionStorage.getItem('selectAlbum'));
        this.$get_album_detail( this.params ).then((res)=>{
          let pics = res['data']['photoList'];
          let newPics = [];
          pics.forEach((item,i)=>{
            let obj = {
              isDel:false,
              showPic:item['pic']
            };
            newPics.push(obj)
          });
          this.photo.list = newPics ;
        })
        //this.$update_album_pics({ photoId:this.params.photoId,pics:this.testPics.join(',')},false) ;
      },
      _select_photo(index){
        this.photo.list[index]['isDel'] = !this.photo.list[index]['isDel']
      },
      _del_pics(){
        let isDelPics = Arrays.filter(this.photo.list,(item)=>{ return item['isDel'] });
        if(isDelPics.length > 0){

          this.$dialog.confirm({
            title:'删除确认',
            message:'是否确认删除图片？'
          }).then(()=>{
            let isNoDelPics = Arrays.filter(this.photo.list,(item)=>{ return !item['isDel'] });
            let pics = [];
            isNoDelPics.forEach((item,i)=>{
              pics.push(item['showPic'])
            });
            this.$update_album_pics({ photoId:this.params.photoId,pics:pics.join(",")},false).then(()=>{
              this.$createToast({message:'图片删除成功!',duration:2000}).show();
              this._init_page()
            });

          }).catch(()=>{})

        }else{
          this.$createToast({message:'选择要删除的图片!',duration:2000}).show();
        }
      },
      // 选择图片
      _select_file() {

        /// test
        /*this.$update_album_pics({ photoId:'47',pics:this.testPics.join(",")},false).then(()=>{
          this.$createToast({message:'图片上传成功!',duration:2000}).show();
        });
        return*/

        let _this = this;
        wx.chooseImage({
          count:  9,          // 默认9
          sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],        // 可以指定来源是相册还是相机，默认二者都有
          success:  (res)=> {
            let localIds = res.localIds;            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            this._upload_file(localIds)

          },
          fail:(res)=>{
            this.$createToast({message:'选择图片失败!',duration:2000}).show();
          }
        });
      },
      _upload_file(localIds){
        let localId = localIds.pop(); // 得到数组的最后一条
        let toast = this.$toast.loading({
          mask: true,
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'circular',
          message: '上传中...'
        });

        wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success:  (res) =>{
            let serverId = res.serverId; // 返回图片的服务器端ID
            this.$upload_picture_wx({ mediaId : serverId },false).then((res)=>{

              let obj = { isDel:false,showPic:res['data']};
              this.photo.list.unshift(obj);
              if(localIds.length > 0){
                this._upload_file(localIds)
              }else{
                // 保存图片路径
                let pics = [];
                this.photo.list.forEach((item,i)=>{
                  pics.push(item['showPic'])
                });
                this.$update_album_pics({ photoId:this.params.photoId,pics:pics.join(",")},false).then(()=>{
                  this.$createToast({message:'图片上传成功!',duration:2000}).show();
                  toast.clear();
                },()=>{
                  toast.clear();
                });
              }
            },()=>{
              toast.clear();
            }) ;
          },
          fail:()=>{
            this.$createToast({message:'图片上传失败!',duration:2000}).show();
            toast.clear();
          }
        });
      },
    },
    watch: {
      'isSelectAll': {
        handler(val, olval){
          this.photo.list.forEach((item)=>{
            if(val){
              item['isDel'] = true ;
            }else{
              item['isDel'] = false ;
            }
          })
        },
        deep: true ,
        immediate:true
    }   },
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-padding__xl-x--bm vc-fluid--h-min vc-bg">
    <div class="vc-row" >

      <div  class="vc-col--06">
        <div class="vp-ratio">
          <div class="vp-ratio__outer" data-ratio="100%">
            <div class="vp-ratio__inner vp-img__inner" @click="_select_file">
              <img src="../img/icon-img-upload.png" alt="" class="vp-img--max" >
            </div>
          </div>
        </div>
      </div>

      <div  class="vc-col--06"  v-for="(item,index) in photo.list" @click="_select_photo(index)">
        <div class="vp-ratio">
          <div class="vp-ratio__outer" data-ratio="100%">
            <div class="vp-ratio__inner">

              <transition name="vt-fade">
                <div class="vp-img__close--bg vc-flex--center" v-show="item['isDel']">
                  <div class="iconfont icon-gou vc-text--white"></div>
                </div>
              </transition>

              <div class="vp-img__inner">
                <img :src="item['showPic']" alt=""  @load="_pub_img_load">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-row">
        <div class="vc-col--08 vp-icon__outer vp-row vc-bg--theme" @click="isSelectAll = !isSelectAll">
          <div class="iconfont  icon-weibiaoti38 vc-text--white" v-if="!isSelectAll"></div>
          <div class="iconfont  icon-gouxuan vc-text--white" v-if="isSelectAll"></div>
          <div class="vc-margin--lt vc-text--bold vc-text--white">全选</div>
        </div>
        <div class="vc-col--16 vp-icon__outer vp-row   vc-bg--danger" @click="_del_pics">
          <div class="vc-text--bold vc-text--white">删除</div>
        </div>
      </div>
    </div>

  </div>

</template>
<style scoped></style>
