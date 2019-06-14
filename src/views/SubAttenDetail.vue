<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        //import basic  from '../Mixin/basic'
        export default {
                name: "SubAttenDetail",
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
                  console.log("SubAttenDetail")
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
  <div class="vc-bg  vc-fluid--h-min">

    <div class="vc-margin__lg--bm">

      <table class="vp-table vc-border--tp">
        <tr>
          <td colspan="6" class="vc-border--bm vc-border--rt ">
            <div class="vc-padding__lg vc-flex vc-content--between">
              <div class="vc-text--bold">2018-08-01 星期一 考勤日报</div>
            </div>
          </td>
        </tr>
        <tr class="">
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">姓名</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">出勤</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">迟到</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">请假</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">值日</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light vc-text--bold">留校</span></td>
        </tr>

        <tr class="" v-for="item in 10">
          <td class="vc-text--left vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt vc-padding--ad " style="width: 80px"><span class="vc-text--light">姓名姓名</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">2</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">555</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">1</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">5</span></td>
          <td class="vc-text--center vp-row vp-table--center vc-padding--ud vc-border--bm vc-border--rt"><span class="vc-text--light">2</span></td>
        </tr>
      </table>
    </div>

  </div>
</template>
<style scoped></style>
