<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import wx from 'weixin-js-sdk'
  import user  from './mixin/user'
  import basic  from './mixin/basic'
  import cost  from './mixin/cost'

  export default {
    name: "",
    components: {},
    mixins: [ user,basic,cost ],
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
        params:{
          title:'',
          content:'',
          fee:'',
          feeId:'',
          type:'insert',
          pic: '',//http://05imgmini.eastday.com/mobile/20180910/b6ed7171d2e937a9e82c46b29b2cfe7b_wmk.jpeg',
          detail:{}
        },
        list:{
          students:[],
        },
        isAllActive:false
      }
    },
    methods: {
      async _init_page() {

        this.params.feeId = this.$route.query['feeId'];
        this.params.type = this.$route.query['type'] || 'insert';
        if(this.params.type == 'update'){
          await this.$get_cost_detail(this.params).then((response)=>{
            this.params.detail = response['data'];
            this.params.title = this.params.detail['title'];
            this.params.content = this.params.detail['content'];
            this.params.fee =  ( this.params.detail['fee'] / 100 ).toFixed(2) ;
            this.params.pic = this.params.detail['pic'];
          });
        }

        await  this.$get_student_list({classId:this.userMessage['classId']}).then((response)=>{
          let studentList = response['data']['list'];
          let arr = [];
          if(this.params.type =='update'){
            let stuIds = this.params.detail['stuList'];
            studentList.forEach((item,i)=>{
              let obj = Objects.extend({active:false},item);

              stuIds.forEach((stu,stuId)=>{
                if( stu['stuId'] == item['stuId'] && stu['selectStatus'] == 1){
                  obj['active'] = true ;
                }
              });
              arr.push(obj)
            });

          }else if(this.params.type =='insert'){
            studentList.forEach((item,i)=>{
              let obj = Objects.extend({active:false},item);
              arr.push(obj)
            });
          }
          this.list.students = arr;
        });

      },
      _save_cost(){
        let message = this._validate_params(this.params);
        if(message == 'yes'){

          if(this.params.type == 'insert'){
            this.$dialog.confirm({
              title:'确认信息',
              message:'确定提交缴费清单？'
            }).then(()=>{
              this.$create_cost(this.params).then(()=>{
                this.$createToast({message:'添加缴费清单成功！',duration:2000}).show();
                setTimeout(()=>{
                  this.$router.go(-1);
                  this.$destroy()
                },800)
              })
            })
          }else if(this.params.type == 'update'){
            this.$dialog.confirm({
              title:'确认信息',
              message:'确定修改缴费清单？'
            }).then(()=>{
              this.$update_cost(this.params).then(()=>{
                this.$createToast({message:'修改缴费清单成功！',duration:2000}).show();
                setTimeout(()=>{
                  this.$router.go(-1);
                  this.$destroy()
                },800)
              })
            })
          }


        }else{
          this.$createToast({message:message,duration:2000}).show();
        }


      },
      _validate_params(params){
        if(Valids.isEmptyString( params.title) ){
          return '请输入收费主题！'
        };
        if(Valids.isEmptyString( params.content) ){
          return '请输入收费详情！'
        };
        if(Valids.isEmptyString( params.fee) ){
          return '请输入收费金额！'
        }else{
          if( !Valids.isNumber(params.fee * 100 , 1)){
            return '请输入不小于0.01的收费金额！'
          }
        };


        if(Valids.isEmptyString( params.pic) ){
          return '请上传收费二维码！'
        };
        if(Valids.isEmptyString( params.stuIds) ){
          return '请选择收费名单！'
        };
        return 'yes'
      },
      _select_pic() {
        let _this = this;
        wx.chooseImage({
          count:  1, // 默认9
          sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],        // 可以指定来源是相册还是相机，默认二者都有
          success:  (res)=> {
            let localIds = res.localIds;            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

            wx.uploadImage({
              localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 0, // 默认为1，显示进度提示
              success:  (res) =>{
                let serverId = res.serverId; // 返回图片的服务器端ID
                this.$upload_picture_wx({ mediaId : serverId }).then((res)=>{
                  this.params.pic = res['data'];
                }) ;
              },
              fail:()=>{
                this.$createToast({message:'图片上传失败!',duration:2000}).show();
              }
            });

          },
          fail:(res)=>{
            this.$createToast({ message:'选择图片失败!',duration:2000 }).show();
          }
        });
      },
      _select_mem(i){
        this.list.students[i]['active'] = !this.list.students[i]['active'];
        console.log(this.list.students[i]['active'])
      },
      _select_mem_all(){
        this.list.students.forEach((item)=>{ item['active'] = (this.isAllActive == true) ? false :true })
      },
      _del_pic(){
        this.params.pic = "";
      }
    },
    watch: {
      'list.students': {
        handler(val, olval){
          let arr = Arrays.filter(val,(item)=>{
            return !item['active']
          }) ;
          this.isAllActive  =   (arr.length == 0 )?   true :false ;

          let arrActive = [];
          val.forEach((item,i)=>{
            if(item['active']){
              arrActive.push(item['stuId'])
            }
          });
          this.params.stuIds = arrActive.join(',')

        },
        deep: true ,
        immediate:true
      }

    },

    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-padding__xl-x--bm  ">

    <div class="vc-margin--bm vc-bg vc-padding__lg--ad vc-padding__lg--tp">

      <div class="vc-padding__lg--bm">
        <div class="vc-text--bold ">收费主题</div>
        <div class="vp-input vc-margin--tp">
          <i class="vp-input__clear iconfont icon-quxiao vc-text--light" @click="params.title = ''" v-if=" params.title != ''"></i>
          <input type="text" class="vp-input__inner" maxlength="20" placeholder="请输入收费主题" v-model="params.title">
        </div>
      </div>

      <div class="vc-padding__lg--bm">
        <div class="vc-text--bold">收费详情</div>
        <div class="vp-textarea vc-margin--tp" >
          <textarea type="text"  placeholder="请输入收费详情" class=" vp-textarea__inner vp-textarea--theme" rows="4"   v-model="params.content" maxlength="100"></textarea>
          <span class="vp-textarea__count vc-text--gray">{{ params['content'] ? params['content'].length : 0  }}/100</span>
        </div>
      </div>

      <div class="vc-padding__lg--bm">
        <div class="vc-text--bold">收费金额</div>
        <div class="vp-input vc-margin--tp">
          <i class="vp-input__clear iconfont icon-quxiao vc-text--light" @click="params.fee = ''" v-if=" params.fee != ''"></i>
          <input type="number" class="vp-input__inner" maxlength="20" placeholder="请输入收费金额" v-model="params.fee">
        </div>
      </div>


      <div class="vc-padding__lg--bm">
        <div class="vc-text--bold">上传收费二维码</div>
        <div class=" vc-padding--ud vc-text--center vc-padding__xl-x--ad">
          <!--<i class="iconfont icon-shangchuan" style="font-size: 150px" @click="_select_pic"></i>-->
          <div class="" @click="_select_pic" v-if="!params.pic">
            <svg viewBox="0 0 1024 1024" version="1.1" p-id="1903" height="100%" width="100%" >
              <path xmlns="http://www.w3.org/2000/svg" d="M610.133333 912.213333h70.4v28.586667H610.133333zM224 83.626667H294.4v28.586666H224zM736.426667 83.626667h70.4v28.586666h-70.4zM911.786667 736.853333h28.586666v70.4h-28.586666zM911.786667 905.386667a6.826667 6.826667 0 0 1-6.826667 6.826666h-42.666667V938.666667h56.32a21.333333 21.333333 0 0 0 21.333334-21.333334v-54.186666h-28.586667zM350.293333 912.213333h77.653334v28.586667H350.293333zM483.84 912.213333h70.4v28.586667h-70.4zM610.133333 83.626667h70.4v28.586666H610.133333zM919.04 85.333333h-56.32v28.586667h42.666667a6.4 6.4 0 0 1 4.693333 0 6.4 6.4 0 0 1 0 4.693333v49.92H938.666667V104.96a21.333333 21.333333 0 0 0-19.626667-19.626667zM911.786667 224.426667h28.586666v70.4h-28.586666zM911.786667 350.72h28.586666v77.653333h-28.586666zM911.786667 610.133333h28.586666v70.4h-28.586666zM911.786667 483.84h28.586666v70.4h-28.586666zM736.426667 912.213333h70.4v28.586667h-70.4zM83.626667 350.72h28.586666v77.653333h-28.586666zM83.626667 224.426667h28.586666v70.4h-28.586666zM83.626667 483.84h28.586666v70.4h-28.586666zM350.293333 83.626667h77.653334v28.586666H350.293333zM483.84 83.626667h70.4v28.586666h-70.4zM224 912.213333H294.4v28.586667H224zM83.626667 610.133333h28.586666v70.4h-28.586666zM83.626667 736.853333h28.586666v70.4h-28.586666zM111.786667 905.386667v-42.666667H85.333333v56.32a21.333333 21.333333 0 0 0 21.333334 21.333333h61.44v-28.586666H118.613333a6.826667 6.826667 0 0 1-6.826666-6.4zM85.333333 104.96v63.573333h28.586667V119.04a6.826667 6.826667 0 0 1 6.826667-6.826667h47.36V85.333333H104.96a21.333333 21.333333 0 0 0-19.626667 19.626667zM682.666667 499.2h-157.44V341.333333a13.226667 13.226667 0 1 0-26.026667 0v157.866667H341.333333a13.226667 13.226667 0 1 0 0 26.026667h157.44V682.666667a13.226667 13.226667 0 1 0 26.026667 0v-157.44H682.666667a13.226667 13.226667 0 0 0 0-26.026667z" fill="#707070" p-id="6095"/>
            </svg>
          </div>
          <div class="vc-padding__lg" v-else >
            <div class="vp-ratio" >
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner vp-img__inner">
                  <img :src="params.pic" alt="" class="vp-img--cover">
                </div>
                <div class="vp-img__close" @click="_del_pic"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="vc-padding__lg--bm">
        <div class="vc-flex--between-center">
          <div class="vc-text--bold">收费名单</div>
          <div class="vp-icon__outer" @click="_select_mem_all" v-if="list.students.length > 0 ">
            <div class="vp-icon__select " :class="{'vp-icon__select--active':isAllActive}" ></div>
            <div class="vc-text--light vc-text--bold vc-margin--lt">全选</div>
          </div>
        </div>

        <div class="vc-margin--tp">
          <div class="vc-padding__lg--ad"  >

            <template v-if="list.students.length > 0">
              <div class="vc-flex vc-items--center vc-padding__lg vc-border--bm" v-for="(item,i) in list.students" @click="_select_mem(i)" >
                <div class="vp-icon__select " :class="{'vp-icon__select--active':item['active']}" ></div>
                <span class="vc-text--bold vc-margin--lt">{{ item['stuName'] }}</span>
              </div>
            </template>
            <template v-else>
              <div>班级尚未有学生</div>
            </template>



          </div>
        </div>

      </div>

    </div>



    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white vc-text--lg" @click="_save_cost">提交</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
