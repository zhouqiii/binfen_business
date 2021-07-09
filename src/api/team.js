import request from "@/utils/request";

function post(url, data) {
  return request({
    url,
    data,
    method: "post"
  });
}
// 批量导入团队人员 excel
function RequestUploads(data) {
  return post("/personnelInfo/importExcel", data);
}
// 获取团队人员列表
function getTeamList(data) {
  return post("/personnelInfo/getListByPage", data);
}
// 删除团队人员 (单独、批量)
function delTeamMember(data) {
  return request({
    data,
    url: '/personnelInfo/del/',
    method: "delete"
  });
}
// 查看编辑人员信息
function getTeamInfo(data) {
  return post("/personnelInfo/findParam/" + data);
}
// 新增团队人员
function addTeamMember(data) {
  return post("/personnelInfo/save", data);
}
// 修改团队人员信息
function updateTeamMember(data) {
  return request({
    data,
    url: '/personnelInfo/upd/',
    method: "put"
  });
}
//设置人员参与
function setTaskMember(data) {
  return post("/taskPersonnel/savePerson", data);
}

//查看人员相关任务
function getMemberTask(data) {
  return post("/taskPersonnel/getTaskInfo/" + data);
}

//查看主管 直属上司 列表
function getLeaderList(data) {
  return post("/personnelInfo/list", data);
}

// 重置登录密码
function resetPwd(data) {
  return request({
    url: '/personnelInfo/resetPassword/' + data,
    method: "put"
  });
}

export {
  RequestUploads,
  getTeamList,
  delTeamMember,
  getTeamInfo,
  addTeamMember,
  updateTeamMember,
  setTaskMember,
  getMemberTask,
  resetPwd,
  getLeaderList,
};
