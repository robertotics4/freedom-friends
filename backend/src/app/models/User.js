const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const environment = require('../../../.env');

const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: 'Name field cannot be empty' },
                },
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: 'Email field cannot be empty' },
                    isEmail: { msg: 'This field must be an email' },
                },
            },
            password: DataTypes.VIRTUAL,
            password_hash: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: 'Password field cannot be empty' },
                },
            }
        }, {
            hooks: {
                beforeSave: async user => {
                    if (user.password) {
                        user.password_hash = await bcrypt.hash(user.password, 8);
                    }
                }
            },
            scopes: {
                withoutPassword: {
                    attributes: { exclude: ['password_hash'] },
                },
            },
            sequelize
        });
    }
}

User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
}

User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, environment.APP_SECRET, {
        expiresIn: 86400, // expires in 1 day
    });
}

module.exports = User;