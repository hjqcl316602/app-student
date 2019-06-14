

/*
 import Login from '../views/Login.vue';
 import MainIndex from '../views/MainIndex.vue';
 import MainResource from '../views/MainResource.vue';
 import MainTesting from '../views/MainTesting.vue';
 import MainUser from '../views/MainUser.vue';

 import SubAtten from '../views/SubAtten.vue';
 import SubAttenDetail from '../views/SubAttenDetail.vue';
 */

const Login = r => require.ensure([], () => r(require('@/views/Login.vue')), 'Login');
const MainIndex = r => require.ensure([], () => r(require('@/views/MainIndex.vue')), 'MainIndex');
const MainResource = r => require.ensure([], () => r(require('@/views/MainResource.vue')), 'MainResource');
const MainTesting = r => require.ensure([], () => r(require('@/views/MainTesting.vue')), 'MainTesting');
const MainUser = r => require.ensure([], () => r(require('@/views/MainUser.vue')), 'MainUser');

const SubBannerDetail = r => require.ensure([], () => r(require('@/views/SubBannerDetail.vue')), 'SubBannerDetail');
// 考勤
const SubAtten = r => require.ensure([], () => r(require('@/views/SubAtten.vue')), 'SubAtten');
const SubAttenParent = r => require.ensure([], () => r(require('@/views/SubAttenParent.vue')), 'SubAttenParent');
const SubAttenParentHistory = r => require.ensure([], () => r(require('@/views/SubAttenParentHistory.vue')), 'SubAttenParentHistory');
const SubAttenDetail = r => require.ensure([], () => r(require('@/views/SubAttenDetail.vue')), 'SubAttenDetail');
// 课纪
const SubClass = r => require.ensure([], () => r(require('@/views/SubClass.vue')), 'SubClass');
const SubClassTimetableEdit = r => require.ensure([], () => r(require('@/views/SubClassTimetableEdit.vue')), 'SubClassTimetableEdit');
const SubClassTimetableEditWeekend = r => require.ensure([], () => r(require('@/views/SubClassTimetableEditWeekend.vue')), 'SubClassTimetableEditWeekend');
const SubClassRulesEdit = r => require.ensure([], () => r(require('@/views/SubClassRulesEdit.vue')), 'SubClassRulesEdit');
const SubClassExpressEdit = r => require.ensure([], () => r(require('@/views/SubClassExpressEdit.vue')), 'SubClassExpressEdit');
const SubClassExpressLabelEdit = r => require.ensure([], () => r(require('@/views/SubClassExpressLabelEdit.vue')), 'SubClassExpressLabelEdit');
const SubClassExpressReport = r => require.ensure([], () => r(require('@/views/SubClassExpressReport.vue')), 'SubClassExpressReport');

// 作业
const SubTask = r => require.ensure([], () => r(require('@/views/SubTask.vue')), 'SubTask');
const SubTaskEdit = r => require.ensure([], () => r(require('@/views/SubTaskEdit.vue')), 'SubTaskEdit');
const SubTaskReport = r => require.ensure([], () => r(require('@/views/SubTaskReport.vue')), 'SubTaskReport');
const SubTaskDone = r => require.ensure([], () => r(require('@/views/SubTaskDone.vue')), 'SubTaskDone');
const SubTaskDetail = r => require.ensure([], () => r(require('@/views/SubTaskDetail.vue')), 'SubTaskDetail');

// 绑定 - 信息完善
const SubInfoTeacher = r => require.ensure([], () => r(require('@/views/SubInfoTeacher.vue')), 'SubInfoTeacher');
const SubInfoStudent = r => require.ensure([], () => r(require('@/views/SubInfoStudent.vue')), 'SubInfoStudent');
const SubInfoSingle = r => require.ensure([], () => r(require('@/views/SubInfoSingle.vue')), 'SubInfoSingle');
// 成绩 - 考试
const SubScore = r => require.ensure([], () => r(require('@/views/SubScore.vue')), 'SubScore');
const SubScoreDetail = r => require.ensure([], () => r(require('@/views/SubScoreDetail.vue')), 'SubScoreDetail');
const SubScoreEdit = r => require.ensure([], () => r(require('@/views/SubScoreEdit.vue')), 'SubScoreEdit');
const SubScoreTestEdit = r => require.ensure([], () => r(require('@/views/SubScoreTestEdit.vue')), 'SubScoreTestEdit');
const SubScoreReport = r => require.ensure([], () => r(require('@/views/SubScoreReport.vue')), 'SubScoreReport');
//论坛
const SubInteraction = r => require.ensure([], () => r(require('@/views/SubInteraction.vue')), 'SubInteraction');
const SubInteractionForumEdit = r => require.ensure([], () => r(require('@/views/SubInteractionForumEdit.vue')), 'SubInteractionForumEdit');
const SubInteractionPKEdit = r => require.ensure([], () => r(require('@/views/SubInteractionPKEdit.vue')), 'SubInteractionPKEdit');
const SubInteractionPKDetail = r => require.ensure([], () => r(require('@/views/SubInteractionPKDetail.vue')), 'SubInteractionPKDetail');
const SubInteractionPKInsert = r => require.ensure([], () => r(require('@/views/SubInteractionPKInsert.vue')), 'SubInteractionPKInsert');
const SubInteractionActivityEdit = r => require.ensure([], () => r(require('@/views/SubInteractionActivityEdit.vue')), 'SubInteractionActivityEdit');
const SubInteractionActivityDetail = r => require.ensure([], () => r(require('@/views/SubInteractionActivityDetail.vue')), 'SubInteractionActivityDetail');
const SubInteractionWordsEdit = r => require.ensure([], () => r(require('@/views/SubInteractionWordsEdit.vue')), 'SubInteractionWordsEdit');
const SubInteractionWordsSend = r => require.ensure([], () => r(require('@/views/SubInteractionWordsSend.vue')), 'SubInteractionWordsSend');
const SubInteractionForumDetail = r => require.ensure([], () => r(require('@/views/SubInteractionForumDetail.vue')), 'SubInteractionForumDetail');

// 资源
const SubResource = r => require.ensure([], () => r(require('@/views/SubResource.vue')), 'SubResource');
const SubResourceDetail = r => require.ensure([], () => r(require('@/views/SubResourceDetail.vue')), 'SubResourceDetail');
const SubResourcePhotoDetail = r => require.ensure([], () => r(require('@/views/SubResourcePhotoDetail.vue')), 'SubResourcePhotoDetail');


//相册
const SubAlbum = r => require.ensure([], () => r(require('@/views/SubAlbum.vue')), 'SubAlbum');
const SubAlbumEdit = r => require.ensure([], () => r(require('@/views/SubAlbumEdit.vue')), 'SubAlbumEdit');
const SubAlbumManager = r => require.ensure([], () => r(require('@/views/SubAlbumManager.vue')), 'SubAlbumManager');
const SubAlbumPower = r => require.ensure([], () => r(require('@/views/SubAlbumPower.vue')), 'SubAlbumPower');
const SubAlbumElectron = r => require.ensure([], () => r(require('@/views/SubAlbumElectron.vue')), 'SubAlbumElectron');
const SubAlbumDetail = r => require.ensure([], () => r(require('@/views/SubAlbumDetail.vue')), 'SubAlbumDetail');
// 费用
const SubCost = r => require.ensure([], () => r(require('@/views/SubCost.vue')), 'SubCost');
const SubCostDetail = r => require.ensure([], () => r(require('@/views/SubCostDetail.vue')), 'SubCostDetail');
const SubCostEdit = r => require.ensure([], () => r(require('@/views/SubCostEdit.vue')), 'SubCostEdit');
const SubCostRoll = r => require.ensure([], () => r(require('@/views/SubCostRoll.vue')), 'SubCostRoll');
const SubCostDetailParent = r => require.ensure([], () => r(require('@/views/SubCostDetailParent.vue')), 'SubCostDetailParent');

//个人中心
const SubUserMessage = r => require.ensure([], () => r(require('@/views/SubUserMessage.vue')), 'SubUserMessage');
const SubUserNews = r => require.ensure([], () => r(require('@/views/SubUserNews.vue')), 'SubUserNews');
const SubUserNewsDetail = r => require.ensure([], () => r(require('@/views/SubUserNewsDetail.vue')), 'SubUserNewsDetail');
const SubUserNoticeDetail = r => require.ensure([], () => r(require('@/views/SubUserNoticeDetail.vue')), 'SubUserNoticeDetail');
const SubUserNewsSet = r => require.ensure([], () => r(require('@/views/SubUserNewsSet.vue')), 'SubUserNewsSet');
const SubUserNewsSetTime = r => require.ensure([], () => r(require('@/views/SubUserNewsSetTime.old.vue')), 'SubUserNewsSetTime');
const SubUserClass = r => require.ensure([], () => r(require('@/views/SubUserClass.vue')), 'SubUserClass');
const SubUserClassVip = r => require.ensure([], () => r(require('@/views/SubUserClassVip.vue')), 'SubUserClassVip');
const SubUserClassVipMaterial = r => require.ensure([], () => r(require('@/views/SubUserClassVipMaterial.vue')), 'SubUserClassVipMaterial');
const SubUserClassVipPay = r => require.ensure([], () => r(require('@/views/SubUserClassVipPay.vue')), 'SubUserClassVipPay');

const SubJoinClass = r => require.ensure([], () => r(require('@/views/SubJoinClass.vue')), 'SubJoinClass');

const SubUserClassTeacherTypeEdit = r => require.ensure([], () => r(require('@/views/SubUserClassTeacherTypeEdit.vue')), 'SubUserClassTeacherTypeEdit');
const SubUserClassMember = r => require.ensure([], () => r(require('@/views/SubUserClassMember.vue')), 'SubUserClassMember');
const SubUserClassMemberParents = r => require.ensure([], () => r(require('@/views/SubUserClassMemberParents.vue')), 'SubUserClassMemberParents');
const SubUserClassParent = r => require.ensure([], () => r(require('@/views/SubUserClassParent.vue')), 'SubUserClassParent');
const SubUserClassParentTeachers = r => require.ensure([], () => r(require('@/views/SubUserClassParentTeachers.vue')), 'SubUserClassParentTeachers');
const SubUserClassLeader = r => require.ensure([], () => r(require('@/views/SubUserClassLeader.vue')), 'SubUserClassLeader');
const SubUserShare = r => require.ensure([], () => r(require('@/views/SubUserShare.vue')), 'SubUserShare');
const SubUserShareParent = r => require.ensure([], () => r(require('@/views/SubUserShareParent.vue')), 'SubUserShareParent');
const SubUserAbout = r => require.ensure([], () => r(require('@/views/SubUserAbout.vue')), 'SubUserAbout');

const SubUserFeedback = r => require.ensure([], () => r(require('@/views/SubUserFeedback.vue')), 'SubUserFeedback');

// 班级信息 - 绑定 - 分享
const SubClassEdit = r => require.ensure([], () => r(require('@/views/SubClassEdit.vue')), 'SubClassEdit');
const SubClassTeacherEdit = r => require.ensure([], () => r(require('@/views/SubClassTeacherEdit.vue')), 'SubClassTeacherEdit');
const SubClassJoin = r => require.ensure([], () => r(require('@/views/SubClassJoin.vue')), 'SubClassJoin');
const SubClassJoinParent = r => require.ensure([], () => r(require('@/views/SubClassJoinParent.vue')), 'SubClassJoinParent');
const SubClassChange = r => require.ensure([], () => r(require('@/views/SubClassChange.vue')), 'SubClassChange');
const SubClassChangeTeacher = r => require.ensure([], () => r(require('@/views/SubClassChangeTeacher.vue')), 'SubClassChangeTeacher');

// 2018-11-18 新增
const SubMailList = r => require.ensure([], () => r(require('@/views/SubMailList.vue')), 'SubMailList');
const SubMailListTeacher = r => require.ensure([], () => r(require('@/views/SubMailListTeacher.vue')), 'SubMailListTeacher');
const SubMailListTeacherParents = r => require.ensure([], () => r(require('@/views/SubMailListTeacherParents.vue')), 'SubMailListTeacherParents');

// 其他子页面
const RestMatrix = r => require.ensure([], () => r(require('@/views/RestMatrix.vue')), 'RestMatrix');  // 矩阵
const SubSelectArea = r => require.ensure([], () => r(require('@/views/SubSelectArea.vue')), 'SubSelectArea');  // 矩阵


export default  [
  { path: '*', redirect: '/MainIndex'},
  { path: '/', redirect: '/MainIndex'},
  { path: '/Login', name: 'Login', component:Login   ,meta:{ keepAlive:false,title:"登录",isLogin:false, isNoJoinClass:true  }},
  { path: '/MainIndex', name: 'MainIndex', component:MainIndex   ,meta:{ keepAlive:true, title:"98同班",isLogin:true , }},
  { path: '/MainResource', name: 'MainResource', component:MainResource   ,meta:{ keepAlive:true,title:"微播",isLogin:true }},
  { path: '/MainTesting', name: 'MainTesting', component:MainTesting   ,meta:{ keepAlive:true,title:"模测",isLogin:true }},
  { path: '/MainUser', name: 'MainUser', component:MainUser   ,meta:{keepAlive:true, title:"个人中心",isLogin:true,isBind:true, }},

  { path: '/SubBannerDetail', name: 'SubBannerDetail', component:SubBannerDetail   ,meta:{keepAlive:true, title:"海报详情",isLogin:true, }},

  { path: '/SubAtten', name: 'SubAtten', component:SubAtten   ,meta:{keepAlive:true, title:"考勤",isLogin:true ,isBind:true,  }},
  { path: '/SubAttenParent', name: 'SubAttenParent', component:SubAttenParent   ,meta:{keepAlive:true, title:"考勤",isLogin:true ,isBind:true,  }},
  { path: '/SubAttenParentHistory', name: 'SubAttenParentHistory', component:SubAttenParentHistory   ,meta:{keepAlive:true, title:"请假历史",isLogin:true   }},
  { path: '/SubAttenDetail', name: 'SubAttenDetail', component:SubAttenDetail   ,meta:{keepAlive:true, title:"考勤月报",isLogin:true }},

  { path: '/SubClass', name: 'SubClass', component:SubClass   ,meta:{keepAlive:true, title:"课纪",isLogin:true ,isBind:true}},
  { path: '/SubClassTimetableEdit', name: 'SubClassTimetableEdit', component:SubClassTimetableEdit   ,meta:{keepAlive:true, title:"编辑课表",isLogin:true }},
  { path: '/SubClassTimetableEditWeekend', name: 'SubClassTimetableEditWeekend', component:SubClassTimetableEditWeekend   ,meta:{keepAlive:true, title:"自定义周末",isLogin:true }},
  { path: '/SubClassRulesEdit', name: 'SubClassRulesEdit', component:SubClassRulesEdit   ,meta:{keepAlive:true, title:"创建作息任务",isLogin:true }},
  { path: '/SubClassExpressEdit', name: 'SubClassExpressEdit', component:SubClassExpressEdit   ,meta:{keepAlive:true, title:"表扬",isLogin:true }},
  { path: '/SubClassExpressReport', name: 'SubClassExpressReport', component:SubClassExpressReport   ,meta:{keepAlive:true, title:"纪律报表",isLogin:true }},
  { path: '/SubClassExpressLabelEdit', name: 'SubClassExpressLabelEdit', component:SubClassExpressLabelEdit   ,meta:{keepAlive:true, title:"标签管理",isLogin:true }},

  { path: '/SubTask', name: 'SubTask', component:SubTask   ,meta:{keepAlive:true, title:"作业",isLogin:true ,isBind:true,   }},
  { path: '/SubTaskEdit', name: 'SubTaskEdit', component:SubTaskEdit   ,meta:{ keepAlive:true, title:"创建作业",isLogin:true }},
  { path: '/SubTaskReport', name: 'SubTaskReport', component:SubTaskReport   ,meta:{keepAlive:true, title:"作业报表",isLogin:true }},
  { path: '/SubTaskDone', name: 'SubTaskDone', component:SubTaskDone   ,meta:{keepAlive:true, title:"评定作业",isLogin:true }},
  { path: '/SubTaskDetail', name: 'SubTaskDetail', component:SubTaskDetail   ,meta:{keepAlive:true, title:"作业详情",isLogin:true }},

  { path: '/SubScore', name: 'SubScore', component:SubScore   ,meta:{keepAlive:true, title:"班级成绩",isLogin:true , }},
  { path: '/SubScoreDetail', name: 'SubScoreDetail', component:SubScoreDetail   ,meta:{ keepAlive:true, title:"成绩详情",isLogin:true }},
  { path: '/SubScoreEdit', name: 'SubScoreEdit', component:SubScoreEdit   ,meta:{ keepAlive:true, title:"完善成绩",isLogin:true }},
  { path: '/SubScoreTestEdit', name: 'SubScoreTestEdit', component:SubScoreTestEdit   ,meta:{ keepAlive:true, title:"添加考试",isLogin:true }},
  { path: '/SubScoreReport', name: 'SubScoreReport', component:SubScoreReport   ,meta:{ keepAlive:true, title:"考试报表",isLogin:false }},

  { path: '/SubInteraction', name: 'SubInteraction', component:SubInteraction   ,meta:{ keepAlive:true, title:"互动",isBind:true, isLogin:true }},
  { path: '/SubInteractionForumEdit', name: 'SubInteractionForumEdit', component:SubInteractionForumEdit   ,meta:{ keepAlive:true, title:"发布信息",isLogin:true }},
  { path: '/SubInteractionPKEdit', name: 'SubInteractionPKEdit', component:SubInteractionPKEdit   ,meta:{ keepAlive:false, title:"发起PK",isLogin:true }},
  { path: '/SubInteractionPKInsert', name: 'SubInteractionPKInsert', component:SubInteractionPKInsert   ,meta:{ keepAlive:true, title:"新增观点",isLogin:true }},
  { path: '/SubInteractionPKDetail', name: 'SubInteractionPKDetail', component:SubInteractionPKDetail   ,meta:{ keepAlive:true, title:"PK详情",isLogin:true }},
  { path: '/SubInteractionActivityEdit', name: 'SubInteractionActivityEdit', component:SubInteractionActivityEdit   ,meta:{ keepAlive:false, title:"发起通知",isLogin:true }},
  { path: '/SubInteractionActivityDetail', name: 'SubInteractionActivityDetail', component:SubInteractionActivityDetail   ,meta:{ keepAlive:true, title:"通知详情",isLogin:true }},
  { path: '/SubInteractionWordsEdit', name: 'SubInteractionWordsEdit', component:SubInteractionWordsEdit   ,meta:{ keepAlive:true, title:"留言详情",isLogin:true }},
  { path: '/SubInteractionWordsSend', name: 'SubInteractionWordsSend', component:SubInteractionWordsSend   ,meta:{ keepAlive:true, title:"留言发送",isLogin:true }},
  { path: '/SubInteractionForumDetail', name: 'SubInteractionForumDetail', component:SubInteractionForumDetail   ,meta:{ keepAlive:true, title:"黑板详情",isLogin:true }},

  { path: '/SubAlbum', name: 'SubAlbum', component:SubAlbum   ,meta:{ keepAlive:true, title:"相册",isLogin:true,isBind:true, }},
  { path: '/SubAlbumEdit', name: 'SubAlbumEdit', component:SubAlbumEdit   ,meta:{ keepAlive:false, title:"相册编辑",isLogin:true }},
  { path: '/SubAlbumPower', name: 'SubAlbumPower', component:SubAlbumPower   ,meta:{ keepAlive:true, title:"相册权限",isLogin:true }},
  { path: '/SubAlbumElectron', name: 'SubAlbumElectron', component:SubAlbumElectron   ,meta:{ keepAlive:true, title:"电子相册",isLogin:true }},
  { path: '/SubAlbumManager', name: 'SubAlbumManager', component:SubAlbumManager   ,meta:{ keepAlive:true, title:"相册管理",isLogin:true }},
  { path: '/SubAlbumDetail', name: 'SubAlbumDetail', component:SubAlbumDetail   ,meta:{ keepAlive:true, title:"相册详情",isLogin:true }},


  { path: '/SubResource', name: 'SubResource', component:SubResource   ,meta:{ keepAlive:true, title:"资源",isLogin:true,isBind:true, }},
  { path: '/SubResourceDetail', name: 'SubResourceDetail', component:SubResourceDetail   ,meta:{ keepAlive:true, title:"资源详情",isLogin:true }},
  { path: '/SubResourcePhotoDetail', name: 'SubResourcePhotoDetail', component:SubResourcePhotoDetail   ,meta:{ keepAlive:true, title:"相册详情",isLogin:true }},


  { path: '/SubCost', name: 'SubCost', component:SubCost   ,meta:{ keepAlive:true, title:"缴费",isLogin:true ,isBind:true }},
  { path: '/SubCostEdit', name: 'SubCostEdit', component:SubCostEdit   ,meta:{ keepAlive:true, title:"缴费编辑",isLogin:true }},
  { path: '/SubCostDetail', name: 'SubCostDetail', component:SubCostDetail   ,meta:{ keepAlive:true, title:"缴费详情",isLogin:true }},
  { path: '/SubCostRoll', name: 'SubCostRoll', component:SubCostRoll   ,meta:{ keepAlive:true, title:"缴费名单",isLogin:true }},
  { path: '/SubCostDetailParent', name: 'SubCostDetailParent', component:SubCostDetailParent   ,meta:{ keepAlive:true, title:"缴费详情",isLogin:true }},

  { path: '/SubUserMessage', name: 'SubUserMessage', component:SubUserMessage   ,meta:{ keepAlive:true, title:"完善信息",isLogin:true }},
  { path: '/SubUserNews', name: 'SubUserNews', component:SubUserNews   ,meta:{ keepAlive:true, title:"我的消息",isLogin:true , }},
  { path: '/SubUserNewsDetail', name: 'SubUserNewsDetail', component:SubUserNewsDetail   ,meta:{ keepAlive:true, title:"消息详情",isLogin:true }},
  { path: '/SubUserNoticeDetail', name: 'SubUserNoticeDetail', component:SubUserNoticeDetail   ,meta:{ keepAlive:true, title:"通知详情",isLogin:true }},
  { path: '/SubUserNewsSet', name: 'SubUserNewsSet', component:SubUserNewsSet   ,meta:{ keepAlive:true, title:"消息设置",isLogin:true }},
  { path: '/SubUserNewsSetTime', name: 'SubUserNewsSetTime', component:SubUserNewsSetTime   ,meta:{ keepAlive:true, title:"消息时间设置",isLogin:true }},
  { path: '/SubUserClass', name: 'SubUserClass', component:SubUserClass   ,meta:{ keepAlive:true, title:"我的班级",isLogin:true }},
  { path: '/SubUserClassVip', name: 'SubUserClassVip', component:SubUserClassVip   ,meta:{ keepAlive:true, title:"开通认证",isLogin:true }},
  { path: '/SubUserClassVipMaterial', name: 'SubUserClassVipMaterial', component:SubUserClassVipMaterial   ,meta:{ keepAlive:false, title:"上传认证资料",isLogin:true }},
  { path: '/SubUserClassVipPay', name: 'SubUserClassVipPay', component:SubUserClassVipPay   ,meta:{ keepAlive:true, title:"认证支付",isLogin:true }},

  { path: '/SubUserClassTeacherTypeEdit', name: 'SubUserClassTeacherTypeEdit', component:SubUserClassTeacherTypeEdit   ,meta:{ keepAlive:false, title:"科目类型修改",isLogin:true }},
  { path: '/SubUserClassMember', name: 'SubUserClassMember', component:SubUserClassMember   ,meta:{ keepAlive:true, title:"班级详情",isLogin:true }},
  { path: '/SubUserClassMemberParents', name: 'SubUserClassMemberParents', component:SubUserClassMemberParents   ,meta:{ keepAlive:true, title:"家长列表",isLogin:true }},
  { path: '/SubUserClassParent', name: 'SubUserClassParent', component:SubUserClassParent   ,meta:{ keepAlive:true, title:"我的孩子",isLogin:true }},
  { path: '/SubUserClassParentTeachers', name: 'SubUserClassParentTeachers', component:SubUserClassParentTeachers   ,meta:{ keepAlive:true, title:"班级详情",isLogin:true }},
  { path: '/SubUserClassLeader', name: 'SubUserClassLeader', component:SubUserClassLeader   ,meta:{ keepAlive:true, title:"家委会管理",isLogin:true }},
  { path: '/SubUserShare', name: 'SubUserShare', component:SubUserShare   ,meta:{ keepAlive:true, title:"分享",isLogin:true }},
  { path: '/SubUserShareParent', name: 'SubUserShareParent', component:SubUserShareParent   ,meta:{ keepAlive:true, title:"分享",isLogin:true }},
  { path: '/SubUserFeedback', name: 'SubUserFeedback', component:SubUserFeedback   ,meta:{ keepAlive:true, title:"意见反馈",isLogin:true }},

  { path: '/SubClassEdit', name: 'SubClassEdit', component:SubClassEdit   ,meta:{ keepAlive:true, title:"完善班级信息",isLogin:true ,isNoJoinClass:true }},
  { path: '/SubClassTeacherEdit', name: 'SubClassTeacherEdit', component:SubClassTeacherEdit   ,meta:{ keepAlive:true, title:"完善班级信息",isLogin:true,isNoJoinClass:true }},
  { path: '/SubClassJoin', name: 'SubClassJoin', component:SubClassJoin   ,meta:{ keepAlive:true, title:"班级加入",isLogin:true ,isNoJoinClass:true }},
  { path: '/SubClassJoinParent', name: 'SubClassJoinParent', component:SubClassJoinParent   ,meta:{ keepAlive:true, title:"家人加入",isLogin:true ,isNoJoinClass:true}},
  { path: '/SubClassChange', name: 'SubClassChange', component:SubClassChange   ,meta:{ keepAlive:true, title:"班级切换",isLogin:true }},
  { path: '/SubClassChangeTeacher', name: 'SubClassChangeTeacher', component:SubClassChangeTeacher   ,meta:{ keepAlive:true, title:"班级切换",isLogin:true }},

  { path: '/SubMailList', name: 'SubMailList', component:SubMailList   ,meta:{ keepAlive:true, title:"通讯录",isLogin:true }},
  { path: '/SubMailListTeacher', name: 'SubMailListTeacher', component:SubMailListTeacher   ,meta:{ keepAlive:true, title:"通讯录",isLogin:true }},
  { path: '/SubMailListTeacherParents', name: 'SubMailListTeacherParents', component:SubMailListTeacherParents   ,meta:{ keepAlive:true, title:"通讯录",isLogin:true }},

  { path: '/SubJoinClass', name: 'SubJoinClass', component:SubJoinClass   ,meta:{ keepAlive:true, title:"加入班级",isLogin:true }}, // 暂未使用

  { path: '/RestMatrix', name: 'RestMatrix', component:RestMatrix   ,meta:{ keepAlive:false, title:"矩阵",isLogin:false }},
  { path: '/SubSelectArea', name: 'SubSelectArea', component:SubSelectArea   ,meta:{ keepAlive:true, title:"地区选择",isLogin:false }},

]
