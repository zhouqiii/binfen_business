import request from '@/utils/request'

export function productList(params) {
  return request({
    url: '/businessProduct/list',
    method: 'post',
    data: params
  })
}

export function listChild(data) {
  return request({
    url: '/businessProduct/listChild',
    method: 'post',
    data: data
  })
}

export function listAll() {
  return request({
    url: '/businessProduct/listAll',
    method: 'post',

  })
}

export function createProduct(data) {
  return request({
    url: '/businessProduct/create',
    method: 'post',
    data: data
  })
}

export function editProduct(data) {
  return request({
    url: '/businessProduct/update',
    method: 'post',
    data: data
  })
}


export function infoByProductId(data) {
  return request({
    url: '/businessProduct/infoByProductId',
    method: 'post',
    data: data
  })
}
