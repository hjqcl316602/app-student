<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        //import basic  from '../Mixin/basic'
        export default {
                name: "",
                components: {},
                mixins: [],
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
                        this._init_page()
                },
                mounted(){

                },
                activated(){
                },
                props: [],
                data(){
                        return {}
                },
                methods: {
                        async _init_page(){

                        }

                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
<div>
  <div class="vc-bg">
    <div class="vp-row    vc-flex vc-items--center vc-content--between vc-padding__lg--ad">
      <div class="vc-text--bold vc-text--lg">课程老师</div>
      <div class="vp-icon__outer">
        <span class=" vc-text vc-text--light vc-text--lg">语文老师</span>
        <i class=" vc-text iconfont icon-iconfontjiantou2 vc-text--lg vc-text--light vc-margin__sm--lt"></i>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped></style>
