import request from '@/utils/request'
export function projectList(params) {
  return request({
    url:'/BusinessProject/list',
    method:'post',
    data: params
  })
}

export function projectAdd(data) {
  return request({
    url:'/BusinessProject/create',
    method:'post',
    data: data
  })
}

export function projectUpdate(data) {
  return request({
    url:'/BusinessProject/update',
    method:'post',
    data: data
  })
}

export function projectDelete(data) {
    return request({
      url:'/BusinessProject/delete',
      method:'post',
      data: data
    })
  }

  export function projectInfo(data) {
    return request({
      url:'/BusinessProject/info',
      method:'post',
      data: data
    })
  }

export function getProjectNameList() {
  return request({
    url: '/BusinessProject/getProjectNameList',
    method: 'post',
  })
}
export function getApprovalDataList() {
  return request({
    url: '/BusinessProject/getApprovalDataList',
    method: 'post',
  })
}
