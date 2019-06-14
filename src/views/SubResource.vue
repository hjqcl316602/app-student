<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import basic  from './mixin/basic'
  import open  from './mixin/open'
  export default {
    name: "SubResource",
    components: {},
    mixins: [ basic , open ],
    data() {
      return {
        params:{
          area:'',
          areaName:'',
          search:'',
          load:false
        },
        columns:[]
      }
    },


    activated() {
      let  hisArea =   localStorage.getItem('hisAreaList') ? JSON.parse( localStorage.getItem('hisAreaList'))[0]: {name:'成都市',code:'2280'} ;
      this.params.area = hisArea['code'];
      this.params.areaName = hisArea['name'];
      console.log('activated')
      console.log(this.params)
      this._init_page()
    },
    methods: {
      _init_page() {
        this.$get_open_class_list(this.params,false,true)
      },
      _load_more_class(){
        this.$get_open_class_list(this.params,true,false)
      },

      // 地区相关
      object_format(obj){
        let arr = [];
        Object.keys(obj).forEach(key => {
          let newObj = {
            value:key,
            text:obj[key]
          };
          arr.push(newObj)
        });
        return arr;
      },
      _clear_address(){
        this.params.areaName =  '' ;
        this.params.area = '';
        this._init_page()
      },
      select_confirm(value){
        this.popups[0] = false;
        this.params.areaName = value[1]['text'] ;
        this.params.area = value[1]['value']  ;

        this._init_page()
      },
      init_address_list(){
        let province =this.areaList['0'];
        let new_province = this.object_format(province) ;
        let new_city = this.object_format(this.areaList['0,'+new_province[0]['value']]) ;
        //let new_county  = this.object_format(this.areaList['0,'+new_province[0]['value']+','+  new_city[0]['value']]) ;

        this.columns['0'] = {
          values:new_province,
          className: 'column1'
        };
        this.columns['1'] = {
          values:new_city,
          className: 'column2'
        };
        // this.columns['2'] = {
        //   values:new_county,
        //   className: 'column3'
        // };
      },
      change_select_address(pick,values,index,ii){

        if(index == 0){
          let provinceValue= values[0]['value'];
          let city = this.object_format(this.areaList['0,'+ provinceValue] );
          let county = this.object_format(this.areaList['0,'+ provinceValue+','+city[0]['value']] );
          pick.setColumnValues(1, city );
          pick.setColumnValues(2, county );
        }else if(index == 1 ){
          let provinceValue= values[0]['value'];
          let cityValue = values[1]['value'];
          let county = this.object_format(this.areaList['0,'+ provinceValue + ','+ cityValue ] );
          pick.setColumnValues(2, county );
        }
      }

    },
    watch: {
      ['params.search']: {
        handler(val, olval) {
          console.log('watch')
          this._init_page();
        },
        deep:true,
        immediate:false
      },

    },
  }
</script>
<template>
  <div class="">

    <template>
      <van-popup  position="bottom" v-model="popups[0]">
        <van-picker  show-toolbar title="所在地选择"  @cancel="popups[0] = false" @confirm="select_confirm" :columns="columns" @change="change_select_address"  ref="pick" text/>
      </van-popup>
    </template>


    <div class="vp-header  vp-header--shadow vc-bg">
      <div class="vc-flex vc-items--center vc-padding__lg--ad vc-padding--ud">
        <div class="vc-margin--rt " style="width: 80px;" >
          <div v-if="params.areaName" class="vc-flex--between-center">
            <router-link tag="div" :to="{ name :'SubSelectArea'}"  class="vc-text--clamp">
              {{  params.areaName }}
            </router-link>
            <!-- <span class="vc-text&#45;&#45;clamp vc-text&#45;&#45;baseline" @click="popups[0]=true">{{  params.areaName }}</span>-->
            <!--<span class="vc-text&#45;&#45;clamp vc-text&#45;&#45;baseline" @click="popups[0]=true">{{  params.areaName }}</span>-->
            <i class="iconfont icon-shanchu1 vc-padding--ad" @click="_clear_address"></i>
          </div>
          <router-link tag="div" :to="{ name :'SubSelectArea'}" v-else >
            按地址查询
          </router-link>
         <!-- <span v-else @click="popups[0]=true">按地址查询</span>-->
        </div>
        <div class="vp-input vc-flex--fit">
          <!--<div class="vp-input__search " @click="_init_page">
            <i class="iconfont icon-sousuo1x"></i>
          </div>-->
          <input type="text" placeholder="可按年级、班级、地址、学校进行搜索..." v-model="params.search" class="vp-input__inner vp-input--circle vp-input__bg--white" >
        </div>
      </div>
    </div>

    <template v-if="openClass.list.length > 0 ">
      <div class="vc-fluid--h-min " style="padding-top: 60px;">
        <div class="vc-row   " >
          <router-link tag="div"
                       :to="{ name :'SubResourceDetail' , query:{ classId : item['classId'] ,className :item['className']}}"
                       class="vc-col--12   "
                       v-for="(item ,index ) in openClass.list"
                       :key="index"
          >
            <div class="vc-padding vc-bg ">
              <div class="vp-ratio vc-margin--bm">
                <div class="vp-ratio__outer" data-ratio="100%">
                  <div class="vp-ratio__inner vp-img__inner">
                    <img :src="item['classPic']" alt="" @load="_pub_img_load">
                    <img src="../img/img-error-class.png" alt="" class="vp-img--error vp-img--cover">
                  </div>
                </div>
              </div>
              <div>
                <div class="vc-text--bold vc-margin--bm"><span class="vc-text--bold" v-if="  item['classType'] ">{{ item['classType'] }} · </span>{{ item['className']}} <span></span></div>
                <div class="vc-margin--bm  vc-flex--between-center">
                  <span class="vc-flex--fit vc-text--ellipsis vc-margin--rt">{{ item['areaName'] }}</span>
                  <span class="vc-text--light">{{ item['stuNum'] || 0 }}人</span>
                </div>
              </div>
            </div>

          </router-link>
        </div>
<!--

        <router-link tag="div" :to="{ name :'SubResourceDetail' , query:{ classId : item['classId'] ,className :item['className']}}" v-for="(item ,index ) in openClass.list" :key="index">
          <div class="vc-padding__lg vc-border&#45;&#45;bm vc-flex&#45;&#45;between-center vc-bg">

            <div class="vc-flex&#45;&#45;fit vc-flex vc-margin__lg&#45;&#45;rt">
              <div class="vp-img__inner vp-img__head vc-margin__lg&#45;&#45;rt" data-square="80" >
                <img :src="item.classPic" alt="" @load="_pub_img_load">
                <img src="../img/img-error-class.png" alt="" class="vp-img&#45;&#45;error vp-img&#45;&#45;cover">
              </div>
              <div>
                <div class="vc-text&#45;&#45;bold vc-margin&#45;&#45;bm"><span class="vc-text&#45;&#45;bold" v-if="  item['classType'] ">{{ item['classType'] }} · </span>{{ item['className']}} <span></span></div>
                <div class="vc-margin&#45;&#45;bm">{{ item['stuNum'] || 0 }}人</div>
                <div class="vc-margin&#45;&#45;bm vc-text&#45;&#45;light">{{ item['schoolName'] }}</div>
                <div class="vc-margin&#45;&#45;bm vc-text&#45;&#45;gray">{{ item['areaName'] }}</div>
              </div>
            </div>
            <div>
              <span class="vc-text&#45;&#45;theme">查看详情</span>
            </div>
          </div>

        </router-link>
-->

        <va-load-more v-if="openClass.list.length >= openClass.pageSize"  :finished="openClass.push.finished" :loading="openClass.push.loading" msg="暂无更多开放班级~~" @load="_load_more_class"></va-load-more>

      </div>
    </template>

    <template v-else>
      <div class=" vc-padding__lg--ad vc-padding__xl-x--ud  vc-fluid vc-flex--center">
        <div class="">
          <div class="vc-text--light vc-text--center vc-padding__lg--ud">没有搜索出开放班级~~</div>
        </div>
      </div>
    </template>



  </div>

</template>
<style scoped></style>
