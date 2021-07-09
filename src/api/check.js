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

function syllableList(data) {
    return post("/dynReport/dyn-report/reportFiler", data);
}
export {
    syllableList
};



