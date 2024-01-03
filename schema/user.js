const Joi = require('joi');

const username = Joi.string().alphanum().min(6).max(10).required()
const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/).required()

exports.reg_log_schema = {
    body: {
        username,
        password
    }
}
