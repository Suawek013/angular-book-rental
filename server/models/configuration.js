const Sequelize = require('sequelize');
const db = require('../config/database');

const Configuration = db.define('Configuration', {
   domain: { type: Sequelize.STRING },
   host: { type: Sequelize.STRING },
   port: { type: Sequelize.STRING },
   secure: { type: Sequelize.STRING }
}, {
   tableName: 'Configuration',
});

module.exports = Configuration;
