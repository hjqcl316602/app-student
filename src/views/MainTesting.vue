<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        //import basic  from '../Mixin/basic'
        import Navbar  from './component/page.navbar.vue'
        export default {
                name: "",
                components: { Navbar },
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
  <div>模拟测试
    <Navbar active="testing"></Navbar>
  </div>
</template>
<style scoped></style>
