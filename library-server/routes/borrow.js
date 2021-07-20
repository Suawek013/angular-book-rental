const Borrow = require("../models/borrow");
const express = require("express");
const Book = require("../models/book");
const User = require("./user");
const jwt = require("jsonwebtoken");

const { v4: uuid } = require("uuid");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

const router = express.Router();


router.post("", (req, res) => {
    try {
        const decodedToken = jwt.verify(req.body.token, "secret_this_should_be_longer");
    } catch (error) {
        return res.status(403).json({ message: "incorrect token!" });
    }
    if (typeof req.body.user_id == 'undefined' && typeof req.body.book_id == 'undefined') {
        sequelize
            .query(
                "SELECT * FROM Borrow INNER JOIN Books ON Borrow.book_id = Books.id INNER JOIN Books_data ON Books_data.id = Books.book_data_id INNER JOIN Users ON Users.id = Borrow.user_id",
                {
                    type: QueryTypes.SELECT,
                }
            )
            .then((documents) => {
                res.status(200).json({
                    message: "borrow list fetched successfully",
                    borrows: documents,
                });
            })
            .catch((err) => {
                return res.status(401).json({
                    message: "Get borrow list failed!, " + err,
                });
            });
    } else {
        	Borrow.create({
		id: uuid(),
		user_id: req.body.user_id,
		book_id: req.body.book_id,
		borrow_date: req.body.borrow_date,
		return_date: req.body.return_date,
        })

		.then((createdBorrow) => {
			console.log(createdBorrow);
			res.status(201).json({
				message: "Book borrow successfully",
				borrowId: createdBorrow.id,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "borrow book failed!, " + err,
			});
		});
    }
});

router.post("/:id", (req, res) => {
    try {
        const decodedToken = jwt.verify(req.body.token, "secret_this_should_be_longer");
    } catch (error) {
        return res.status(403).json({ message: "incorrect token!" });
    }
// 	Borrow.findAll({
// 	where: {
// 		user_id: req.params.id,
// 	},
// })

sequelize
.query(
	`SELECT * FROM Borrow INNER JOIN Books ON Borrow.book_id = Books.id INNER JOIN Books_data ON Books_data.id = Books.book_data_id WHERE Borrow.user_id = '${req.params.id}'`,
	{
		type: QueryTypes.SELECT,
	}
)
	.then((documents) => {
		res.status(200).json({
			message: "borrow list fetched successfully",
			borrows: documents,
		});
	})
	.catch((err) => {
		return res.status(401).json({
			message: "Get borrow list failed!, " + err,
		});
	});
});

router.post("/:userId/:bookId", (req, res) => {
    try {
        const decodedToken = jwt.verify(req.body.token, "secret_this_should_be_longer");
    } catch (error) {
        return res.status(403).json({ message: "incorrect token!" });
    }
	sequelize.query(`SELECT * FROM Borrow INNER JOIN Users on Borrow.user_id = Users.id WHERE Borrow.book_id = "${req.params.bookId}" AND Borrow.return_date IS NULL`,
		{
		type: QueryTypes.SELECT,
	})
		.then((documents) => {
			response = false;
			userIsDifferent = false;
			
			if (documents.length > 0) {
				if (req.params.userId != documents[0].user_id) {
					userIsDifferent = true;
				}
				response = true;
			}
			res.status(200).json({
				message: "borrow fetched successfully",
				userIsDifferent: userIsDifferent,
				isBorrowed: response,
				borrow: documents[0]

			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get borrow failed!, " + err,
			});
		});
});

router.put("", (req, res) => {
	Borrow.update(
		{
			return_date: req.body.date,
		},
		{
			where: {
				user_id: req.body.userId,
				book_id: req.body.bookId,
			},
		}
	)
		.then((document) => {
			res.status(200).json({
				message: "book returned successfully",
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "book return failed!, " + err,
			});
		});
});

module.exports = router;
