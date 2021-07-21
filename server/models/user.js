const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
   email: { type: Sequelize.STRING },
   password: { type: Sequelize.STRING },
   firstName: { type: Sequelize.STRING },
   lastName: { type: Sequelize.STRING },
   permission: { type: Sequelize.STRING },
}, {
   tableName: 'Users',
});

module.exports = User;
