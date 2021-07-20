const express = require("express");

const Category = require("../models/category");

const { v4: uuid } = require("uuid");

const router = express.Router();

router.get("", (req, res) => {
	Category.findAll()
		.then((documents) => {
			res.status(200).json({
				categories: documents,
				message: "Categories fetched successfully",
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Fetching Categories failed, err: " + err,
			});
		});
});

router.get("/:id", (req, res) => {
	Category.findByPk(req.params.id)
		.then((document) => {
			if (document) {
				res.status(200).json(document);
			} else {
				res.status(404).json({
					message: "Category not found!",
				});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get Category failed!, " + err,
			});
		});
});

router.delete("/:id", (req, res) => {
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((result) => {
			res.status(200).json({ message: "Category deleted!" });
		})
		.catch((err) => {
			return res
				.status(401)
				.json({ message: "Category delete failed, error:" + err });
		});
});

router.post("", (req, res) => {
	Category.findOne({ where: { category_name: req.body.category_name } }).then(
		(result) => {
			if (result !== null) {
				res.status(500).json({
					message: "This category already exists!",
				});
			} else {
				Category.create({
					id: uuid(),
					category_name: req.body.category_name,
				})
					.then((createdCategory) => {
						res.status(201).json({
							message: "Category created successfully!",
							categoryId: createdCategory.id,
						});
					})
					.catch((err) => {
						return res
							.status(401)
							.json({ message: "Category post failed, err: " + err });
					});
			}
		}
	);
});

module.exports = router;
