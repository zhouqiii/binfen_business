import request from '@/utils/request'

// 新增门店组
export function shopGroupAdd(data) {
  return request({
    url: '/shopGroup/add',
    method: 'post',
    data: data
  })
}
// 门店维护
export function shopGroupList(params) {
  return request({
    // url: '/shopGroup/shopGroupList',
    // url: '/shopGroup/shopGroupListByPage',
    url: '/shopGroup/getShopGroupListByPage',
    method: 'get',
    params: params
  })
}

// 商品分类维护
export function getMainCategoryList() {
  return request({
    // url: '/cmsGategory/cmsMainGategoryList',
    url: '/cmsCategory/getMainCategoryList',
    method: 'get'
  })
}

// 添加子分类回显二级
export function getSubGategoryList(params) {
  return request({
    // url: '/cmsGategory/cmsSubGategoryList/' + params,
    url: '/cmsCategory/getSubCategoryList/' + params,
    method: 'get'
  })
}

// 新增分类
export function createMainGategory(data) {
  return request({
    // url: '/cmsGategory/createMainGategory',
    url: '/cmsCategory/saveMainCategory',
    method: 'post',
    data: data
  })
}

// 新增子分类
export function createSubGategory(data) {
  return request({
    // url: '/cmsGategory/createSubGategory',
    url: '/cmsCategory/saveSubCategory',
    method: 'post',
    data: data
  })
}

// 删除分类
export function delMainGategory(params) {
  return request({
    // url: "/cmsGategory/delMainGategory/" + params,
    url: "/cmsCategory/delMainCategory/" + params,
    method: "delete"
  })
}

// 删除子分类
export function delSubGategory(params) {
  return request({
    // url: "/cmsGategory/delSubGategory/" + params,
    url: "/cmsCategory/delSubCategory/" + params,
    method: "delete"
  })
}

// 查看分类
export function viewMainGategory(params) {
  return request({
    // url: '/cmsGategory/viewMainGategory/' + params,
    url: '/cmsCategory/getMainCategory/' + params,
    method: 'get'
  })
}

// 编辑商品一级分类
export function updateMainCategory( data) {
  return request({
    // url: '/cmsGategory/submitMainGategory/' + params,
    url: '/cmsCategory/updateMainCategory/',
    method: 'put',
    data: data
  })
}

// 编辑子分类
export function submitSubGategory(params, data) {
  return request({
    // url: '/cmsGategory/submitSubGategory/' + params,
    url: '/cmsCategory/submitSubCategory/' + params,
    method: 'put',
    data: data
  })
}

// 部门列表(下拉框)
export function getBusinessList() {
  return request({
    url: '/bmsBusiness/getBusinessList',
    method: 'get'
  })
}

// 部门列表分页
export function getList(params) {
  return request({
    url: '/bmsBusiness/getBusinessListByPage',
    method: 'get',
    params: params
  })
}


// 新建部门
export function createBmsBusiness(data) {
  return request({
    // url: '/bmsBusiness/createBmsBusiness',
    url: '/bmsBusiness/saveBmsBusiness',
    method: 'post',
    data: data
  })
}


// 部门维护编辑初始化（获取指定部门信息）
export function getBmsBusiness(params,data) {
  // return request({
  //   url: '/bmsBusiness/getBmsBusiness/' + params,
  //   method: 'get',
  //   data: data
  // })
}

// 部门维护保存编辑
export function submitBmsBusiness(data) {
  return request({
    url: '/bmsBusiness/updateBusiness/',
    method: 'put',
    data: data
  })
}



// 删除
export function delBmsBusiness(params) {
  return request({
    // url: '/bmsBusiness/delBmsBusiness/' + params,
    url: '/bmsBusiness/deleteBmsBusiness/' + params,
    method: 'delete'
  })
}

// / 省、市、区信息
export function getRegionListByCode(params) {
  return request({
    url: '/common/getRegionList',
    method: 'get',
    params: params
  })
}

// 省、市、区信息
export function getRegionList(params) {
  return request({
    url: '/common/getRegionListByExample',
    method: 'get',
    params: params
  })
}

export function getProvinceList() {
  return request({
    url: '/bmsBusiness/cmsProvinceList',
    method: 'get'
  })
}

export function getCityList(params) {
  return request({
    url: '/bmsBusiness/cmsCityList',
    method: 'get',
    params: params
  })
}

export function getDistrict(params) {
  return request({
    url: '/bmsBusiness/cmsDistrictList',
    method: 'get',
    params
  })
}

// 删除门店
export function deleteShop(params) {
  return request({
    url: '/shop/delete/' + params,
    method: 'delete'
  })
}

// 根据门店组分页查询门店
export function getShopList(id,params) {
  return request({
    url: '/shop/getShopList/' + id ,
    method: 'get',
    params:params
  })
}

// 编辑门店组信息
export function update(data) {
  return request({
    url: '/shopGroup/update/',
    method: 'put',
    data: data
  })
}

// 编辑门店组图片
export function updateImage(params, data) {
  return request({
    url: '/shopGroup/updateImage/' + params,
    method: 'put',
    data: data
  })
}

// 删除门店组
export function shopGroupDelete(params, data) {
  return request({
    url: '/shopGroup/delete/' + params,
    method: 'delete',
    data: data
  })
}

// 提交审核
export function submitAudit(parmas,data){
  return request({
    url: '/shopGroup/submitShopAudit/'+parmas,
    method: 'get',

  })
}


// 提交审核
export function submitShopAudit(id){
  return request({
    url: '/shopGroup/submitShopAudit/' + id,
    method: 'post', 
  })
}

// 编辑子分类
export function updateSubCategory(data) {
  return request({ 
    url: '/cmsCategory/updateSubCategory/',
    method: 'put',
    data: data
  })
}


// 查看分类（一级分类）
export function getMainCategoryDetail(params,data) {
  return request({
    url: '/cmsCategory/getMainCategoryDetail/' + params,
    method: 'get',
    data: data
  })
}

// 删除子分类 
export function delSubCategory(params) {
  return request({
    url: "/cmsCategory/delSubCategory/" + params,
    method: "delete"
  })
}

// 删除分类 
export function delMainCategory(params) {
  return request({
    url: "/cmsCategory/delMainCategory/" + params,
    method: "delete"
  })
}

// 新增门店
export function addShop(data){
  return request({
    url: '/shop/add',
    method: 'post',
    data: data
  })
}

// 编辑门店
export function shopUpdate(data){
  return request({
    url: '/shop/update',
    method: 'put',
    data: data
  })
}

// 查看门店详情
export function getShopDetail(params){
  return request({
    url: '/shop/getShop/' + params,
    method: 'get'
  })
}

// 查看参数列表
export function getbaseParamList(){
  return request({
    url: '/dfypParams/getParamsList/',
    method: 'get'
  })
}
// 新增参数
export function creatParam(params){
  return request({
    url: '/dfypParams/saveParam/',
    method: 'post',
    data: params
  })
}
// 修改参数
export function updateParam(params){
  return request({
    url: '/dfypParams/updParam/',
    method: 'put',
    data: params
  })
}
// 删除参数
export function delParam(id){
  return request({
    url: '/dfypParams/delParam/' + id,
    method: 'delete'
  })
}
