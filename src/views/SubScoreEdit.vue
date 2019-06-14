<script type="text/ecmascript-6">
//import Header  from './components/header.vue'
//import basic  from '../Mixin/basic'\
//import { VaPopupRadio }  from './component'
import user from "./mixin/user";
import score from "./mixin/score";
import { VaPopupRadio } from "./component";
export default {
  name: "",
  components: { VaPopupRadio },
  mixins: [user, score],
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  activated() {
    this._init_page();
  },
  props: [],
  data() {
    return {
      params: {
        id: "",
        selectIndex: ""
      },
      table: [],
      lesson: []
    };
  },
  methods: {
    async _init_page() {
      this.params.id = this.$route.query["id"];
      await this.$get_student_list({ classId: this.userMessage["classId"] });
      await this.$get_test_detail(this.params);

      this._init_table();
    },

    _init_table() {
      let studentList = this.studentList.slice(0);
      let gradeList = this.test.detail.gradeDetail || [];
      let courseList = this.test.detail.courseList || [];

      this.lesson = [];
      courseList.forEach((cc, c) => {
        this.lesson.push({ name: cc, value: "" });
      });

      let table = [];
      table[0] = ["主键", "姓名", ...courseList, "操作"];

      studentList.forEach((item, i) => {
        let index = gradeList.findIndex(grade => {
          return grade[0] == item["stuId"];
        });
        table[i + 1] = [];
        table[i + 1][0] = item["stuId"];
        table[i + 1][1] = item["stuName"];
        courseList.forEach((course, courseId) => {
          let grade = gradeList[index]
            ? gradeList[index][courseId + 2]
              ? Number(gradeList[index][courseId + 2])
              : 0
            : 0;
          table[i + 1].push(grade);
        });
        table[i + 1].push("编录");
      });
      this.table = table;
    },
    _init_table2() {
      this.lesson = [];
      this.test.detail["courseList"].forEach((cc, c) => {
        this.lesson.push({ name: cc, value: "" });
      });

      if (
        this.test.detail.gradeDetail &&
        this.test.detail.gradeDetail.length > 0
      ) {
        let table = this.test.detail.gradeDetail;

        this.studentList;

        this.table = table;
      } else {
        this.table = [];
        this.table[0] = ["主键"];
        this.table[0].push("姓名");
        this.table[0] = this.table[0].concat(this.test.detail["courseList"]);
        this.table[0].push("操作");

        this.studentList.forEach((item, i) => {
          let arr = [];
          arr[0] = item["stuId"];
          arr[1] = item["stuName"];

          this.test.detail["courseList"].forEach((course, c) => {
            arr.push("");
          });
          arr.push("编录");
          this.table.push(arr);
        });
      }
    },
    _select_student(value) {
      this.params.student = value;
    },
    // 输入框的特殊处理
    _update_score(e,index,l){
      //console.log(e);
      //console.log(index)
      //console.log(l)
      this.table[index][l+1] = e.target.value;
    },
    _save_score() {
     // console.log(this.table);
      //return;
      // this.lesson.forEach((item, i) => {
      //   this.table[this.params.selectIndex][i + 2] = item["value"];
      // });

// return
      let obj = {
        kaoShiId: this.params.id,
        gradeDetail: this.table
      };
      this.$save_test_update(obj).then(() => {
        this.$createToast({
          message: "考试成绩更新成功!",
          duration: 2000
        }).show();
        setTimeout(()=>{
          this.$router.go(-1)
        },800)
        
      });
    },
    _save_test(index, li) {
      if (li == "编录") {
        this.params.selectIndex = index;
        this.popups[0] = true;
        this.lesson.forEach((item, i) => {
          item.value = this.table[this.params.selectIndex][i + 2];
        });
      }
    },
    _focus(e) {
      e.target.value = "";
    }
  },
  watch: {},
  destroy() {}
};
</script>
<template>
  <div class="vc-fluid--h-min vc-padding__xl-x--bm  vc-bg">

    <van-popup position="right" v-model="popups[0]">
      <div class="vc-fluid--h-min vc-padding__lg--ud vc-bg vc-flex vc-items--center">
        <div class="vc-fluid--w vc-padding__lg--ad">

          <div v-for="(item,index) in lesson " :key=index>
            <div class="vc-text--baseline--md">{{ item['name']}}</div>
            <div class="vp-input vc-margin--bm">
              <input type="number" v-model="item['value']" :placeholder="'请输入成绩'" @focus="_focus" class="vp-input__inner" max="999" step="1">
            </div>
          </div>
          <div class="vc-padding--tp">
            <div class="vp-btn__submit vp-btn--theme vc-margin--bm" @click="_save_score">保存成绩</div>
            <div class="vp-btn__submit vp-btn--normal" @click="popups[0] = false ">取消</div>
          </div>

        </div>
      </div>
    </van-popup>
    <div style="overflow-x: auto">
      <table class="vp-table">
        <colgroup>
        </colgroup>
        <tr v-for="(item,index) in table" :key="index">
          <td class="vc-text--center  vp-table--center vc-padding__md-lg vc-border--bm vc-border--rt" v-for="(li,l) in item.slice(1,item.length - 1)" :key='l'>

            <div style="min-width: 60px">
              <div class="vp-input" v-if="index != 0 && l != 0">
                <input type="number" class="vp-input__inner vp-input__bg--white" @focus="_focus" :value='li' @input="_update_score($event,index,l)" >
              </div>

              <span v-else class="" :class="{'vc-text--bold':index ==0 }" @click="_save_test(index,li)">{{ li }}</span>

            </div>

          </td>
        </tr>
      </table>
    </div>

    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row">
        <div class=" vp-btn__simple vp-btn--white " @click="_save_score">保存</div>
      </div>
    </div>

    
    <!--<div class="vp-footer vp-footer&#45;&#45;shadow">
      <div class="vc-flex vp-row" >
        <div class="vp-btn__simple vp-btn&#45;&#45;white " @click="_save_score">发布</div>
      </div>
    </div>-->

  </div>
</template>
<style scoped></style>
