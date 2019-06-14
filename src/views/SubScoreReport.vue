<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import score  from './mixin/score'
  import echarts from 'charts'
  import { VaShare }  from './component'
  import { set_wx_share } from '../js/vue.wx';
  export default {
    name: "SubScoreReport",
    components: {
      VaShare,
      ['ScriptLink']:{
        render(createElement){
          return createElement(
            'script',
            {
              attrs:{
                type:'text/javascript',src:this.src
              }
            }
          )
        },
        props:{ type:String,required:true }
      }
    },
    mixins: [ score ],
    data() {
      return {
        params:{
          kaoShiId:"",
          kaoShiName:'',
          chartList:[],
          chartListFormat:[]
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
        this.params.kaoShiId = this.$route.query['id'];



        this.$get_grade_chart(this.params).then((response)=>{
          this.params.kaoShiName = response['data']['kaoShiName'] || '考试成绩';

          this._share_grade(this.params.kaoShiName);//分享

          this.params.chartList = response['data']['list'] || [];

          let charts = [];

          this.params.chartList.forEach((item,i)=>{
            let course = []
            if(item['chaSize'] > 0 ){
              course.push({
                value:item['chaSize'],name:'差('+item['cha']+')',itemStyle:{ color:'#fecf58'}
              })
            }
            if(item['zhongSize'] > 0 ){
              course.push({
                value:item['zhongSize'],name:'中('+item['zhong']+')',itemStyle:{ color :'#8e51ca'}
              })
            }
            if(item['youSize'] > 0 ){
              course.push({
                value:item['youSize'],name:'优('+item['you']+')',itemStyle:{ color :'#ff464e'}
              })
            }

            charts.push(course)
          });

          this.params.chartListFormat = charts ;

          this.params.chartList.forEach((item,i)=>{
            this._init_chart(i)
          })

        })

      },
      _init_chart(index){
        setTimeout(()=>{
          let charts = echarts.init(document.getElementsByClassName('chart-box')[index]);
          let option = {

            series: [{
              data:this.params.chartListFormat[index],
              label: {
                normal: {
                  position: 'inner'
                }
              },
              radius:'70%',
              type: 'pie',
            }]
          };
          charts.setOption(option)
        },500)

      },
      _share_grade(courseName){
        let shareObj = {
          title:'成绩报表',
          desc: `单击查看【${courseName}】成绩报表，关注孩子的成绩走向`,
          imgUrl:'',
          link:`${this.$configs['HTTP_WEB'] }?/SubScoreReport?id=${this.params.kaoShiId}`
        };
        console.log(shareObj)
        setTimeout(()=>{
          set_wx_share(shareObj)
        },300)
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
  <div class="vc-fluid--h-min vc-bg vc-padding__lg">
    <ScriptLink src="static/js-library/echarts.min.js"></ScriptLink>
    <VaShare v-model="popups[0]"> </VaShare>
    <div class="vc-margin--bm vc-flex--between-center">
      <div class="vc-text--left vc-text--bold vc-text--lg" >{{ params.kaoShiName}}</div>
      <div class="vc-text--theme vc-text--right vc-text--bold" @click="popups[0] = true">分享</div>
    </div>

    <template v-if=" params.chartList.length >  0">
      <div v-for="(item,i) in params.chartList">
        <div class="vc-margin--bm vc-text--bold vc-text--left">{{ item['courseName']}} </div>
        <div class="vc-margin__sm--bm vc-text--light vc-text--left vc-text--sm">平均分：{{ item['average'] || 0 }}分 </div>
        <div class="vc-margin__sm--bm vc-text--light vc-text--left vc-text--sm">最高分：{{ item['max'] || 0 }}分 </div>
        <div class="vc-margin__sm--bm vc-text--light vc-text--left vc-text--sm">最低分：{{ item['min'] || 0 }}分 </div>
        <div class="">
          <div class="vp-ratio">
            <div class="vp-ratio__outer" data-ratio="100%">
              <div class="vp-ratio__inner">
                <div class="vc-cover chart-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="vc-text--center vc-text--gray vc-padding__lg">暂无考试统计报表信息~~</div>
    </template>




  </div>
</template>
<style scoped></style>
