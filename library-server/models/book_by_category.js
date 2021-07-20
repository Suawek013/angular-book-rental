const Sequelize = require("sequelize");
const db = require("../config/database");

const Category = require("./category");
const Book_data = require("./book_data");

const Book_by_category = db.define(
	"Category",
	{
		book_id: { type: Sequelize.STRING(36) },
		category_id: { type: Sequelize.STRING(36) },
	},
	{
		tableName: "Books_by_category",
	}
);

Book_by_category.hasMany(Category, {
	foreignKey: "id",
	sourceKey: "category_id",
});
Book_by_category.hasMany(Book_data, { foreignKey: "id", sourceKey: "book_id" });

Book_data.belongsTo(Book_by_category, {
	foreignKey: "id",
	sourceKey: "book_id",
});
Category.belongsTo(Book_by_category, {
	foreignKey: "id",
	sourceKey: "category_id",
});

module.exports = Book_by_category;
