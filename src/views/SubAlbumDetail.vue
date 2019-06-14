<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import { show_picture } from '../js/vue.wx';
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
        params:{
          photoId:'',
          editFlag:''
        },
        photo:{
          list:[]
        }
      }
    },
    methods: {
      async _init_page() {
        this.params = JSON.parse(sessionStorage.getItem('selectAlbum'));
        this.$get_album_detail( this.params ).then((res)=>{
          let pics = res['data']['photoList'];
          this.params.editFlag = res['data']['editFlag'];
          this.photo.list = pics;
        })
      },
      _show_picture(index){

        let pic = this.photo.list[index]['pic'];
        let pics = [];
        this.photo.list.forEach((item,i)=>{
          pics.push(item['pic'])
        });
        console.log(pics);
        console.log(pic);
        show_picture(pics,pic)
      },
      _delete_album(){
        this.$dialog.confirm({
          title:'确认提示',
          message:'是否确认删除【'+this.params['photoName']+'】相册?',
        }).then(()=>{
          this.$delete_album(this.params).then(()=>{
            this.$createToast({message:'相册删除成功！',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            },800)
          })
        }).catch(()=>{})
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="">

    <template v-if="photo.list.length > 0">
      <div class="vc-padding__xl-x--bm vc-fluid--h-min vc-bg">
        <div class="vc-row" >
          <div      class="vc-col--06"  v-for="(item,k) in photo.list" @click="_show_picture(k)">
            <div class="vp-ratio">
              <div class="vp-ratio__outer" data-ratio="100%">
                <div class="vp-ratio__inner">
                  <div class="vp-img__inner  ">
                    <img :src="item['pic']" alt=""  @load="_pub_img_load" class=" ">
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
          <div class="vc-text--light vc-text--center vc-padding__lg--ud">相册暂无图片~~</div>
        </div>
      </div>
    </template>



    <div class="vp-footer vp-footer--shadow" v-if="!!params.editFlag ">
      <div class="vc-flex vp-row" >
        <div class="vc-flex--aut   vp-btn__simple vp-btn--danger" @click="_delete_album">删除相册</div>
        <router-link tag="div" :to="{name :'SubAlbumEdit',query:{ edit:'update' }}" class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border">编辑相册</router-link>
        <router-link tag="div" :to="{name :'SubAlbumManager' }" class="vc-flex--aut   vp-btn__simple vp-btn--theme">编辑图片</router-link>
      </div>
    </div>

  </div>

</template>
<style scoped></style>
