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