module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'sqlfreedomfriends',
    storage: './__tests__/database.sqlite',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};