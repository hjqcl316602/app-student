
<script type="text/ecmascript-6">

  import { VaCheck }  from './component'
  import score  from './mixin/score'
  import echarts from 'charts'
  export default {
    name: "",

    components: {VaCheck},
    mixins: [ score ],
    beforeRouteEnter (to, from, next) {
      next(vm=> {
      })
    },
    beforeRouteLeave(to, from, next){
      next();
    },
    beforeRouteUpdate (to, from, next) {
      next();
    },
    beforeCreate(){
    },
    created(){
    },
    beforeMount(){

    },
    mounted(){
      setTimeout(()=>{
        console.log(echarts)
      },1000)

    },
    activated(){
      this._init_page();
    },
    props: [],
    data(){
      return {
        options:{
          task:[
            { text:'语文',value:'yuwen'},{ text:'数学',value:'yuwen'},
            { text:'化学',value:'yuwen'},{ text:'英语',value:'yuwen'},
            { text:'政治',value:'yuwen'},{ text:'历史',value:'yuwen'},
          ]
        },
        params:{
          task:[]
        },
        grade:{
          classInfo:{},
          courseInfo:[],
          list:[],
          report:"",
          chart:{}
        }
      }
    },
    methods: {
      async _init_page(){
        if(this.userMessage['memType'] == 1){
          await  this.$get_test_list();

        }else if(this.userMessage['memType'] == 2){
          await  this.$get_grade_parent_list().then((response)=>{
            let data = response['data'];


            this.grade.classInfo = data['classInfo'];

            let courses = JSON.parse( data['courseInfo'] );
            let newCourse = [];
            courses.forEach((item,i)=>{
              let obj = {};
              obj['text'] = item['courseName'];
              obj['value'] = item['courseName'];
              newCourse.push(obj)
            });
            this.grade.courseInfo = newCourse;
            this.params.task = [0];

            this.grade.report = JSON.parse(data['report']);

            let list = data['list'];
            list.forEach((item,i)=>{
              item['gradeDetail'] = item['gradeDetail'] ? JSON.parse(item['gradeDetail']) :[]
            });
            this.grade.list = list ;


          });

        }

      },

      _get_chart_data(value){
        let courseSelectValues = this.grade['report'][value];
        let courseNames = [],courseValues = [];
        courseSelectValues.forEach((item,i)=>{
          courseNames.push( item['kaoShiName'] );
          courseValues.push(parseInt( item['courseValue'] || 0 ));
        });
        return {
          courseNames:courseNames,
          courseValues:courseValues
        }
      },

      _init_chart(course){

        let charts = echarts.init(document.getElementById('chart-box'));
        let option = {
          xAxis: {
            type: 'category',
            data: course['courseNames'],

            silent: false,
            splitLine: {
              show: false
            },
            axisLabel:{
              rotate:45,
              align:'center'
            },
            boundaryGap: false
          },
          tooltip:{},
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            }
          },
          series: [{
            data: course['courseValues'],
            type: 'line',
            smooth:true
          }]
        };
        charts.setOption(option)
      },
      _del_test(kaoShiId,kaoShiName){
        this.$dialog.confirm({
          title:'确定删除',
          message:'是否确定删除【'+ kaoShiName+'】考试？'
        }).then(()=>{
          this.$del_test({ kaoShiId:kaoShiId }).then(()=>{
            this.$createToast({message:'删除成功！',duration:2000}).show();
            this.$get_test_list(false)
          })
        });
      }
    },
    watch: {
      'params.task': {
        handler(val, olval) {
          if( val[0]== 0 || !!val[0]){
            this.grade.chart = this._get_chart_data(this.grade.courseInfo[val[0]]['value']);
            if( this.grade.chart.courseNames.length > 0  && this.grade.chart.courseValues.length > 0){
              setTimeout(()=>{
                this._init_chart(this.grade.chart)
              },500)
            }
          }
        }
        ,
        deep: true, immediate: true
      },
    },
    destroy(){
    }
  }
</script>
<template>
  <div>

    <template v-if="userMessage['memType'] == 1">
      <template v-if="test.list.length > 0">
        <div class=" vc-padding__xl-x--bm vc-fluid--h-min ">
           
         
          <van-cell-swipe :right-width='100' v-for="(item,index) in test.list" :key="index">
            <router-link tag="div" :to="{ name : 'SubScoreDetail',query:{ id: item['kaoShiId'] } }" >
  
              <div  class="vc-padding__lg--ad vc-padding--ud  vc-bg vc-margin--bm" >
                <div class="" >
                  <div class="vc-text--bold vc-border--bm vc-text--baseline--lg" >{{ item['kaoShiName']}}</div>
                  <div class="vc-text--sm vc-text--light vc-text--baseline--lg">考试时间：{{ item['startTime']}} </div>
                </div>
                <!-- <div class="vc-text--right vc-padding--ud">
                  <router-link class="vp-btn vp-btn__oper--small vp-btn--cancel  vc-margin--rt" >
                    查看
                  </router-link>
                  <div class="vp-btn vp-btn__oper--small vp-btn--danger " >
                    删除
                  </div>
                </div> -->
              </div>
            </router-link>
            <div tag="div"  slot="right" style="width: 100px" class="vp-btn__simple  vp-btn--danger " @click="_del_test(item['kaoShiId'],item['kaoShiName'])">删除</div>
          </van-cell-swipe>
        </div>
      </template>

      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">暂无考试信息，去添加考试吧~~</div>
          </div>
        </div>
      </template>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <router-link tag="div" :to="{ name :'SubScoreTestEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme " >添加考试</router-link>
        </div>
      </div>


    </template>

    <template v-if="userMessage['memType'] == 2">
      <template v-if="grade.list.length > 0">
        <div class="vc-fluid--h-min vc-padding__xl-x--tp vc-bg">
          <div class="vp-header vp-header--shadow">
            <div class="vp-row vc-bg--theme vc-flex--center vc-text--lg vc-text--white ">{{grade['classInfo']['classType']}}·{{ grade['classInfo']['className']}} {{ grade['classInfo']['stuName']}}</div>
          </div>
          <div class="vc-padding__lg">
            <div class="vc-margin--bm">
              <span class="vc-text--bold">请选择科目</span>
              <div class="vc-padding--tp">
                <VaCheck :options="grade.courseInfo" v-model="params.task" :is-single="true"></VaCheck>
              </div>
            </div>
            <template v-if="grade.chart && grade.chart.courseNames.length > 0  && grade.chart.courseValues.length > 0">
              <div class="vc-margin__lg--bm" >
                <span class="vc-text--bold">科目图表对应展示</span>
                <div class="vc-padding--tp">
                  <div class="vp-ratio">
                    <div class="vp-ratio__outer" data-ratio="100%">
                      <div class="vp-ratio__inner">
                        <div class="vc-cover" id="chart-box"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <temlpate v-else>
              <div class="vc-padding__lg--ud vc-text--center vc-text--gray">暂无成绩统计</div>
            </temlpate>


            <div v-for="(item,index) in grade.list" class="vc-margin__lg--bm">
              <div class="vc-border--bm">
                <div class="vc-text--bold">{{ item['kaoShiName']}}</div>
                <div class="vc-text--sm vc-text--light vc-padding--ud">考试时间：{{ item['startTime'] }}</div>
              </div>
              <div>
                <div class="vc-text--sm vc-text--light vc-padding--ud">
                  <p v-for="(course,courseId) in item['gradeDetail'] " class="vc-text--baseline--md">
                    <span >{{ course['courseName']}}:</span>
                    <span >{{ course['courseValue'] || 0 }}分</span>
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </template>
      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">当前没有成绩信息哦～～</div>
          </div>
        </div>
      </template>

    </template>
  </div>


</template>
<style scoped></style>
