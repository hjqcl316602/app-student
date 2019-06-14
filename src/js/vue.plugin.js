
import Vue from 'vue'
//************************************************ vue 编程式组件的绑定 *******************************************************/
import createPlugin from '../js.utils/create.api';
import {  VaLoading ,VaTip , VaConfirm ,VaToast } from '../views/component'
createPlugin(Vue, VaLoading, ['click'], true);
createPlugin(Vue, VaTip, ['click'], true);
createPlugin(Vue, VaConfirm, ['cancel', 'ok'], true);
createPlugin(Vue, VaToast, [''], true);
/*使用方法
 this.$createLoading().show()
 this.$createConfirm({
 title:'',
 message:'sdsd',
 onOk:()=>{
 console.log('ok')
 }
 }).show();
 this.$createToast({message:'dhjashdjhsjdhjshdjshjdhsjdhjshdjshjdhs',duration:2000}).show()
 */
