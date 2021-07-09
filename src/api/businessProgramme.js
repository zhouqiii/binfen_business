import request from '@/utils/request'

export function programmeList(params) {
  return request({
    url: '/businessProgramme/list',
    method: 'post',
    data: params
  })
}

export function createProgramme(data) {
  return request({
    url: '/businessProgramme/create',
    method: 'post',
    data: data
  })
}

export function editProgramme(data) {
  return request({
    url: '/businessProgramme/update',
    method: 'post',
    data: data
  })
}

export function deleteProgramme(data) {
  return request({
    url: '/businessProgramme/delete',
    method: 'post',
    data: data
  })
}

export function infoProgramme(data) {
  return request({
    url: '/businessProgramme/info',
    method: 'post',
    data: data
  })
}

export function infoByProgrammeId(data) {
  return request({
    url: '/businessProgramme/infoByProgrammeId',
    method: 'post',
    data: data
  })
}

export function checkChildDemandOnUpdate(data) {
  return request({
    url: '/businessProgramme/checkChildDemandOnUpdate',
    method: 'post',
    data: data
  })
}
export function listByRefineId(data) {
  return request({
    url: '/businessProgramme/listByRefineId/'+data,
    method: 'post'
  })
}

export function listByRefineIdObj(data) {
  return request({
    url: '/businessProgramme/listByRefineIdObj',
    method: 'post',
    data: data
  })
}

export function getProgrammeList() {
  return request({
    url: '/businessProgramme/getProgrammeList',
    method: 'post'
  })
}
