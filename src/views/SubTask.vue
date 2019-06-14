<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import task  from './mixin/task'
  import VaBtnGroup  from './component/va.btn.group.vue'
  export default {
    name: "",
    components: { VaBtnGroup },
    mixins: [ task ],

    activated(){
      this._init_page();
    },
    data(){


      return {
        tab:{
          options:[],
          active:0
        },
      }
    },
    methods: {
      async _init_page(){
        if(this.userMessage['memType'] == 1 ){
          this.$get_task_list(false,true,false)
        }  else if(this.userMessage['memType'] == 2){
          this.$get_task_list(false,true,true)
        }

      },
      _jump_page(type,item){
        if(type=='edit'){
          let task = Arrays.filter(this.task.list,function (item) {
            return item['editFlag'] == 1;
          });
          sessionStorage.setItem('taskDoneInfoToday',JSON.stringify(task[0] || {} )  );
          this.$router.push({ name : 'SubTaskEdit'})

        }else if(type=='detail'){
          sessionStorage.setItem('taskDetailInfo',JSON.stringify(item));
          this.$router.push({ name : 'SubTaskDetail'})
        }else if(type=='done'){
          sessionStorage.setItem('taskDoneInfo',JSON.stringify(item));
          this.$router.push({ name : 'SubTaskDone'})
        }
      }

    },
    watch: {
      ['userMessage']:{
        handler(val,oldval){

          let options = (val['memType'] == 1)? [
            { text:'各科作业' ,value:'1'},
            { text:'作业统计' ,value:'2'},
            { text:'作业报表' ,value:'3'},
          ] : [
            { text:'作业统计' ,value:'1'},
            { text:'作业报表' ,value:'3'},
          ];
          this.tab.options = options
        },
        deep:true,
        immediate:true
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="">

    <template v-if="userMessage['memType'] == 1">

      <template v-if="task.list.length > 0">
        <div class=" vc-padding__xl-x--bm vc-fluid--h-min ">
          <van-list  v-model="task.push.loading"
                     :finished="task.push.finished"
                     @load="$get_task_list(true,false)">
            <div class="vc-bg vc-margin--bm vc-padding__lg--ad vc-padding__lg--tp" v-for="(item,index) in task.list" @click="_jump_page('detail',item)">
              <div class="vc-flex vc-flex--between-center vc-padding--bm vc-border--bm">
                <div class="vc-text--bold">
                  {{item['title']}}
                </div>
              </div>
              <div class="vc-padding--ud  ">
                <p class="vc-text--light vc-text--baseline--md" v-for="(task, taskItem ) in JSON.parse( item['detail'] ) ">【{{ task['title']}}】{{ task['content']}}</p>
              </div>
              <div class="vc-text--right vc-padding--ud ">
                <div class="vp-btn vp-btn__oper--small vp-btn--cancel vc-text--theme" @click="_to_check_detail(item)">
                  查看详情
                </div>
              </div>



            </div>

            <div v-if="task.push.finished && task.list.length > task.pageSize" class="vc-text--light vc-text--center vc-padding__lg--ud"> ~没有更多作业信息了~</div>
          </van-list>
        </div>
      </template>

      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center">当前还没有作业哦～～</div>
          </div>
        </div>
      </template>

      <div class="vp-footer vp-footer--shadow">
        <div class="vc-flex vp-row" >
          <div   class="vc-flex--aut   vp-btn__simple vp-btn--theme "   @click="_jump_page('edit')">编辑今日作业</div>
        </div>
      </div>

    </template>

    <template v-if="userMessage['memType'] == 2">

      <template v-if="task.list.length > 0 ">
        <div class="">
          <van-list  v-model="task.push.loading"
                     :finished="task.push.finished"
                     @load="$get_task_list(true,false)">
            <div class="vc-bg vc-margin--bm vc-padding__lg--ad vc-padding__lg--tp" v-for="(item,index) in task.list">
              <div class="vc-flex vc-flex--between-center vc-padding--bm vc-border--bm">
                <div class="vc-text--bold">
                  {{item['title']}}
                </div>

              </div>
              <div class="vc-padding--ud  ">
                <p class="vc-text--light vc-text--baseline--md" v-for="(task, taskItem ) in JSON.parse( item['detail'] ) ">【{{ task['title']}}】{{ task['content']}}</p>
              </div>
              <div class="vc-text--right vc-padding--ud ">
                <div class="vp-btn vp-btn__oper--small vp-btn--cancel vc-text--theme" @click="_jump_page('detail',item)">
                  查看详情
                </div>
                <div v-if="item['status'] == 1" class="vp-btn  vp-btn__oper--small vp-btn--ok vc-text--theme vc-margin--lt" @click="_jump_page('done',item)">
                  去评定
                </div>
                <div v-if="item['status'] == 2" class="vp-btn  vp-btn__oper--small vp-btn--ok vc-text--theme vc-margin--lt" @click="_jump_page('done',item)">
                  去完善
                </div>
                <div v-if="item['status'] == 3" class="vp-btn  vp-btn__oper--small vp-btn--ok vc-text--theme vc-margin--lt" @click="_jump_page('done',item)">
                  去修改
                </div>
              </div>

            </div>

            <div v-if="task.push.finished && task.list.length > task.pageSize" class="vc-text--light vc-text--center vc-padding__lg--ud"> ~没有更多作业信息了~</div>
          </van-list>
        </div>
      </template>

      <template v-else>
        <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center">当前还没有作业哦～～</div>
          </div>
        </div>
      </template>

    </template>



  </div>
</template>
<style scoped></style>
