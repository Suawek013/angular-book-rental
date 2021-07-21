const Sequelize = require("sequelize");
const db = require("../config/database");

const Book_data = require("./book_data");

const Book = db.define(
	"Book",
	{
		book_data_id: { type: Sequelize.STRING(36) },
		date_added: { type: Sequelize.DATE },
	},
	{
		tableName: "Books",
	}
);

Book.hasMany(Book_data, {
	foreignKey: "id",
	sourceKey: "book_data_id",
});

Book_data.belongsTo(Book, {
	foreignKey: "id",
	sourceKey: "book_data_id",
});

module.exports = Book;
