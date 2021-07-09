import request from '@/utils/request'

export function upload(params) {
  return request({
    url: '/businessZipFile/create',
    method: 'post',
    data: params
  })
}

export function getListById(params) {
  return request({
    url: '/businessZipFile/list',
    method: 'post',
    data: params
  })
}

export function download(params) {
 /* return request({
    url: '/businessZipFile/downLoad/'+params,
    method: 'get',
  })*/
  let base_url = process.env.BASE_API
  let url =base_url + "businessZipFile/downLoad/" + params;
  window.location.href = url;
}

