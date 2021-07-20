const Book_data = require("../models/book_data");
const express = require("express");

const { v4: uuid } = require("uuid");
const Book = require("../models/book");

const router = express.Router();

router.get("/isbn/:isbn", (req, res) => {
	Book_data.findAll({ where: { isbn: req.params.isbn } })
		.then((result) => {
			if (result.length !== 0) {
				res.status(200).json({
					message: "Książka o podanym kodzie ISBN już istnieje!",
					isValid: false,
				});
			} else {
				res.status(200).json({
					message: "Książka o podanym kodzie ISBN nie istnieje",
					isValid: true,
				});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Wystąpił problem podczas wyszukiwania kodu ISBN, " + err,
			});
		});
});

router.post("", (req, res) => {
	Book_data.findAll({ where: { isbn: req.body.isbn } })
		.then((result) => {
			if (result.length !== 0) {
				res.status(200).json({
					message:
						"Dodanie książki nie powiodło się!\n(Książka o podanym kodzie ISBN już istnieje)",
				});
			} else {
				Book_data.create({
					id: uuid(),
					title: req.body.title,
					description: req.body.description,
					publication_date: req.body.publication_date,
					author: req.body.author,
					publisher: req.body.publisher,
					image: req.body.image,
					isbn: req.body.isbn,
				})
					.then((createdBook) => {
						res.status(201).json({
							message: "Pomyślnie dodano książkę!",
							bookId: createdBook.id,
						});
					})
					.catch((err) => {
						return res.status(401).json({
							message: "Dodanie książki nie powiodło się!",
						});
					});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Post book failed!, " + err,
			});
		});
});

router.get("", (req, res) => {
	Book_data.findAll()
		.then((documents) => {
			res.status(200).json({
				message: "Books fetched successfully",
				books: documents,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get books failed!, " + err,
			});
		});
});

router.get("/:id", (req, res) => {
	Book_data.findByPk(req.params.id)
		.then((document) => {
			if (document) {
				res.status(200).json(document);
			} else {
				res.status(404).json({
					message: "Book not found!",
				});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get book failed!, " + err,
			});
		});
});

router.delete("/:id", (req, res) => {
	Book_data.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((result) => {
			res.status(200).json({ message: "Book deleted!" });
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Delete failed!, " + err,
			});
		});
});

router.put("/:id", (req, res) => {
	Book_data.update(
		{
			id: req.body.id,
			title: req.body.title,
			description: req.body.description,
			publication_date: req.body.publication_date,
			author: req.body.author,
			publisher: req.body.publisher,
			image: req.body.image,
			isbn: req.body.isbn,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((document) => {
			res.status(200).json({ message: "Update successful!" });
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Update failed!, " + err,
			});
		});
});

module.exports = router;
