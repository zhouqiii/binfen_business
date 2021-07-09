import request from '@/utils/request'

//获取订单信息列表-分页条件查询
export function fetchListByCondition(params) {
  return request({
    url:'/businessOrder/getListAtComdition',
    method:'get',
    params:params
  })
}

//获取所有的订单名称列表
export function getOrderNames() {
  return request({
    url:'/businessOrder/getOrderNames',
    method:'get',
    // params:params
  })
}
//获取所有的项目名称列表
export function getProjectNames() {
  return request({
    url:'/businessProject/getProjectNames',
    method:'get',
    // params:params
  })
}
//订单状态列表
export function getOrderStatus() {
  return request({
    url:'/businessOrder/getOrderTypes',
    method:'get',
    // params:params
  })
}

//根据项目名称查询细化名称列表
export function selectRefinesByProjectId(params) {
  return request({
    url:'/businessOrder/getRefineNamesByProjectId',
    method:'get',
    params:params
  })
}

//提交表单-新建订单
export function createOrder(data) {
  return request({
    url:'/businessOrder/insertOne',
    method:'post',
    data: data
  })
}

//删除订单-根据id删除
export function deleteOrder(params) {
  return request({
    url:'/businessOrder/deleteOne',
    method:'delete',
    params: params
  })
}

//得到Order详情信息-根据id
export function infoById(params) {
  return request({
    url:'/businessOrder/getOne',
    method:'get',
    params: params
  })
}

export function editOrder(data) {
  return request({
    url:'/businessOrder/updateOne',
    method:'put',
    data: data
  })
}

export function exportByIds(params) {
  let base_url = process.env.BASE_API
  let url =base_url + "businessOrder/exportOrderData?orderIds=" + params;
  window.location.href = url;

}






