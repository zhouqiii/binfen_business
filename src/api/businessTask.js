import request from '@/utils/request'

export function taskList(params) {
  return request({
    url: '/businessTask/list',
    method: 'post',
    data: params
  })
}

// 任务列表不分页 全部  ,传入productId可查询某个产品下任务列表
export function taskFullList(data) {
  return request({
    url: '/businessTask/taskList',
    method: 'post',
    data
  })
}

export function createTask(data) {
  return request({
    url: '/businessTask/create',
    method: 'post',
    data: data
  })
}


export function getTaskTypeList() {
  return request({
    url: '/businessTask/taskTypeList',
    method: 'post'

  })
}

export function updateTask(data) {
  return request({
    url: '/businessTask/update',
    method: 'post',
    data: data
  })
}

export function deleteTask(data) {
  return request({
    url: '/businessTask/delete',
    method: 'post',
    data: data
  })
}

export function infoTask(data) {
  return request({
    url: '/businessTask/info',
    method: 'post',
    data: data
  })
}


export function batchList(data) {
  return request({
    data,
    url: '/businessTask/batchList',
    method: 'post'
  })
}
export function infoByProgrammeId(data) {
  return request({
    url: '/businessTask/infoByProgrammeId',
    method: 'post',
    data: data
  })
}


