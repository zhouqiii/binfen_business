import request from "@/utils/request";

function post(url, data) {
  return request({
    url,
    data,
    method: "post"
  });
}
function workLeaveList (data) {
  return request({
    data,
    url: "/workVacation/getListByPage/",
    method: "put"
  });
}
function workLeaveInfo(data) {
  return request({
    url: "/workVacation/findParam/" + data,
    method: "put"
  });
}
function workLeaveAdd(data) {
  return post("/workLeave/save", data);
}
function revokeWorkLeave (data) {
  return post("/workVacation/withdraw/" + data);
}

export {
  workLeaveList,
  workLeaveInfo,
  revokeWorkLeave,
  workLeaveAdd,
};
