<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import open  from './mixin/open'
  import { show_picture } from '../js/vue.wx';
  export default {
    name: "SubResourcePhotoDetail",
    components: {},
    mixins: [ open ],
    data() {
      return {
        params:{
          photoId:''
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
          this.params.photoId = this.$route.query['photoId'];
          this.$get_photo_detail(this.params)
      },
      _show_picture(pic){
          let pics = [];
          this.photoDetail.list.forEach((item,i)=>{
            pics.push(item['pic'])
          })
        show_picture(pics,pic)
      }

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
    <template v-if="photoDetail.list.length > 0 ">
      <div class="vc-fluid--h-min vc-bg">
        <div class="vc-row" >
          <div class="vc-col--06"  v-for="(item,k) in photoDetail.list" @click="_show_picture(item['pic'])">
            <div class="vp-ratio">
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner">
                  <div class="vp-img__inner  ">
                    <img  :src="item['pic']" alt=""  @load="_pub_img_load" class=" ">
                    <img src="../img/img-error-loading.png" alt="" class="vp-img--error vp-img--half">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="  vc-bg vc-fluid vc-flex--center" >
        <div class="" >
          <div class="vc-text--light vc-text--center vc-padding__lg--ud">该相册暂无图片~~</div>
        </div>
      </div>
    </template>

  </div>
</template>
<style scoped></style>
