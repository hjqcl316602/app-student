<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "",
    components: {},
    mixins: [],
    beforeRouteEnter(to, from, next) {
      next(vm => {
      })
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {

    },
    mounted() {

    },
    activated() {
      if (!this.$route.meta.noLoading) {
        this._init_page();
      }
    },
    props: {
      finished:{
        type:Boolean,
        default:true
      },
      loading:{
        type:Boolean,
        default:false
      },
      msg:{
        type:String,
        default:'暂无更多数据~'
      }
    },
    data() {
      return {}
    },
    methods: {
      async _init_page() {

      },
      _load_more(){
        this.$emit('load')
      }


    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>

  <div class="vc-text--center vc-padding__lg "  >
    <div class="vc-text--light" v-if="!finished">
      <span v-if="!loading" @click="_load_more">单击查看更多</span>
      <va-spinner v-if="loading" types="crescent"></va-spinner>
    </div>
    <div class="vc-text--gray" v-else>{{ msg }}</div>
  </div>

</template>
<style scoped></style>
