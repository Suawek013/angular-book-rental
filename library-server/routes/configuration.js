const express = require("express");
const Configuration = require("../models/configuration");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/:id', (req,res) => {
    try {
        const decodedToken = jwt.verify(req.body.token, "secret_this_should_be_longer");
        if (decodedToken.permission != 'admin') {
            return res.status(403).json({ message: "access denied!" });
        }
    } catch (error) {
        return res.status(403).json({ message: "incorrect token!" });
    }
    Configuration.findByPk(req.params.id)
        .then(documents => {
            res.status(200).json({
                Configuration: documents,
                message: 'Configuration fetched successfully'
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Fetching Configuration failed, err: ' + err
            });
        });
});

router.put("/:id", (req, res) => {
	Configuration.update(
		{
            id: req.body.id,
            domain: req.body.domain,
            host: req.body.host,
            port: req.body.port,
            secure: req.body.secure
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
