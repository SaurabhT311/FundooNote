const { buildCheckFunction, body, params } = require('express-validator');
const check = buildCheckFunction(['headers', 'params']);

module.exports = {
    register: [
        body('firstName')
            .trim()
            .isString()
            .notEmpty().withMessage('firstName is Required')
            .isAlpha().withMessage('firstName must be only in alphabets!')
            .isLength({ min: 2 }).withMessage('firstName requires more than 2 characters!'),

        body('lastName')
            .trim()
            .notEmpty().withMessage('lastName is Required')
            .isAlpha().withMessage('lastName must be only in alphabets!')
            .isLength({ min: 2 }).withMessage('lastName requires more than 2 characters!'),

        body('email')
            .trim()
            .isEmail().withMessage('Please enter valid email')
            .notEmpty().withMessage('email is required'),

        body('mobile')
            .trim()
            .isNumeric().withMessage('enter valid number')
            .notEmpty().withMessage('mobile number is required')
            .isLength({ min: 10, max: 10 }).withMessage('mobile number should consist of 10 digits')
            .isMobilePhone(["en-IN"]).withMessage('number should belong to INDIA'),

        body('password')
            .trim()
            .notEmpty().withMessage('password is required')
            .isLength({ min: 5 }).withMessage('password should contain 5 characters')
    ]
}