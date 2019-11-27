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
            password: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [6, 20],
                        msg: 'Password must be between 6 and 20 characters'
                    },
                    notEmpty: { msg: 'Password field cannot be empty' },
                },
            }
        }, {
            scopes: {
                withoutPassword: {
                    attributes: { exclude: ['password'] },
                },
            },
            sequelize
        });
    }
}

module.exports = User;