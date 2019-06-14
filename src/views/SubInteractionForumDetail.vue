<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import { VaShare }  from './component'
  import bbs  from './mixin/bbs'
  import interaction from "./mixin/interaction";
  import { show_picture,set_wx_share } from '../js/vue.wx';
  export default {
    name: "",
    components: { VaShare },
    mixins: [ bbs ,interaction],
    data() {
      return {
        params:{
          bbsId:'',
          fromPage:'',
        }
      }
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.params.fromPage = this.$route.query['fromPage'] || 'normal';
        this.params.bbsId = this.$route.query['bbsId'];
        await this.$get_bbs_detail(this.params);

        let shareObj = {
          title:this.bbs.detail['title'],
          desc: this.bbs.detail['content'],
          imgUrl:'',
          link:`${this.$configs['HTTP_WEB'] }?/SubInteractionForumDetail?bbsId=${this.params.bbsId}`
        };
        console.log(shareObj)
        setTimeout(()=>{
          set_wx_share(shareObj)
        },100)

      },
      _show_picture(pics,pic){
        show_picture(pics,pic)
      },
      _del_bbs(){
        this.$dialog.confirm({
          title:'确认信息',
          message:'是否确定删除黑板?'
        }).then(()=>{
          this.$delete_bbs(this.params).then(()=>{
            this.$createToast({message:'黑板删除成功!',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            },800)
          })
        })
      },
      _edit_bbs(){
        this.$router.push({ name : 'SubInteractionForumEdit',query:{ type:'update',bbsId : this.params.bbsId  } })
      },
      _operate(type) {
        if (type == "dianZan") {
          if (this.bbs.detail["dianZanStatus"] == 1) {
            this.$createToast({ message: "已点赞!", duration: 2000 }).show();
          } else {
            this.$save_comment_dianzan({ bbsId: this.params["bbsId"] }).then(()=>{
              this.$get_bbs_detail(this.params)
            });
          }
        } else if (type == "redFlower") {
          this.$save_comment_folower({ bbsId: this.params["bbsId"] }).then(()=>{
            this.$get_bbs_detail(this.params)
          });
        }
      },

    },
    watch: {
      '': {
        handler(val, olval) {

        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
<div>
  <VaShare v-model="popups[0]"> </VaShare>
  <template >
    <div class="vc-fluid--h-min vc-bg " :class="{'vc-padding__xl-x--bm':params.fromPage !== 'SubResourceDetail'}">
       <div class="vc-padding__lg" >
         <div class="vc-margin__lg--bm" v-if="bbs.detail['title']">
           <div class="vc-text--bold vc-padding--bm vc-margin--bm vc-border--bm ">黑板标题</div>
           <div class="vc-text--baseline--md vc-text--wrap" vc-text--wrap>{{ bbs.detail['title'] }}</div>
         </div>

         <div class="vc-margin__lg--bm" v-if="bbs.detail['content']">
           <div class="vc-text--bold vc-padding--bm vc-margin--bm vc-border--bm ">黑板内容</div>
           <pre class="vc-text--baseline--md vc-text--wrap" v-html=" bbs.detail['content'] "> </pre>
         </div>

         <div class="vc-margin__lg--bm" v-if="bbs.detail['linkUrl']">
           <div class="vc-text--bold vc-padding--bm vc-margin--bm vc-border--bm ">黑板链接</div>
           <div>
             点击我：<a :href="bbs.detail['linkUrl']" class="vc-text--wrap vc-text--baseline--md"> {{ bbs.detail['linkUrl'] }} </a>
           </div>
         </div>

         <div class="vc-margin__lg--bm" v-if="bbs.detail['pics']">
           <div class="vc-text--bold vc-padding--bm vc-margin--bm  vc-border--bm">图片</div>
           <div class="vc-row" data-gutter="10">
             <div class="vc-col--08 vc-padding--bm" v-for="(pic,p) in bbs.detail['pics'] && bbs.detail['pics'].split(',')"  @click="_show_picture(bbs.detail['pics'].split(','),pic)">
               <div class="vp-ratio" >
                 <div class="vp-ratio__outer" data-ratio="92:66">
                   <div class="vp-ratio__inner">
                     <div class="vp-img__inner  " >
                       <img  :src="pic" alt=""  @load="_pub_img_load">
                       <img src="../img/img-error.png" alt="" class="vp-img--error vp-img--half">
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

      <template v-if="params.fromPage !== 'SubResourceDetail'">
        <div class="vp-footer vp-footer--shadow">
          <div class="vc-flex vp-row" >
            <template v-if="bbs.detail['editFlag'] == 1 && userMessage['memType'] == 1">
              <div class="vc-flex--aut   vp-btn__simple vp-btn--danger" @click="_del_bbs">删除</div>
              <div class="vc-flex--aut   vp-btn__simple vp-btn--theme" @click="_edit_bbs">编辑</div>
            </template>
            <template>
              <div class="vc-flex--aut   vp-btn__simple vp-btn--warning" @click="popups[0] = true ">分享</div>
              <div class="vc-flex--aut vc-bg vp-icon__outer"  @click="_operate('dianZan')">
                <i class="iconfont icon-dianzan  vc-text--xl" :class="{ 'vc-text--gray':bbs.detail['dianZanStatus'] == 0 ,'vc-text--theme':bbs.detail['dianZanStatus'] == 1  }"></i>
                <span class="vc-margin__sm--lt vc-text--bold" :class="{ 'vc-text--gray':bbs.detail['dianZanStatus'] == 0 ,'vc-text--theme':bbs.detail['dianZanStatus'] == 1  }">{{ bbs.detail['dianZan']}}</span>
              </div>
              <div class="vc-flex--aut vc-bg vp-icon__outer" @click="_operate('redFlower')">
                <i class="iconfont icon-hua vc-text--danger vc-text--xl"></i>
                <span class="vc-margin__sm--lt vc-text--danger vc-text--bold">{{ bbs.detail['redFlower']}}</span>
              </div>
            </template>
          </div>
        </div>
      </template>


    </div>
  </template>
</div>
</template>
<style scoped></style>
