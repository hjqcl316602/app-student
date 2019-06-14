<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  export default {
    name: "SubUserClassMemberParents",
    components: {},
    mixins: [ user ],
    data() {
      return {
        params:{
          stuId:''
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
        this.params.stuId = this.$route.query['stuId'];
        this.$get_student_parents(this.params)
      },
      _to_phone(mobile){
        window.location.href = `tel://${mobile}`;
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
<div>
  <template v-if="parents.list.length > 0">
    <div class="vc-padding__lg vc-bg">
      <div class="vc-text--bold vc-margin--bm">家长列表</div>
      <div class=" vc-padding__md-lg--ud vc-flex--between-center" :class="{'vc-border--bm':index != ( parents.list.length - 1 ) }" v-for="(item,index) in parents.list">
          <span class="">{{ item['name'] }}</span>
          <span class="vc-text--theme" @click="_to_phone(item['mobile'])">{{ item['mobile'] }}</span>
      </div>
    </div>
  </template>
  <template v-else>
    <div class=" vc-padding__lg--ad vc-padding__xl-x--ud vc-bg vc-fluid vc-flex--center" >
      <div class="" >
        <div class="vc-text--light vc-text--center">该学生没有添加家长哦～～</div>
      </div>
    </div>
  </template>
</div>
</template>
<style scoped></style>
