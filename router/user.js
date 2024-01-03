const express = require('express')
const router = express.Router()
const router_handler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
// 验证规则对象
const { reg_log_schema } = require('../schema/user')

//路由
router.post('/reguser', router_handler.reguser)
router.post('/login', router_handler.login)
router.get('/index', router_handler.index)
router.get('/logout', router_handler.logout)


module.exports = router