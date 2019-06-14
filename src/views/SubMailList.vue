<script type="text/ecmascript-6">
  import mail  from './mixin/mail'
  export default {
    name: 'SubMailList',
    mixins:[ mail ],
    data() {
      return {

      }
    },
    activated() {
      this._init_page();
    },
    methods:{
      async _init_page(){
        await this.$get_class_teacher();
      },
      _jump_page(item) {
        sessionStorage.setItem("liuYan-chengHu", item["chengHu"]);
        sessionStorage.setItem("liuYan-liuYanId", item["liuYanId"]);
        sessionStorage.setItem("liuYan-recId", item["memId"]);
        this.$router.push({ name: "SubInteractionWordsEdit" });
      }
    }
  }
</script>

<template>
  <div class="vc-fluid--h-min vc-bg ">

    <template v-if="teacher.list.length > 0">

      <div   :key="index" v-for="(item,index) in teacher.list" @click="_jump_page(item)">
        <div class="vc-border--bm vc-padding__lg" >
          <div class="vc-flex vc-items--center" >
            <div class="vp-img__inner vp-img__head  " data-round="35">
              <img :src="item['photo']" alt="" class="vp-img--max">
              <img src="../img/icon-head-error.png" alt="" class="vp-img--error">
            </div>
            <span class="vc-margin--lt">{{ item['chengHu']}}</span>
          </div>
        </div>
      </div>


    </template>

    <template v-else>
      <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
        <div class="">
          <div class="vc-text--light vc-text--center">当前学生还没有添加家长～～</div>
        </div>
      </div>
    </template>

  </div>
</template>

<style   scoped>
</style>
