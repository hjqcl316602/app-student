import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import basic from './basic';
import manager from './manager';

export default new Vuex.Store({
  modules:{ basic,manager },
  strict:false
})
