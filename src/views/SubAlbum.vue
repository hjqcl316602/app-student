<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import album  from './mixin/album'
  export default {
    name: "",
    components: {},
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
        album:{
          typeMy:[],
          typeClass:[],
          typeShare:[]
        }
      }
    },
    methods: {
      async _init_page() {

        this.$get_album_list().then((res)=>{
          let photo = res['data'];
          this.album.typeMy = [];
          this.album.typeClass = [];
          this.album.typeShare = [];
          photo.forEach((item,i)=>{
            if(item['type'] == 2){
              this.album.typeMy.push(item)
            }else if(item['type'] == 1){
              this.album.typeClass.push(item)
            }else if(item['type'] == 3){
              this.album.typeShare.push(item)
            }
          })
        });
        //this.$create_album({ photoName:'春游记录',photoType:1})

      },
      _select_album(item){
        sessionStorage.setItem('selectAlbum',JSON.stringify(item));
        this.$router.push({ name :'SubAlbumDetail' })
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="">

    <template v-if="!( album.typeMy.length == 0 && album.typeClass.length == 0 && album.typeShare.length == 0 )">
      <div class="vc-padding__xl-x--bm">


        <div class="vc-bg vc-padding__lg vc-margin--bm" v-if="album.typeClass.length > 0">
          <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">
            班级相册
          </div>
          <div class="vc-row" data-gutter="20">
            <div  tag='div' @click="_select_album(item)" class="vc-col--08 vc-margin--bm"  v-for="(item,k) in album.typeClass" :key="k" >
              <div class="vp-ratio">
                <div class="vp-ratio__outer" data-ratio="100%">
                  <div class="vp-ratio__inner">
                    <div class="vp-img__inner vc-radius--lg vp-img--border" >
                      <img :src="item['pic']" alt=""  @load="_pub_img_load">
                      <img src="../img/img-error.png" alt="" class="vp-img--error vp-img--half">
                    </div>
                  </div>
                </div>
              </div>
              <div class="vc-padding--ud vc-text--ellipsis vc-text--center">
                {{ item['photoName']}}
              </div>
            </div>
          </div>
        </div>

        <div class="vc-bg vc-padding__lg vc-margin--bm" v-if="album.typeMy.length > 0">
          <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">
            个人相册
          </div>
          <div class="vc-row" data-gutter="20">
            <div tag='div'   class="vc-col--08 vc-margin--bm"  v-for="(item,k) in album.typeMy" :key="k" @click="_select_album(item)">
              <div class="vp-ratio">
                <div class="vp-ratio__outer" data-ratio="100%">
                  <div class="vp-ratio__inner">
                    <div class="vp-img__inner vc-radius--lg vp-img--border"  >
                      <img :src="item['pic']" alt=""  @load="_pub_img_load">
                      <img src="../img/img-error.png" alt="" class="vp-img--error vp-img--half">
                    </div>
                  </div>
                </div>
              </div>
              <div class="vc-padding--ud vc-text--ellipsis vc-text--center">
                {{item['photoName']}}
              </div>
            </div>
          </div>
        </div>

        <div class="vc-bg vc-padding__lg vc-margin--bm" v-if="album.typeShare.length > 0">
          <div class="vc-text--bold vc-margin--bm vc-padding--bm vc-border--bm">
            共享相册
          </div>
          <div class="vc-row" data-gutter="20">
            <div  tag='div' @click="_select_album(item)" class="vc-col--08 vc-margin--bm"  v-for="(item,k) in album.typeShare" :key="k">
              <div class="vp-ratio">
                <div class="vp-ratio__outer" data-ratio="100%">
                  <div class="vp-ratio__inner">
                    <div class="vp-img__inner vc-radius--lg vp-img--border"  >
                      <img :src="item['pic']" alt=""  @load="_pub_img_load">
                      <img src="../img/img-error.png" alt="" class="vp-img--error vp-img--half">
                    </div>
                  </div>
                </div>
              </div>
              <div class="vc-padding--ud vc-text--ellipsis vc-text--center">
                {{ item['photoName'] }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-else>
      <div class="  vc-bg vc-fluid vc-flex--center" >
        <div class="" >
          <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无相册，去添加吧~~</div>
        </div>
      </div>
    </template>


    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >

        <router-link tag="div" :to="{name :'SubAlbumEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme ">新建相册</router-link>

      </div>
    </div>
  </div>
</template>
<style scoped></style>
