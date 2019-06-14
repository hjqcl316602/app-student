

import Vue from 'vue'
Vue.mixin( {
  filters:{
    str_name(value){
      return value + '123456'
    },
    num_str(value){
      return Utils.SectionToChinese(value)
    },
    str_money(value){
      //console.log(value)
      if(value){
        return (value / 100).toFixed(2) ;
      } else{
        return '0.00'
      }
    },
    // 小于10，前面加0
    str_zero(value){
      if(!value || value > 9 || value < 1) return ;
      return '0' + value
    },
    str_sex(value){
      let sex = [ { text :'男',value:'1'},{ text:'女' ,value:'2'}];
      let CurrentSex = Arrays.filter(sex,(item)=>{ return item['value']  == value  } ) ;
      return CurrentSex.length > 0 ? CurrentSex[0]['text'] : "不详";
    },
    str_week(value){
        let date = new Date();
        let week = ['周日','周一','周二','周三','周四','周五','周六',];

        return week[date.getDay()]
    },
    str_atten_status(value){
      let status = [ '请假','迟到','早退','值日','留校','已离校','已到校','正常'];
      return status[value-2]
    }
  },

});
