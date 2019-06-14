<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import user from './mixin/user'

  export default {
    name: "",
    components: {},
    mixins: [user],

    data() {
      return {}
    },

    activated() {
      this._init_page();
    },
    props: {},

    methods: {
      async _init_page() {
        await this.$get_user_news()
      },
      _load_more_news() {
        this.$get_user_news(true,false)
      },
      _read_new_detail(item,index){
        sessionStorage.setItem('selectNews',JSON.stringify(item));
        if(item['rd'] == 0){
          this.$read_message({ msgId:item['id']}).then(()=>{
            this.message.list[index]['rd'] = 1;
          });
        }

        this.$router.push({ name :'SubUserNewsDetail' })

      },
      _delete_msg(item,index){
        this.$dialog.confirm({
          title:'确认信息',
          message:'是否确认删除系统消息【'+item['title']+'】?'
        }).then(()=>{
          this.$delete_message({ msgId:item['id']}).then(()=>{
            this.$createToast({message:'系统消息删除成功！',duration:2000}).show();
            this.$get_user_news()
          })
        })
      }

    },

  }
</script>
<template>
  <div>
    <template v-if="message.list.length > 0 ">

      <van-cell-swipe :right-width="100" v-for="(item,index) in message.list"  :key="index">
        <div   @click="_read_new_detail(item,index)"
             >
          <div class="vc-padding__lg vc-bg  vc-margin--bm">
            <div class="vc-flex">
              <div class="vp-badge">
                <div class="vp-img__inner vp-img__head" data-round="30">
                  <img src="" alt="">
                  <img src="../img/icon-notice.png" alt="" class="vp-img--error">
                </div>
                <div class="vp-badge__spot" v-if="item['rd'] == 0 "></div>
              </div>

              <div class="vc-margin--lt vc-flex--fit">
                <div class="vc-flex--between-center vc-padding--tp">
                  <span class="vc-text--bold">{{ item['title'] }}</span>
                  <span class="vc-text--gray vc-text--sm">{{ item['time']}}</span>
                </div>
                <div class=" vc-padding--tp">
                  <p class="vc-text--light vc-text--baseline--md vc-text--clamp">{{ item['message'] }}</p>
                </div>

              </div>

            </div>
          </div>
        </div>
        <div slot="right" style="width: 100px" class="vp-btn__simple vp-btn--danger" @click="_delete_msg(item)">删除</div>
      </van-cell-swipe>



      <va-load-more v-if="message.list.length >= message.pageSize"  :finished="message.push.finished" :loading="message.push.loading" msg="暂无更多消息~~" @load="_load_more_news"></va-load-more>

    </template>
    <template v-else>
      <div class="  vc-bg vc-fluid vc-flex--center" >
        <div class="" >
          <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无系统消息~~</div>
        </div>
      </div>
    </template>

  </div>

</template>
<style scoped></style>
