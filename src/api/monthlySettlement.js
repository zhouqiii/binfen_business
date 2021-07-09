import request from "@/utils/request";

function post(url, data) {
  return request({
    url,
    data,
    method: "post"
  });
}
function get(url, params) {
  return request({
    url,
    params,
    method: "get"
  });
}
function getList(data) {
  return post("/workDaily/getErrorListByPage", data);
}

function getInfo(data) {
  return post("/monthlySettlement/getListByPage", data);
}

function settleConfirm(data) {
  return post("/workDaily/updWorkDaily", data);
}

function getStatus(data) {
  return post("/workDaily/getStatus", data);
}




export {
  getList,
  settleConfirm,
  getInfo,
  getStatus
};
