<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'\
  import { VaPopupRadio }  from './component'
  import album  from './mixin/album'
  export default {
    name: "",
    mixins: [ album ],
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
      this._init_page()
    },
    activated() {

    },
    props: [],
    data() {
      return {
        mem:{
          list:[],
          isSelectAll:false
        },
        params:{
          edit:'insert',
          photoId:'',
          photoName:'',
          photoType:'1',
          photoTypeName:'',
          memIds:''
        },

      }
    },
    methods: {
      async _init_page() {
        this.params.edit = this.$route.query['edit'] || 'insert';

        if(this.params.edit == 'insert'){
          if(this.userMessage['memType'] == 2){

            await  this.$get_album_student().then((res)=>{

              let mem = res['data'];
              let newMem = [];
              mem.forEach((item,i)=>{
                let obj = {
                  memId:item['memId'],
                  memName:item['memName'],
                  select:false
                };
                newMem.push(obj)
              });
              this.mem.list = newMem;
            })
          }

        }else if(this.params.edit == 'update'){
          let selectAlbum = JSON.parse(sessionStorage.getItem('selectAlbum'));
          this.params.photoId = selectAlbum['photoId'];
          this.params.photoName = selectAlbum['photoName'];
          this.params.memIds = selectAlbum['memIds'];

          if(this.userMessage['memType'] == 2){
            let memIds = selectAlbum['memIds'] ? selectAlbum['memIds'].split(',') : [];

            await  this.$get_album_student().then((res)=>{
              let mem = res['data'];
              let newMem = [];
              mem.forEach((item,i)=>{
                let obj = {
                  memId:item['memId'],
                  memName:item['memName'],
                };
                let index = memIds.findIndex((memId)=>{ return memId == item['memId']});

                if(memIds.length > 0 && index > -1){
                  obj['select'] = true ;
                }else{
                  obj['select'] = false ;
                }
                newMem.push(obj)
              });
              this.mem.list = newMem;
            })
          }

        }



      },
      _save_pic(){

        if(Valids.isEmptyString(this.params.photoName)){
          this.$createToast({ message:'请输入相册名称!',duration:2000}).show();
          return ;
        }

        if(this.userMessage['memType'] == 1){
          this.params.photoType = 1 ;
        }else if(this.userMessage['memType'] == 2){
          this.params.photoType = 2 ;
          let memIds = [];
          this.mem.list.forEach((item)=>{
            if(item['select']){
              memIds.push(item['memId'])
            }
          });
          this.params.memIds = memIds.join(',');
        }

        if(this.params.edit == 'insert'){

          this.$create_album(this.params).then(()=>{
            this.$createToast({ message:'新增相册成功!',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-1);
              this.$destroy()
            },800)
          })

        }else if(this.params.edit == 'update'){
          this.$update_album(this.params).then(()=>{
            this.$createToast({ message:'修改相册成功!',duration:2000}).show();
            setTimeout(()=>{
              this.$router.go(-2);
              this.$destroy()
            },800)
          })

        }


      },
      _select_mem(i){
        this.mem.list[i]['select'] = !this.mem.list[i]['select'];
      },
      _select_mem_all(){
        this.mem.list.forEach((item,i)=>{
          item['select'] = this.mem.isSelectAll ? false :true ;
        })
      }

    },
    watch: {
      'mem.list': {
        handler(val, olval){
          let arr = Arrays.filter(val,(item)=>{
            return !!item['select']
          })
          this.mem.isSelectAll = (arr.length == val.length ) ? true : false
        },
        deep: true ,
        immediate:true
      },
    },
    destroy() {
    }
  }
</script>
<template>
  <div class="vc-fluid--h-min vc-bg vc-padding__lg vc-padding__xl-x--bm">


    <div class="vc-margin__lg--bm">
      <div class="vc-text--bold vc-margin--bm">相册名称</div>
      <div class="vp-input vc-margin--bm">
        <input type="text"  placeholder="请输入相册名称" class="vp-input__inner" v-model="params['photoName']" >
      </div>
    </div>

    <template v-if="userMessage['memType'] == 2">
      <div class="vc-margin__lg--bm" >
        <div class="vc-flex--between-center">

          <div class="vc-text--bold vc-margin--bm">指定人可见</div>
          <div class="vp-icon__outer" v-if="mem.list.length > 0" @click="_select_mem_all">
            <div class="vp-icon__select "  :class="{'vp-icon__select--active':mem.isSelectAll}" ></div>
            <span class="vc-text--bold vc-margin--lt">全选</span>
          </div>

        </div>

        <template v-if="mem.list.length > 0">

          <div class="vc-margin--tp">
            <div class="vc-flex vc-items--center vc-padding__lg vc-border--bm" v-for="(item,i) in mem.list" @click="_select_mem(i)" >
              <div class="vp-icon__select " :class="{'vp-icon__select--active':item['select'] }" ></div>
              <span class="vc-text--bold vc-margin--lt">{{ item['memName']}}</span>
            </div>
          </div>

        </template>
        <template v-else>
          <div class="vc-padding--ud vc-text--light vc-text--center">暂无家长列表</div>
        </template>


      </div>
    </template>


    <div class="vp-footer vp-footer--shadow">
      <div class="vc-flex vp-row" >
        <div  class=" vp-btn__simple vp-btn--white "  @click="_save_pic">提交</div>
      </div>
    </div>

  </div>
</template>
<style scoped></style>
