
// 页面滚动到指定位置
function scrollTop(scroll) {
  document.body.scrollTop =  scroll ;
  document.documentElement.scrollTop = scroll;
}

//得到指定元素距离页面顶部的距离
function getElementOffsetY(element) {
  return  element.offsetTop
}

//得到元素的data属性
function getElementData(element,dataKey) {
  return (element.dataset) ? element.dataset[dataKey] : element.getAttribute(`data-${dataKey}`)
}

export {
  scrollTop,getElementOffsetY,getElementData
}
