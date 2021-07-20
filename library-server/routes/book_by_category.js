const express = require("express");
const Book_data = require("../models/book_data");
const Book_by_category = require("../models/book_by_category");

const { v4: uuid } = require("uuid");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

const router = express.Router();

router.get("/categories/:categoriesId", (req, res) => {
	var categoriesId = req.params.categoriesId;
	sequelize
		.query(
			`SELECT DISTINCT(Books.id), title, description, publication_date, author, publisher, image, isbn FROM Books_by_category INNER JOIN Books_data ON Books_by_category.book_id = Books_data.id INNER JOIN Books ON Books_data.id = Books.book_data_id WHERE Books_by_category.category_id IN(${categoriesId}) ORDER BY title ASC `,
			{ type: QueryTypes.SELECT }
		)
		.then((documents) => {
			if (documents) {
				res.status(200).json({
					message: "Books by Categories fetched",
					books: documents,
				});
			} else {
				res.status(404).json({
					message: "Categories not found!",
				});
			}
		});
});

router.get("/category/:categoryId", (req, res) => {
	sequelize
		.query(
			`SELECT Books.id, title, description, publication_date, author, publisher, image, isbn FROM Books_by_category INNER JOIN Books_data ON Books_by_category.book_id = Books_data.id INNER JOIN Books ON Books_data.id = Books.book_data_id WHERE Books_by_category.category_id = '${req.params.categoryId}'`,
			{ type: QueryTypes.SELECT }
		)
		.then((documents) => {
			if (documents) {
				res.status(200).json({
					message: "Books by Categories fetched",
					books: documents,
				});
			} else {
				res.status(404).json({
					message: "Categories not found!",
				});
			}
		});
});

router.get("/:bookId", (req, res) => {
	Book_by_category.findAll({
		where: {
			book_id: req.params.bookId,
		},
	})
		.then((documents) => {
			if (documents) {
				res.status(201).json({ booksByCategory: documents });
			} else {
				res.status(404).json({
					message: "Categories not found!",
				});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get categories failed!, " + err,
			});
		});
});

router.get("", (req, res) => {
	Book_by_category.findAll()
		.then((documents) => {
			res.status(200).json({
				message: "Categories of Books fetched successfully!",
				booksByCategory: documents,
			});
		})
		.catch((err) => {
			return res
				.status(401)
				.json({ message: "Fetching Categories of Books failed, err: " + err });
		});
});

router.put("", (req, res) => {
	Book_by_category.findOne({
		where: {
			book_id: req.body.book_id,
			category_id: req.body.category_id,
		},
	}).then((result) => {
		if (result !== null) {
			res.status(100).json({
				message: "Category is already assigned to this book!",
			});
		} else {
			Book_by_category.create({
				id: uuid(),
				book_id: req.body.book_id,
				category_id: req.body.category_id,
			})
				.then((assignedCategory) => {
					res.status(201).json({
						message: "Category assigned successfully!",
						AssignedCategoryId: assignedCategory.id,
					});
				})
				.catch((err) => {
					res.status(400).json({
						message: "Assigning category failed: " + err,
					});
				});
		}
	});
});

router.post("", (req, res) => {
	Book_by_category.findOne({
		where: {
			book_id: req.body.book_id,
			category_id: req.body.category_id,
		},
	}).then((result) => {
		if (result !== null) {
			res.status(500).json({
				message: "Category is already assigned to this book!",
			});
		} else {
			Book_by_category.create({
				id: uuid(),
				book_id: req.body.book_id,
				category_id: req.body.category_id,
			})
				.then((assignedCategory) => {
					res.status(201).json({
						message: "Category assigned successfully!",
						AssignedCategoryId: assignedCategory.id,
					});
				})
				.catch((err) => {
					res.status(400).json({
						message: "Assigning category failed: " + err,
					});
				});
		}
	});
});

router.delete("/:book_id", (req, res) => {
	Book_by_category.findAll({
		where: { book_id: req.params.book_id },
	}).then((result) => {
		if (result == null) {
			res.status(500).json({
				message: "There was no categories assigned to this book_id",
			});
		} else {
			Book_by_category.destroy({
				where: { book_id: req.params.book_id },
			})
				.then((result) => {
					res.status(201).json({
						message: "Categories assigned to this book are deleted",
					});
				})
				.catch((err) => {
					res.status(400).json({
						message: "Deleting assigned categories failed: " + err,
					});
				});
		}
	});
});

module.exports = router;
