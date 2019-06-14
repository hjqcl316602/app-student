<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  import { VaPopupRadio }  from './component'
  import album  from './mixin/album'
  export default {
    name: "",
    components: { VaPopupRadio },
    mixins: [ album ],
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
        options:{
          type:[ { text:'个人相册',value:'1' },{ text:'班级相册',value:'2'}],
          mem:[],
          types: ['公开','私密','部分可见']
        },
        params:{
          edit:'insert',
          photoId:'',
          photoName:'',
          photoType:'',
          photoTypeName:'',
          memIds:''
        },

      }
    },
    methods: {
      async _init_page() {

        this.params.edit = this.$route.query['edit'] || 'insert';

        if(this.params.edit == 'update'){
          let selectAlbum = JSON.parse(sessionStorage.getItem('selectAlbum'));
          this.params.photoId = selectAlbum['photoId'];
          this.params.photoName = selectAlbum['photoName'];
          this.params.photoType = selectAlbum['type'];
          if(!Valids.isEmptyString(selectAlbum['memIds'])){
            this.params.photoType = 3;
          }

          this.params.photoTypeName = this.options.types[this.params.photoType];

          if(this.params.photoType == 2 || this.params.photoType == 3){
            let memIds = selectAlbum['memIds'].split(',');

            await  this.$get_album_student().then((res)=>{
              let mem = res['data'];

              mem.forEach((item,i)=>{
                let obj = {
                  memId:item['memId'],
                  memName:item['memName'],
                };
                if(memIds.indexOf(item['memId'].toString()) > -1){
                  obj['select'] = true ;
                }else{
                  obj['select'] = false ;
                }
                this.options.mem.push(obj)
              });
            })
          }

        } else{
          await  this.$get_album_student().then((res)=>{
            let mem = res['data'];

            mem.forEach((item,i)=>{
              let obj = {
                memId:item['memId'],
                memName:item['memName'],
                select:false
              };
              this.options.mem.push(obj)
            });
          })
        }



      },
      _save_pic(){

        if(this.params.photoType == 3){
          let arr = [];
          this.options.mem.forEach((item,i)=>{
            if(item['select']){
              arr.push(item['memId'])
            }
          });
          this.params.memIds = arr.join(',');
        }
        if(this.params.edit == 'insert'){

          if(this.userMessage['memType'] == 1){
            this.params['photoType'] = 1;
            this.params.memIds = '';
            this.$create_album(this.params).then(()=>{
              this.$createToast({ message:'新增相册成功!',duration:2000}).show();
              setTimeout(()=>{
                this.$router.go(-1);
                this.$destroy()
              },800)
            })
          }else if(this.userMessage['memType'] == 2){
            this.params.photoType = 2 ;
            this.$create_album(this.params).then(()=>{
              this.$createToast({ message:'新增相册成功!',duration:2000}).show();
              setTimeout(()=>{
                this.$router.go(-1);
                this.$destroy()
              },800)
            })
          }

        }else if(this.params.edit == 'update'){
          this.params.photoType = (this.params.photoType = 3)?2:this.params.photoType;
          this.$update_album(this.params).then(()=>{
            this.$createToast({ message:'修改相册成功!',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-2);
              this.$destroy()
            },800)
          })
        }

      },
      _select_mem(i){
        this.options.mem[i]['select'] = !this.options.mem[i]['select'];
      }

    },
    watch: {
      ['params.photoType'](val){
        this.params.photoTypeName = this.options['types'][val-1]
      }
    },
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg vc-padding__lg">

    <VaPopupRadio :options="options.type" position="right" v-model="popups[0]" @select="_select_radio($event,'sex')"></VaPopupRadio>

    <van-popup position="bottom" v-model="popups[1]">
      <div class="">



        <div class="vc-fluid vc-padding__xl-x--bm   vc-bg vc-flow" >
          <div class="">

            <!--<template v-if="userMessage['memType'] == 1">
              <div class="vc-padding__lg vc-flex vc-border&#45;&#45;bm vc-items&#45;&#45;center" @click="params.photoType = 1">
                <div class="iconfont icon-gou " :class="{'vc-text&#45;&#45;theme':params.photoType == 1 ,'vc-text&#45;&#45;shadow':params.photoType != 1}"></div>
                <div class="vc-margin&#45;&#45;lt">
                  <p class="vc-text&#45;&#45;bold">公开</p>
                  <p class="vc-text&#45;&#45;gray vc-text&#45;&#45;sm">所有人可见</p>
                </div>
              </div>
            </template>-->

            <template v-if="userMessage['memType'] == 2">
              <div class="vc-padding__lg vc-flex vc-border--bm vc-items--center" @click="params.photoType = 2">
                <div class="iconfont icon-gou ":class="{'vc-text--theme':params.photoType == 2 ,'vc-text--shadow':params.photoType != 2}"></div>
                <div class="vc-margin--lt">
                  <p class="vc-text--bold">私密</p>
                  <p class="vc-text--gray vc-text--sm">仅自己可见</p>
                </div>
              </div>
            </template>


            <div class="vc-padding__lg vc-flex vc-border--bm vc-items--center vc-content--between" @click="params.photoType = 3">
              <div class="vc-flex vc-items--center">
                <div class="iconfont icon-gou ":class="{'vc-text--theme':params.photoType == 3 ,'vc-text--shadow':params.photoType != 3}"></div>
                <div class="vc-margin--lt">
                  <p class="vc-text--bold">部分可见</p>
                  <p class="vc-text--gray vc-text--sm">选定人可见</p>
                </div>
              </div>
              <div class="iconfont icon-arrow  vp-transform " :class="{'vp-rotate--y':params.photoType == 3}"></div>
            </div>

            <transition name="vt-fade">
              <div class="vc-padding__lg--ad" v-show="params.photoType == 3" >
                <div class="vc-flex vc-items--center vc-padding__lg vc-border--bm" v-for="(item,i) in options.mem" @click="_select_mem(i)" >
                  <div class="vp-icon__select " :class="{'vp-icon__select--active':item['select'] }" ></div>
                  <span class="vc-text--bold vc-margin--lt">{{ item['memName']}}</span>
                </div>
              </div>
            </transition>

          </div>
        </div>

        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row" >
            <div  class=" vp-btn__simple vp-btn--white " @click="popups[1] = false">完成</div>
          </div>
        </div>

      </div>
    </van-popup>

    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-margin--bm">相册名称</div>
      <div class="vp-input vc-margin--bm">
        <input type="text"  placeholder="请输入相册名称" class="vp-input__inner" v-model="params['photoName']">
      </div>
    </div>

    <!--    <div class="vc-margin__lg&#45;&#45;bm">
          <div class="vc-text&#45;&#45;bold vc-text&#45;&#45;lg vc-padding&#45;&#45;ud">相册从属</div>
          <div class="vp-row&#45;&#45;sm vc-bor&#45;&#45;theme-light vc-bg&#45;&#45;theme&#45;&#45;gray vc-radius ">
            <div class="vc-cover vc-padding&#45;&#45;ad vc-flex vc-items&#45;&#45;center vc-content&#45;&#45;between" @click="popups[0]=true">
              <span class="vc-text&#45;&#45;bold vc-text&#45;&#45;gray" v-if="!params.photoBelongToName">请选择相册从属</span>
              <span class="vc-text&#45;&#45;bold " v-if="!!params.photoBelongToName">{{ params.photoBelongToName }}</span>
              <i class="iconfont icon-iconfontjiantou2 vc-text&#45;&#45;bold vc-text&#45;&#45;gray"></i>
            </div>
          </div>
        </div>-->

    <template v-if="userMessage['memType'] == 2">
      <div class="vc-margin__lg--bm" >
        <div class="vc-text--bold vc-margin--bm">权限</div>
        <div class="vp-row--sm vc-bor--theme-light vc-bg--theme--gray vc-radius ">
          <div class="vc-cover vc-padding--ad vc-flex vc-items--center vc-content--between" @click="popups[1]=true">
            <span class="vc-text--bold vc-text--gray" v-if="!params.photoTypeName">请选择权限</span>
            <span class="vc-text--bold " v-if="!!params.photoTypeName">{{ params.photoTypeName }}</span>
            <i class="iconfont icon-iconfontjiantou2 vc-text--bold vc-text--gray"></i>
          </div>
        </div>
      </div>
    </template>


    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white "  @click="_save_pic">提交</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
