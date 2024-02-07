const { Model } = require('sequelize');
const { UserStatus } = require('../config/constant');
const { UserRoles } = require('../config/role');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
        {
            uuid: DataTypes.UUID,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: {
                type: DataTypes.ENUM,
                values: Object.values(UserRoles),
                defaultValue: UserRoles.STAFF,
            },
            image: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM,
                values: Object.values(UserStatus),
                defaultValue: UserStatus.DISABLED,
            },
            email_verified: DataTypes.BOOLEAN,
            address: DataTypes.STRING,
            phone_number: DataTypes.STRING,
        },
        {
            sequelize,
            underscored: true,
        },
    );
    User.beforeCreate(async (user) => {
        user.uuid = uuidv4();
    });
    return User;
};
