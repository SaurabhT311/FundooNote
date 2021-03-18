const bcrypt = require('bcrypt');

class BcryptPassword {

    securedPassword = (password, next) => {
        try {
            let salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        } catch (error) {
            next(error);
        }
    }

    comparePassword = (password, comparePassword, next) => {
        try {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, comparePassword).then(data => {
                    resolve(data ? true : false);
                }).catch(err => {
                    reject(err)
                })
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BcryptPassword();