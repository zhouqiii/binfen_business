import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'post',
    data: params
  })
}

export function oneUser(params) {
  return request({
    url: '/admin/oneUser',
    method: 'post',
    data: params
  })
}
export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function setAdmin(params) {
  return request({
    url: '/admin/getInfo/'+params,
    method: 'post'
  })
}

export function refreshPwd(params) {
  return request({
    url: '/admin/refreshPwd/'+params,
    method: 'post'
  })
}
export function updateAdmin(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data: data
  })
}

export function updateStatus(id, data) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    data: data
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}

// 更改密码
export function updatePassword(data) {
  return request({
    url: '/admin/updatePassword',
    method: 'post',
    data: data
  })
}

// 退出
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}


//查询手机号是否已存在
export function infoByMobile(data) {
  return request({
    url: '/admin/infoByMobile/'+data,
    method: 'post'
  })
}

//查询架构师用户列表
export function userList() {
  return request({
    url: '/admin/userList',
    method: 'post',
  })
}
