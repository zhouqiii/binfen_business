import request from '@/utils/request'

export function projectList() {
  return request({
    url: '/businessProject/list',
    method: 'post'
  })
}

export function listPage(params) {
  return request({
    url: '/businessProject/listPage',
    method: 'post',
    data: params
  })
}
export function refineListById(data) {
  return request({
    url: '/businessProject/refineListById/'+data,
    method: 'post',
  })
}


export function refineInfoById(data) {
  return request({
    url: '/businessProject/refineInfoById/'+data,
    method: 'post',
  })
}

export function createProject(data) {
  return request({
    url: '/businessProject/create',
    method: 'post',
    data: data
  })
}

export function info(data) {
  return request({
    url: '/businessProject/info',
    method: 'post',
    data: data
  })
}

export function deleteProject(data) {
  return request({
    url: '/businessProject/delete',
    method: 'post',
    data: data
  })
}

export function editProject(data) {
  return request({
    url: '/businessProject/update',
    method: 'post',
    data: data
  })
}

export function createRefine(data) {
  return request({
    url: '/businessProject/createRefine',
    method: 'post',
    data: data
  })
}

export function getRefineTypeList() {
  return request({
    url: '/BusinessRefine/getRefineTypeList',
    method: 'post'
  })
}
