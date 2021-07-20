const Book = require("../models/book");
const express = require("express");
const Book_data = require("../models/book_data");

const { v4: uuid } = require("uuid");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

const router = express.Router();

router.get("", (req, res) => {
	Book.findAll()
		.then((documents) => {
			res.status(201).json({
				message: "Books fetched successfully!",
				books: documents,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get books failed!, " + err,
			});
		});
});

router.get("/bookId/:bookId", (req, res) => {
	sequelize
		.query(
			`SELECT Books.id, Books.book_data_id, title, description, publication_date, author, publisher, image, isbn, date_added FROM Books INNER JOIN Books_data ON Books.book_data_id = Books_data.id WHERE Books.id = '${req.params.bookId}'`,
			{
				type: QueryTypes.SELECT,
			}
		)
		.then((result) => {
			return res.status(201).json({
				message: "Book fetched successfully!",
				books: result[0],
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get Book failed!, " + err,
			});
		});
});

router.get("/book_data/:bookDataId", (req, res) => {
	Book.findAll({
		where: {
			book_data_id: req.params.bookDataId,
		},
	})
		.then((result) => {
			return res.status(201).json({
				message: "Book fetched successfully!",
				books: result,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get Book failed!, " + err,
			});
		});
});

router.get("/book_data", (req, res) => {
	sequelize
		.query(
			"SELECT Books.id, title, description, publication_date, author, publisher, image, isbn  FROM Books INNER JOIN Books_data ON Books.book_data_id = Books_data.id ORDER BY title ASC",
			{ type: QueryTypes.SELECT }
		)
		.then((result) => {
			return res.status(201).json({
				message: "Books with data fetched successfully",
				books: result,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get Books with data failed!," + err,
			});
		});
});

router.post("", (req, res) => {
	Book.create({
		id: uuid(),
		book_data_id: req.body.bookDataId,
		date_added: new Date(),
	})
		.then((result) => {
			res.status(201).json({
				message: "Book added successfully!",
				book: result,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Add Book failed!, " + err,
			});
		});
});

router.delete("/:bookId", (req, res) => {
	Book.destroy({
		where: {
			id: req.params.bookId,
		},
	})
		.then((result) => {
			return res.status(200).json({
				message: "Book deleted successfully!",
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Book delete failed!, " + err,
			});
		});
});

module.exports = router;
