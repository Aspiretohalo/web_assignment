const express = require('express')
const app = express()
const parser = require('body-parser')
const Joi = require('joi')


// 通过.json()来解析表单中的JSON数据
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(parser.urlencoded({ extended: false }))

// 在路由之前配置cors中间件，解决跨域问题
const cors = require('cors')
app.use(cors())

// 在路由之前配置解析token的中间件
const config = require('./config')
const { expressjwt: expressJWT } = require("express-jwt");
app.use(expressJWT({
    secret: config.jwtSecretKey,
    algorithms: ['HS256'],
}).unless({ path: [/^\/api\//] }))
// }).unless({ path: ["/api/reguser", "/api/login"] }))

//路由
const userRouter = require('./router/user')
app.use('/api', userRouter)
app.use(userRouter)

app.use((err, req, res, next) => {
    // 验证失败
    if (err instanceof Joi.ValidationError) return res.send({ status: 1, message: err.message })
    if (err.name === 'UnauthorizedError') return res.send({ status: 1, message: '身份认证失败' })
    return res.send({ status: 1, message: err.message })
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
    console.log('服务器已成功启动');
})