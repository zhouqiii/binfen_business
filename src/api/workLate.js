import request from "@/utils/request";

function post(url, data) {
  return request({
    url,
    data,
    method: "post"
  });
}
function workLateList(data) {
  return post("/workLate/getListByPage", data);
}
function workLateInfo(data) {
  return post("/workLate/findParam/"+data);
}
function workLateAdd(data) {
  return post("/workLate/save", data);
}
function deleteWorkLate(data) {
  return request({
    data,
    url: "/workLate/del",
    method: "delete",
  });
}

export {
  workLateList,
  workLateInfo,
  deleteWorkLate,
  workLateAdd,
};
