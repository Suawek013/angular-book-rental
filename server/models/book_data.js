const Sequelize = require("sequelize");
const db = require("../config/database");

const Book_data = db.define(
	"Book_data",
	{
		title: { type: Sequelize.STRING },
		description: { type: Sequelize.STRING },
		publication_date: { type: Sequelize.STRING },
		author: { type: Sequelize.STRING },
		publisher: { type: Sequelize.STRING },
		image: { type: Sequelize.STRING },
		isbn: { type: Sequelize.STRING },
	},
	{
		tableName: "Books_data",
	}
);

module.exports = Book_data;
