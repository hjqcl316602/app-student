

// data 不能以特殊字符开头 如$ _ __ ...等字符串
import Vue from 'vue'

Vue.mixin( {
  computed:{
    userMessage(){
      let  userMessage = this.$store.state.basic['userMessage'];
      return userMessage;
    }
  },
  watch:{
  }
});

