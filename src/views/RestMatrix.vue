<script type="text/ecmascript-6">
  import { VaPopupRadio }  from './component'
  import jz  from './mixin/jz'
  export default {
    name: "RestMatrix", // 其他的一些小页面
    components: { VaPopupRadio },
    mixins: [ jz ],
    data() {
      return {
        params:{
          typeId:'',
          areaId:'',
          areaName:''
        }
      }
    },
    mounted() {
      console.log('sdsd')
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page() {
          this.params.typeId = this.$route.query['typeId'] || '2';
          await this.$get_province_list();
          await this.$get_jz_list(this.params).then((res)=>{
            document.title = res['data'] && res['data']['typeInfo'] && res['data']['typeInfo']['typeName'];
          });
      },
      _select_radio(value){

        this.params.areaId = value['value'];
        this.params.areaName = value['text'];
        this.$get_jz_list(this.params).then((res)=>{});
      },
      _clear_province(){
        this.params.areaId = '';
        this.params.areaName = '';
        this.$get_jz_list(this.params).then((res)=>{});
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
<div class="vc-fluid--h-min vc-bg vc-padding__xl-x--tp">
  <VaPopupRadio :options="province.list" position="right" v-model="popups[0]" @select="_select_radio($event,'province')"></VaPopupRadio>

  <div class="vc-padding__lg--ud vc-padding__xl--ad">
    <div class="vp-header vp-header--shadow vc-bg">
      <div class="vp-row vc-flex--center" >
        <span class="vc-text--bold" v-if="!params.areaId" @click="popups[0] = true " >请选择省份</span>
        <div class="vc-text--bold" v-else>
          <span class="vc-text--bold vc-margin--rt" @click="popups[0] = true " >{{ params.areaName }}</span>
          <i class="iconfont icon-shanchu1" @click="_clear_province"></i>
        </div>
      </div>
    </div>

    <div class="vc-row" data-gutter="40" v-if="jz.list.length > 0 ">
      <a class="vc-col--12 vc-margin__lg--bm" v-for="(item,index) in jz.list" :href="item['url']">
        <div class="vp-ratio">
          <div class="vp-ratio__outer vc-margin--bm" data-ratio="100%">
            <div class="vp-ratio__inner">
              <div class="vp-img__inner vp-img__head" data-round="100%">
                <img :src="item['pic']" alt="" @load="_pub_img_load">
                <img src="../img/img-error-loading.png" alt="" class="vp-img--error vp-img--half ">
              </div>
            </div>
          </div>
          <div class="vc-text--center ">
            <p class="vc-text--bold vc-text--ellipsis vc-text--dark">{{ item['name']}}</p>
          </div>
        </div>
      </a>
    </div>

    <div class="vc-flex--center vc-text--light" v-else>
      暂无矩阵数据
    </div>


  </div>

</div>
</template>
<style scoped></style>
