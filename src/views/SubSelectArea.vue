<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import basic  from './mixin/basic'
  import { scrollTop,getElementOffsetY,getElementData } from '../js.utils/doms'
  export default {
    name: "SubSelectArea",
    components: {},
    mixins: [ basic ],
    data() {
      return {
        area:[
          { label:'*', value:[] , name :'热门城市' ,scrollTop:0  },
          {
            label:'#',
            value:[
              { name : '北京市',code :'1'},{ name : '重庆市',code :'3320'},{ name : '天津市',code :'3318'},{ name : '上海市',code :'792'},
              { name : '成都市',code :'2280'},{ name : '南京市',code :'811'},{ name : '武汉市',code :'1693'},{ name : '广州市',code :'1947'},
              { name : '深圳市',code :'1971'},{ name : '杭州市',code :'927'},{ name : '西安市',code :'2808'},{ name : '兰州市',code :'2926'},
              ]
          },
          {label:'A', value:[]},
          {label:'B', value:[]},
          {label:'C', value:[]},
          {label:'D', value:[]},
          {label:'E', value:[]},
          {label:'F', value:[]},
          {label:'G', value:[]},
          {label:'H', value:[]},
          {label:'I', value:[]},
          {label:'J', value:[]},
          {label:'K', value:[]},
          {label:'L', value:[]},
          {label:'M', value:[]},
          {label:'N', value:[]},
          {label:'O', value:[]},
          {label:'P', value:[]},
          {label:'Q', value:[]},
          {label:'R', value:[]},
          {label:'S', value:[]},
          {label:'T', value:[]},
          {label:'U', value:[]},
          {label:'V', value:[]},
          {label:'W', value:[]},
          {label:'X', value:[]},
          {label:'Y', value:[]},
          {label:'Z', value:[]}

        ]
      }
    },
    mounted() {

      //console.log(pinyinUtil.getFirstLetter('重',true))

      this.initPage();
    },
    activated() {

    },
    methods: {
      async initPage() {
        await  this.$get_area_list(true);
        //console.log(this.areaList)
        let provCode = this.getAreaProvCode(this.areaList);
        //console.log(provCode)
        let cityList = this.getAreaCityList(this.areaList,provCode);
        //console.log(cityList)

        //获得所搜过的城市


        this.getHisAreaList();

        this.getAreaPinYin(cityList)

        this.$nextTick(()=>{

           this.getElementsTop()

        })

      },
      // 得到元素的top
      getElementsTop(){
        let areaItems = Array.from( document.getElementsByClassName('vv-area__item') );
        console.log(areaItems)
         for(let n = 0 ; n < areaItems.length ; n++){
          let label = getElementData(areaItems[n],'label') ;
          let findIndex = this.area.findIndex((item)=>{
            return item['label'] === label
          });
           this.area[findIndex]['scrollTop'] = getElementOffsetY( areaItems[n]);

           console.log(this.area[findIndex])
         }
      },

      selectAreaLabel(index){

        scrollTop(this.area[index]['scrollTop'] - 10 )

      },
      getHisAreaList(){

        this.area[0]['value'] = localStorage.getItem('hisAreaList') ? JSON.parse( localStorage.getItem('hisAreaList')):[];

      },

      selectArea(index,areaIndex){
        let item = this.area[index]['value'][areaIndex];
         this.area[0]['value'] = this.area[0]['value'].filter((areaItem,i)=>{
          return areaItem['code'] !== item['code']
        });

        this.area[0]['value'].unshift(item);

        this.area[0]['value'] = this.area[0]['value'].slice(0,10);
        localStorage.setItem('hisAreaList', JSON.stringify(this.area[0]['value']));
        this.$router.go(-1);
      },

      getAreaProvCode(areaList){
        let provinceCode = [];
        for(let i in areaList){
          let areaCodes = i && i.split(",");
          if(areaCodes.length === 2){
            provinceCode.push(i)
          }
        }
        return provinceCode;
      },
      getAreaCityList(areaList,provCode){
        let cityCode = [];
        for(let i in areaList){
           if(provCode.indexOf(i) > -1){
             for (let k in areaList[i]){
               cityCode.push({ name :areaList[i][k] , code : k })
             }
           }
        }
        return cityCode;
      },
      getAreaPinYin(city){

        for (let n = 0; n < city.length ; n ++){
          let name = city[n]['name'];
          let getPinYin = pinyinUtil.getFirstLetter(name,true);

          let pinyins = []
          for( let l = 0 ; l < getPinYin.length;l++){
             if(pinyins.indexOf(getPinYin[l][0]) === -1 ){
               pinyins.push(getPinYin[l][0])
             }
          }
          for(let k = 0 ; k < pinyins.length ; k ++){
             let index = this.area.findIndex((item,i)=>{
               return item['label'].toUpperCase() === pinyins[k].toUpperCase()
             })
            this.area[index]['value'].push({ name : city[n]['name'],code:city[n]['code']})
          }
        }
        // 清除一些没有地区的项
        this.area = this.area.filter((item,i)=>{
          return item['value'].length > 0 || item['label'] === '*';
        })


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
  <div class=" vc-bg vv-area">
    <div class="vv-area__body vc-padding" ref="areaBody"  >
      <div class="vc-margin--bm vv-area__item" id="" v-for="(item,index) in area" :data-label="item['label']" >
        <div :id=" item['label']" class="vc-padding--ud vc-text--center " >{{ item['label']}}</div>
        <div class="">
          <div v-for="(area,areaIndex) in item['value']" class="vc-padding__md-lg--ud vc-border--bm" @click="selectArea(index,areaIndex)" >{{ area['name'] }}</div>
        </div>
      </div>
    </div>
    <div class="vv-area__aside vc-flex--center" style="overflow-y: auto">
      <div>
        <div v-for="(item,index) in area" class="vc-text--center " >
          <div class="vc-padding__sm" @click="selectAreaLabel(index)">{{ item['label'] }}</div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped></style>
