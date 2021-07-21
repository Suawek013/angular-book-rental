const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("", (req, res) => {
	// const name = req.body.firstName;
	const output = `
    <h2>Weryfikacja zakończyła się pomyślnie, od teraz możesz wypożyczać książki w naszej bibliotece</p>
    <h3>Dane użytkownika: </h3>
    <ul>
      <li>Imię i Nazwisko: ${req.body.firstName} ${req.body.lastName}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
  `;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "", //"smtp.gmail.com",
		port: "", //587,
		secure: "", //false, // true for 465, false for other ports
		auth: {
			user: "nodemailer0000@gmail.com", // email login
			pass: "nodemailer1!", // email password
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: '"Biblioteka eplan.pl" <admin@eplan.pl>', // sender address
		to: "depek_e-mail@tlen.pl", // list of receivers
		subject: `Weryfikacja zakończyła się pomyślnie`, // Subject line
		text: "Hello world?", // plain text body
		html: output, // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		res.render("mail");
	});
});

module.exports = router;
