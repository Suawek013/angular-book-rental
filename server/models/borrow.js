const Sequelize = require("sequelize");
const db = require("../config/database");

const User = require("./user");
const Book = require("./book");

const Borrow = db.define(
	"Borrow",
	{
		user_id: { type: Sequelize.STRING(36) },
		book_id: { type: Sequelize.STRING(36) },
		borrow_date: { type: Sequelize.STRING },
		return_date: { type: Sequelize.STRING },
	},
	{
		tableName: "Borrow",
	}
);

Borrow.hasMany(Book, {
	foreignKey: "id",
	sourceKey: "book_id",
});

Book.belongsTo(Borrow, {
	foreignKey: "id",
	sourceKey: "book_id",
});

Borrow.hasMany(User, {
	foreignKey: "id",
	sourceKey: "user_id",
});

User.belongsTo(Borrow, {
	foreignKey: "id",
	sourceKey: "user_id",
});

module.exports = Borrow;
