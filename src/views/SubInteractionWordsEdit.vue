<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import interaction  from './mixin/interaction'
  export default {
    name: "",
    components: {},
    mixins: [ interaction ],
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
        params:{ liuYanId : '',msg:'',recId:'',},
        touch:{
          timer:null,
          startTime:'',
          endTime:'',
          liuYanId:'',
          liuYanMsgId:'',
          isRevoke:true
        }
      }
    },
    methods: {
      async _init_page() {


        this.params.liuYanId = sessionStorage.getItem('liuYan-liuYanId');
        this.params.recId = sessionStorage.getItem('liuYan-recId');

        document.title = sessionStorage.getItem('liuYan-chengHu');

        // 先得到留言id在继续查找
        await  this.$get_new_id({ memId : this.params.recId }).then((res)=>{
          this.params.liuYanId = res['data']['liuYanId'];
        });

        if(this.params.liuYanId != 0){
          await  this.$request_get_news_detail_list(this.params,false);
          this.$nextTick(()=>{
            Scrolls.setScrollToBottom()
          })
        }else{
          this.newsDetail.list = [];
        }

      },
      _send_msg(){
        if(Valids.isEmptyString( this.params.msg)){
          this.$createToast({message:'请输入您的留言信息!',duration:2000}).show();
        }else{
          if(this.userMessage['memType'] == 1){
            this.$create_news_teacher(this.params).then((response)=>{
              this.params.msg = '';
              sessionStorage.setItem('liuYan-liuYanId',response['data']['liuYanId']);
              this._init_page()
            });
          }else if(this.userMessage['memType'] == 2){
            this.$create_news_parent(this.params).then((response)=>{
              this.params.msg = '';
              sessionStorage.setItem('liuYan-liuYanId',response['data']['liuYanId']);
              this._init_page()
            });
          }

        }
      },
      _deal_new(item){
        this.$request_deal_news({ liuYanMsgId :item['msgId']}).then(()=>{
          this.$createToast({message:'处理留言信息成功!',duration:2000}).show();
          this.$request_get_news_detail_list(this.params,false).then(()=>{
            this.$nextTick(()=>{
              Scrolls.setScrollToBottom()
            })
          });
        })
      },
      _send_flower(item){
        this.$request_send_flower(this.params).then(()=>{
          this.$createToast({message:'感谢您对老师的支持，老师将收到您送1朵小红花！',duration:3500}).show();
          this.$request_get_news_detail_list(this.params,false).then(()=>{
            Scrolls.setScrollToBottom()
          })
        })
      },

      _delete_news_start(item){
        //this.touch.startTime = +new Date();
        clearTimeout(this.touch.timer)
        this.touch.timer = setTimeout(()=>{

          this.touch.liuYanId = item['liuYanId'];
          this.touch.liuYanMsgId = item['msgId'];

          this.touch.isRevoke = false;
          this.$delete_new_flag(this.touch).then((response)=>{
            this.touch.isRevoke = response['data'];
            this.popups[0] = true;
          });

        },1000)
      },
      _delete_news_end(){
        clearTimeout(this.touch.timer)
      },
      _delete_new(type){
        this.popups[0] = false;
        if(type == 'clear'){
          this.$delete_news(this.touch).then(()=>{
            this.$request_get_news_detail_list(this.params,false).then(()=>{
              Scrolls.setScrollToBottom()
            })
          })
        }else if(type == 'revoke'){
          this.$delete_new(this.touch).then(()=>{
            this.$request_get_news_detail_list(this.params,false).then(()=>{
              Scrolls.setScrollToBottom()
            })
          })
        }
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-padding__lg"  >

    <van-popup   v-model="popups[0]">
      <div class="vc-padding__lg--ad">
        <div class="vp-row vc-flex--center  vc-text--bold vc-text--theme" @click="_delete_new('clear')">清空留言</div>
        <div class="vp-row vc-flex--center vc-text--bold vc-text--theme vc-border--tp" @click="_delete_new('revoke')" v-if="touch.isRevoke">撤回留言</div>
      </div>
    </van-popup>

    <div class="vc-padding__xl-x--bm">
      <div v-for="item in newsDetail.list">

        <template v-if="userMessage['memType'] == 1">

          <template v-if="item['type'] == 1">

            <div class="vc-flex vc-padding__xl-x--rt vc-margin--bm">
              <div class="vc-margin--rt">
                <div class="vp-img__inner vp-img__head " data-round="35">
                  <img :src="item['photo']" alt="" class="vp-img--max">
                  <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
                </div>

              </div>

              <div class="vc-flex--fit vc-padding--tp" >
                <div class="vc-flex vc-items--center">
                  <div class="vi-chart--item left"  >
                    <div class="vc-padding  vc-text--baseline--md vc-bg vp-radius--bottom  vp-radius--top-right vp-shadow vc-text--lg vc-text--break"  >
                      {{ item['msg']}}
                      <div class="vc-text--gray vc-text--sm">{{ item['time']}}</div>
                    </div>
                  </div>
                  <div class="vp-btn__oper vp-btn--ing vc-margin--lt" v-if="item['status'] == 0" @click="_deal_new(item)">处理</div>
                  <div class="vp-btn__oper vp-btn--disabled vc-margin--lt" v-if="item['status'] == 1">已处理</div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="item['type'] == 3">

            <div class="vc-margin__lg--bm vc-padding--tp">
              <div class="vc-flex--center ">
                <div class="vp-btn__status vp-btn--ing">{{ item['msg']}}</div>
              </div>
            </div>

          </template>

          <template v-if="item['type'] == 2">
            <div class="vc-flex--center">

            </div>
            <div class="vc-flex vc-padding__xl-x--lt vc-margin--bm" >

              <div class="vc-flex--fit vc-padding--tp">

                <div class="vc-flex vc-content--end">
                  <div class="vi-chart--item right"  @touchstart.stop.prevent="_delete_news_start(item)" @touchend.stop.prevent="_delete_news_end(item)">
                    <div class="vc-padding  vc-text--baseline--md vc-bg vp-radius--bottom  vp-radius--top-left vp-shadow vc-text--break" >
                      {{ item['msg']}}
                      <div class="vc-text--gray vc-text--sm vc-text--right">{{ item['time']}}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="vp-img__inner vp-img__head vc-margin--lt" data-round="35">
                <img :src="item['photo']" alt="" class="vp-img--max">
                <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
              </div>

            </div>
          </template>

        </template>

        <template v-if="userMessage['memType'] == 2">

          <template v-if="item['type'] == 2">

            <div class="vc-flex vc-padding__xl-x--rt vc-margin--bm">
              <div class="vp-img__inner vp-img__head vc-margin--rt" data-round="35">
                <img :src="item['photo']" alt="" class="vp-img--max">
                <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
              </div>
              <div class="vc-flex--fit vc-padding--tp">
                <div class="vc-flex vc-items--center">
                  <div class="vi-chart--item left"   >
                    <div class="vc-padding  vc-text--baseline--md vc-bg vp-radius--bottom  vp-radius--top-right vp-shadow vc-text--lg vc-text--break"  >
                      {{ item['msg']}}
                      <div class="vc-text--gray vc-text--sm">{{ item['time']}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="item['type'] == 1">
            <div class="vc-flex--center">

            </div>
            <div class="vc-flex vc-padding__xl-x--lt vc-margin--bm">
              <div class="vc-flex--fit vc-padding--tp">

                <div class="vc-flex vc-content--end vc-items--center">
                  <div class="vp-btn__oper vp-btn--disabled vc-margin--rt"  v-if="item['status'] == 1 ">已处理</div>

                  <div class="vi-chart--item right"   @touchstart.stop.prevent="_delete_news_start(item)" @touchend.stop.prevent="_delete_news_end(item)">
                    <div class="vc-padding  vc-text--baseline--md vc-bg vp-radius--bottom  vp-radius--top-left vp-shadow vc-text--break" >
                      {{ item['msg']}}
                      <div class="vc-text--gray vc-text--sm vc-text--right">{{ item['time']}}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="vp-img__inner vp-img__head vc-margin--lt" data-round="35">
                <img :src="item['photo']" alt="" class="vp-img--max">
                <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
              </div>

            </div>
          </template>

        </template>


      </div>

      <temlate v-if="userMessage['memType'] == 2 && params.liuYanId != 0 ">
        <div class="vc-flex vc-flex--center vc-margin--bm">
          <div class="vp-btn__oper vp-btn--warning vc-margin--lt"  @click="_send_flower">答谢</div>
        </div>
        <div class="vc-flex vc-flex--center vc-margin--bm">
          <div class="vc-text--aux  ">点击答谢，给老师送小红花1朵</div>
        </div>
      </temlate>

    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vc-items--center  vc-bg vc-padding__lg--ad vc-padding--ud" >
        <div class="vc-flex--fit">
          <van-field
            v-model="params.msg"
            type="textarea"
            placeholder="请输入留言"
            rows="1"
            :autosize="{ maxHeight:100 }"
            class="vc-text--lg"
          />
        </div>
        <div class="vc-padding--lt "><span class="vc-text--theme vc-text--bold" @click="_send_msg">发送</span></div>
      </div>
    </div>


  </div>
</template>
<style scoped></style>
