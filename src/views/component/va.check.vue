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
    props:{
      options:{
        type:Array,
        default:()=>{
          return []
        }
      },
      isSingle:{
        type:Boolean,
        default:true
      },
      value:{
        type:Array,
        default:()=>{
          return []
        }
      },
      customStyle:{
        type:Object,
      }
    },
    computed:{

      checkItems(){

        let arr = [];
        this.options.forEach((item,i)=>{
          let obj  =  {};
          if(JSON.parse( this.currentValue ).indexOf(i) > -1 ){
            obj =  Object.assign(item,{ active:true });
          }else{
            obj = Object.assign(item,{ active:false });
          }
          arr.push(obj)
        });
        return arr ;

      }
    },
    data(){
      return {
        currentValue:'',
      }
    },
    methods: {
      async _init_page(){

      },
      _check_box(index){

        if(this.isSingle){
          this.currentValue =JSON.stringify([index]) ;

        }else{
          let currentValue = JSON.parse(this.currentValue);
          let activeIndex = currentValue.indexOf(index);
          if( activeIndex > -1){
             currentValue.splice(activeIndex,1)
          }else{
            currentValue.push(index)
          }
          this.currentValue = JSON.stringify(currentValue)
        }


        //let arr = Arrays.filter(this.checkItems,(item)=>{ return !!item.active });
        //this.$emit('select',arr)
      }

    },
    watch: {
      ['value']: {
        handler(val, olval){

          this.currentValue = JSON.stringify(val);
        },
        deep: true,
        immediate:true
      },
      ['currentValue'](val, olval){

        this.$emit('input',JSON.parse(val))
      },
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="va-check">
    <div class="va-check__item" :style="customStyle" :class="{'va-check__item--normal' : !item.active,'va-check__item--active':item.active }"
         v-for="(item,index) in checkItems"  @click="_check_box(index)">
      {{ item['text'] }}
    </div>
  </div>
</template>
<style scoped></style>
