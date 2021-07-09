'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"/dfyp/"'  // 北京部署使用
  // BASE_API: '"http://118.24.243.216:8080/"'
  //  BASE_API: '"http://192.168.1.229:8080"'  // 万环境
  // BASE_API: '"http://127.0.0.1:8080/"'
  // BASE_API: '"http://192.168.1.137:8080/"'   //罗环境
  // BASE_API: '"http:/www.yapinmall.com/dfyp/"'  // 测试环境
  // BASE_API: '"http://192.168.43.31:9080/web/"'
  // BASE_API: '"http://172.20.10.4:9080/web/"'
  //  BASE_API: '"http://10.31.3.250:9080/web/"' //深圳开发测试
  // BASE_API: '"http://localhost:9080/web/"'
  BASE_API: '"https://alex188.cn/web/"'
  // BASE_API: '"http://192.168.0.104:9080/web/"'
  // BASE_API: '"http://172.20.10.2:9080/web/"'
});

