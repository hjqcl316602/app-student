<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "new",
    components: {},
    mixins: [],
    data() {
      return {}
    },
    mounted() {
    },
    activated() {
      if (!this.$route.meta.noLoading) {
        this._init_page();

      }

    },
    methods: {
      async _init_page() {


      },


    },
  }
</script>
<template>

</template>
<style scoped></style>
