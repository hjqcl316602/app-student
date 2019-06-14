<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import classes  from './mixin/class'
  import VaBtnGroup  from './component/va.btn.group.vue'
  export default {
    name: "SubManager",
    components: { VaBtnGroup },
    mixins: [ classes ],

    activated(){
      this._init_page()
    },

    data(){
      return {
        tab:{
          options:[
            { text:'课表' ,value:'1'},
            { text:'作息' ,value:'2'},
            { text:'纪律' ,value:'3'},
          ],
          active:0
        },
        timetable:{
          com:[],
          isCom:false,
          mine:[],
          isMine:false
        }
      }
    },
    methods: {
      async _init_page(){
        this._init_data()
      },
      _init_data(){
        if(this.tab.active == 0){
          this.$get_class_name({classId:this.userMessage['classId']});
          this.$get_timetable_list().then((response)=>{
            let days = 6;
            if(response['data']['course']){
              let course =  JSON.parse(response['data']['course']) ;
              this.timetable.isCom = true;
              let len = [0,0,0] ;//{ mor:0,after:0,night:0};
              course.forEach((item,i)=>{
                let len_mor = course[i][0].length,len_after = course[i][1].length,len_night = course[i][2].length;
                len[0] = Math.max(len_mor,len[0]);len[1] = Math.max(len_after,len[1]);len[2] = Math.max(len_night,len[2]);
              });

              let timetables = [];
              for(let l = 0 ; l < 3 ;l++){                  // 上午、下午、晚上
                let timetable = [];
                for( let k = 0 ; k < len[l] ; k++){         // 上午、下午、晚上多少节课
                  let courses = [];
                  for( let n = 0 ; n < days ; n ++){        //多少天
                    courses.push(course[n][l][k] || { name :''})
                  }
                  timetable.push(courses)
                }
                timetables.push(timetable)
              }
              this.timetable.com = timetables;
            }else{
              this.timetable.isCom = false;
            }
          }) ;
          this.$get_timetable_custom_list().then((response)=>{
            let days = 3;
            if(response['data']['course']){
              let course =  JSON.parse(response['data']['course']) ;
              this.timetable.isMine = true;
              let len = [0,0,0] ;//{ mor:0,after:0,night:0};
              course.forEach((item,i)=>{
                let len_mor = course[i][0].length,len_after = course[i][1].length,len_night = course[i][2].length;
                len[0] = Math.max(len_mor,len[0]);len[1] = Math.max(len_after,len[1]);len[2] = Math.max(len_night,len[2]);
              });

              let timetables = [];
              for(let l = 0 ; l < 3 ;l++){   // 上午、下午、晚上
                let timetable = [];
                for( let k = 0 ; k < len[l] ; k++){ // 上午、下午、晚上多少节课
                  let courses = [];
                  for( let n = 0 ; n < days ; n ++){    //多少天
                    courses.push(course[n][l][k] || { name :''})
                  }
                  timetable.push(courses)
                }
                timetables.push(timetable)
              }
              this.timetable.mine = timetables;
            }else{
              this.timetable.isMine = false;
            }
          })
        }
        else if(this.tab.active == 1){
          this.$get_rules()
        }
        else if(this.tab.active == 2){
          if(this.userMessage['memType'] == 1){
            this.$get_disc_student_list()
          }else if(this.userMessage['memType'] == 2){
            this.$get_disc_report_list();

          }
        }
      },
      /************************************************** 纪律  **************************************************/
      _select_student(item,index){
        this.disc.list[index]['active'] = !this.disc.list[index]['active']
      },
      _operate_disc(type){
        if(!type){
          this.$router.push({ name :'SubClassExpressReport'  })
        }else{
          let selectStudents =  Arrays.filter(this.disc.list,(item)=>{ return !!item['active']  } )
          if(selectStudents.length > 0 ){
            this.$router.push({ name :'SubClassExpressEdit',query:{ type:type } })
            sessionStorage.setItem('expressStudents', JSON.stringify( selectStudents ) )
          } else{
            if(type == '0'){
              this.$createToast({message:'选择要批评的学生!',duration:2000}).show();
            }
            else if(type == '1'){
              this.$createToast({message:'选择要表扬的学生!',duration:2000}).show();
            }
          }
        }
      }

    },
    watch: {
      ['tab.active'](val){
        this._init_data()
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="">
    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row" >
      <VaBtnGroup :options="tab.options" v-model="tab.active"></VaBtnGroup>
    </div>
    <template v-if="tab.active == 0 ">

      <template v-if="(timetable.isMine || timetable.isCom)">
        <div class=" vc-padding__xl-x--ud vc-fluid--h-min">


          <template v-if="timetable.isCom">
            <div class="vc-bg  vc-margin--bm vc-padding__lg--bm">
              <div class="vc-row ">
                <div class="vc-col--24 vc-border--bm ">
                  <div class="vc-padding__lg--lt vc-padding--ud vc-flex vc-content--between">
                    <div class="vc-text--bold">{{classes.type}}·{{  classes.name }}课表</div>
                  </div>
                </div>
              </div>

              <div class="" style="">

                <table class="vp-table">
                  <colgroup>
                  <col width='16.67%'><col width='16.67%'><col width='16.67%'><col width='16.67%'><col width='16.67%'><col width='16.67%'>
                </colgroup>
                  <tr>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">时间</div>
                    </td>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">周一</div>
                    </td>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">周二</div>
                    </td>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">周三</div>
                    </td>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">周四</div>
                    </td>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">周五</div>
                    </td>
                  </tr>

                  <template v-if="timetable.com[0] && timetable.com[0].length > 0">
                    <tr>
                      <td colspan="6" class="vc-border--bm">
                        <div class="vc-padding__lg vc-text--left vc-text--light vc-text--bold" >上午</div>
                      </td>
                    </tr>
                    <tr  v-for="(item,index) in  timetable.com[0]">
                      <td class="vc-border--rt vc-border--bm vp-table--center" v-for="(course,courseid) in item">
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--light vc-text--wrap" v-if="course['name']">{{ course['name'] }}</div>
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--wrap vc-text--shadow" v-else>暂无</div>
                      </td>
                    </tr>
                  </template>

                  <template v-if="timetable.com[1] && timetable.com[1].length > 0">
                    <tr>
                      <td colspan="6" class="vc-border--bm">
                        <div class="vc-padding__lg vc-text--left vc-text--light vc-text--bold" >下午</div>
                      </td>
                    </tr>
                    <tr  v-for="(item,index) in  timetable.com[1]">
                      <td class="vc-border--rt vc-border--bm vp-table--center" v-for="(course,courseid) in item">
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--light vc-text--wrap" v-if="course['name']">{{ course['name'] }}</div>
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--wrap vc-text--shadow" v-else>暂无</div>
                      </td>
                    </tr>
                  </template>

                  <template v-if="timetable.com[2] && timetable.com[2].length > 0">
                    <tr>
                      <td colspan="6" class="vc-border--bm">
                        <div class="vc-padding__lg vc-text--left vc-text--light vc-text--bold" >晚上</div>
                      </td>
                    </tr>
                    <tr  v-for="(item,index) in  timetable.com[2]">
                      <td class="vc-border--rt vc-border--bm vp-table--center" v-for="(course,courseid) in item">
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--light vc-text--wrap" v-if="course['name']">{{ course['name'] }}</div>
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--wrap vc-text--shadow" v-else>暂无</div>
                      </td>
                    </tr>
                  </template>

                </table>
              </div>

            </div>
          </template>
          <template v-if="timetable.isMine">
            <div class="vc-bg  vc-margin--bm vc-padding__lg--bm">
              <div class="vc-row ">
                <div class="vc-col--24 vc-border--bm ">
                  <div class="vc-padding__lg--lt vc-padding--ud vc-flex vc-content--between">
                    <div class="vc-text--bold">我的课表</div>
                  </div>
                </div>
              </div>

              <div class="" style="">
                <table class="vp-table">
                  <colgroup>
                  <col ><col width='33%'><col width='33%'>
                </colgroup>
                  <tr>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">时间</div>
                    </td>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">周六</div>
                    </td>
                    <td class="vc-border--rt vc-border--bm vp-table--center">
                      <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--bold vc-text--light">周日</div>
                    </td>
                  </tr>

                  <template v-if="timetable.mine[0] && timetable.mine[0].length > 0">
                    <tr>
                      <td colspan="3" class="vc-border--bm ">
                        <div class="vc-padding__lg vc-text--left vc-text--light vc-text--bold" >上午</div>
                      </td>
                    </tr>
                    <tr  v-for="(item,index) in  timetable.mine[0]">
                      <td class="vc-border--rt vc-border--bm vp-table--center" v-for="(course,courseid) in item">
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--light vc-text--wrap" v-if="course['name']">{{ course['name'] }}</div>
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--wrap vc-text--shadow" v-else>暂无</div>
                      </td>
                    </tr>
                  </template>

                  <template v-if="timetable.mine[1] && timetable.mine[1].length > 0">
                    <tr>
                      <td colspan="3" class="vc-border--bm">
                        <div class="vc-padding__lg vc-text--left vc-text--light vc-text--bold" >下午</div>
                      </td>
                    </tr>
                    <tr  v-for="(item,index) in  timetable.mine[1]">
                      <td class="vc-border--rt vc-border--bm vp-table--center" v-for="(course,courseid) in item">
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--light vc-text--wrap" v-if="course['name']">{{ course['name'] }}</div>
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--wrap vc-text--shadow" v-else>暂无</div>
                      </td>
                    </tr>
                  </template>

                  <template v-if="timetable.mine[2] && timetable.mine[2].length > 0">
                    <tr>
                      <td colspan="3" class="vc-border--bm">
                        <div class="vc-padding__lg vc-text--left vc-text--light vc-text--bold" >晚上</div>
                      </td>
                    </tr>
                    <tr  v-for="(item,index) in  timetable.mine[2]">
                      <td class="vc-border--rt vc-border--bm vp-table--center" v-for="(course,courseid) in item">
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--light vc-text--wrap" v-if="course['name']">{{ course['name'] }}</div>
                        <div class="vc-padding__md-lg--ud vc-padding--ad vc-text--center vc-text--wrap vc-text--shadow" v-else>暂无</div>
                      </td>
                    </tr>
                  </template>

                </table>
              </div>

            </div>
          </template>

        </div>
      </template>
      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">当前还没有课表哦～～</div>
          </div>
        </div>
      </template>


      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row">

          <router-link tag="div" :to="{name :'SubClassTimetableEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border">编辑课表</router-link>
          <router-link tag="div" :to="{name :'SubClassTimetableEditWeekend'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme " >自定周末</router-link>

        </div>
      </div>

    </template>

    <template v-if="tab.active == 1 ">


      <template v-if="rules.detail.length > 0">
        <div class="vc-bg vc-padding__xl-x--ud vc-fluid--h-min">

          <div class="vc-row vc-flex">
            <div class="vc-col--12 vc-border--bm vc-border--rt">
              <div class="vc-padding__lg vc-flex vc-content--between">
                <div class="vc-text--bold">时间</div>
              </div>
            </div>
            <div class="vc-col--12 vc-border--bm ">
              <div class="vc-padding__lg vc-flex vc-content--between">
                <div class="vc-text--bold">安排</div>
              </div>
            </div>
          </div>

          <div class="vc-row vc-flex" v-for="(item,index) in rules.detail">
            <div class="vc-col--12 vc-border--bm vc-border--rt">
              <div class="vc-padding__lg vc-flex vc-content--between">
                <div class="">{{ item['startTime'] }}-{{ item['endTime']}}</div>
              </div>
            </div>
            <div class="vc-col--12 vc-border--bm ">
              <div class="vc-padding__lg vc-flex vc-content--between">
                <div class="">{{ item['title'] }}</div>
              </div>
            </div>
          </div>

        </div>
      </template>

      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">当前还没有作息表哦～～</div>
          </div>
        </div>
      </template>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <router-link tag="div" :to="{ name :'SubClassRulesEdit'}" class="vc-flex--aut   vp-btn__simple vp-btn--theme " >编辑作息表</router-link>
        </div>
      </div>

    </template>

    <template v-if="tab.active == 2 ">

      <template v-if="userMessage['memType'] == 1">

        <template v-if="disc.list.length > 0">
          <div class="vc-bg vc-padding__xl-x--ud vc-fluid--h-min">

            <div class="vc-row ">
              <div class="">
                <div class="vc-col--08 vc-border--rt vc-flex--center vc-border--bm vp-row"  >
                  <div class="vc-text vc-text--bold  ">姓名</div>
                </div>

                <div class="vc-col--06 vc-border--rt vc-flex--center vc-border--bm vp-row" >
                  <div class="vc-text vc-text--bold  ">表扬(次数)</div>
                </div>


                <div class="vc-col--06 vc-flex--center vc-border--bm vc-border--rt vp-row" >
                  <div class="vc-text vc-text--bold  ">批评(次数)</div>
                </div>

                <div class="vc-col--04 vc-flex--center vc-border--bm vp-row" >
                  <div class="vc-text vc-text--bold  ">选择</div>
                </div>

              </div>
            </div>


            <div class="vc-row " v-for="(item,index) in disc.list">
              <div class="">
                <div class="vc-col--08 vc-border--rt vc-flex--center vc-border--bm vp-row vc-padding--ad"  >
                  <div class=" vc-text--light vc-padding--lt vc-text--ellipsis">{{ item['stuName']}}</div>
                </div>

                <div class="vc-col--06 vc-border--rt vc-flex--center vc-border--bm vp-row vc-padding__sm--ad"  >
                  <div class="vc-text--danger" v-if=" item['goodNum'] > 0">{{ item['goodNum']}}</div>
                  <div class="vc-text--light" v-else>{{ item['goodNum']}}</div>
                </div>

                <div class="vc-col--06 vc-border--rt vc-flex--center vc-border--bm vp-row vc-padding__sm--ad"  >
                  <div class="vc-text--warning" v-if=" item['badNum'] > 0">{{ item['badNum']}}</div>
                  <div class="vc-text--light" v-else>{{ item['badNum']}}</div>
                </div>

                <div class="vc-col--04   vc-flex--center vc-border--bm vp-row vc-padding__sm--ad"  @click="_select_student(item,index)">
                  <div class="vp-icon__select" :class="{'vp-icon__select--active':item.active }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="vp-footer vp-footer--shadow">
            <div class="vc-flex vp-row" >
              <div tag="div"   class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border" @click="_operate_disc('')">纪律报表</div>
              <div tag="div"   class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border"@click="_operate_disc('1')">表扬</div>
              <div tag="div"   class="vc-flex--aut   vp-btn__simple vp-btn--theme " @click="_operate_disc('0')">批评</div>
            </div>
          </div>

        </template>


        <template v-else>
          <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
            <div class="" >
              <div class="vc-text--light vc-text--center vc-padding__lg--ud">当前还没有纪律记录哦～～</div>
            </div>
          </div>
        </template>

      </template>
      <template v-if="userMessage['memType'] == 2 ">
        <div class="vc-padding__xl-x--tp">
          <template v-if=" disc.reportList.length > 0 ">
            <div class="">
              <div class="vc-bg vc-margin--bm" v-for="(item,index) in disc.reportList">
                <div class="vc-padding__lg vc-text--bold vc-border--bm">{{ item['title']}}</div>

                <div class="vc-padding__lg">
                  <div class="vc-margin__lg--bm "v-for="(detail,detailId) in item['detail']">
                    <p class="vc-text--baseline--md">【{{ detail['stuNames']}}】</p>
                    <p class="vc-text--baseline--md"  >{{ detail['content'] }}</p>
                    <p class="vc-text--baseline--md"  >{{ detail['remark'] }}</p>
                  </div>
                </div>

              </div>
            </div>
          </template>
          <template v-else>
            <div class="vc-fluid vc-flex--center vc-bg">
              <div class="vc-text--light vc-text--center vc-padding__lg--ud">当前还没有纪律报表的哦～～</div>
            </div>
          </template>
        </div>

      </template>



    </template>

  </div>
</template>
<style scoped></style>
