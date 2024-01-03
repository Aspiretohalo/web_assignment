const db = require('../db/index')
const bcrypt = require('bcryptjs')
const qs = require('qs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.logout = (req, res) => {
    res.send({
        status: 0,
        message: '已退出账号'
    })
}

exports.index = (req, res) => {
    var mytoken = req.headers.authorization
    bear = mytoken.split(' ')
    token = bear[1]
    jwt.verify(token, config.jwtSecretKey, function (err, decoded) {
        if (err) {
            console.log(err);
            req.authenticated = false;
            req.decoded = null;
            res.send({
                status: 1,
                message: '验证失败'
            })
        } else {
            req.decoded = decoded;
            req.authenticated = true;

        }
    })
    res.send()
}

exports.reguser = (req, res) => {
    //获取客户端提交到服务器的用户信息

    const userinfo = req.body
    // if (!urlObj.username || !urlObj.password) {
    //     return res.send({ status: 1, message: '用户名或密码不能为空' })
    // }

    // 用户名查重
    const sqlStr = 'select * from users where username=?'

    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        if (results.length > 0) {
            return res.send({ status: 1, message: '此用户名已被占用' })
        }

        // 密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        userinfo.password2 = bcrypt.hashSync(userinfo.password2, 10)
        console.log(userinfo);

        // 插入新用户
        const sql = 'insert into users set?';

        db.query(sql, {
            username: userinfo.username,
            password: userinfo.password,
            Nickname: 'admin'
        }, (err, results) => {
            if (err) return res.send({ status: 1, message: err.message })
            // 判断影响行数是否为1
            if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册失败' })
            //注册成功
            res.send({ status: 0, message: '注册成功' })

        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from users where username =?';
    // console.log(userinfo);

    db.query(sql, userinfo.username, (err, results) => {
        if (userinfo.username === '' || userinfo.password === '') return res.send({ status: 1, message: '账号或密码不能为空' })

        if (err) return res.send({ status: 1, message: err.message })

        if (results.length !== 1) return res.send({ status: 1, message: '登录失败' })

        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.send({ status: 1, message: '密码错误' })

        // 在服务器端生成token字符串
        const user = { ...results[0], password: '', Nickname: '' }

        // 对用户信息进行加密，生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        // console.log(req.user);
        var mytoken = req.headers.authorization
        // console.log(mytoken);
        bear = mytoken.split(' ')
        token = bear[1]
        console.log(token);
        if (!token) {
            res.send({
                status: 0,
                message: '登录成功',
                token: 'Bearer ' + tokenStr,
            })
        } else {
            jwt.verify(token, config.jwtSecretKey, function (err, decoded) {
                if (err) {
                    console.log(err);
                    req.authenticated = false;
                    req.decoded = null;
                } else {
                    console.log("33333");
                    req.decoded = decoded;
                    req.authenticated = true;
                    res.send({
                        status: 0,
                        message: '登录成功',
                        token: 'Bearer ' + tokenStr,
                    })
                }
            })

        }

        // res.send({
        //     status: 0,
        //     message: '登录成功',
        //     token: 'Bearer ' + tokenStr,
        // })
        // if (mytoken !== 'Bearer ' + tokenStr) {
        //     res.send({
        //         status: 1,
        //         message: '身份认证失败'
        //     })
        // }

    })
}