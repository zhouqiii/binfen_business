import request from '@/utils/request'

export function groupList(params) {
  return request({
    url: '/BusinessGroup/list',
    method: 'post',
    data: params
  })
}

export function createGroup(data) {
  return request({
    url: '/BusinessGroup/create',
    method: 'post',
    data: data
  })
}
export function getGroupListAll() {
  return request({
    url: '/BusinessGroup/listAll',
    method: 'post'
  })
}
export function editGroup(data) {
  return request({
    url: '/BusinessGroup/update',
    method: 'post',
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

export function infoByGroupId(data) {
  return request({
    url: '/BusinessGroup/infoByGroupId',
    method: 'post',
    data:data
  })
}

export function deleteById(data) {
  return request({
    url: '/BusinessGroup/delete',
    method: 'post',
    data:data
  })
}
