import request from '@/utils/request'
export function productList(params) {
  return request({
    url:'/BusinessProduct/list',
    method:'post',
    data: params
  })
}

export function createProduct(data) {
  return request({
    url:'/BusinessProduct/create',
    method:'post',
    data: data
  })
}

export function editProduct(data) {
  return request({
    url:'/BusinessProduct/update',
    method:'post',
    data: data
  })
}
export function updateStatus(id, data) {
  return request({
    url: '/role/updateStatus/' + id,
    method: 'post',
    data: data
  })
}



export function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}
//------其他-------------------
// export function updateNewStatus(params) {
//   return request({
//     url:'/product/update/newStatus',
//     method:'post',
//     params:params
//   })
// }

// export function updateRecommendStatus(params) {
//   return request({
//     url:'/product/update/recommendStatus',
//     method:'post',
//     params:params
//   })
// }

// export function updatePublishStatus(params) {
//   return request({
//     url:'/product/update/publishStatus',
//     method:'post',
//     params:params
//   })
// }

// export function createProduct(data) {
//   return request({
//     url:'/product/create',
//     method:'post',
//     data:data
//   })
// }

// export function updateProduct(id,data) {
//   return request({
//     url:'/product/update/'+id,
//     method:'post',
//     data:data
//   })
// }

// export function getProduct(id) {
//   return request({
//     url:'/product/updateInfo/'+id,
//     method:'get',
//   })
// }

// // 获取商品列表下拉框
// export function getGoodsListInCoupon() {
//   return request({
//     url:'/goods/getGoodsList',
//     method:'get'
//   })
// }