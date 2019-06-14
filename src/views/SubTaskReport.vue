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
  <div class="   vc-fluid--h-min">
    <div class="vc-bg  vc-padding__lg--bm" >
      <table class="vp-table ">
        <tr>
          <td colspan="8"  class="vc-border--bm vc-border--rt ">
            <div class="vc-padding__lg vc-flex vc-content--between">
              <div>
                <div class="vc-text--bold">2018-08-01 星期一作业内容</div>
                <div class="vc-text--light "> 本周作业共5次</div>
              </div>
            </div>
          </td>
        </tr>
        <tr class="">
          <td class="vc-text--left vc-padding__lg--lt vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">姓名</span></td>
          <td class="vc-text--center  vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">完成次数</span></td>
          <td class="vc-text--center  vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">平均耗时(h)</span></td>
          <td class="vc-text--center  vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">综合评定</span></td>
        </tr>

        <tr class="" v-for="item in 30">
          <td class="vc-text--left vc-padding__lg--lt vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt vc-padding--ad " ><span class="vc-text--light">黄军泉</span></td>
          <td class="vc-text--center  vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">1</span></td>
          <td class="vc-text--center  vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">1</span></td>
          <td class="vc-text--center  vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">1</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped></style>
