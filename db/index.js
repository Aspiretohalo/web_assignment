const mysql = require('mysql')
const { use } = require('../router/user')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'new_schema'
})

module.exports = db