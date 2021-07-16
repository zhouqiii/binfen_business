import request from "@/utils/request";

function post(url, data) {
    return request({
        url,
        data: data,
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
//报表列表
function reportList(data) {
    return post("/dynReport/dyn-report/reportList", data);
}
//某个报表对应的字段列表
function syllableList(data) {
    return post("/dynReport/dyn-report/reportFiler", data);
}
//报表查询
function queryList(data) {
    return post("/dynReport/dyn-report/selectReport", data);
}
//报表导出
function exportList(data) {
    return post("/dynReport/dyn-report/downReport", data);
}
export {
    syllableList,
    reportList,
    queryList,
    exportList
};



