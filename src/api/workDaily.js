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

function workDailyList(data) {
  return post("/workDaily/getListByPage", data);
}
function workDailyInfo(data) {
  return get("/workDaily/findParam/" + data);
}
function workDailyAdd(data) {
  return post("/workDaily/save", data);
}
function deleteWorkDaily(data) {
  return request({
    url: "/workDaily/del/"+data,
    method: "delete",
  });
}

export {
  workDailyList,
  workDailyInfo,
  deleteWorkDaily,
  workDailyAdd,
};
