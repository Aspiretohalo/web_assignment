const express = require('express')

const app = express()
const qs = require('Qs')


app.use((req, res, next) => {
    //定义中间件具体业务逻辑
    let str = ''
    // 监听req的data事件
    req.on('data', (chunk) => {
        str += chunk
    })

    // 请求成功后会触发end
    req.on('end', () => {
        // console.log(str);
        const body = qs.parse(str)
        // 数据挂载到body上
        req.body = body
        next()
    })
})

app.post('/user', (req, res) => {
    res.send(req.body)
})
app.listen(3000, () => {
    console.log('http://localhost:3000');
    console.log('服务器已成功启动');
})