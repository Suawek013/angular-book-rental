const Sequelize = require('sequelize');
const db = require('../config/database');

const Category = db.define('Category', {
   category_name: { type: Sequelize.STRING }, 
}, {
   tableName: 'Categories',
});

module.exports = Category;