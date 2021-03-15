import { get, post, postAndGet } from './request'

const provider = 'lqt-yygh-provider'
const auth = 'lqt-yygh-auth'
const API = {
  URL_HOSLIST: `${provider}/yygh-pub/pub/hospital/hdbs/unit/findPage`,
  URL_PHONE_CODE: `${auth}/jwt/loginBySms`,
  URL_LOGIN: `${auth}/jwt/registerByPhoneAndOpenId`,
  URL_GETUSERINFO: `${auth}/jwt/loginByTokenKey`,
  URL_PASSWORD_LOGIN: `${auth}/jwt/loginByPwd`,
  URL_DEPARTMENT: `${provider}/yygh-pub/pub/dep/hdbs/depDoc/findList`,
  URL_GETDEP_DOCTOR: `${provider}/yygh-pub/pub/hdbs/schedule/findScheduleGroupByDate`,
  URL_DICTORY_DATA: `${provider}/dict/dictory/hdbs/dictory/findList`,
  URL_SCHEDULING_DATA: `${provider}/yygh-pub/pub/hdbs/schedule/findByUnitAndDeptAndDoctorAndDate`,
  URL_SOURCE_NUMBER: `${provider}/yygh-pub/pub/numSchedulenum/resource/sch_batchQuerySrcForSch`,
  URL_MEMBER_LIST: `${provider}/pt-platform/pub/userMember/list`,
  URL_SUBMIT_ORDER: `${provider}/pt-platform/order/add`,
  URL_ORDER_LIST: `${provider}/pt-platform/order/queryYuYue`,
  URL_GET_TIMESTAMP: `${provider}/yygh-pub/pub/hdbs/getSystemTimeStamp`,
  URL_CANCEL_ORDER: `${provider}/weChat/cancelOrder`,
  URL_QUERY_ORDER: `${provider}/pt-platform/order/findOrderByOrderId?orderId=`,
  URL_CHECK_ORDER: `${provider}/weChat/judgePay?orderId=`,
  URL_PREPAID: `${provider}/weChat/pay`,
  URL_PAY_SUCCESS_BACK: `${provider}/weChat/chkPayStatus`,
  URL_COLLECT_DATA: `${provider}/pt-platform/pub/userIndexCollection/findByPage`,
  URL_SAVE_COLLECT: `${provider}/pt-platform/pub/userIndexCollection/saveCollection`,
  URL_DELETE_COLLECT: `${provider}/pt-platform/pub/userIndexCollection/delete/`,
  URL_SAVE_USER_INFO: `${provider}/pt-platform/saveUserMember`,
  URL_QUERY_USER_INFO: `${provider}/pt-platform/queryCurrMember`,
  URL_USER_INFO: `${auth}/jwt/loginByTokenKey`,
  URL_ADD_MEMBER: `${provider}/pt-platform/pub/userMember/add`,
  URL_UPDATE_MEMBER: `${provider}/pt-platform/pub/userMember/update`,
  URL_SEARCH_API: `${provider}/yygh-pub/pub/all/list`,
}
/**
 *
 * @param params 获取列表数量参数
 */
export function getHospitalList(params: any) {
  return get(API.URL_HOSLIST, params)
}

/**
 * 获取验证码
 * @param phone 手机号
 */
export function getPhoneCode(phone: number | string) {
  const params = {
    phone,
  }
  return postAndGet(API.URL_PHONE_CODE, params)
}

export function getLogin(data) {
  return post(API.URL_LOGIN, data)
}

export function getToken(params) {
  return get(API.URL_GETUSERINFO, params)
}

export function loginByPwd(params) {
  return get(API.URL_PASSWORD_LOGIN, params)
}

// 获取当前选中医院的数据
export function getDepartmentList(data) {
  return post(API.URL_DEPARTMENT, data)
}

// 获取当前选中医院的 科室的所有医生排班数据 (医生排班列表)
export function getDepAllDoctor(data) {
  return post(API.URL_GETDEP_DOCTOR, data)
}

// 字典列表查询接口
export function dictionaryQuery(data = {}) {
  return post(API.URL_DICTORY_DATA, data)
}

// 获取医生的排班
export function getSchedulingData(data) {
  return post(API.URL_SCHEDULING_DATA, data)
}
export function getSelectSchedulingTime(data) {
  return post(API.URL_SOURCE_NUMBER, data)
}

// 获取患者列表
export function getUserMember(params) {
  return get(API.URL_MEMBER_LIST, params)
}

// /yygh-pub/pub/order/add // 预约挂号订单下单接口

export function createOrder(data) {
  return post(API.URL_SUBMIT_ORDER, data)
}
// 获取我的预约挂号订单
export function getOrderList(data) {
  return post(API.URL_ORDER_LIST, data)
}

export function getSystemTime() {
  return get(API.URL_GET_TIMESTAMP)
}

export function cancelOrderRefund(params) {
  return postAndGet(API.URL_CANCEL_ORDER, params)
}

export function queryOrderDetails({ orderId }) {
  return post(`${API.URL_QUERY_ORDER}${orderId}`)
}

export function checkOrderStatus({ orderId }) {
  return post(`${API.URL_CHECK_ORDER}${orderId}`)
}

export function invokingPrepaid(data) {
  return post(API.URL_PREPAID, data)
}

// 完成微信支付后的回调接口

export function weChatCallback(params) {
  return postAndGet(API.URL_PAY_SUCCESS_BACK, params)
}
// 指标采集
export function getCollectionList(params) {
  return postAndGet(API.URL_COLLECT_DATA, params)
}

/**
 * 保存采集指标数据
 * @param data
 */
export function saveCollectionData(data) {
  return post(API.URL_SAVE_COLLECT, data)
}

/**
 * 删除采集指标数据
 * @param id
 */
export function deleteIndexCollection(id) {
  return post(API.URL_DELETE_COLLECT + id)
}

/**
 * 保存或更新用户资料
 * @param data
 */
export function saveUserMember(data) {
  return post(API.URL_SAVE_USER_INFO, data)
}

//查询个人资料
export function queryMemberInfo() {
  return get(API.URL_QUERY_USER_INFO)
}

export function getUserInfo(params) {
  return get(API.URL_USER_INFO, params)
}

export function addUserMember(data) {
  return post(API.URL_ADD_MEMBER, data)
}

export function updateUserMember(data) {
  return post(API.URL_UPDATE_MEMBER, data)
}

export const finSearchContent = (params) => {
  return get(API.URL_SEARCH_API, params)
}
