<script type="text/ecmascript-6">
  import VaConfirm  from './component/va.confirm.vue'
  import VaBtnGroup  from './component/va.btn.group.vue'
  import atten  from './mixin/atten'
  export default {
    name: "SubAtten",
    components: { VaBtnGroup,VaConfirm },
    mixins: [ atten ],
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
      this._init_page();
    },
    computed:{

    },
    data(){
      return {
        tab:{
          options:[
            { text:'今日考勤' ,value:'1'},
            { text:'考勤报表' ,value:'2'},
          ],
          active:0
        },
        popup:{
          show:false
        },
        time:'after',
        show:true,
        stepper:{
          value:''
        },
        isSelectAll:false
      }
    },
    methods: {
      async _init_page(){

        await this.$get_kaoqin_list();
      },
      _change_atten_status(type){
        if(type=='send'){
          this.$dialog.confirm({
            title:'确认信息',
            message:'是否确认推送今日考勤信息，家长可立即查看孩子的在校情况？'
          }).then(()=>{
            this.$send_kaoqin();
          })
        }else{
          let selectStudent = Arrays.filter(this.kaoqin.list,function(item){ return !!item['active'] })

          if( selectStudent.length == 0 ){

            this.$dialog.alert({
              message: '请选择要考勤的学生!'
            });
          }else{
            let students = [];
            selectStudent.forEach((item,i)=>{
              students.push(item['name']);
            });
            let status = ['请假','迟到','早退','值日','留校','已离校','已到校','正常'];
            this.$dialog.confirm({
              title:status[type-2] + '确认',
              message:students.join('、')
            }).then(()=>{
              this.$save_kaoqin(type)
            }).catch(()=>{})
          }
        }

      },
      _get_select_student(){
        let newStudent = [];
        this.attenList.forEach((item,i)=>{
          if(item['active']){
            newStudent.push(item['name'])
          }
        })
        return newStudent;
      },
      _select_student(index){
        this.kaoqin.list[index]['active'] = !this.kaoqin.list[index]['active'];
      },
      _select_student_all(){
        let status = [2,3,4,5,6,7,8];
        if(!this.isSelectAll){
          this.isSelectAll = true;
          this.kaoqin.list.forEach((item)=>{
            //debugger
            if( status.indexOf(　Number(item['status']　) ) == -1){
              item['active'] = true
            }
          })
        }else{
          this.isSelectAll = false;
          this.kaoqin.list.forEach((item)=>{
              item['active'] = false
          })
        }
      }
    },
    watch: {
      'tab.active': {
        handler(val, olval){
          if(val==1){
            this.$get_kaoqin_report_list()
          }
        },
        deep: true ,
        immediate:true
      },
      'kaoqin.list': {
        handler(val, olval){
           let arr = Arrays.filter(val,(item)=>{
             return !!item['active']
           })
          if(arr.length == 0 ){
             this.isSelectAll = false;
          }
          if(arr.length == val.length ){
            this.isSelectAll = true;
          }
        },
        deep: true ,
        immediate:true
      },
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-atten " >



    <div class="vp-header vc-bg--theme vp-header--shadow vc-flex--center vp-row" >
      <VaBtnGroup :options="tab.options" v-model="tab.active"></VaBtnGroup>
    </div>

    <template v-if="tab.active == 0 ">
      <div class="">

        <template v-if="kaoqin.list.length > 0 ">
          <div class="vc-bg vc-padding__xl-x--ud vc-fluid--h-min">

            <div class="vc-row ">
              <div class="">
                <div class="vc-col--08 vc-border--rt vc-flex--center vc-border--bm vp-row"  >
                  <div class="  ">
                    <p class="vc-text--lg vc-text--bold">{{ kaoqin.detail.day | str_week }}</p>
                    <p class="vc-text--light vc-text--sm">({{ kaoqin.detail.day }})</p>
                  </div>
                </div>
                <template v-if="kaoqin.detail.timeType == 0">
                  <div class="vc-col--08 vc-border--rt vc-flex--center vc-border--bm vp-row" >
                    <div class="vc-text--lg vc-text--bold  ">上午</div>
                  </div>
                </template>
                <template v-if="kaoqin.detail.timeType == 1">
                  <div class="vc-col--08 vc-border--rt vc-flex--center vc-border--bm vp-row" >
                    <div class="vc-text--lg vc-text--bold  ">下午</div>
                  </div>
                </template>
                <div class="vc-col--08 vc-flex--center vc-border--bm vp-row" >
                  <div class="vp-icon__select" :class="{'vp-icon__select--active':isSelectAll}" @click="_select_student_all" ></div>
                </div>
              </div>
            </div>


            <div class="vc-row " v-for="(item,index) in kaoqin.list">
              <div class="">
                <div class="vc-col--08 vc-border--rt vc-flex vc-items--center vc-border--bm vp-row vc-padding--ad"  >
                  <div class="vp-icon__outer">
                    <div class="vp-icon__spot danger" v-if="item['status'] == 2 || item['status'] == 3 || item['status'] == 4 || item['status'] == 5 || item['status'] == 6"></div>
                    <div class="vc-flex--fit vc-text--light vc-padding--lt vc-text--ellipsis">{{ item['name']}}</div>
                  </div>
                </div>
                <div class="vc-col--08 vc-border--rt vc-flex--center vc-border--bm vp-row vc-padding__sm--ad"  >
                  <div class="vc-text--light" v-if="item['status'] == 9 || item['status'] == 1">正常</div>
                  <div class="vc-text--light" v-else-if="item['status'] == 8">已到校</div>
                  <div class="vc-text--light" v-else-if="item['status'] == 7">已离校</div>
                  <div class="vp-img__inner vp-box" v-else>
                    <img src="../img/icon-status-qj.png" alt="" class="vp-img--max" v-if="item['status'] == 2">
                    <img src="../img/icon-status-cd.png" alt="" class="vp-img--max" v-if="item['status'] == 3">
                    <img src="../img/icon-status-zt.png" alt="" class="vp-img--max" v-if="item['status'] == 4">
                    <img src="../img/icon-status-zr.png" alt="" class="vp-img--max" v-if="item['status'] == 5">
                    <img src="../img/icon-status-lx.png" alt="" class="vp-img--max" v-if="item['status'] == 6">
                  </div>
                </div>

                <div class="vc-col--08 vc-border--rt vc-flex--center vc-border--bm vp-row vc-padding__sm--ad"  @click="_select_student(index)">
                  <div class="vp-icon__select" :class="{'vp-icon__select--active':item.active }"></div>
                </div>
              </div>
            </div>

            <div class="vp-footer vp-footer--shadow">
              <div class="vc-flex vp-row" >
                <template v-if="kaoqin.detail.timeType == '0'">
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border" @click="_change_atten_status('2')">请假</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border" @click="_change_atten_status('3')">迟到</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme " @click="_change_atten_status('8')">到校</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--danger  " @click="_change_atten_status('send')">推送</div>
                </template>
                <template v-if="kaoqin.detail.timeType == '1'">
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border" @click="_change_atten_status('2')">请假</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border" @click="_change_atten_status('4')">早退</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border" @click="_change_atten_status('5')">值日</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme vp-btn--border" @click="_change_atten_status('6')">留校</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--theme " @click="_change_atten_status('7')">离校</div>
                  <div class="vc-flex--aut   vp-btn__simple vp-btn--danger  " @click="_change_atten_status('send')">推送</div>
                </template>
              </div>
            </div>

          </div>

        </template>
        <template v-else>
          <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
            <div class="" >
              <div class="vc-text--light vc-text--center vc-padding__lg--ud">该班级暂无学生，去添加学生吧～～</div>
            </div>
          </div>
        </template>


      </div>




    </template>
    <template v-if="tab.active == 1 ">
      <template v-if="kaoqin_report.list.length > 0">
        <div class="vc-bg vc-padding__xl-x--tp vc-fluid--h-min">

          <div class="vc-margin--bm" v-for="(item,index) in kaoqin_report.list">
            <div class="vc-padding__lg vc-border--bm">
              <span class="  vc-text--bold ">{{ item['day'] }}</span>
            </div>

            <div class="vc-row vc-flex">
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">姓名</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">出勤</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">迟到</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">请假</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">值日</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--bold vc-text--light">留校</div>
              </div>
            </div>

            <div class="vc-row vc-flex" v-for="(stu,student) in item['detail']">
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['stuName']}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['出勤' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['迟到' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['请假' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['值日' ]}}</div>
              </div>
              <div class="vc-col--04 vc-padding__md-lg vc-flex--center vc-border--rt vc-border--bm">
                <div class="vc-text--light">{{ stu['留校' ]}}</div>
              </div>
            </div>
          </div>

        </div>
      </template>
      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center">暂无考勤报表～～</div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<style scoped></style>
