<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  //import { VaPopupRadio }  from './component'
  import user  from './mixin/user'
  import classes  from './mixin/class'
  export default {
    name: "",
    components: {},
    mixins: [ user,classes ],

    activated() {
      this._init_page()
    },
    props: [],
    data() {
      return {}
    },
    methods: {
      async _init_page() {
        await this.$get_class_name();
        await  this.$get_cmc_list()

      },
      _select_cmc(checked,item,index){

        if(!checked){
          this.$dialog.confirm({
            title:'家委会删除提示',
            message:`是否确认删除【${this.classes.type}·${this.classes.name}】的家委会成员【${item['name']}】`
          }).then(()=>{
            this.$delete_cmc({ cmcId:item['cmcId']}).then(()=>{
              this.cmc.list[index]['checked'] = checked
              this.cmc.isCmcNum --;
              this.$createToast({message:'家委会成员删除成功!',duration:2000}).show();
            })
          }).catch(()=>{
            this.cmc.list[index]['checked'] = !checked
          })

        }else{
          this.$dialog.confirm({
            title:'家委会添加确认',
            message:`是否确认添加【${item['name']}】作为【${this.classes.type}·${this.classes.name}】的家委会成员,可拥有老师的权限，！`
          }).then(()=>{
            this.$add_cmc({ cmcId:item['cmcId']}).then(()=>{
              this.cmc.isCmcNum ++;
              this.cmc.list[index]['checked'] = checked
              this.$createToast({message:'家委会成员添加成功!',duration:2000}).show();
            })
          }).catch(()=>{
            this.cmc.list[index]['checked'] = !checked
          })

        }
      }

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy() {
    }
  }
</script>
<template>
  <div class="">

    <div class="">
      <div class="vp-header vp-header--shadow">
        <div class="vp-row vc-bg--theme vc-flex--center vc-text--lg vc-text--white ">{{ classes['type']}}·{{ classes['name']}},家委会共{{ cmc.isCmcNum}}人</div>
      </div>

      <template v-if="cmc.list.length > 0">
        <div class="vc-fluid--h-min vc-padding__xl-x--ud vc-bg">
          <div v-for="(item,index) in cmc.list">
            <div class="vc-flex--between-center vc-border--bm vp-row--min vc-padding__lg--ad">
              <span class="vc-text--bold" :class="{'vc-text--theme':item['checked'] }">{{ item['name']}}</span>
              <!--<div class="vp-icon__select"></div>-->
              <van-switch size="25px" v-model="item['checked']" @input="_select_cmc($event,item,index)"/>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="  vc-bg vc-fluid vc-flex--center" >
          <div class="" >
            <div class="vc-text--light vc-text--center vc-padding__lg--ud">本班级暂无家长，去邀请家长吧~~</div>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>
<style scoped></style>
