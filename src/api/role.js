import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/update/' + id,
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

export function deleteRole(data) {
  return request({
    url:'/role/delete',
    method:'post',
    data:data
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/role/listMenu/'+roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get'
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

//修改帐号状态
export function admin_updateStatus(id,status) {
  return request({
    url: 'admin/updateStatus/'+id+'?status=' + status,
    method: 'post',
    data:null
  })
}

// 重置用户密码 参数类型是path 参数直接接URL后
export function resetPassword(id) {
  return request({
    url: '/admin/resetPassword/'+ id,
    method: 'put',
    // data:null
  })
}