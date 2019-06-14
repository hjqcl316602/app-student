
import wx from 'weixin-js-sdk'
import axios from 'axios'
import * as configs from './vue.config';

// 获取验签信息
function get_wx_sign(href){
  return new Promise((resolve,reject)=>{
    axios({
      url:configs['HTTP_REQUEST_WX'] + '/co/js.do?url=' + href
    }).then((reponse)=>{
      let  data = reponse['data'];

      if(data['code'] =='000'){
        resolve(data['data'])
      }else{
        alert('获取验签信息失败！');
        reject()
      }
    },()=>{
      reject()
    })
  })
}

// 设置微信js接口
export  function set_wx_sign(href){
  return  new Promise((resolve,reject)=>{
    get_wx_sign(href).then((message)=>{
      console.log(message)
      wx.config({
        debug: false,
        appId: message['appId'],
        timestamp: message['timestamp'],
        nonceStr:message['nonceStr'] ,
        signature:message['signature'],
        jsApiList: ['hideAllNonBaseMenuItem','previewImage','uploadImage','chooseImage','getLocalImgData','onMenuShareAppMessage','onMenuShareTimeline','showMenuItems','chooseWXPay']
      });
      resolve();
    })
  })

}

// 设置分享
export function set_wx_share({title,desc,link,imgUrl}){
  return new Promise((resolve,reject)=>{
    wx.ready(()=>{
      wx.showMenuItems({
        menuList: ['menuItem:share:appMessage','menuItem:share:timeline']
      });
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link:  link, //window.location.href.split('#')[0]+'?'+window.location.href.split('#')[1],
        imgUrl: imgUrl,
        success:  () =>{
          resolve('message')
        },
        cancel:() =>{
          reject('message')
        }
      });
      wx.onMenuShareTimeline({
        title:title,
        desc: desc,
        link:  link ,//|| href.split('#')[0]+'?' + href.split('#')[1],
        imgUrl: imgUrl,
        success:  () =>{
          resolve('line')
        },
        cancel:() =>{
          reject('line')
        }
      });
    })
  })
}

// 隐藏全部的按钮
export function hide_all_menus(){

  wx.ready(()=>{
    wx.hideAllNonBaseMenuItem();
  })

}

// 图片预览
export function show_picture(pics,pic){
  wx.previewImage({
    current: pic,       // 当前显示图片的http链接
    urls: pics          // 需要预览的图片http链接列表
  });
};

////////////////////////////////////// 暂时不使用的 //////////////////////////////////////////////////
export function _select_pic() {
  let _this = this;
  wx.chooseImage({
    count:  1, // 默认9
    sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'],        // 可以指定来源是相册还是相机，默认二者都有
    success:  (res)=> {
      let localIds = res.localIds;            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      this.$upload_picture_wx({ mediaId : localIds[0] }).then((res)=>{
        this.params.pic = res['data'];
      }) ;
    },
    fail:(res)=>{
      this.$createToast({ message:'选择图片失败!',duration:2000 }).show();
    }
  });
}
export function  upload_img(localIds){
  let _this = this;
  let localId = localIds.pop(); // 得到数组的最后一条
  let toast = this.$toast.loading({
    mask: true,
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'circular',
    message: '加载中...'
  });
  wx.uploadImage({
    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 0, // 默认为1，显示进度提示
    success:  (res) =>{
      let serverId = res.serverId; // 返回图片的服务器端ID
      //兼容ios
      if(navigator.userAgent.indexOf('iPhone') > -1){
        this.get_img_iphone(localId).then((url)=>{
          this.params.pic = serverId;
          this.params.showPic = url;
          toast.clear();
        },()=>{})
      }else{
        this.params.pic = serverId;
        this.params.showPic = localId;
        toast.clear();
        alert(JSON.stringify(this.params))
      }

    },
    fail:()=>{
      this.$createToast({message:'上传图片失败!',duration:2000}).show();
    }
  });
}
export function get_img_iphone(localId) {
  return new Promise((resovle,reject)=>{
    wx.getLocalImgData({
      localId: localId,
      success: (res)=> {
        var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
        localData = localData.replace('image/jpg', 'image/jpeg');
        resovle(localData);
      },
      fail:()=>{
        this.$createToast({message:'上传图片失败!',duration:2000}).show();
        reject()
      }
    });
  })



}
export function _select_file(e){

  if(this.params.images.length > 10) {
    this.$createToast({message:'不能上传超过10张图片!',duration:2000}).show();
    return
  }

  //this.$upload_picture();
  let file = e.target.files;

  //console.log(file)
  let param = new FormData()  // 创建form对象

  for(let n = 0 ; n < file.length;n++){
    param.append('file', file[n], file[n].name);
    param.append('chunk', n)
  }
  param.append('file', file, file.name)  // 通过append向form对象添加数据
  param.append('chunk', '0') // 添加form表单中其他数据
  console.log(param)
  console.log(param.get('file'))
  this.$upload_picture(param).then((response)=>{
    let pics = response['fileUrls'];
    pics.forEach((item,i)=>{
      this.params.images.push(item['url'])
    })
  });
}
