export const PORT_TYPE = 2; // 1 - 老师端  2 - 家长端
export const PARENT_TEST_INSERT = false
export const PARENT = { CLASSID: '45', STUID: '49'}
export const TEACHER_TEST_INSERT = false;
export const TEACHER = {CLASSID: '45'}
export const webMemId = 2;
export const fromUser = 'D8AF00827AFA371A';

export const IS_LOCAL = true; // 是调用本地服务器接口

export const HTTP_LOCATION = function () {
  if (window.location.href.indexOf('dev.bstchain') > -1) {
    return 'dev'; // 测试环境
  }
  if (window.location.href.indexOf('m.bstchain') > -1) {
    return 'production'; // 生产环境
  }
  if (window.location.href.indexOf('192.168') > -1 || window.location.href.indexOf('localhost') > -1) {
    return 'localhost'; //开发环境
  }
}();

// 接口请求地址 - 微信相关
export const HTTP_REQUEST_WX = function () {
  if (HTTP_LOCATION === 'localhost') {
    return IS_LOCAL ? 'http://192.168.0.109:18091/st':'http://dev.bstchain.com/st'; // http://192.168.0.108:18091 、 http://dev.bstchain.com
  } else {
    return '/st';
  }
}();

// 接口请求地址 - 数据接口
export const HTTP_REQUEST_ST = function () {
  if (HTTP_LOCATION === 'localhost') {
    return IS_LOCAL ? 'http://192.168.0.109:18091/st':'http://dev.bstchain.com/st'
  } else {
    return '/st';
  }
}();

// 当前域名
export const HTTP_WEB = window.location.href.split('#')[0];
