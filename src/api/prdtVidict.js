import request from '@/utils/request'
// 如下是商品维护中相关API

// 部门查询
export function getBusinessList() {
  return request({
    url: '/bmsBusiness/getBusinessList',
    method: 'get'
  })
}
