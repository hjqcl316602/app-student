<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import score  from './mixin/score'
  import user  from './mixin/user'
  export default {
    name: "",
    components: {},
    mixins: [ score,user ],
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

    },
    activated(){
      this._init_page()
    },
    props: [],
    data(){
      return {
        params:{ id:''},
        table:[]
      }
    },
    methods: {
      async _init_page(){
        this.params.id = this.$route.query['id'];
        await this.$get_student_list({ classId:this.userMessage['classId']});
        await this.$get_test_detail(this.params);
        this._init_table()
      },
      _init_table(){
        let studentList = this.studentList.slice(0);
        let gradeList = this.test.detail.gradeDetail || [];
        let courseList = this.test.detail.courseList || [];
        //console.log(studentList)
        //console.log(gradeList)
        //console.log(courseList)
        let table = [];
        table[0] = ['姓名','总分',...courseList];

        studentList.forEach((item,i)=>{
          let index = gradeList.findIndex((grade)=>{return  grade[0] == item['stuId'] });
          table[i+1] = [];
          table[i+1][0] = item['stuName'];
          table[i+1][1] = 0;
          courseList.forEach((course,courseId)=>{
            let grade = gradeList[index] ? ( gradeList[index][courseId+2] ? Number(gradeList[index][courseId+2]):0 ) : 0 ;
            table[i+1].push( grade );
            table[i+1][1] += grade;
          })

        });
        let newTable = table.slice(0,1).concat(this._sort_arr(table.slice(1)) );
        this.table = newTable;
        console.log( this.table )

      },

      _init_table2(){
        let arr = this.test.detail.gradeDetail || [];
        if(arr.length == 0) return
        let table = [];
        table[0] = ['姓名','总分'];
        let titles = arr[0];
        for(let n = 2 ; n < (titles.length - 1);n++){
           table[0].push(titles[n])
        }
        for(let k = 1 ; k < arr.length; k++){
          let allScore = 0;
          for(let n = 2 ; n < (arr[k].length - 1);n++){
            allScore += Number(arr[k][n]);
          };

          let newArr = [arr[k][1],allScore];
          for(let n = 2 ; n < (arr[k].length - 1);n++){
            newArr.push(Number(arr[k][n]))
          };
           table[k] = newArr ;
        }
        this.table = table.slice(0,1).concat(this._sort_arr(table.slice(1)) );
        //console.log(this.table)
      },
      _sort_arr(arr){
        for(let i = 0,l = arr.length;i<l-1;i++) {
          for(let j = i+1;j<l;j++) {
              if(arr[i][1]<arr[j][1]) {
                let tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
              }
          }
        }
        return arr
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg vc-padding__xl-x--bm">

    <div class="">

      <div class="vc-padding__lg vc-border--bm vc-flex--between-center">
        <div>
          <div class="vc-text--bold">{{ test.detail['kaoShiName'] }}</div>
          <div class="vc-text--sm vc-text--light vc-text--baseline--md">考试时间：{{ test.detail['startTime'] }}  </div>
        </div>
        <router-link tag="div" :to="{ name :'SubScoreReport',query:{ id : this.params.id  }}">
          <div class="vp-btn vp-btn__oper--small vp-btn--cancel">分析</div>
        </router-link>


      </div>
      <template v-if=" studentList.length ==  0  ">
          <div class="vc-text--gray vc-text--center vc-padding__xl-x--tp" >暂无学生，去邀请吧~</div>
      </template>
      <template v-else>
        <div style="overflow-x: auto">
          <table style="min-width: 100%">
            <colgroup>
              <col width="50px">
            </colgroup>
            <tr v-for="(item,index) in table"  >
              <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"  >

                <div style="min-width: 50px">
                  <span class="" :class="{'vc-text--bold':index==0  }" v-if="index == 0 ">排名</span>
                  <span class=""  v-else >{{ index }}</span>
                </div>

              </td>
              <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt" v-for="(li,l) in item"  >
                <div style="min-width: 50px">
                  <span class="" :class="{'vc-text--bold':index==0 ,'vc-text--theme':li =='录入'}"  >{{ li }}</span>
                </div>

              </td>
            </tr>

          </table>
        </div>

      </template>

    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <router-link tag="div" :to="{ name :'SubScoreEdit',query:{ id:params.id}}" class="vc-flex--aut   vp-btn__simple vp-btn--theme " >完善成绩</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
