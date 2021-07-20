const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { v4: uuid } = require("uuid");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		User.findOne({
			where: {
				email: req.body.email,
			},
		}).then((result) => {
			if (result !== null) {
				res.status(500).json({
					message: "User with this email already exists!",
				});
			} else {
				User.create({
					id: uuid(),
					email: req.body.email,
					password: hash,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					permission: req.body.permission,
				})
					.then((result) => {
						res.status(201).json({
							message: "User created",
							userId: result.id,
						});
					})
					.catch((err) => {
						res.status(500).json({
							error: err,
						});
					});
			}
		});
	});
});

router.post("/login", (req, res, next) => {
	let fetchedUser;
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				throw new Error("Auth failed");
				// return res.status(401).json({
				//   message: "Auth failed"
				// });
			}
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then((result) => {
			if (!result) {
				return res.status(401).json({
					message: "Auth failed",
				});
			}
			const token = jwt.sign(
				{
					email: fetchedUser.email,
					userId: fetchedUser.id,
                    permission: fetchedUser.permission,
				},
				"secret_this_should_be_longer",
				{
					//W przyszłości ogarnąć !!!
					expiresIn: "1h",
				}
			);
			res.status(200).json({
				token: token,
				expiresIn: 3600 * 2, // 2 godziny
				fetchedUser: fetchedUser,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Auth failed",
			});
		});
});

router.post("", (req, res) => {
    try {
        const decodedToken = jwt.verify(req.body.token, "secret_this_should_be_longer");
        if (decodedToken.permission != 'admin') {
            return res.status(403).json({ message: "access denied!" });
        }
    } catch (error) {
        return res.status(403).json({ message: "incorrect token!" });
    }
	User.findAll({
		order: [["permission", "DESC"]],
	})
		.then((documents) => {
			res.status(200).json({
				message: "Users fetched successfully",
				users: documents,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get users failed!, " + err,
			});
		});
});

router.post("/:id", (req, res) => {
    try {
        const decodedToken = jwt.verify(req.body.token, "secret_this_should_be_longer");
        if (decodedToken.permission != 'admin' && decodedToken.userId != req.params.id) {
            return res.status(403).json({ message: "access denied!" });
        }
    } catch (error) {
        return res.status(403).json({ message: "incorrect token!" });
    }
	User.findByPk(req.params.id)
		.then((document) => {
			if (document) {
				res.status(200).json({
          message: "User was found",
          document
        });
			} else {
				res.status(404).json({
					message: "User not found!",
				});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Get user failed!, " + err,
			});
		});
});

router.delete("/:id", (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((result) => {
			res.status(200).json({
				message: "User deleted!",
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Delete failed!, " + err,
			});
		});
});

router.put("/:id", (req, res) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		let fetchedUser;
		User.findOne({
			where: {
				id: req.body.id,
			},
		})
			.then((user) => {
				if (!user) {
					throw new Error("Auth failed");
				}
				fetchedUser = user;
				return bcrypt.compare(req.body.password, user.password);
			})
			.then((result) => {
				if (result) {
					let errorMessage = "hasło jest takie samo jak poprzednie";
					res.status(200).json({
						errorMessage: errorMessage,
					});
				} else {
					User.findOne({
						where: {
							id: req.body.id,
						},
					})
						.then((user) => {
							if (!user) {
								throw new Error("Auth failed");
							}
							fetchedUser = user;
							return req.body.password == user.password;
						})
						.then((result) => {
							if (!result) {
								User.update(
									{
										id: req.body.id,
										email: req.body.email,
										password: hash,
										firstName: req.body.firstName,
										lastName: req.body.lastName,
										permission: req.body.permission,
									},
									{
										where: {
											id: req.params.id,
										},
									}
								)
									.then((document) => {
										res.status(200).json({
											message: "Update successful!",
										});
									})
									.catch((err) => {
										return res.status(401).json({
											message: "Update failed!, " + err,
										});
									});
							} else {
								User.update(
									{
										id: req.body.id,
										email: req.body.email,
										password: req.body.password,
										firstName: req.body.firstName,
										lastName: req.body.lastName,
										permission: req.body.permission,
									},
									{
										where: {
											id: req.params.id,
										},
									}
								)
									.then((document) => {
										res.status(200).json({
											message: "Update successful!",
										});
									})
									.catch((err) => {
										return res.status(401).json({
											message: "Update failed!, " + err,
										});
									});
							}
						});
				}
			});
	});
});

module.exports = router;
